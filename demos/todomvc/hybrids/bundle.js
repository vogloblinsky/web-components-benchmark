!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);var o={};function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}n.r(o),n.d(o,"set",function(){return xe}),n.d(o,"resolve",function(){return ke});var i=new Map;function a(e){var t=i.get(e);return void 0===t&&(t=e.replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),i.set(e,t)),t}function c(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e.dispatchEvent(new CustomEvent(t,function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){r(e,t,n[t])})}return e}({bubbles:!1},n)))}function u(e,t){var n=window.ShadyCSS;return n&&!n.nativeShadow?e(n):t}function l(e){var t=String(e.tagName).toLowerCase();return"<".concat(t,">")}var f="ActiveXObject"in window;Promise.resolve();function s(e){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var d=function(e){return e},p=function(e){if("object"!==s(e))throw TypeError("Assigned value must be an object: ".concat("undefined"==typeof v?"undefined":s(v)));return e&&Object.freeze(e)};function b(e,t){var n=s(e),o=d;switch(n){case"string":o=String;break;case"number":o=Number;break;case"boolean":o=Boolean;break;case"function":e=(o=e)();break;case"object":e&&Object.freeze(e),o=p}return{get:function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e;return n},set:function(e,t,n){return o(t,n)},connect:"object"!==n&&"undefined"!==n?function(n,o,r){if(n[o]===e){var i=a(o);if(n.hasAttribute(i)){var c=n.getAttribute(i);n[o]=""===c||c}}return t&&t(n,o,r)}:t}}function y(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function h(e){return(h="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if("function"!=typeof e)throw TypeError("The first argument must be a function: ".concat(h(e)));var n=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"==typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){y(e,t,n[t])})}return e}({shadowRoot:!0},t),o={mode:"open"};return"object"===h(n.shadowRoot)&&Object.assign(o,n.shadowRoot),{get:function(t){var o=e(t);return function(){o(t,n.shadowRoot?t.shadowRoot:t)}},connect:function(e){n.shadowRoot&&!e.shadowRoot&&e.attachShadow(o)},observe:function(e,t){t()}}}var g=new WeakMap;function w(e){var t=g.get(e);return t||(t=new Set,g.set(e,t)),t}var x=new Set,S=function(e){return e()};function k(){try{x.forEach(function(e){try{w(e).forEach(S),x.delete(e)}catch(t){throw x.delete(e),t}})}catch(e){throw x.size&&k(),e}}function E(e){x.size||requestAnimationFrame(k),x.add(e)}var N=new WeakMap;function O(e,t){var n=N.get(e);n||(n=new Map,N.set(e,n));var o=n.get(t);return o||(o={target:e,key:t,value:void 0,contexts:void 0,deps:void 0,state:1,checksum:0,observed:!1},n.set(t,o)),o}function j(e){var t=e.state;return e.deps&&e.deps.forEach(function(e){e.target[e.key],t+=e.state}),t}function T(e){e.observed&&E(e),e.contexts&&e.contexts.forEach(T)}var C=null;function A(e,t,n){var o=O(e,t);return o.observed=!0,function(e,t){var n=w(e);return n.add(t),E(e),function(){return n.delete(t)}}(o,n)}function M(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function _(e,t){return!t||"object"!==z(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e):t}function P(e){var t="function"==typeof Map?new Map:void 0;return(P=function(e){if(null===e||(n=e,-1===Function.toString.call(n).indexOf("[native code]")))return e;var n;if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function");if(void 0!==t){if(t.has(e))return t.get(e);t.set(e,o)}function o(){return R(e,arguments,$(this).constructor)}return o.prototype=Object.create(e.prototype,{constructor:{value:o,enumerable:!1,writable:!0,configurable:!0}}),W(o,e)})(e)}function R(e,t,n){return(R=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}()?Reflect.construct:function(e,t,n){var o=[null];o.push.apply(o,t);var r=new(Function.bind.apply(e,o));return n&&W(r,n.prototype),r}).apply(null,arguments)}function W(e,t){return(W=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function $(e){return($=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function z(e){return(z="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var D=function(e,t){return t};function L(e,t){e.hybrids=t,e.callbacks=[],Object.keys(t).forEach(function(n){var o,r=t[n],i=z(r);o="function"===i?"render"===n?m(r):{get:r}:"object"!==i||null===r||Array.isArray(r)?b(r):{get:r.get||D,set:r.set||!r.get&&D||void 0,connect:r.connect,observe:r.observe},Object.defineProperty(e.prototype,n,{get:function(){return function(e,t,n){var o=O(e,t);if(C===o)throw C=null,Error("Circular '".concat(t,"' get invocation in '").concat(l(e),"'"));C&&(C.deps=C.deps||new Set,C.deps.add(o)),C&&(C.observed||C.contexts&&C.contexts.size)&&(o.contexts=o.contexts||new Set,o.contexts.add(C));var r=C;if(C=o,o.checksum&&o.checksum===j(o))return C=r,o.value;o.deps&&o.deps.size&&(o.deps.forEach(function(e){e.contexts&&e.contexts.delete(o)}),o.deps=void 0);try{var i=n(e,o.value);i!==o.value&&(o.state+=1,o.value=i,T(o)),o.checksum=j(o),C=r}catch(e){throw C=null,e}return o.value}(this,n,o.get)},set:o.set&&function(e){!function(e,t,n,o){if(C)throw C=null,Error("Try to set '".concat(t,"' of '").concat(l(e),"' in get call"));var r=O(e,t),i=n(e,o,r.value);i!==r.value&&(r.state+=1,r.value=i,T(r))}(this,n,o.set,e)},enumerable:!0,configurable:!1}),o.connect&&e.callbacks.push(function(e){return o.connect(e,n,function(){!function(e,t,n){if(C)throw C=null,Error("Try to invalidate '".concat(t,"' in '").concat(l(e),"' get call"));var o=O(e,t);o.checksum=0,T(o),n&&(o.value=void 0)}(e,n)})}),o.observe&&e.callbacks.push(function(e){var t;return A(e,n,function(){var r=e[n];r!==t&&(o.observe(e,r,t),t=r)})})})}var B=new WeakMap;function F(e,t){var n=z(t);if("object"!==n&&"function"!==n)throw TypeError("Second argument must be an object or a function: ".concat(n));var o=window.customElements.get(e);if("function"===n)return o!==t?window.customElements.define(e,t):o;if(o){if(o.hybrids===t)return o;throw Error("Element '".concat(e,"' already defined"))}var r=function(t){function n(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),_(this,$(n).apply(this,arguments))}var o,r,i;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&W(e,t)}(n,P(HTMLElement)),o=n,i=[{key:"name",get:function(){return e}}],(r=[{key:"connectedCallback",value:function(){for(var e=this.constructor.callbacks,t=[],n=0;n<e.length;n+=1){var o=e[n](this);o&&t.push(o)}B.set(this,t)}},{key:"disconnectedCallback",value:function(){for(var e=B.get(this),t=0;t<e.length;t+=1)e[t]()}}])&&M(o.prototype,r),i&&M(o,i),n}();return L(r,t),customElements.define(e,r),r}function H(e){return Object.keys(e).reduce(function(t,n){var o=a(n.replace(/((?!([A-Z]{2}|^))[A-Z])/g,"-$1"));return t[n]=F(o,e[n]),t},{})}function X(){return"object"===z(arguments.length<=0?void 0:arguments[0])?H(arguments.length<=0?void 0:arguments[0]):F.apply(void 0,arguments)}var q=new WeakMap,I={get:function(e,t){var n=q.get(e);return n||(t&&q.set(e,t),t)},set:function(e,t){return q.set(e,t),t}};function Z(e){for(var t;e&&(t=I.get(e))&&t.endNode;)e=t.endNode;return e}function G(e){if(e.nodeType!==Node.TEXT_NODE)for(var t=e.childNodes[0];t;)e.removeChild(t),t=e.childNodes[0];else{var n=I.get(e);if(n.startNode)for(var o=Z(n.endNode),r=n.startNode,i=o.nextSibling;r;){var a=r.nextSibling;r.parentNode.removeChild(r),r=a!==i&&a}}}var K=new WeakMap;function U(e,t){var n=I.get(e),o=n.startNode,r=Z(n.endNode);t.parentNode.insertBefore(e,t.nextSibling);for(var i=e,a=o;a;){var c=a.nextSibling;i.parentNode.insertBefore(a,i.nextSibling),i=a,a=c!==r.nextSibling&&c}}function V(e){return(V="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function J(e,t,n){var o=Array.isArray(n)?"array":V(n),r=I.get(t,{});switch(r.type!==o&&(G(t),"array"===o&&K.delete(t),r=I.set(t,{type:o}),""!==t.textContent&&(t.textContent="")),o){case"function":n(e,t);break;case"array":!function(e,t,n){var o=K.get(t),r=n.map(function(e,t){return{id:Object.prototype.hasOwnProperty.call(e,"id")?e.id:t,value:e,placeholder:null,available:!0}});if(K.set(t,r),o){var i=new Set;r.forEach(function(e){return i.add(e.id)}),o=o.filter(function(e){return!!i.has(e.id)||(G(e.placeholder),e.placeholder.parentNode.removeChild(e.placeholder),!1)})}for(var a=t,c=n.length-1,u=I.get(t),l=0;l<r.length;l+=1){var f=r[l],s=void 0;if(o)for(var d=0;d<o.length;d+=1)if(o[d].available&&o[d].id===f.id){s=o[d];break}var p=void 0;s?(s.available=!1,(p=s.placeholder).previousSibling!==a&&U(p,a),s.value!==f.value&&J(e,p,f.value)):(p=document.createTextNode(""),a.parentNode.insertBefore(p,a.nextSibling),J(e,p,f.value)),a=Z(I.get(p).endNode||p),0===l&&(u.startNode=p),l===c&&(u.endNode=a),f.placeholder=p}o&&o.forEach(function(e){e.available&&(G(e.placeholder),e.placeholder.parentNode.removeChild(e.placeholder))})}(e,t,n);break;default:t.textContent="number"===o||n?n:""}}function Q(e){return(Q="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var Y=new WeakMap;function ee(e){return(ee="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var te=new WeakMap;function ne(e,t,n){var o=te.get(t)||new Set,r=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:new Set;return Array.isArray(e)?e.forEach(function(e){return t.add(e)}):null!==e&&"object"===ee(e)?Object.keys(e).forEach(function(n){return e[n]&&t.add(n)}):t.add(e),t}(n);te.set(t,r),r.forEach(function(e){t.classList.add(e),o.delete(e)}),o.forEach(function(e){t.classList.remove(e)})}function oe(e){return(oe="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var re=new WeakMap;function ie(e,t,n){if(null===n||"object"!==oe(n))throw TypeError("Style value must be an object in ".concat(l(t),":"),n);var o=re.get(t)||new Map,r=Object.keys(n).reduce(function(e,r){var i=a(r),c=n[r];return c||0===c?t.style.setProperty(i,c):t.style.removeProperty(i),e.set(i,c),o.delete(i),e},new Map);o.forEach(function(e,n){t.style[n]=""}),re.set(t,r)}function ae(e,t,n){if("on"===t.substr(0,2))return function(e){return function(t,n,o,r){if(r&&n.removeEventListener(e,Y.get(r),void 0!==r.options&&r.options),o){if("function"!=typeof o)throw Error("Event listener must be a function: ".concat(Q(o)));Y.set(o,o.bind(null,t)),n.addEventListener(e,Y.get(o),void 0!==o.options&&o.options)}}}(t.substr(2));switch(e){case"class":return ne;case"style":return ie;default:return function(o,r,i){if(n||r instanceof SVGElement||!(t in r))if(!1===i||null==i)r.removeAttribute(e);else{var a=!0===i?"":String(i);r.setAttribute(e,a)}else r[t]!==i&&(r[t]=i)}}}function ce(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],o=!0,r=!1,i=void 0;try{for(var a,c=e[Symbol.iterator]();!(o=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);o=!0);}catch(e){r=!0,i=e}finally{try{o||null==c.return||c.return()}finally{if(r)throw i}}return n}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function ue(e){return(ue="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var le=Date.now(),fe=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return"{{h-".concat(le,"-").concat(e,"}}")},se=fe("(\\d+)"),de=new RegExp("^".concat(se,"$")),pe=new RegExp(se,"g"),be="--".concat(le,"--"),ye=new RegExp(be,"g"),ve=new WeakMap;var he="object"===ue(window.ShadyDOM)&&window.ShadyDOM.inUse?function(e){var t;return{get currentNode(){return t},nextNode:function(){return!!(t=void 0===t?e.childNodes[0]:t.childNodes.length?t.childNodes[0]:t.nextSibling?t.nextSibling:t.parentNode.nextSibling)}}}:function(e){return document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,null,!1)},me=document.createElement("div");function ge(e,t,n){var o=document.createElement("template"),r=[],i=function(e,t){var n=e.reduce(function(t,n,o){return 0===o?n:e.slice(o).join("").match(/^\s*<\/\s*(table|tr|thead|tbody|tfoot|colgroup)>/)?"".concat(t,"\x3c!--").concat(fe(o-1),"--\x3e").concat(n):t+fe(o-1)+n},"");return t&&(n+="<style>\n".concat(t.join("\n/*------*/\n"),"\n</style>")),f?n.replace(/style\s*=\s*(["][^"]+["]|['][^']+[']|[^\s"'<>\/]+)/g,function(e){return"".concat(be).concat(e)}):n}(e,n);if(t&&(i="<svg>".concat(i,"</svg>")),f?o.innerHTML=i:(me.innerHTML="<template>".concat(i,"</template>"),o.content.appendChild(me.children[0].content)),t){var a=o.content.firstChild;o.content.removeChild(a),Array.from(a.childNodes).forEach(function(e){return o.content.appendChild(e)})}!function(e){for(var t,n=document.createNodeIterator(e,NodeFilter.SHOW_COMMENT,null,!1);t=n.nextNode();)de.test(t.textContent)&&(t.parentNode.insertBefore(document.createTextNode(t.textContent),t),t.parentNode.removeChild(t))}(o.content);for(var c=he(o.content),l=0,s=function(){var n=c.currentNode;if(n.nodeType===Node.TEXT_NODE){var o=n.textContent;if(!o.match(de)){var i=o.match(pe);if(i){var a=n;i.reduce(function(e,t){var n=ce(e.pop().split(t),2),o=n[0],r=n[1];return o&&e.push(o),e.push(t),r&&e.push(r),e},[o]).forEach(function(e,t){0===t?a.textContent=e:a=a.parentNode.insertBefore(document.createTextNode(e),a.nextSibling)})}}var u=n.textContent.match(de);u&&(f||(n.textContent=""),r[u[1]]=[l,J])}else n.nodeType===Node.ELEMENT_NODE&&Array.from(n.attributes).forEach(function(o){var i=o.value.trim(),a=f?o.name.replace(be,""):o.name,c=i.match(de);if(c){var u=e[c[1]].replace(/\s*=\s*['"]*$/g,"").split(" ").pop();r[c[1]]=[l,ae(a,u,t)],n.removeAttribute(o.name)}else{var s=i.match(pe);if(s){var d="attr__".concat(a);s.forEach(function(e,t){var n=ce(e.match(de),2)[1];r[n]=[l,function(n,o,r){var c=I.get(o,{});c[d]=(c[d]||i).replace(e,null==r?"":r),1!==s.length&&t+1!==s.length||(o.setAttribute(a,c[d]),c[d]=void 0)}]}),o.value="",f&&a!==o.name&&(n.removeAttribute(o.name),n.setAttribute(a,""))}}});l+=1};c.nextNode();)s();return function(e,t,n){var i=I.get(t,{type:"function"});if(o!==i.template){(i.template||t.nodeType===Node.ELEMENT_NODE)&&G(t),i.lastArgs=null;var a=document.importNode(function(e,t){return t?u(function(n){var o=ve.get(e);o||(o=new Map,ve.set(e,o));var r=o.get(t);if(!r){(r=document.createElement("template")).content.appendChild(e.content.cloneNode(!0)),o.set(t,r);var i=r.content.querySelectorAll("style");Array.from(i).forEach(function(e){for(var t=e.childNodes.length+1,n=0;n<t;n+=1)e.parentNode.insertBefore(document.createTextNode(fe()),e)}),n.prepareTemplate(r,t.toLowerCase())}return r},e):e}(o,e.tagName).content,!0),c=he(a),l=r.slice(0),s=0,d=l.shift(),p=[];for(i.template=o,i.markers=p;c.nextNode();){var b=c.currentNode;for(b.nodeType===Node.TEXT_NODE&&(de.test(b.textContent)?b.textContent="":f&&(b.textContent=b.textContent.replace(ye,"")));d&&d[0]===s;)p.push([b,d[1]]),d=l.shift();s+=1}if(t.nodeType===Node.TEXT_NODE){i.startNode=a.childNodes[0],i.endNode=a.childNodes[a.childNodes.length-1];for(var y=t,v=a.childNodes[0];v;)t.parentNode.insertBefore(v,y.nextSibling),y=v,v=a.childNodes[0]}else t.appendChild(a)}for(var h=0;h<i.markers.length;h+=1){var m=ce(i.markers[h],2),g=m[0],w=m[1];i.lastArgs&&i.lastArgs[h]===n[h]||w(e,g,n[h],i.lastArgs?i.lastArgs[h]:void 0)}t.nodeType!==Node.TEXT_NODE&&u(function(t){e.shadowRoot&&(i.lastArgs?t.styleSubtree(e):t.styleElement(e))}),i.lastArgs=n}}var we=new Map;function xe(e,t){if(!e)throw Error("Target property name missing: ".concat(e));if(2===arguments.length)return function(n){n[e]=t};var n=we.get(e);return n||(n=function(t,n){var o=n.target;t[e]=o.value},we.set(e,n)),n}var Se=new WeakMap;function ke(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:200;return function(o,r){var i;t&&(i=setTimeout(function(){i=void 0,requestAnimationFrame(function(){t(o,r)})},n)),Se.set(r,e),e.then(function(t){i&&clearTimeout(i),Se.get(r)===e&&(t(o,r),Se.set(r,null))})}}var Ee=fe(),Ne=fe("svg"),Oe=new Map,je=new WeakMap,Te={define:function(e){return X(e),this},key:function(e){return this.id=e,this},style:function(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return je.set(this,t),this}};function Ce(e,t,n){return Object.assign(function o(r){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:r,a=je.get(o),c=e.join(Ee);a&&(c+=a.join(Ee)),n&&(c+=Ne);var u=Oe.get(c);u||(u=ge(e,n,a),Oe.set(c,u)),u(r,i,t)},Te)}function Ae(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return Ce(e,n)}Object.assign(Ae,o),Object.assign(function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),o=1;o<t;o++)n[o-1]=arguments[o];return Ce(e,n,!0)},o);X("my-todo",{list:[{id:0,text:"my initial todo",checked:!1},{id:1,text:"Learn about Web Components",checked:!0}],render:({list:e})=>Ae`
    <style>
    h1 {
        font-size: 100px;
        font-weight: 100;
        text-align: center;
        color: rgba(175, 47, 47, 0.15);
    }
    
    section {
        background: #fff;
        margin: 130px 0 40px 0;
        position: relative;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
    }
    
    #list-container {
        margin: 0;
        padding: 0;
        list-style: none;
        border-top: 1px solid #e6e6e6;
    }
    </style>
    <h1>Todos Hybrids</h1>
    <todo-input onsubmit=${(e,t)=>{e.list=[...e.list,{id:e.list.length,text:t.detail,checked:!1}]}}></todo-input>
    <ul id="list-container">
        ${e.map((e,t)=>Ae`<todo-item text="${e.text}" checked="${e.checked}" index="${t}" onremoved="${(e,t)=>{e.list=[...e.list.slice(0,t.detail),...e.list.slice(t.detail+1)]}}" onchecked=${(e,t)=>{const n=e.list[t.detail],o=e.list.slice(0);o[t.detail]=Object.assign({},n,{checked:!n.checked}),e.list=[...o]}}></todo-item>`)}
    </ul>
    `});X("todo-input",{val:"",render:()=>Ae`
    <style>
    #new-todo-form {
        position: relative;
        font-size: 24px;
        border-bottom: 1px solid #ededed;
    }

    #new-todo {
        padding: 16px 16px 16px 60px;
        border: none;
        background: rgba(0, 0, 0, 0.003);
        position: relative;
        margin: 0;
        width: 100%;
        font-size: 24px;
        font-family: inherit;
        font-weight: inherit;
        line-height: 1.4em;
        border: 0;
        outline: none;
        color: inherit;
        padding: 6px;
        border: 1px solid #CCC;
        box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
    }
</style>
<form id="new-todo-form" onsubmit="${(e,t)=>{t.preventDefault(),c(e,"submit",{detail:e.val});let n=e.shadowRoot.querySelector("#new-todo");n.value="",n.blur()}}">
    <input id="new-todo" type="text" placeholder="What needs to be done?" oninput="${(e,t)=>{e.val=t.target.value}}"/>
</form>
      `});X("todo-item",{text:b("text"),checked:b("checked"),index:b("index"),render:({text:e})=>Ae`
    <style>
    :host {
        display: block;
    }

    li.item {
        font-size: 24px;
        display: block;
        position: relative;
        border-bottom: 1px solid #ededed;
    }

    li.item input {
        text-align: center;
        width: 40px;
        /* auto, since non-WebKit browsers doesn't support input styling */
        height: auto;
        position: absolute;
        top: 9px;
        bottom: 0;
        margin: auto 0;
        border: none;
        /* Mobile Safari */
        -webkit-appearance: none;
        appearance: none;
    }

    li.item input:after {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#ededed" stroke-width="3"/></svg>');
    }

    li.item input:checked:after {
        content: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="-10 -18 100 135"><circle cx="50" cy="50" r="50" fill="none" stroke="#bddad5" stroke-width="3"/><path fill="#5dc2af" d="M72 25L42 71 27 56l-4 4 20 20 34-52z"/></svg>');
    }

    li.item label {
        white-space: pre;
        word-break: break-word;
        padding: 15px 60px 15px 15px;
        margin-left: 45px;
        display: block;
        line-height: 1.2;
        transition: color 0.4s;
    }

    li.item.completed label {
        color: #d9d9d9;
        text-decoration: line-through;
    }

    li.item button,
        li.item input[type="checkbox"] {
        outline: none;
    }

    li.item button {
        margin: 0;
        padding: 0;
        border: 0;
        background: none;
        font-size: 100%;
        vertical-align: baseline;
        font-family: inherit;
        font-weight: inherit;
        color: inherit;
        -webkit-appearance: none;
        appearance: none;
        -webkit-font-smoothing: antialiased;
        -moz-font-smoothing: antialiased;
        font-smoothing: antialiased;
    }

    li.item .destroy {
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        width: 40px;
        height: 40px;
        margin: auto 0;
        font-size: 30px;
        color: #cc9a9a;
        margin-bottom: 11px;
        transition: color 0.2s ease-out;
    }

    li.item .destroy:hover {
        color: #af5b5e;
    }
</style>
<li class="item">
    <input type="checkbox" onchange="${(e,t)=>{c(e,"checked",{detail:parseInt(e.index)})}}">
    <label>${e}</label>
    <button class="destroy" onclick="${(e,t)=>{c(e,"removed",{detail:parseInt(e.index)})}}">x</button>
</li>`})}]);