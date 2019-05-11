(function (factory) {
	typeof define === 'function' && define.amd ? define(factory) :
	factory();
}(function () { 'use strict';

	/**
	 * @typedef {(Object<string,any>)} VnodeProps;
	 * @typedef {(Function|string)} VnodeType;
	 * @typedef {{type:VnodeType,props:VnodeProps}} Vnode
	 **/

	/**
	 * @param {VnodeType} type
	 * @param {VnodeProps} [props]
	 * @param {Vnode|Vnode[]} [children]
	 * @returns {Vnode}
	 **/
	function createElement(type, props, children) {
		props = props || {};
		if (arguments.length > 3) {
			children = [children];
			for (let i = 3; i < arguments.length; i++) {
				children.push(arguments[i]);
			}
		}
		if (children != null) {
			props.children = children;
		}

		let vnode = { type, props },
			key = props.key;
		if (key != null) {
			vnode.key = "" + key;
		}
		/**@type {Vnode} */
		return vnode;
	}
	/**
	 * Create or maintain a vnode, if this is boolean,
	 * string or null returns a text type vnode
	 * @param {(Vnode|string|null|boolean)} value
	 * @returns {Vnode}
	 **/
	function toVnode(value) {
		if (value == null || typeof value == "boolean") value = "";

		if (typeof value == "string" || typeof value == "number") {
			return createElement(null, null, "" + value);
		}

		return value;
	}

	const ARRAY_EMPTY = [];
	const EVENT_ALIAS = {};
	const OBJECT_EMPTY = {};

	const STATE = "@state";
	const NODE_TYPE = "localName";

	const NODE_HOST = "host";

	const COMPONENT_CREATE = 0x61;
	const COMPONENT_UPDATE = 0x74;
	const COMPONENT_CREATED = 0x4f;
	const COMPONENT_UPDATED = 0x4d;
	const COMPONENT_CLEAR = 0x49;
	const COMPONENT_REMOVE = 0x43;

	const IGNORE = {
		children: 1
	};

	const IGNORE_CHILDREN = {
		innerHTML: 1,
		textContent: 1,
		contenteditable: 1
	};

	const FROM_DOM_PROPS = {
		className: 1,
		id: 1,
		checked: 1,
		value: 1,
		selected: 1
	};

	const CSS_PROPS = {};

	/**
	 * Return if value is array
	 * @param {*}
	 * @return {boolean}
	 */
	function isArray(value) {
		return Array.isArray(value);
	}

	function assign(master, commit) {
		for (let key in commit) {
			master[key] = commit[key];
		}
		for (let i = 2; i < arguments.length; i++) assign(master, arguments[i]);
		return master;
	}

	let defer = Promise.prototype.then.bind(Promise.resolve());

	/**
	 *
	 * @param {import("./render").HTMLNode} node
	 * @param {Object} props
	 * @param {Object} nextProps
	 * @param {boolean} isSvg
	 * @param {Object} handlers
	 * @param {any} [bindEvent]
	 **/
	function diffProps(node, props, nextProps, isSvg, handlers, bindEvent) {
		props = props || {};

		for (let key in props) {
			if (IGNORE[key]) continue;
			if (!(key in nextProps)) {
				setProperty(node, key, props[key], null, isSvg, handlers);
			}
		}
		let ignoreChildren;
		for (let key in nextProps) {
			if (IGNORE[key]) continue;
			setProperty(
				node,
				key,
				props[key],
				nextProps[key],
				isSvg,
				handlers,
				bindEvent
			);
			ignoreChildren = ignoreChildren || IGNORE_CHILDREN[key];
		}
		return ignoreChildren;
	}

	function setProperty(
		node,
		key,
		prevValue,
		nextValue,
		isSvg,
		handlers,
		bindEvent
	) {
		key = key == "class" && !isSvg ? "className" : key;
		// define empty value
		prevValue = prevValue == null ? null : prevValue;
		nextValue = nextValue == null ? null : nextValue;

		if (key in node && FROM_DOM_PROPS[key]) {
			prevValue = node[key];
		}

		if (nextValue === prevValue) return;

		if (
			key[0] == "o" &&
			key[1] == "n" &&
			(typeof nextValue == "function" || typeof prevValue == "function")
		) {
			setEvent(node, key, nextValue, handlers, bindEvent);
			return;
		}

		switch (key) {
			case "ref":
				if (nextValue) nextValue.current = node;
				break;
			case "style":
				setStyle(node, prevValue || node.style.cssText, nextValue);
				break;
			case "shadowDom":
				if ("attachShadow" in node) {
					if (
						(node.shadowRoot && !nextValue) ||
						(!node.shadowRoot && nextValue)
					) {
						node.attachShadow({ mode: nextValue ? "open" : "closed" });
					}
				}
				break;
			case "key":
				key = "data-key";
				if (nextValue == null) {
					delete node.dataset.key;
				} else {
					node.dataset.key = nextValue;
				}
				break;
			default:
				if (!isSvg && key != "list" && key in node) {
					node[key] = nextValue == null ? "" : nextValue;
				} else if (nextValue == null) {
					node.removeAttribute(key);
				} else {
					node.setAttribute(key, nextValue);
				}
		}
	}

	/**
	 *
	 * @param {import("./render").HTMLNode} node
	 * @param {string} type
	 * @param {function} [nextHandler]
	 * @param {object} handlers
	 */
	function setEvent(node, type, nextHandler, handlers, bindEvent) {
		// memorize the transformation
		if (!EVENT_ALIAS[type]) {
			EVENT_ALIAS[type] = type.slice(2).toLocaleLowerCase();
		}
		// get the name of the event to use
		type = EVENT_ALIAS[type];
		// add handleEvent to handlers
		if (!handlers.handleEvent) {
			/**
			 * {@link https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener#The_value_of_this_within_the_handler}
			 **/
			handlers.handleEvent = event => handlers[event.type].call(bindEvent, event);
		}
		if (nextHandler) {
			// create the subscriber if it does not exist
			if (!handlers[type]) {
				node.addEventListener(type, handlers);
			}
			// update the associated event
			handlers[type] = nextHandler;
		} else {
			// 	delete the associated event
			if (handlers[type]) {
				node.removeEventListener(type, handlers);
				delete handlers[type];
			}
		}
	}
	/**
	 * define style as string inline,this generates less mutation
	 * to the sun and cleans the previously defined properties.
	 * @param {import("./render").HTMLNode} node
	 * @param {(string|object)} prevValue
	 * @param {(string|object)} nextValue
	 */
	function setStyle(node, prevValue, nextValue) {
		let prevCss = prevValue,
			nextCss = nextValue;
		if (typeof nextCss == "object") {
			nextCss = "";
			for (let key in nextValue) {
				if (!nextValue[key]) continue;
				// memorizes the transformations associated with CSS properties
				if (!CSS_PROPS[key]) {
					CSS_PROPS[key] = key.replace(/([A-Z])/g, "-$1").toLowerCase();
				}
				nextCss += `${CSS_PROPS[key]}:${nextValue[key]};`;
			}
		}
		if (prevCss != nextCss) {
			node.style.cssText = nextCss;
		}
	}

	/**
	 * @typedef {(HTMLElement|SVGElement|Text)} Element
	 *
	 * @typedef {import("./vnode").Vnode} Vnode
	 *
	 * @typedef {Object<string,any>} Context
	 *
	 * @typedef {Function[]} Hooks
	 *
	 * @typedef {{prevent:boolean,context:Context,hooks:Hooks,next:Function,type:Function,props:import("./vnode").VnodeProps}} ComponentSnap
	 *
	 * @typedef {{type:string}} Action
	 *
	 **/

	/**
	 * @type {ComponentSnap}
	 */
	let CURRENT_COMPONENT;
	/**
	 * @type {number}
	 */
	let CURRENT_COMPONENT_KEY_HOOK;
	/**
	 * Returns the concurrent component running
	 * @returns {ComponentSnap}
	 */
	function getCurrentComponent() {
		if (!CURRENT_COMPONENT) {
			throw new Error(
				"the hooks can only be called from an existing functional component in the diff queue"
			);
		}
		return CURRENT_COMPONENT;
	}
	/**
	 * Create or recover, the current state according to the global index
	 * associated with the component
	 * @param {(Function|null)} reducer
	 * @param {*} state
	 * @return {[*,(state:any,action:{type:any}]};
	 */
	function useHook(reducer, state) {
		let component = getCurrentComponent().component,
			index = CURRENT_COMPONENT_KEY_HOOK++,
			hook,
			isCreate;
		if (!component.hooks[index]) {
			isCreate = true;
			component.hooks[index] = { state };
		}
		hook = component.hooks[index];
		hook.reducer = reducer;
		if (isCreate) dispatchHook(hook, { type: COMPONENT_CREATE });
		return [hook.state, action => dispatchHook(hook, action)];
	}
	/**
	 * dispatch the hook
	 * @param {{reducer:(Function=),state}} hook
	 * @param {Action} action
	 */
	function dispatchHook(hook, action) {
		if (hook.reducer) {
			hook.state = hook.reducer(hook.state, action);
		}
	}
	/**
	 * dispatches the state of the components to the hooks subscribed to the component
	 * @param {ComponentSnap[]} components
	 * @param {Action} action
	 */
	function dispatchComponents(components, action) {
		let length = components.length;
		for (let i = 0; i < length; i++) {
			let component = components[i],
				hooks = component.hooks,
				hooksLength = hooks.length;
			// Mark the component as deleted
			if (action.type === COMPONENT_REMOVE) {
				component.remove = true;
			}
			for (let i = 0; i < hooksLength; i++) {
				dispatchHook(hooks[i], action);
			}
		}
	}
	/**
	 * this function allows creating a block that analyzes the tag
	 * defined as a function, in turn creates a global update scope for hook management.
	 * @param {import("./render").ConfigRender} config - name of space to store the components
	 * @param {boolean} isSvg - inherit svg behavior
	 */
	function createComponent(config, isSvg) {
		/**@type {ComponentSnap[]} */
		let components = [];
		/**@type {Element} */
		let host;
		/**
		 * This function allows reducing the functional components based on
		 * their return, in turn creates a unique state for each component
		 * according to a depth index
		 * @param {Vnode} vnode
		 * @param {Context} context
		 * @param {number} deep - incremental index that defines the position of the component in the store
		 */
		function nextComponent(vnode, context, deep) {
			// if host does not exist as a node, the vnode is not reduced
			if (!host) return;
			vnode = toVnode(vnode);
			// if it is different from a functional node, it is sent to diff again
			if (typeof vnode.type != "function") {
				dispatchComponents(components.splice(deep), {
					type: COMPONENT_REMOVE
				});
				host = diff(config, host, vnode, context, isSvg, updateComponent);
				// if the components no longer has a length, it is assumed that the updateComponent is no longer necessary
				if (components.length) host[config.id].updateComponent = updateComponent;

				return;
			}
			/**@type {ComponentSnap} */
			let component = components[deep] || {};
			/**
			 * @type {boolean} define whether the component is created or updated
			 */
			let isCreate;
			/**
			 * @type {boolean} Define whether the component should continue with the update
			 */
			let withNext;

			if (component.type != vnode.type) {
				// the elimination is sent to the successors of the previous component
				dispatchComponents(components.splice(deep), {
					type: COMPONENT_REMOVE
				});
				// stores the state of the component
				components[deep] = assign({ hooks: [], context: {} }, vnode);
				isCreate = true;
				withNext = true;
			}

			component = components[deep];
			/**@type {Vnode} */
			let nextProps = vnode.props;
			/**@type {Vnode} */
			let prevProps = component.props;

			// Compare previous props with current ones
			if (!withNext) {
				let length = Object.keys(prevProps).length,
					nextLength = 0;
				// compare the lake of properties
				for (let key in nextProps) {
					nextLength++;
					if (nextProps[key] != prevProps[key]) {
						withNext = true;
						break;
					}
				}
				withNext = withNext || length != nextLength;
			}

			withNext = component.context != context || withNext;

			component.props = nextProps;

			// the current context is componentsd in the cache
			component.context = context;

			/**
			 * Create a snapshot of the current component
			 */
			function next() {
				if (component.remove) return host;

				CURRENT_COMPONENT = {
					component,
					/**
					 * updates the status of the component, forcing the update of this
					 */
					next() {
						if (!component.prevent) {
							component.prevent = true;
							defer(() => {
								component.prevent = false;
								next();
							});
						}
					}
				};

				CURRENT_COMPONENT_KEY_HOOK = 0;

				dispatchComponents([component], { type: COMPONENT_UPDATE });

				let vnextnode = component.type(component.props);
				// clean state constants
				CURRENT_COMPONENT = false;
				CURRENT_COMPONENT_KEY_HOOK = 0;

				nextComponent(vnextnode, component.context, deep + 1);

				dispatchComponents([component], {
					type: isCreate ? COMPONENT_CREATED : COMPONENT_UPDATED
				});

				isCreate = false;
			}
			if (withNext && !component.prevent) next();
		}
		/**
		 * allows to control HoCs and optimizes the executions
		 * of the components with the memo pattern
		 * @param {string} type - action to execute
		 * @param {Element} nextHost
		 * @param {Vnode} vnode
		 * @param {Context} context
		 * @returns {Element}
		 */
		function updateComponent(type, nextHost, vnode, context) {
			switch (type) {
				case COMPONENT_UPDATE:
					host = nextHost;
					nextComponent(vnode, context, 0);
					return host;
				case COMPONENT_CLEAR:
					dispatchComponents([].concat(components).reverse(), { type });
					break;
				case COMPONENT_REMOVE:
					host = false;
					dispatchComponents(components.reverse(), { type });
					components = [];
					break;
			}
		}

		return updateComponent;
	}

	/**
	 *
	 * @param {import("./render").ConfigRender} config
	 * @param {import("./render").HTMLNode} node
	 * @param {import("./vnode").Vnode} nextVnode
	 * @param {object} context
	 * @param {boolean} isSvg
	 * @param {Function} currentUpdateComponent
	 * @return {import("./render").HTMLNode}
	 **/
	function diff(
		config,
		node,
		nextVnode,
		context,
		isSvg,
		currentUpdateComponent
	) {
		let { vnode, updateComponent, handlers = {} } =
			(node && node[config.id]) || {};

		if (vnode == nextVnode) return node;

		vnode = vnode || { props: {} };

		let { type, props } = nextVnode,
			{ shadowDom, children } = props,
			isComponent = typeof type == "function";

		isSvg = isSvg || type == "svg";
		if (isComponent && !updateComponent) {
			updateComponent = createComponent(config, isSvg);
		}
		if (!isComponent && type != NODE_HOST && getNodeName(node) !== type) {
			let nextNode = createNode(type, isSvg),
				parent = node && node.parentNode;

			if (parent) {
				unmount(config, node, true, currentUpdateComponent);
				parent.replaceChild(nextNode, node);
			}

			node = nextNode;
			handlers = {};
		}
		if (updateComponent && currentUpdateComponent != updateComponent) {
			return updateComponent(COMPONENT_UPDATE, node, nextVnode, context);
		} else if (type == null) {
			if (node.nodeValue != children) {
				node.nodeValue = children;
			}
		} else {
			let ignoreChildren = diffProps(
				node,
				vnode.props,
				nextVnode.props,
				isSvg,
				handlers,
				config.bind
			);
			if (!ignoreChildren && vnode.props.children != children) {
				diffChildren(
					config,
					shadowDom ? node.shadowRoot || node : node,
					children,
					context,
					isSvg
				);
			}
		}
		node[config.id] = { vnode: nextVnode, handlers };
		return node;
	}
	/**
	 *
	 * @param {import("./render").ConfigRender} config
	 * @param {import("./render").HTMLNode} parent
	 * @param {import("./vnode").Vnode[]} [nextChildren]
	 * @param {Object} context
	 * @param {boolean} isSvg
	 */
	function diffChildren(config, parent, nextChildren, context, isSvg) {
		let keyes = [],
			children = toList(nextChildren, false, keyes),
			childrenLenght = children.length;

		let childNodes = parent.childNodes,
			childNodesKeyes = {},
			childNodesLength = childNodes.length,
			withKeyes = keyes.withKeyes,
			index = withKeyes
				? 0
				: childNodesLength > childrenLenght
				? childrenLenght
				: childNodesLength;
		for (; index < childNodesLength; index++) {
			let childNode = childNodes[index],
				key = index;
			if (withKeyes) {
				key = childNode.dataset.key;
				if (keyes.indexOf(key) > -1) {
					childNodesKeyes[key] = childNode;
					continue;
				}
			}
			unmount(config.id, childNode);
			index--;
			childNodesLength--;
			parent.removeChild(childNode);
		}
		for (let i = 0; i < childrenLenght; i++) {
			let child = children[i],
				indexChildNode = childNodes[i],
				key = withKeyes ? child.key : i,
				childNode = withKeyes ? childNodesKeyes[key] : indexChildNode;

			if (withKeyes && childNode) {
				if (childNode != indexChildNode) {
					parent.insertBefore(childNode, indexChildNode);
				}
			}

			let nextChildNode = diff(
				config,
				!childNode && typeof child.type == "function"
					? createNode(null)
					: childNode,
				child,
				context,
				isSvg
			);

			if (!childNode) {
				if (childNodes[i]) {
					parent.insertBefore(nextChildNode, childNodes[i]);
				} else {
					parent.appendChild(nextChildNode);
				}
			}
		}
	}
	/**
	 * Remove the node and issue the deletion if it belongs to a component
	 * @param {string} id
	 * @param {import("./render").HTMLNode} node
	 * @param {boolean} clear
	 * @param {function} currentUpdateComponent
	 */
	function unmount(id, node, clear, currentUpdateComponent) {
		let { updateComponent } = node[id] || {},
			childNodes = node.childNodes,
			length = childNodes.length;
		if (updateComponent && updateComponent != currentUpdateComponent) {
			updateComponent(clear ? COMPONENT_CLEAR : COMPONENT_REMOVE);
		}
		for (let i = 0; i < length; i++) {
			unmount(id, childNodes[i]);
		}
	}
	/**
	 *
	 * @param {string} type
	 * @param {boolean} isSvg
	 * @returns {import("./render").HTMLNode}
	 */
	function createNode(type, isSvg) {
		let doc = document,
			nextNode;
		if (type != null) {
			nextNode = isSvg
				? doc.createElementNS("http://www.w3.org/2000/svg", type)
				: doc.createElement(type);
		} else {
			nextNode = doc.createTextNode("");
		}
		return nextNode;
	}

	/**
	 * returns the localName of the node
	 * @param {import("./render").HTMLNode} node
	 */
	function getNodeName(node) {
		if (!node) return;
		if (!node[NODE_TYPE]) {
			node[NODE_TYPE] = node.nodeName.toLowerCase();
		}
		let localName = node[NODE_TYPE];
		return localName == "#text" ? null : localName;
	}
	/**
	 * generates a flatmap of nodes
	 * @param {?Array} children
	 * @param {function} [map]
	 * @param {string[]} keyes
	 * @param {import("./vnode").Vnode[]} list
	 * @param {number} deep
	 * @returns {import("./vnode").Vnode[]}
	 */
	function toList(children, map, keyes, list, deep = 0) {
		keyes = keyes || [];
		list = list || [];

		if (isArray(children)) {
			let length = children.length;
			for (let i = 0; i < length; i++) {
				toList(children[i], map, keyes, list, deep + 1);
			}
		} else {
			if (children == null && !deep) return ARRAY_EMPTY;
			let vnode = map ? map(children, list.length) : toVnode(children);
			if (!map) {
				if (typeof vnode == "object") {
					if (vnode.key != null) {
						if (keyes.indexOf(vnode.key) == -1) {
							keyes.push(vnode.key);
							keyes.withKeyes = true;
						}
					}
				}
			}
			list.push(vnode);
		}
		return list;
	}

	/**
	 * @typedef {Object} ConfigRender
	 * @property {string} id - namespace to store the state of the virtual-dom
	 * @property {any} [bind] - Allows to bin events to a context this
	 * @property {boolean} [host] - Allows a component to manipulate the main container
	 **/

	/**
	 * @typedef {(HTMLElement|SVGElement|Text)} HTMLNode
	 **/

	/**
	 *
	 * @param {import("./vnode").Vnode} vnode
	 * @param {HTMLNode} parent
	 * @param {Object} [options]
	 **/
	function render(vnode, parent, options = OBJECT_EMPTY) {
		/**@type {ConfigRender}*/
		let config = {
			id: options.id || STATE,
			bind: options.bind,
			host: options.host
		};

		vnode = toVnode(vnode);

		if (!config.host && vnode.type != NODE_HOST) {
			vnode = createElement(NODE_HOST, {}, vnode);
		}

		diff(config, parent, vnode, OBJECT_EMPTY);
	}

	function useState(initialState) {
		let next = getCurrentComponent().next,
			type = 0x9f;
		let [state, dispatch] = useHook((state, action) => {
			switch (action.type) {
				case COMPONENT_CREATE:
					return typeof initialState == "function"
						? initialState()
						: initialState;
				case type:
					let nextState = action.state;
					return typeof nextState == "function" ? nextState(state) : nextState;
			}
			return state;
		});
		return [
			state,
			state => {
				dispatch({ state, type });
				next();
			}
		];
	}

	/**
	 * Applies JSON.parse to extract the real value of an attribute from a string.
	 * @param {string} value
	 * @returns {(boolean|string|number|Object|Array)}
	 **/
	function parse(value) {
		return JSON.parse(value);
	}

	class Element extends HTMLElement {
		constructor() {
			super();
			/**@type {Object<string,any>} */
			this.props = {};
			/**@type {Promise} */
			this.mounted = new Promise(resolve => (this.mount = resolve));
			/**@type {Promise} */
			this.unmounted = new Promise(resolve => (this.unmount = resolve));
		}
		connectedCallback() {
			this.mount();
		}
		disconnectedCallback() {
			this.unmount();
		}
		attributeChangedCallback(name, oldValue, value) {
			if (oldValue == value) return;
			this.setProperty(name, value);
		}
		static get observedAttributes() {
			let observables = this.observables || {},
				attributes = [],
				/**
				 * @param {string} - add the setter and getter to the constructor prototype
				 */
				proxy = name => {
					Object.defineProperty(this.prototype, name, {
						set(value) {
							this.setProperty(name, value);
						},
						get() {
							return this.props[name];
						}
					});
				};
			for (let key in observables) {
				let attr = key.replace(/([A-Z])/g, "-$1").toLowerCase();
				attributes.push(attr);
				if (!(name in this.prototype)) proxy(key);
			}
			return attributes;
		}
		/**
		 * validate to `value`, and then deliver it to the` update` method.
		 * @param {name} name
		 * @param {*} value
		 */
		setProperty(name, value) {
			name = name.replace(/-(\w)/g, (all, letter) => letter.toUpperCase());
			let { observables } = this.constructor,
				error,
				type = observables[name];
			try {
				if (typeof value == "string") {
					switch (type) {
						case Boolean:
							value = parse(value || "true") == true;
							break;
						case Number:
							value = Number(value);
							break;
						case Object:
						case Array:
							value = parse(value);
							break;
						case Function:
							value = window[value];
							break;
					}
				}
			} catch (e) {
				error = true;
			}
			if (!error && {}.toString.call(value) == `[object ${type.name}]`) {
				this.update({ [name]: value });
			} else {
				throw `the observable [${name}] must be of the type [${type.name}]`;
			}
		}
	}

	let ID = 0;

	class Element$1 extends Element {
		constructor() {
			super();
			/**@type {boolean} */
			let prevent;
			/**
			 * @namespace
			 * @property {string} id - identifier to store the state of the virtual-dom
			 * @property {HTMLElement} bind - allows bindear events defining as context the same customElement
			 * @property {boolean} host - allows to enable control over the main container, in this case the customElement
			 */
			let options = {
				id: "@wc." + ID++,
				bind: this,
				host: true
			};
			/**
			 * add support {@link https://developer.mozilla.org/es/docs/Web/API/CSSStyleSheet}
			 */
			let { styles } = this.constructor;
			this.render = this.render.bind(this);
			/**
			 * @param {Object<string,any>} - Properties to update the component
			 */
			this.update = props => {
				this.props = { ...this.props, ...props };
				if (!prevent) {
					prevent = true;
					this.mounted.then(() => {
						prevent = false;
						render(createElement(this.render, this.props), this, options);
						if (styles && this.shadowRoot) {
							this.shadowRoot.adoptedStyleSheets = styles;
							styles = null;
						}
					});
				}
			};

			this.unmounted.then(() => render("", this, options));

			this.update();
		}
	}
	/**
	 * @param {Function} component
	 * @example
	 * // define a functional component
	 * function MyWc(props){}
	 * // define the observables of the component
	 * MyWc.observables = {value:String}
	 * // when using the toClass function the functional component will be a class
	 * customElements.define("my-wc",createClass(MyWc));
	 */
	function createClass(component) {
		let CustomElement = class extends Element$1 {};
		CustomElement.prototype.render = component;
		CustomElement.observables = component.observables;
		CustomElement.styles = component.styles;
		return CustomElement;
	}
	/**
	 * register the component, be it a class or function
	 * @param {string} tagName
	 * @param {Function} component
	 * @return {Object} returns a jsx component
	 */
	function customElement(tagName, component) {
		customElements.define(
			tagName,
			component instanceof Element$1 ? component : createClass(component)
		);
		return props => createElement(tagName, props);
	}

	function styleInject(css, ref) {
	  if ( ref === void 0 ) ref = {};
	  var insertAt = ref.insertAt;

	  if (!css || typeof document === 'undefined') { return; }

	  var head = document.head || document.getElementsByTagName('head')[0];
	  var style = document.createElement('style');
	  style.type = 'text/css';

	  if (insertAt === 'top') {
	    if (head.firstChild) {
	      head.insertBefore(style, head.firstChild);
	    } else {
	      head.appendChild(style);
	    }
	  } else {
	    head.appendChild(style);
	  }

	  if (style.styleSheet) {
	    style.styleSheet.cssText = css;
	  } else {
	    style.appendChild(document.createTextNode(css));
	  }
	}

	var css = "input{background:rgba(0,0,0,.003);width:100%;font-size:24px;color:inherit;padding:6px;border:1px solid #ccc;box-shadow:inset 0 -1px 5px 0 rgba(0,0,0,.2);box-sizing:border-box}";
	styleInject(css);

	let incrementId = 3;
	/**
	 * Input component, shows the input that collects the texts for the creation of a task
	 * @param {object} props
	 * @param {function} props.handlerChange
	 * @param {string} props.placeholder
	 * @return {object}
	 */
	function Input(props) {
		return (
			createElement('host', { shadowDom: true,}
	, createElement('style', null, css)
	, createElement('form', {
					onSubmit: event => {
						event.preventDefault();
						if (props.handlerChange)
							props.handlerChange({
								text: event.target.input.value,
								id: incrementId++
							});
						event.target.reset();
					},}
				
	, createElement('input', { name: "input", type: "text", placeholder: props.placeholder,} )
	)
	)
		);
	}

	Input.observables = {
		handlerChange : Function,
		placeholder: String
	};

	var Input$1 = customElement("atomico-todo-input",Input);

	var css$1 = ":host{display:flex}input{text-align:center;border:none;-webkit-appearance:none;appearance:none;padding:.2rem .5rem;outline:none}input:after{content:url('data:image/svg+xml;utf8,<svg%20xmlns%3D\"http%3A//www.w3.org/2000/svg\"%20width%3D\"40\"%20height%3D\"40\"%20viewBox%3D\"-10%20-18%20100%20135\"><circle%20cx%3D\"50\"%20cy%3D\"50\"%20r%3D\"50\"%20fill%3D\"none\"%20stroke%3D\"%23ededed\"%20stroke-width%3D\"3\"/></svg>')}input:checked:after{content:url('data:image/svg+xml;utf8,<svg%20xmlns%3D\"http%3A//www.w3.org/2000/svg\"%20width%3D\"40\"%20height%3D\"40\"%20viewBox%3D\"-10%20-18%20100%20135\"><circle%20cx%3D\"50\"%20cy%3D\"50\"%20r%3D\"50\"%20fill%3D\"none\"%20stroke%3D\"%23bddad5\"%20stroke-width%3D\"3\"/><path%20fill%3D\"%235dc2af\"%20d%3D\"M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z\"/></svg>')}input:checked~.text{color:#d9d9d9;text-decoration:line-through}.group{display:flex;align-items:center}.text{flex:0%;padding:1rem;font-size:24px;text-align:left}button{color:#cc9a9a;background:none;border:0;font-size:30px;margin-right:1rem}";
	styleInject(css$1);

	/**
	 * Component article, shows the task and allows you to mark how the
	 * elimination(props.handlerRemove) of this has been done(props.handlerToggle) or eliminated
	 * @param {object} props
	 * @param {integer|string} props.key
	 * @param {function} props.handlerToggle
	 * @param {boolean} props.checked
	 * @param {string} props.text
	 * @param {function} props.handlerRemove
	 * @return {object}
	 */
	function Item(props) {
		return (
			createElement('host', { shadowDom: true, key: props.key,}
	, createElement('style', null, css$1)
	, createElement('input', {
					type: "checkbox",
					onChange: props.handlerToggle,
					checked: props.checked,}
				)
	, createElement('div', { class: "text",}, props.text)
	, createElement('button', { onClick: props.handlerRemove,}, "x")
	)
		);
	}

	Item.observables = {
		handlerToggle : Function,
		handlerRemove : Function,
		checked : Boolean,
		text : String,
	};

	var Item$1 = customElement("atomico-todo-item",Item);

	var css$2 = ":host{display:block;box-shadow:0 2px 4px 0 rgba(0,0,0,.2),0 25px 50px 0 rgba(0,0,0,.1);background:#fff}";
	styleInject(css$2);

	function Todo(){
		let [state, setState] = useState(() => [
			{ text: "my initial todo", checked: false, id: 1 },
			{ text: "Learn about Web Components", checked: true, id: 2 }
		]);
		return (
			createElement('host', { shadowDom: true,}
	, createElement('style', null, css$2)
	, createElement(Input$1, {
					placeholder: "What needs to be done?"    ,
					handlerChange: task => {
						setState(state.concat(task));
					},}
				)
	, createElement('div', null
	, state.map(({ text, checked, id }, localIndex) => (
						createElement(Item$1, {
							key: id,
							text: text,
							checked: checked==true,
							handlerRemove: () => {
								setState(state.filter((data, index) => index !== localIndex));
							},
							handlerToggle: () => {
								setState(
									state.map((data, index) =>
										index === localIndex
											? {
													...data,
													checked: !data.checked
												}
											: data
									)
								);
							},}
						)
					))
	)
	)
		);
	}

	customElement("atomico-todo",Todo);

}));
//# sourceMappingURL=atomico.umd.js.map
