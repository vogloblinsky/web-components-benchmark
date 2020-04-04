// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/@skatejs/define/dist/esm/index.js":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ctorToNameMap = new WeakMap();
function dashcase(str) {
    return str.split(/([_A-Z])/).reduce(function (one, two, idx) {
        var dash = !one || idx % 2 === 0 ? '' : '-';
        two = two === '_' ? '' : two;
        return "" + one + dash + two.toLowerCase();
    });
}
function format(prefix, suffix) {
    return ((prefix.indexOf('-') === -1 ? "x-" + prefix : prefix) +
        (suffix ? "-" + suffix : ''));
}
function default_1(ctor) {
    var currentName = getName(ctor);
    if (!currentName) {
        ctorToNameMap.set(ctor, (currentName = generateName(ctor.name)));
    }
    if (!customElements.get(currentName)) {
        customElements.define(currentName, ctor);
    }
    return ctor;
}
exports.default = default_1;
function getName(ctor) {
    return ctor.is || ctorToNameMap.get(ctor);
}
exports.getName = getName;
function generateName(prefix) {
    prefix = dashcase(prefix || 'element');
    var suffix = 0;
    while (customElements.get(format(prefix, suffix)))
        ++suffix;
    return format(prefix, suffix);
}
exports.generateName = generateName;

},{}],"../node_modules/@skatejs/element-preact/node_modules/@skatejs/element/dist/esm/props.js":[function(require,module,exports) {
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var any = {
    default: function (elem, name, oldValue) { return null; },
    defined: function (ctor, name) { },
    deserialize: function (elem, name, oldValue, newValue) { return newValue; },
    get: function (elem, name, oldValue) { return oldValue; },
    serialize: function (elem, name, oldValue, newValue) { return newValue; },
    set: function (elem, name, oldValue, newValue) { return newValue; },
    source: function (propName) { return propName.toLowerCase(); },
    target: function (propName) { }
};
var array = __assign({}, any, { default: function () { return []; }, deserialize: function (elem, name, oldValue, newValue) { return JSON.parse(newValue); }, serialize: function (elem, name, oldValue, newValue) { return JSON.stringify(newValue); } });
var boolean = __assign({}, any, { deserialize: function (elem, name, oldValue, newValue) { return newValue != null; }, serialize: function (elem, name, oldValue, newValue) { return (newValue ? '' : null); } });
var event = __assign({}, any, { 
    // Takes an event handler and returns a function that is invoked with event
    // detail to trigger the corresponding event with.
    set: function (elem, name, oldValue, newValue) {
        // TODO see if we can deserialize to a standard onclick prop so that we
        // can support in-attribute handlers.
        var eventName = this.getEventName(name);
        if (oldValue) {
            elem.removeEventListener(eventName, oldValue);
        }
        if (newValue) {
            elem.addEventListener(eventName, newValue);
        }
        return function (detail) { return elem.dispatchEvent(new CustomEvent(eventName, { detail: detail })); };
    },
    // Standardizes custom event names:
    //
    // - Rremove "on" prefix.
    // - Event name becomes all lowercase.
    //
    // e.g. onCustomEvent -> customevent
    getEventName: function (name) {
        return name.substring(2).toLowerCase();
    } });
var number = __assign({}, any, { default: function () { return 0; }, deserialize: function (elem, name, oldValue, newValue) {
        return newValue == null ? 0 : Number(newValue);
    }, serialize: function (elem, name, oldValue, newValue) {
        return newValue == null ? null : String(Number(newValue));
    } });
var object = __assign({}, array, { default: function () { return ({}); } });
var string = __assign({}, any, { default: function () { return ''; }, deserialize: function (elem, name, oldValue, newValue) { return newValue; }, serialize: function (elem, name, oldValue, newValue) {
        return newValue == null ? null : String(newValue);
    } });
exports.props = {
    any: any,
    array: array,
    boolean: boolean,
    event: event,
    number: number,
    object: object,
    string: string
};

},{}],"../node_modules/@skatejs/element-preact/node_modules/@skatejs/element/dist/esm/component.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var props_1 = require("./props");
// @ts-ignore
var mapAttrsToProps = new Map();
// @ts-ignore
var mapPropsToTypes = new Map();
// @ts-ignore
var mapNativeToPropType = new Map();
mapNativeToPropType.set(Array, props_1.props.array);
mapNativeToPropType.set(Boolean, props_1.props.boolean);
mapNativeToPropType.set(Event, props_1.props.event);
mapNativeToPropType.set(Number, props_1.props.number);
mapNativeToPropType.set(Object, props_1.props.object);
mapNativeToPropType.set(String, props_1.props.string);
function defineProp(ctor, propName, propType) {
    var source = propType.source, target = propType.target;
    mapAttrsToProps.get(ctor)[source] = propName;
    mapPropsToTypes.get(ctor)[propName] = propType;
    Object.defineProperty(ctor.prototype, propName, {
        configurable: true,
        get: function () {
            var oldValue = this._props[propName];
            var newValue = propType.get(this, propName, oldValue);
            return newValue == null
                ? propType.default(this, propName, oldValue)
                : newValue;
        },
        set: function (newPropValue) {
            var _this = this;
            var oldPropValue = this._props[propName];
            this._propsChanged[propName] = oldPropValue;
            this._props[propName] = propType.set(this, propName, oldPropValue, newPropValue);
            if (target) {
                // We must delay attribute sets because property sets that are
                // initialized in the constructor result in attributes being set
                // and if an attribute is set in the constructor, the DOM throws.
                delay(function () {
                    var attrValue = propType.serialize(_this, propName, oldPropValue, newPropValue);
                    if (attrValue == null) {
                        _this.removeAttribute(target);
                    }
                    else {
                        _this.setAttribute(target, attrValue);
                    }
                });
            }
            this.forceUpdate();
        }
    });
    propType.defined(ctor, propName);
}
function defineProps(ctor, props) {
    mapAttrsToProps.set(ctor, {});
    mapPropsToTypes.set(ctor, {});
    props.forEach(function (_a) {
        var propName = _a.propName, propType = _a.propType;
        return defineProp(ctor, propName, propType);
    });
}
function delay(fn) {
    if (typeof global.Promise === 'function') {
        // @ts-ignore - Promise.resove() indeed does exist.
        global.Promise.resolve().then(fn);
    }
    else {
        setTimeout(fn);
    }
}
function deriveAttrsFromProps(props) {
    return props.map(function (_a) {
        var propType = _a.propType;
        return propType.source;
    });
}
function ensureFunction(type) {
    return typeof type === 'function' ? type : function () { return type; };
}
function normalizePropTypes(propTypes) {
    return Object.keys(propTypes).map(function (propName) {
        var propType = mapNativeToPropType.get(propTypes[propName]) ||
            propTypes[propName] ||
            props_1.props.any;
        return {
            propName: propName,
            propType: __assign({}, propType, { default: ensureFunction(propType.default), defined: ensureFunction(propType.defined), deserialize: ensureFunction(propType.deserialize), get: ensureFunction(propType.get), serialize: ensureFunction(propType.serialize), set: ensureFunction(propType.set), source: ensureFunction(propType.source)(propName), target: ensureFunction(propType.target)(propName) })
        };
    });
}
function observeChildren(elem) {
    var hasChildrenChanged = elem.childrenChanged;
    var hasChildrenPropType = elem.constructor.props.children;
    if (hasChildrenChanged || hasChildrenPropType) {
        var mo = new MutationObserver(function () {
            if (hasChildrenChanged) {
                elem.childrenChanged();
            }
            if (hasChildrenPropType) {
                elem.forceUpdate();
            }
        });
        // We only need to observe direct children since we only care about light
        // DOM.
        mo.observe(elem, { childList: true });
        // We wait for DOMContentLoaded to ensure the childList is complete. We
        // also don't need to forceUpdate here as that will happen anyways.
        if (hasChildrenChanged) {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', function () {
                    elem.childrenChanged();
                });
            }
            else {
                elem.childrenChanged();
            }
        }
    }
}
function withProps(Base) {
    if (Base === void 0) { Base = HTMLElement; }
    defineProps(Base, normalizePropTypes(Base.props));
}
exports.withProps = withProps;
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    function Component() {
        var _this = _super.call(this) || this;
        // The current props values.
        _this._props = {};
        // The current props values that have changed since the last update.
        _this._propsChanged = {};
        // Whether or not an update is currently being handled.
        _this._isUpdating = false;
        if (!_this.shadowRoot) {
            var shadowRootOptions = _this.constructor.shadowRootOptions;
            _this.renderRoot = shadowRootOptions
                ? _this.attachShadow(shadowRootOptions)
                : _this;
        }
        return _this;
    }
    Object.defineProperty(Component, "observedAttributes", {
        get: function () {
            var normalized = normalizePropTypes(this.props);
            defineProps(this, normalized);
            return deriveAttrsFromProps(normalized);
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.attributeChangedCallback = function (attrName, oldValue, newValue) {
        var constructor = this.constructor;
        var propName = mapAttrsToProps.get(constructor)[attrName];
        if (propName) {
            this._props[propName] = mapPropsToTypes
                .get(constructor)[propName].deserialize(this, attrName, oldValue, newValue);
            this.forceUpdate();
        }
    };
    Component.prototype.connectedCallback = function () {
        // We observe updates when connected because there's no point in
        // observing if it's not connected yet.
        observeChildren(this);
        // This does the initial render. This is necessary as props wouldn't be
        // triggering a render yet.
        this.forceUpdate();
    };
    Component.prototype.disconnectedCallback = function () { };
    Component.prototype.forceUpdate = function () {
        var _this = this;
        // We don't need to render when:
        //
        // - We're already updating.
        // - We're not connected.
        if (this._isUpdating || !this.parentNode) {
            return;
        }
        // This flag prevents infinite loops if another update is triggered while
        // performing the current update.
        this._isUpdating = true;
        // We execute the update process at the end of the current microtask so
        // we can debounce any subsequent updates using the _propsUpdating flag.
        delay(function () {
            _this.updated(_this._propsChanged);
            if (_this.shouldUpdateRender(_this._propsChanged)) {
                _this.renderer();
                _this.rendered(_this._propsChanged);
            }
            _this._propsChanged = {};
            _this._isUpdating = false;
        });
    };
    Component.prototype.render = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return '';
    };
    Component.prototype.rendered = function (props) { };
    Component.prototype.renderer = function () {
        this.renderRoot.innerHTML = this.render();
    };
    Component.prototype.shouldUpdateRender = function (props) {
        return true;
    };
    Component.prototype.updated = function (props) { };
    // Props / attributes the component should observe.
    Component.props = {};
    // Options when automatically creating the shadow root. This can be set to
    // a falsy value to prevent shadow root creation.
    Component.shadowRootOptions = { mode: 'open' };
    return Component;
}(HTMLElement));
exports.default = Component;

},{"./props":"../node_modules/@skatejs/element-preact/node_modules/@skatejs/element/dist/esm/props.js"}],"../node_modules/@skatejs/element-preact/node_modules/@skatejs/element/dist/esm/index.js":[function(require,module,exports) {
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var component_1 = require("./component");
exports.default = component_1.default;
__export(require("./props"));

},{"./component":"../node_modules/@skatejs/element-preact/node_modules/@skatejs/element/dist/esm/component.js","./props":"../node_modules/@skatejs/element-preact/node_modules/@skatejs/element/dist/esm/props.js"}],"../node_modules/preact/dist/preact.umd.js":[function(require,module,exports) {
var define;
var global = arguments[3];
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.preact = {})));
}(this, (function (exports) { 'use strict';

	var VNode = function VNode() {};

	var options = {};

	var stack = [];

	var EMPTY_CHILDREN = [];

	function h(nodeName, attributes) {
		var children = EMPTY_CHILDREN,
		    lastSimple = void 0,
		    child = void 0,
		    simple = void 0,
		    i = void 0;
		for (i = arguments.length; i-- > 2;) {
			stack.push(arguments[i]);
		}
		if (attributes && attributes.children != null) {
			if (!stack.length) stack.push(attributes.children);
			delete attributes.children;
		}
		while (stack.length) {
			if ((child = stack.pop()) && child.pop !== undefined) {
				for (i = child.length; i--;) {
					stack.push(child[i]);
				}
			} else {
				if (typeof child === 'boolean') child = null;

				if (simple = typeof nodeName !== 'function') {
					if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
				}

				if (simple && lastSimple) {
					children[children.length - 1] += child;
				} else if (children === EMPTY_CHILDREN) {
					children = [child];
				} else {
					children.push(child);
				}

				lastSimple = simple;
			}
		}

		var p = new VNode();
		p.nodeName = nodeName;
		p.children = children;
		p.attributes = attributes == null ? undefined : attributes;
		p.key = attributes == null ? undefined : attributes.key;

		if (options.vnode !== undefined) options.vnode(p);

		return p;
	}

	function extend(obj, props) {
	  for (var i in props) {
	    obj[i] = props[i];
	  }return obj;
	}

	function applyRef(ref, value) {
	  if (ref) {
	    if (typeof ref == 'function') ref(value);else ref.current = value;
	  }
	}

	var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

	function cloneElement(vnode, props) {
	  return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
	}

	var NO_RENDER = 0;

	var SYNC_RENDER = 1;

	var FORCE_RENDER = 2;

	var ASYNC_RENDER = 3;

	var ATTR_KEY = '__preactattr_';

	var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

	var items = [];

	function enqueueRender(component) {
		if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
			(options.debounceRendering || defer)(rerender);
		}
	}

	function rerender() {
		var p = void 0;
		while (p = items.pop()) {
			if (p._dirty) renderComponent(p);
		}
	}

	function isSameNodeType(node, vnode, hydrating) {
		if (typeof vnode === 'string' || typeof vnode === 'number') {
			return node.splitText !== undefined;
		}
		if (typeof vnode.nodeName === 'string') {
			return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
		}
		return hydrating || node._componentConstructor === vnode.nodeName;
	}

	function isNamedNode(node, nodeName) {
		return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
	}

	function getNodeProps(vnode) {
		var props = extend({}, vnode.attributes);
		props.children = vnode.children;

		var defaultProps = vnode.nodeName.defaultProps;
		if (defaultProps !== undefined) {
			for (var i in defaultProps) {
				if (props[i] === undefined) {
					props[i] = defaultProps[i];
				}
			}
		}

		return props;
	}

	function createNode(nodeName, isSvg) {
		var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
		node.normalizedNodeName = nodeName;
		return node;
	}

	function removeNode(node) {
		var parentNode = node.parentNode;
		if (parentNode) parentNode.removeChild(node);
	}

	function setAccessor(node, name, old, value, isSvg) {
		if (name === 'className') name = 'class';

		if (name === 'key') {} else if (name === 'ref') {
			applyRef(old, null);
			applyRef(value, node);
		} else if (name === 'class' && !isSvg) {
			node.className = value || '';
		} else if (name === 'style') {
			if (!value || typeof value === 'string' || typeof old === 'string') {
				node.style.cssText = value || '';
			}
			if (value && typeof value === 'object') {
				if (typeof old !== 'string') {
					for (var i in old) {
						if (!(i in value)) node.style[i] = '';
					}
				}
				for (var _i in value) {
					node.style[_i] = typeof value[_i] === 'number' && IS_NON_DIMENSIONAL.test(_i) === false ? value[_i] + 'px' : value[_i];
				}
			}
		} else if (name === 'dangerouslySetInnerHTML') {
			if (value) node.innerHTML = value.__html || '';
		} else if (name[0] == 'o' && name[1] == 'n') {
			var useCapture = name !== (name = name.replace(/Capture$/, ''));
			name = name.toLowerCase().substring(2);
			if (value) {
				if (!old) node.addEventListener(name, eventProxy, useCapture);
			} else {
				node.removeEventListener(name, eventProxy, useCapture);
			}
			(node._listeners || (node._listeners = {}))[name] = value;
		} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
			try {
				node[name] = value == null ? '' : value;
			} catch (e) {}
			if ((value == null || value === false) && name != 'spellcheck') node.removeAttribute(name);
		} else {
			var ns = isSvg && name !== (name = name.replace(/^xlink:?/, ''));

			if (value == null || value === false) {
				if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
			} else if (typeof value !== 'function') {
				if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
			}
		}
	}

	function eventProxy(e) {
		return this._listeners[e.type](options.event && options.event(e) || e);
	}

	var mounts = [];

	var diffLevel = 0;

	var isSvgMode = false;

	var hydrating = false;

	function flushMounts() {
		var c = void 0;
		while (c = mounts.shift()) {
			if (options.afterMount) options.afterMount(c);
			if (c.componentDidMount) c.componentDidMount();
		}
	}

	function diff(dom, vnode, context, mountAll, parent, componentRoot) {
		if (!diffLevel++) {
			isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

			hydrating = dom != null && !(ATTR_KEY in dom);
		}

		var ret = idiff(dom, vnode, context, mountAll, componentRoot);

		if (parent && ret.parentNode !== parent) parent.appendChild(ret);

		if (! --diffLevel) {
			hydrating = false;

			if (!componentRoot) flushMounts();
		}

		return ret;
	}

	function idiff(dom, vnode, context, mountAll, componentRoot) {
		var out = dom,
		    prevSvgMode = isSvgMode;

		if (vnode == null || typeof vnode === 'boolean') vnode = '';

		if (typeof vnode === 'string' || typeof vnode === 'number') {
			if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
				if (dom.nodeValue != vnode) {
					dom.nodeValue = vnode;
				}
			} else {
				out = document.createTextNode(vnode);
				if (dom) {
					if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
					recollectNodeTree(dom, true);
				}
			}

			out[ATTR_KEY] = true;

			return out;
		}

		var vnodeName = vnode.nodeName;
		if (typeof vnodeName === 'function') {
			return buildComponentFromVNode(dom, vnode, context, mountAll);
		}

		isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

		vnodeName = String(vnodeName);
		if (!dom || !isNamedNode(dom, vnodeName)) {
			out = createNode(vnodeName, isSvgMode);

			if (dom) {
				while (dom.firstChild) {
					out.appendChild(dom.firstChild);
				}
				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

				recollectNodeTree(dom, true);
			}
		}

		var fc = out.firstChild,
		    props = out[ATTR_KEY],
		    vchildren = vnode.children;

		if (props == null) {
			props = out[ATTR_KEY] = {};
			for (var a = out.attributes, i = a.length; i--;) {
				props[a[i].name] = a[i].value;
			}
		}

		if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
			if (fc.nodeValue != vchildren[0]) {
				fc.nodeValue = vchildren[0];
			}
		} else if (vchildren && vchildren.length || fc != null) {
				innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
			}

		diffAttributes(out, vnode.attributes, props);

		isSvgMode = prevSvgMode;

		return out;
	}

	function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
		var originalChildren = dom.childNodes,
		    children = [],
		    keyed = {},
		    keyedLen = 0,
		    min = 0,
		    len = originalChildren.length,
		    childrenLen = 0,
		    vlen = vchildren ? vchildren.length : 0,
		    j = void 0,
		    c = void 0,
		    f = void 0,
		    vchild = void 0,
		    child = void 0;

		if (len !== 0) {
			for (var i = 0; i < len; i++) {
				var _child = originalChildren[i],
				    props = _child[ATTR_KEY],
				    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
				if (key != null) {
					keyedLen++;
					keyed[key] = _child;
				} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
					children[childrenLen++] = _child;
				}
			}
		}

		if (vlen !== 0) {
			for (var _i = 0; _i < vlen; _i++) {
				vchild = vchildren[_i];
				child = null;

				var _key = vchild.key;
				if (_key != null) {
					if (keyedLen && keyed[_key] !== undefined) {
						child = keyed[_key];
						keyed[_key] = undefined;
						keyedLen--;
					}
				} else if (min < childrenLen) {
						for (j = min; j < childrenLen; j++) {
							if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
								child = c;
								children[j] = undefined;
								if (j === childrenLen - 1) childrenLen--;
								if (j === min) min++;
								break;
							}
						}
					}

				child = idiff(child, vchild, context, mountAll);

				f = originalChildren[_i];
				if (child && child !== dom && child !== f) {
					if (f == null) {
						dom.appendChild(child);
					} else if (child === f.nextSibling) {
						removeNode(f);
					} else {
						dom.insertBefore(child, f);
					}
				}
			}
		}

		if (keyedLen) {
			for (var _i2 in keyed) {
				if (keyed[_i2] !== undefined) recollectNodeTree(keyed[_i2], false);
			}
		}

		while (min <= childrenLen) {
			if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
		}
	}

	function recollectNodeTree(node, unmountOnly) {
		var component = node._component;
		if (component) {
			unmountComponent(component);
		} else {
			if (node[ATTR_KEY] != null) applyRef(node[ATTR_KEY].ref, null);

			if (unmountOnly === false || node[ATTR_KEY] == null) {
				removeNode(node);
			}

			removeChildren(node);
		}
	}

	function removeChildren(node) {
		node = node.lastChild;
		while (node) {
			var next = node.previousSibling;
			recollectNodeTree(node, true);
			node = next;
		}
	}

	function diffAttributes(dom, attrs, old) {
		var name = void 0;

		for (name in old) {
			if (!(attrs && attrs[name] != null) && old[name] != null) {
				setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
			}
		}

		for (name in attrs) {
			if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
				setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
			}
		}
	}

	var recyclerComponents = [];

	function createComponent(Ctor, props, context) {
		var inst = void 0,
		    i = recyclerComponents.length;

		if (Ctor.prototype && Ctor.prototype.render) {
			inst = new Ctor(props, context);
			Component.call(inst, props, context);
		} else {
			inst = new Component(props, context);
			inst.constructor = Ctor;
			inst.render = doRender;
		}

		while (i--) {
			if (recyclerComponents[i].constructor === Ctor) {
				inst.nextBase = recyclerComponents[i].nextBase;
				recyclerComponents.splice(i, 1);
				return inst;
			}
		}

		return inst;
	}

	function doRender(props, state, context) {
		return this.constructor(props, context);
	}

	function setComponentProps(component, props, renderMode, context, mountAll) {
		if (component._disable) return;
		component._disable = true;

		component.__ref = props.ref;
		component.__key = props.key;
		delete props.ref;
		delete props.key;

		if (typeof component.constructor.getDerivedStateFromProps === 'undefined') {
			if (!component.base || mountAll) {
				if (component.componentWillMount) component.componentWillMount();
			} else if (component.componentWillReceiveProps) {
				component.componentWillReceiveProps(props, context);
			}
		}

		if (context && context !== component.context) {
			if (!component.prevContext) component.prevContext = component.context;
			component.context = context;
		}

		if (!component.prevProps) component.prevProps = component.props;
		component.props = props;

		component._disable = false;

		if (renderMode !== NO_RENDER) {
			if (renderMode === SYNC_RENDER || options.syncComponentUpdates !== false || !component.base) {
				renderComponent(component, SYNC_RENDER, mountAll);
			} else {
				enqueueRender(component);
			}
		}

		applyRef(component.__ref, component);
	}

	function renderComponent(component, renderMode, mountAll, isChild) {
		if (component._disable) return;

		var props = component.props,
		    state = component.state,
		    context = component.context,
		    previousProps = component.prevProps || props,
		    previousState = component.prevState || state,
		    previousContext = component.prevContext || context,
		    isUpdate = component.base,
		    nextBase = component.nextBase,
		    initialBase = isUpdate || nextBase,
		    initialChildComponent = component._component,
		    skip = false,
		    snapshot = previousContext,
		    rendered = void 0,
		    inst = void 0,
		    cbase = void 0;

		if (component.constructor.getDerivedStateFromProps) {
			state = extend(extend({}, state), component.constructor.getDerivedStateFromProps(props, state));
			component.state = state;
		}

		if (isUpdate) {
			component.props = previousProps;
			component.state = previousState;
			component.context = previousContext;
			if (renderMode !== FORCE_RENDER && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
				skip = true;
			} else if (component.componentWillUpdate) {
				component.componentWillUpdate(props, state, context);
			}
			component.props = props;
			component.state = state;
			component.context = context;
		}

		component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
		component._dirty = false;

		if (!skip) {
			rendered = component.render(props, state, context);

			if (component.getChildContext) {
				context = extend(extend({}, context), component.getChildContext());
			}

			if (isUpdate && component.getSnapshotBeforeUpdate) {
				snapshot = component.getSnapshotBeforeUpdate(previousProps, previousState);
			}

			var childComponent = rendered && rendered.nodeName,
			    toUnmount = void 0,
			    base = void 0;

			if (typeof childComponent === 'function') {

				var childProps = getNodeProps(rendered);
				inst = initialChildComponent;

				if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
					setComponentProps(inst, childProps, SYNC_RENDER, context, false);
				} else {
					toUnmount = inst;

					component._component = inst = createComponent(childComponent, childProps, context);
					inst.nextBase = inst.nextBase || nextBase;
					inst._parentComponent = component;
					setComponentProps(inst, childProps, NO_RENDER, context, false);
					renderComponent(inst, SYNC_RENDER, mountAll, true);
				}

				base = inst.base;
			} else {
				cbase = initialBase;

				toUnmount = initialChildComponent;
				if (toUnmount) {
					cbase = component._component = null;
				}

				if (initialBase || renderMode === SYNC_RENDER) {
					if (cbase) cbase._component = null;
					base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
				}
			}

			if (initialBase && base !== initialBase && inst !== initialChildComponent) {
				var baseParent = initialBase.parentNode;
				if (baseParent && base !== baseParent) {
					baseParent.replaceChild(base, initialBase);

					if (!toUnmount) {
						initialBase._component = null;
						recollectNodeTree(initialBase, false);
					}
				}
			}

			if (toUnmount) {
				unmountComponent(toUnmount);
			}

			component.base = base;
			if (base && !isChild) {
				var componentRef = component,
				    t = component;
				while (t = t._parentComponent) {
					(componentRef = t).base = base;
				}
				base._component = componentRef;
				base._componentConstructor = componentRef.constructor;
			}
		}

		if (!isUpdate || mountAll) {
			mounts.push(component);
		} else if (!skip) {

			if (component.componentDidUpdate) {
				component.componentDidUpdate(previousProps, previousState, snapshot);
			}
			if (options.afterUpdate) options.afterUpdate(component);
		}

		while (component._renderCallbacks.length) {
			component._renderCallbacks.pop().call(component);
		}if (!diffLevel && !isChild) flushMounts();
	}

	function buildComponentFromVNode(dom, vnode, context, mountAll) {
		var c = dom && dom._component,
		    originalComponent = c,
		    oldDom = dom,
		    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
		    isOwner = isDirectOwner,
		    props = getNodeProps(vnode);
		while (c && !isOwner && (c = c._parentComponent)) {
			isOwner = c.constructor === vnode.nodeName;
		}

		if (c && isOwner && (!mountAll || c._component)) {
			setComponentProps(c, props, ASYNC_RENDER, context, mountAll);
			dom = c.base;
		} else {
			if (originalComponent && !isDirectOwner) {
				unmountComponent(originalComponent);
				dom = oldDom = null;
			}

			c = createComponent(vnode.nodeName, props, context);
			if (dom && !c.nextBase) {
				c.nextBase = dom;

				oldDom = null;
			}
			setComponentProps(c, props, SYNC_RENDER, context, mountAll);
			dom = c.base;

			if (oldDom && dom !== oldDom) {
				oldDom._component = null;
				recollectNodeTree(oldDom, false);
			}
		}

		return dom;
	}

	function unmountComponent(component) {
		if (options.beforeUnmount) options.beforeUnmount(component);

		var base = component.base;

		component._disable = true;

		if (component.componentWillUnmount) component.componentWillUnmount();

		component.base = null;

		var inner = component._component;
		if (inner) {
			unmountComponent(inner);
		} else if (base) {
			if (base[ATTR_KEY] != null) applyRef(base[ATTR_KEY].ref, null);

			component.nextBase = base;

			removeNode(base);
			recyclerComponents.push(component);

			removeChildren(base);
		}

		applyRef(component.__ref, null);
	}

	function Component(props, context) {
		this._dirty = true;

		this.context = context;

		this.props = props;

		this.state = this.state || {};

		this._renderCallbacks = [];
	}

	extend(Component.prototype, {
		setState: function setState(state, callback) {
			if (!this.prevState) this.prevState = this.state;
			this.state = extend(extend({}, this.state), typeof state === 'function' ? state(this.state, this.props) : state);
			if (callback) this._renderCallbacks.push(callback);
			enqueueRender(this);
		},
		forceUpdate: function forceUpdate(callback) {
			if (callback) this._renderCallbacks.push(callback);
			renderComponent(this, FORCE_RENDER);
		},
		render: function render() {}
	});

	function render(vnode, parent, merge) {
	  return diff(merge, vnode, {}, false, parent, false);
	}

	function createRef() {
		return {};
	}

	var preact = {
		h: h,
		createElement: h,
		cloneElement: cloneElement,
		createRef: createRef,
		Component: Component,
		render: render,
		rerender: rerender,
		options: options
	};

	exports.default = preact;
	exports.h = h;
	exports.createElement = h;
	exports.cloneElement = cloneElement;
	exports.createRef = createRef;
	exports.Component = Component;
	exports.render = render;
	exports.rerender = rerender;
	exports.options = options;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=preact.umd.js.map

},{}],"../node_modules/@skatejs/element-preact/dist/esm/index.js":[function(require,module,exports) {
"use strict";
/** @jsx h */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var define_1 = require("@skatejs/define");
var element_1 = require("@skatejs/element");
var preact_1 = require("preact");
var mapDom = new WeakMap();
var default_1 = /** @class */ (function (_super) {
    __extends(default_1, _super);
    function default_1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    default_1.prototype.disconnectedCallback = function () {
        if (_super.prototype.disconnectedCallback) {
            _super.prototype.disconnectedCallback.call(this);
        }
        preact_1.render(null, this.renderRoot, mapDom.get(this));
    };
    default_1.prototype.renderer = function () {
        var dom = mapDom.get(this);
        mapDom.set(this, preact_1.render(this.render(), this.renderRoot, dom));
    };
    return default_1;
}(element_1.default));
exports.default = default_1;
function h(name, props) {
    var chren = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        chren[_i - 2] = arguments[_i];
    }
    if (name.prototype instanceof HTMLElement) {
        define_1.default(name);
        name = define_1.getName(name);
    }
    return preact_1.h.apply(void 0, [name, props].concat(chren));
}
exports.h = h;

},{"@skatejs/define":"../node_modules/@skatejs/define/dist/esm/index.js","@skatejs/element":"../node_modules/@skatejs/element-preact/node_modules/@skatejs/element/dist/esm/index.js","preact":"../node_modules/preact/dist/preact.umd.js"}],"../node_modules/htm/dist/htm.module.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var n = function (t, r, u, e) {
  for (var p = 1; p < r.length; p++) {
    var s = r[p],
        h = "number" == typeof s ? u[s] : s,
        a = r[++p];
    1 === a ? e[0] = h : 3 === a ? e[1] = Object.assign(e[1] || {}, h) : 5 === a ? (e[1] = e[1] || {})[r[++p]] = h : 6 === a ? e[1][r[++p]] += h + "" : e.push(a ? t.apply(null, n(t, h, u, ["", null])) : h);
  }

  return e;
},
    t = function (n) {
  for (var t, r, u = 1, e = "", p = "", s = [0], h = function (n) {
    1 === u && (n || (e = e.replace(/^\s*\n\s*|\s*\n\s*$/g, ""))) ? s.push(n || e, 0) : 3 === u && (n || e) ? (s.push(n || e, 1), u = 2) : 2 === u && "..." === e && n ? s.push(n, 3) : 2 === u && e && !n ? s.push(!0, 5, e) : u >= 5 && ((e || !n && 5 === u) && (s.push(e, u, r), u = 6), n && (s.push(n, u, r), u = 6)), e = "";
  }, a = 0; a < n.length; a++) {
    a && (1 === u && h(), h(a));

    for (var f = 0; f < n[a].length; f++) t = n[a][f], 1 === u ? "<" === t ? (h(), s = [s], u = 3) : e += t : 4 === u ? "--" === e && ">" === t ? (u = 1, e = "") : e = t + e[0] : p ? t === p ? p = "" : e += t : '"' === t || "'" === t ? p = t : ">" === t ? (h(), u = 1) : u && ("=" === t ? (u = 5, r = e, e = "") : "/" === t && (u < 5 || ">" === n[a][f + 1]) ? (h(), 3 === u && (s = s[0]), u = s, (s = s[0]).push(u, 2), u = 0) : " " === t || "\t" === t || "\n" === t || "\r" === t ? (h(), u = 2) : e += t), 3 === u && "!--" === e && (u = 4, s = s[0]);
  }

  return h(), s;
},
    r = "function" == typeof Map,
    u = r ? new Map() : {},
    e = r ? function (n) {
  var r = u.get(n);
  return r || u.set(n, r = t(n)), r;
} : function (n) {
  for (var r = "", e = 0; e < n.length; e++) r += n[e].length + "-" + n[e];

  return u[r] || (u[r] = t(n));
};

