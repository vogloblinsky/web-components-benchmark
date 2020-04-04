(function () {
    'use strict';

    function noop() { }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else
            node.setAttribute(attribute, value);
    }
    function set_custom_element_data(node, prop, value) {
        if (prop in node) {
            node[prop] = value;
        }
        else {
            attr(node, prop, value);
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_data(text, data) {
        data = '' + data;
        if (text.data !== data)
            text.data = data;
    }
    function set_input_value(input, value) {
        if (value != null || input.value) {
            input.value = value;
        }
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error(`Function called outside component initialization`);
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function createEventDispatcher() {
        const component = current_component;
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function flush() {
        const seen_callbacks = new Set();
        do {
            // first, call beforeUpdate functions
            // and update components
            while (dirty_components.length) {
                const component = dirty_components.shift();
                set_current_component(component);
                update(component.$$);
            }
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    callback();
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
    }
    function update($$) {
        if ($$.fragment) {
            $$.update($$.dirty);
            run_all($$.before_update);
            $$.fragment.p($$.dirty, $$.ctx);
            $$.dirty = null;
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }

    function destroy_block(block, lookup) {
        block.d(1);
        lookup.delete(block.key);
    }
    function update_keyed_each(old_blocks, changed, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(changed, child_ctx);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        if (component.$$.fragment) {
            run_all(component.$$.on_destroy);
            component.$$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            component.$$.on_destroy = component.$$.fragment = null;
            component.$$.ctx = {};
        }
    }
    function make_dirty(component, key) {
        if (!component.$$.dirty) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty = blank_object();
        }
        component.$$.dirty[key] = true;
    }
    function init(component, options, instance, create_fragment, not_equal, prop_names) {
        const parent_component = current_component;
        set_current_component(component);
        const props = options.props || {};
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props: prop_names,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty: null
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, props, (key, value) => {
                if ($$.ctx && not_equal($$.ctx[key], $$.ctx[key] = value)) {
                    if ($$.bound[key])
                        $$.bound[key](value);
                    if (ready)
                        make_dirty(component, key);
                }
            })
            : props;
        $$.update();
        ready = true;
        run_all($$.before_update);
        $$.fragment = create_fragment($$.ctx);
        if (options.target) {
            if (options.hydrate) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.l(children(options.target));
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    let SvelteElement;
    if (typeof HTMLElement !== 'undefined') {
        SvelteElement = class extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
            }
            connectedCallback() {
                // @ts-ignore todo: improve typings
                for (const key in this.$$.slotted) {
                    // @ts-ignore todo: improve typings
                    this.appendChild(this.$$.slotted[key]);
                }
            }
            attributeChangedCallback(attr, _oldValue, newValue) {
                this[attr] = newValue;
            }
            $destroy() {
                destroy_component(this, 1);
                this.$destroy = noop;
            }
            $on(type, callback) {
                // TODO should this delegate to addEventListener?
                const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
                callbacks.push(callback);
                return () => {
                    const index = callbacks.indexOf(callback);
                    if (index !== -1)
                        callbacks.splice(index, 1);
                };
            }
            $set() {
                // overridden by instance, if it has props
            }
        };
    }

    /* src/my-todo.svelte generated by Svelte v3.9.1 */

    function get_each_context(ctx, list, i) {
    	const child_ctx = Object.create(ctx);
    	child_ctx.todo = list[i];
    	child_ctx.index = i;
    	return child_ctx;
    }

    // (111:12) {#each todoList as todo, index (todo.id)}
    function create_each_block(key_1, ctx) {
    	var todo_item, todo_item_text_value, todo_item_checked_value, todo_item_index_value, dispose;

    	return {
    		key: key_1,

    		first: null,

    		c() {
    			todo_item = element("todo-item");
    			set_custom_element_data(todo_item, "text", todo_item_text_value = ctx.todo.text);
    			set_custom_element_data(todo_item, "checked", todo_item_checked_value = ctx.todo.checked);
    			set_custom_element_data(todo_item, "index", todo_item_index_value = ctx.todo.id);

    			dispose = [
    				listen(todo_item, "toggle", ctx.toggleItem),
    				listen(todo_item, "remove", ctx.removeItem)
    			];

    			this.first = todo_item;
    		},

    		m(target, anchor) {
    			insert(target, todo_item, anchor);
    		},

    		p(changed, ctx) {
    			if ((changed.todoList) && todo_item_text_value !== (todo_item_text_value = ctx.todo.text)) {
    				set_custom_element_data(todo_item, "text", todo_item_text_value);
    			}

    			if ((changed.todoList) && todo_item_checked_value !== (todo_item_checked_value = ctx.todo.checked)) {
    				set_custom_element_data(todo_item, "checked", todo_item_checked_value);
    			}

    			if ((changed.todoList) && todo_item_index_value !== (todo_item_index_value = ctx.todo.id)) {
    				set_custom_element_data(todo_item, "index", todo_item_index_value);
    			}
    		},

    		d(detaching) {
    			if (detaching) {
    				detach(todo_item);
    			}

    			run_all(dispose);
    		}
    	};
    }

    function create_fragment(ctx) {
    	var div, h1, t1, section, todo_input, t2, ul, each_blocks = [], each_1_lookup = new Map(), dispose;

    	var each_value = ctx.todoList;

    	const get_key = ctx => ctx.todo.id;

    	for (var i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    	}

    	return {
    		c() {
    			div = element("div");
    			h1 = element("h1");
    			h1.textContent = "Todos Svelte";
    			t1 = space();
    			section = element("section");
    			todo_input = element("todo-input");
    			t2 = space();
    			ul = element("ul");

    			for (i = 0; i < each_blocks.length; i += 1) each_blocks[i].c();

    			this.c = noop;
    			attr(ul, "id", "list-container");
    			dispose = listen(todo_input, "create", ctx.addItem);
    		},

    		m(target, anchor) {
    			insert(target, div, anchor);
    			append(div, h1);
    			append(div, t1);
    			append(div, section);
    			append(section, todo_input);
    			append(section, t2);
    			append(section, ul);

    			for (i = 0; i < each_blocks.length; i += 1) each_blocks[i].m(ul, null);
    		},

    		p(changed, ctx) {
    			const each_value = ctx.todoList;
    			each_blocks = update_keyed_each(each_blocks, changed, get_key, 1, ctx, each_value, each_1_lookup, ul, destroy_block, create_each_block, null, get_each_context);
    		},

    		i: noop,
    		o: noop,

    		d(detaching) {
    			if (detaching) {
    				detach(div);
    			}

    			for (i = 0; i < each_blocks.length; i += 1) each_blocks[i].d();

    			dispose();
    		}
    	};
    }

    function instance($$self, $$props, $$invalidate) {
    	let todoList = [{
                text: 'my initial todo',
                checked: false,
                id: 0
            },
            {
                text: 'Learn about Web Components',
                checked: true,
                id: 1
            }
        ];

        let input;
        let items;
        let offs = {};
        let toggles = {};

        onMount(() => {
    		input = document.querySelector('my-todo').shadowRoot.querySelector('todo-input');
            syncItems();

            setTimeout(() => {
                input.$on('create', (ev) => {
                    addItem(ev.detail);
                });
                listemItems();
            }, 1000);
    	});

        function syncItems() {
            items = document.querySelector('my-todo').shadowRoot.querySelectorAll('todo-item');
        }

        function listemItems() {
            items.forEach((item) => {
                const off = item.$on('remove', removeItem);
                if (typeof offs[item.index] !== 'undefined') {
                    offs[item.index]();
                } else {
                    offs[item.index] = off;            }
                const toggle = item.$on('toggle', toggleItem);
                if (typeof toggles[item.index] !== 'undefined') {
                    toggles[item.index]();
                } else {
                    toggles[item.index] = toggle;            }
            });
        }

        function addItem(text) {
            $$invalidate('todoList', todoList = [...todoList, {
                text,
                checked: false,
                id: todoList[todoList.length - 1].id + 1
            }]);
            setTimeout(() => {
                syncItems();
                listemItems();
            }, 1000);
        }

        function removeItem(ev) {
            todoList.splice(parseInt(ev.detail), 1);
            $$invalidate('todoList', todoList);
        }

        function toggleItem(ev) {
            const item = todoList[parseInt(ev.detail)];
            todoList[parseInt(ev.detail)] = {
                ...item,
                checked: !item.checked
            }; $$invalidate('todoList', todoList);
            $$invalidate('todoList', todoList);
        }

    	return {
    		todoList,
    		addItem,
    		removeItem,
    		toggleItem
    	};
    }

    class My_todo extends SvelteElement {
    	constructor(options) {
    		super();

    		this.shadowRoot.innerHTML = `<style>h1{font-size:90px;font-weight:100;text-align:center;color:rgba(175, 47, 47, 0.15)}section{background:#fff;margin:130px 0 40px 0;position:relative;box-shadow:0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1)}#list-container{margin:0;padding:0;list-style:none;border-top:1px solid #e6e6e6}</style>`;

    		init(this, { target: this.shadowRoot }, instance, create_fragment, safe_not_equal, []);

    		if (options) {
    			if (options.target) {
    				insert(options.target, this, options.anchor);
    			}
    		}
    	}
    }

    customElements.define("my-todo", My_todo);

    /* src/todo-input.svelte generated by Svelte v3.9.1 */

    function create_fragment$1(ctx) {
    	var form, input_1, dispose;

    	return {
    		c() {
    			form = element("form");
    			input_1 = element("input");
    			this.c = noop;
    			attr(input_1, "id", "new-todo");
    			attr(input_1, "type", "text");
    			attr(input_1, "placeholder", "What needs to be done?");
    			attr(form, "id", "new-todo-form");

    			dispose = [
    				listen(input_1, "input", ctx.input_1_input_handler),
    				listen(form, "submit", ctx.submit_handler)
    			];
    		},

    		m(target, anchor) {
    			insert(target, form, anchor);
    			append(form, input_1);

    			set_input_value(input_1, ctx.text);
    		},

    		p(changed, ctx) {
    			if (changed.text && (input_1.value !== ctx.text)) set_input_value(input_1, ctx.text);
    		},

    		i: noop,
    		o: noop,

    		d(detaching) {
    			if (detaching) {
    				detach(form);
    			}

    			run_all(dispose);
    		}
    	};
    }

    function instance$1($$self, $$props, $$invalidate) {
    	const dispatch = createEventDispatcher();
    	let { text = '' } = $$props;

        let input;

        onMount(async () => {
    		input = document.querySelector('my-todo').shadowRoot.querySelector('todo-input');
    	});

        function create(e) {
            e.preventDefault();
            dispatch('create', text);
            $$invalidate('text', text = '');
            input.blur();
        }

    	function input_1_input_handler() {
    		text = this.value;
    		$$invalidate('text', text);
    	}

    	function submit_handler(e) {
    		return create(e);
    	}

    	$$self.$set = $$props => {
    		if ('text' in $$props) $$invalidate('text', text = $$props.text);
    	};

    	return {
    		text,
    		create,
    		input_1_input_handler,
    		submit_handler
    	};
    }

    class Todo_input extends SvelteElement {
    	constructor(options) {
    		super();

    		this.shadowRoot.innerHTML = `<style>#new-todo-form{position:relative;font-size:24px;border-bottom:1px solid #ededed}#new-todo{padding:16px 16px 16px 60px;border:none;background:rgba(0, 0, 0, 0.003);position:relative;margin:0;width:100%;font-size:24px;font-family:inherit;font-weight:inherit;line-height:1.4em;border:0;outline:none;color:inherit;padding:6px;border:1px solid #CCC;box-shadow:inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);box-sizing:border-box}</style>`;

    		init(this, { target: this.shadowRoot }, instance$1, create_fragment$1, safe_not_equal, ["text"]);

    		if (options) {
    			if (options.target) {
    				insert(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["text"];
    	}

    	get text() {
    		return this.$$.ctx.text;
    	}

    	set text(text) {
    		this.$set({ text });
    		flush();
    	}
    }

    customElements.define("todo-input", Todo_input);

    /* src/todo-item.svelte generated by Svelte v3.9.1 */

    function create_fragment$2(ctx) {
    	var li, input, t0, label, t1, t2, button, li_class_value, dispose;

    	return {
    		c() {
    			li = element("li");
    			input = element("input");
    			t0 = space();
    			label = element("label");
    			t1 = text(ctx.text);
    			t2 = space();
    			button = element("button");
    			button.textContent = "x";
    			this.c = noop;
    			attr(input, "type", "checkbox");
    			attr(button, "class", "destroy");
    			attr(li, "class", li_class_value = "item " + ctx.statusClass);

    			dispose = [
    				listen(input, "change", ctx.input_change_handler),
    				listen(input, "click", ctx.click_handler),
    				listen(button, "click", ctx.click_handler_1)
    			];
    		},

    		m(target, anchor) {
    			insert(target, li, anchor);
    			append(li, input);

    			input.checked = ctx.checked;

    			append(li, t0);
    			append(li, label);
    			append(label, t1);
    			append(li, t2);
    			append(li, button);
    		},

    		p(changed, ctx) {
    			if (changed.checked) input.checked = ctx.checked;

    			if (changed.text) {
    				set_data(t1, ctx.text);
    			}

    			if ((changed.statusClass) && li_class_value !== (li_class_value = "item " + ctx.statusClass)) {
    				attr(li, "class", li_class_value);
    			}
    		},

    		i: noop,
    		o: noop,

    		d(detaching) {
    			if (detaching) {
    				detach(li);
    			}

    			run_all(dispose);
    		}
    	};
    }

    function instance$2($$self, $$props, $$invalidate) {
    	const dispatch = createEventDispatcher();

        let { text = '', checked = false, index = 0 } = $$props;

        function toggle() {
            dispatch('toggle', index);
        }

        function remove() {
            dispatch('remove', index);
        }

    	function input_change_handler() {
    		checked = this.checked;
    		$$invalidate('checked', checked);
    	}

    	function click_handler() {
    		return toggle();
    	}

    	function click_handler_1() {
    		return remove();
    	}

    	$$self.$set = $$props => {
    		if ('text' in $$props) $$invalidate('text', text = $$props.text);
    		if ('checked' in $$props) $$invalidate('checked', checked = $$props.checked);
    		if ('index' in $$props) $$invalidate('index', index = $$props.index);
    	};

    	let statusClass;

    	$$self.$$.update = ($$dirty = { checked: 1 }) => {
    		if ($$dirty.checked) { $$invalidate('statusClass', statusClass = checked ? 'completed' : ''); }
    	};

    	return {
    		text,
    		checked,
    		index,
    		toggle,
    		remove,
    		statusClass,
    		input_change_handler,
    		click_handler,
    		click_handler_1
    	};
    }

    class Todo_item extends SvelteElement {
    	constructor(options) {
    		super();

    		this.shadowRoot.innerHTML = `<style>:host{display:block}li.item{font-size:24px;display:block;position:relative;border-bottom:1px solid #ededed}li.item input{text-align:center;width:40px;height:auto;position:absolute;top:9px;bottom:0;margin:auto 0;border:none}li input:after{content:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>')}li input:checked:after{content:url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>')}li.item label{white-space:pre;word-break:break-word;padding:15px 60px 15px 15px;margin-left:45px;display:block;line-height:1.2;transition:color 0.4s}li.item.completed label{color:#d9d9d9;text-decoration:line-through}li.item button,li.item input[type="checkbox"]{outline:none}li.item button{margin:0;padding:0;border:0;background:none;font-size:100%;vertical-align:baseline;font-family:inherit;font-weight:inherit;color:inherit;-webkit-appearance:none;appearance:none;-webkit-font-smoothing:antialiased;-moz-font-smoothing:antialiased;font-smoothing:antialiased}li.item .destroy{position:absolute;top:0;right:10px;bottom:0;width:40px;height:40px;margin:auto 0;font-size:30px;color:#cc9a9a;margin-bottom:11px;transition:color 0.2s ease-out}li.item .destroy:hover{color:#af5b5e}</style>`;

    		init(this, { target: this.shadowRoot }, instance$2, create_fragment$2, safe_not_equal, ["text", "checked", "index"]);

    		if (options) {
    			if (options.target) {
    				insert(options.target, this, options.anchor);
    			}

    			if (options.props) {
    				this.$set(options.props);
    				flush();
    			}
    		}
    	}

    	static get observedAttributes() {
    		return ["text","checked","index"];
    	}

    	get text() {
    		return this.$$.ctx.text;
    	}

    	set text(text) {
    		this.$set({ text });
    		flush();
    	}

    	get checked() {
    		return this.$$.ctx.checked;
    	}

    	set checked(checked) {
    		this.$set({ checked });
    		flush();
    	}

    	get index() {
    		return this.$$.ctx.index;
    	}

    	set index(index) {
    		this.$set({ index });
    		flush();
    	}
    }

    customElements.define("todo-item", Todo_item);

    console.log(My_todo);
    console.log(Todo_input);
    console.log(Todo_item);

}());