function _default(t) {
  var r = n(this, e(t), arguments, []);
  return r.length > 1 ? r : r[0];
}
},{}],"_.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.html = void 0;

var _elementPreact = require("@skatejs/element-preact");

var _htm = _interopRequireDefault(require("htm"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var html = _htm.default.bind(_elementPreact.h);

exports.html = html;
},{"@skatejs/element-preact":"../node_modules/@skatejs/element-preact/dist/esm/index.js","htm":"../node_modules/htm/dist/htm.module.js"}],"app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.App = void 0;

var _elementPreact = _interopRequireWildcard(require("@skatejs/element-preact"));

var _ = require("./_");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n            <div>\n                <style>\n                    :host {\n                        display: block;\n                    }\n\n                    h1 {\n                        font-size: 60px;\n                        font-weight: 100;\n                        text-align: center;\n                        color: rgba(175, 47, 47, 0.15);\n                    }\n\n                    section {\n                        background: #fff;\n                        margin: 130px 0 40px 0;\n                        position: relative;\n                        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),\n                            0 25px 50px 0 rgba(0, 0, 0, 0.1);\n                    }\n\n                    #list-container {\n                        margin: 0;\n                        padding: 0;\n                        list-style: none;\n                        border-top: 1px solid #e6e6e6;\n                    }\n                </style>\n                <h1>SkateJS & Preact</h1>\n                <section>\n                    <todo-input onSubmit=\"", "\"></todo-input>\n                    <ul id=\"list-container\">\n                        ", "\n                    </ul>\n                </section>\n            </div>\n        "]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["<todo-item checked=\"", "\"\n                    index=\"", "\"\n                    onCheck=\"", "\"\n                    onRemove=\"", "\">", "</todo-item>"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var App =
/*#__PURE__*/
function (_Element) {
  _inherits(App, _Element);

  _createClass(App, null, [{
    key: "props",
    get: function get() {
      return {
        list: Array
      };
    }
  }]);

  function App() {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this));

    _defineProperty(_assertThisInitialized(_this), "handleCheck", function (e) {
      _this.list[e.detail.index].checked = !e.detail.value;
    });

    _defineProperty(_assertThisInitialized(_this), "handleRemove", function (e) {
      _this.list = _this.list.filter(function (item, index) {
        return index !== e.detail.index;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleSubmit", function (e) {
      _this.list = [].concat(_toConsumableArray(_this.list), [{
        text: e.detail.value,
        checked: false
      }]);
    });

    _this.list = [{
      text: 'my initial todo',
      checked: false
    }, {
      text: 'Learn about Web Components',
      checked: true
    }];
    return _this;
  }

  _createClass(App, [{
    key: "renderItem",
    value: function renderItem(item, index) {
      return (0, _.html)(_templateObject(), item.checked, index, this.handleCheck.bind(this), this.handleRemove.bind(this), item.text);
    }
  }, {
    key: "render",
    value: function render() {
      return (0, _.html)(_templateObject2(), this.handleSubmit.bind(this), this.list.map(this.renderItem.bind(this)));
    }
  }]);

  return App;
}(_elementPreact.default);

exports.App = App;
},{"@skatejs/element-preact":"../node_modules/@skatejs/element-preact/dist/esm/index.js","./_":"_.js"}],"input.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = void 0;

var _elementPreact = _interopRequireWildcard(require("@skatejs/element-preact"));

var _ = require("./_");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n            <div>\n                <style>\n                    :host {\n                        display: block;\n                    }\n\n                    form {\n                        position: relative;\n                        font-size: 24px;\n                        border-bottom: 1px solid #ededed;\n                    }\n\n                    input {\n                        padding: 16px 16px 16px 60px;\n                        border: none;\n                        background: rgba(0, 0, 0, 0.003);\n                        position: relative;\n                        margin: 0;\n                        width: 100%;\n                        font-size: 24px;\n                        font-family: inherit;\n                        font-weight: inherit;\n                        line-height: 1.4em;\n                        border: 0;\n                        outline: none;\n                        color: inherit;\n                        padding: 6px;\n                        border: 1px solid #ccc;\n                        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);\n                        box-sizing: border-box;\n                    }\n                </style>\n                <form onSubmit=\"", "\">\n                    <input\n                        value=\"", "\"\n                        type=\"text\"\n                        placeholder=\"What needs to be done?\"\n                        onInput=\"", "\"\n                    />\n                </form>\n            </div>\n        "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Input =
/*#__PURE__*/
function (_Element) {
  _inherits(Input, _Element);

  function Input() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Input);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Input)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "handleInput", function (e) {
      _this.value = e.target.value;
    });

    _defineProperty(_assertThisInitialized(_this), "handleSubmit", function (e) {
      e.preventDefault();
      if (!_this.value) return;

      _this.dispatchEvent(new CustomEvent("submit", {
        detail: {
          value: _this.value
        }
      }));

      _this.shadowRoot.querySelector('input').value = '';
    });

    return _this;
  }

  _createClass(Input, [{
    key: "render",
    value: function render() {
      return (0, _.html)(_templateObject(), this.handleSubmit.bind(this), this.value, this.handleInput.bind(this));
    }
  }]);

  return Input;
}(_elementPreact.default);

exports.Input = Input;

_defineProperty(Input, "props", {
  value: String
});
},{"@skatejs/element-preact":"../node_modules/@skatejs/element-preact/dist/esm/index.js","./_":"_.js"}],"item.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Item = void 0;

var _elementPreact = _interopRequireWildcard(require("@skatejs/element-preact"));

var _ = require("./_");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n      <div>\n        <style>\n          :host {\n            display: block;\n          }\n\n          li {\n            font-size: 24px;\n            display: block;\n            position: relative;\n            border-bottom: 1px solid #ededed;\n          }\n\n          li input {\n            text-align: center;\n            width: 40px;\n            /* auto, since non-WebKit browsers doesn't support input styling */\n            height: auto;\n            position: absolute;\n            top: 9px;\n            bottom: 0;\n            margin: auto 0;\n            border: none;\n          }\n\n          \n          li label {\n            white-space: pre;\n            word-break: break-word;\n            padding: 15px 60px 15px 15px;\n            margin-left: 45px;\n            display: block;\n            line-height: 1.2;\n            transition: color 0.4s;\n          }\n\n          li.completed label {\n            color: #d9d9d9;\n            text-decoration: line-through;\n          }\n\n          li button,\n          li input[type=\"checkbox\"] {\n            outline: none;\n          }\n\n          li button {\n            margin: 0;\n            padding: 0;\n            border: 0;\n            background: none;\n            font-size: 100%;\n            vertical-align: baseline;\n            font-family: inherit;\n            font-weight: inherit;\n            color: inherit;\n            -webkit-appearance: none;\n            appearance: none;\n            -webkit-font-smoothing: antialiased;\n            -moz-font-smoothing: antialiased;\n            font-smoothing: antialiased;\n          }\n\n          li button {\n            position: absolute;\n            top: 0;\n            right: 10px;\n            bottom: 0;\n            width: 40px;\n            height: 40px;\n            margin: auto 0;\n            font-size: 30px;\n            color: #cc9a9a;\n            margin-bottom: 11px;\n            transition: color 0.2s ease-out;\n          }\n\n          li button:hover {\n            color: #af5b5e;\n          }\n        </style>\n        <li class=\"", "\">\n          <input type=\"checkbox\" checked=\"", "\" onChange=\"", "\"/>\n          <label><slot></slot></label>\n          <button onClick=\"", "\">x</button>\n        </li>\n      </div>\n    "]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Item =
/*#__PURE__*/
function (_Element) {
  _inherits(Item, _Element);

  function Item() {
    _classCallCheck(this, Item);

    return _possibleConstructorReturn(this, _getPrototypeOf(Item).apply(this, arguments));
  }

  _createClass(Item, [{
    key: "handleCheck",
    value: function handleCheck(e) {
      this.dispatchEvent(new CustomEvent("check", {
        detail: {
          index: this.index,
          value: this.checked
        }
      }));
    }
  }, {
    key: "handleRemove",
    value: function handleRemove() {
      this.dispatchEvent(new CustomEvent("remove", {
        detail: {
          index: this.index,
          value: this.checked
        }
      }));
    }
  }, {
    key: "render",
    value: function render() {
      return (0, _.html)(_templateObject(), this.checked ? "completed" : "", this.checked, this.handleCheck.bind(this), this.handleRemove.bind(this));
    }
  }]);

  return Item;
}(_elementPreact.default);

exports.Item = Item;

_defineProperty(Item, "props", {
  index: Number,
  checked: Boolean
});
},{"@skatejs/element-preact":"../node_modules/@skatejs/element-preact/dist/esm/index.js","./_":"_.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _app = require("./app");

var _input = require("./input");

var _item = require("./item");

customElements.define("my-todo", _app.App);
customElements.define("todo-input", _input.Input);
customElements.define("todo-item", _item.Item);
},{"./app":"app.js","./input":"input.js","./item":"item.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "35541" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)