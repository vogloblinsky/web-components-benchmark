function e(e,t,n){var r=arguments;if(t=t||{},arguments.length>3){n=[n];for(var o=3;o<arguments.length;o++)n.push(r[o]);}null!=n&&(t.children=n);var a={type:e,props:t},u=t.key;return null!=u&&(a.key=""+u),a}function t(t){return null!=t&&"boolean"!=typeof t||(t=""),"string"==typeof t||"number"==typeof t?e(null,null,""+t):t}var n=[],r={},o={},u="@state",c="@type",i="host",s=97,f=116,l=79,p=77,v=73,d=67,h={children:1},y={innerHTML:1,textContent:1,contenteditable:1},g={};function k(e,t){var n=arguments;for(var r in t)e[r]=t[r];for(var o=2;o<arguments.length;o++)k(e,n[o]);return e}var w,x,b=Promise.prototype.then.bind(Promise.resolve());function C(e,t,n,o,a,u){if(("checked"==t||"value"==t)&&t in e&&(n=e[t]),o!=n)if("o"!=t[0]||"n"!=t[1]||"function"!=typeof o&&"function"!=typeof n)switch(t){case"ref":o&&(o.current=e);break;case"style":!function(e,t,n){var r=t,o=n;if("object"==typeof o)for(var a in o="",n)n[a]&&(g[a]||(g[a]=a.replace(/([A-Z])/g,"-$1").toLowerCase()),o+=g[a]+":"+n[a]+";");r!=o&&(e.style.cssText=o);}(e,n||e.style.cssText,o);break;case"shadowDom":return void("attachShadow"in e&&(e.shadowRoot&&!o||!e.shadowRoot&&o)&&e.attachShadow({mode:o?"open":"closed"}));case"key":t="data-key",null==o?delete e.dataset.key:e.dataset.key=o;break;case"class":case"className":t=a?"class":"className";default:"list"!=t&&!a&&t in e?e[t]=null==o?"":o:null==o?e.removeAttribute(t):e.setAttribute(t,o);}else!function(e,t,n,o){r[t]||(r[t]=t.slice(2).toLocaleLowerCase()),t=r[t],o.handleEvent||(o.handleEvent=N),n?(o[t]||e.addEventListener(t,o),o[t]=n):o[t]&&(e.removeEventListener(t,o),delete o[t]);}(e,t,o,u);}function N(e){return this[e.type](e)}function E(){if(!w)throw new Error("the hooks can only be called from an existing functional component in the diff queue");return w}function L(e,t){var n,r,o=E().component,a=x++;return o.hooks[a]||(r=!0,o.hooks[a]={state:t}),(n=o.hooks[a]).reducer=e,r&&A(n,{type:s}),[n.state,function(e){return A(n,e)}]}function A(e,t){e.reducer&&(e.state=e.reducer(e.state,t));}function T(e,t){for(var n=e.length,r=0;r<n;r++){var o=e[r],a=o.hooks,u=a.length;t.type===d&&(o.remove=!0);for(var c=0;c<u;c++)A(a[c],t);}}function V(e,t,n,r){var o=(t[e]||{}).updateComponent,a=t.childNodes,u=a.length;o&&o!=r&&o(n?v:d);for(var c=0;c<u;c++)V(e,a[c]);}function j(e,t){var n,r=document;return (n=null!=e?t?r.createElementNS("http://www.w3.org/2000/svg",e):r.createElement(e):r.createTextNode(""))[c]=e,n}function O(e,r,o,a,u){if(void 0===u&&(u=0),o=o||[],a=a||[],Array.isArray(e))for(var c=e.length,i=0;i<c;i++)O(e[i],r,o,a,u+1);else{if(null==e&&!u)return n;var s=r?r(e,a.length):t(e);r||"object"==typeof s&&null!=s.key&&-1==o.indexOf(s.key)&&(o.push(s.key),o.withKeyes=!0),a.push(s);}return a}function P(n,r,a){a=a||u,n=t(n),a==u&&n.type!=i&&(n=e(i,{},n)),function e(n,r,o,a,u,s){var g=r&&r[n]||{},m=g.vnode,N=g.updateComponent,E=g.handlers;if(void 0===E&&(E={}),m==o)return r;m=m||{props:{}};var L=o.type,A=o.props,P=A.shadowDom,R=A.children,S="function"==typeof L;if(u=u||"svg"==L,S&&!N&&(N=function(n,r){var o,a=[];return function u(c,i,s,h){switch(c){case f:return o=i,function c(i,s,v){if(o){if("function"!=typeof(i=t(i)).type)return T(a.splice(v),{type:d}),o=e(n,o,i,s,r,u),void(a.length&&(o[n].updateComponent=u));var h,y,g=a[v]||{};g.type!=i.type&&(T(a.splice(v),{type:d}),a[v]=k({hooks:[]},i),h=!0,y=!0);var m=i.props,C=(g=a[v]).props;if(!y){var N=Object.keys(C).length,E=0;for(var L in m)if(E++,m[L]!=C[L]){y=!0;break}y=y||N!=E;}y=g.context!=s||y,g.props=m,g.context=s,y&&!g.prevent&&function e(){if(g.remove)return o;var t=w={component:g,context:s,next:function(){g.prevent||(g.prevent=!0,b(function(){g.prevent=!1,e();}));}};x=0,T([g],{type:f});var n=g.type(g.props);w=!1,x=0,c(n,t.context,v+1),T([g],{type:h?l:p}),h=!1;}();}}(s,h,0),o;case v:T([].concat(a).reverse(),{type:c});break;case d:o=!1,T(a.reverse(),{type:c}),a=[];}}}(n,u)),!S&&L!=i&&function(e){if(e){if(!e[c]){var t=e.nodeName.toLowerCase();e[c]="#text"==t?null:t;}return e[c]}}(r)!==L){var B=j(L,u),D=r&&r.parentNode;D&&(V(n,r,!0,s),D.replaceChild(B,r)),r=B,E={};}return N&&s!=N?N(f,r,o,a):(null==L?r.nodeValue!=R&&(r.nodeValue=R):function(e,t,n,r,o){for(var a in t=t||{})h[a]||a in n||C(e,a,t[a],null,r,o);var u;for(var c in n)h[c]||(C(e,c,t[c],n[c],r,o),u=u||y[c]);return u}(r,m.props,o.props,u,E)||m.props.children==R||function(t,n,r,o,a){for(var u=[],c=O(r,!1,u),i=c.length,s=n.childNodes,f={},l=s.length,p=u.withKeyes,v=p?0:l>i?i:l;v<l;v++){var d=s[v],h=v;p&&u.indexOf(h=d.dataset.key)>-1?f[h]=d:(V(t,d),v--,l--,n.removeChild(d));}for(var y=0;y<i;y++){var g=c[y],m=s[y],k=s[y+1],w=p?f[p?g.key:y]:m;p&&w!=m&&n.insertBefore(w,m);var x=e(t,w||"function"!=typeof g.type?w:j(null),g,o,a);w||(k?n.insertBefore(x,k):n.appendChild(x));}}(n,P&&r.shadowRoot||r,R,a,u),r[n]={vnode:o,handlers:E},r)}(a,r,n,o);}function R(e){var t=E().next,n=L(function(t,n){switch(n.type){case s:return "function"==typeof e?e():e;case 159:var r=n.state;return "function"==typeof r?r(t):r}return t}),r=n[1];return [n[0],function(e){r({state:e,type:159}),t();}]}var Z=e;

let r$1=Promise.resolve(),s$1=0,i$1=Z("host");function a(t){return JSON.parse(t)}class Element extends HTMLElement{constructor(){let i;super(),this.props={},this.render=this.render.bind(this),this.renderID="@wc."+s$1++,this.update=(s=>{this.props={...this.props,...s},i||(i=!0,r$1.then(()=>{i=!1,P(Z(this.render,this.props),this,this.renderID);}));}),this.update();}static get observedAttributes(){let t=this.attributes||{},e=[];for(let r in t)e.push(r.replace(/([A-Z])/g,"-$1").toLowerCase());return e}disconnectedCallback(){P(i$1,this,this.renderID);}attributeChangedCallback(t,e,r){if(e==r)return;t=t.replace(/-(\w)/g,(t,e)=>e.toUpperCase());let s,{attributes:i}=this.constructor,o=i[t];try{switch(o){case Number:r=a(r);break;case Boolean:r=1==(r=""==r||a(r))||0==r?1==r:r;break;case Object:case Array:r=a(r);}}catch(t){s=!0;}if(s||{}.toString.call(r)!=`[object ${o.name}]`)throw`the attribute [${t}] must be of the type [${o.name}]`;this.update({[t]:r});}render(){return i$1}}

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

let incrementId = 0;
/**
 * Input component, shows the input that collects the texts for the creation of a task
 * @param {object} props
 * @param {function} props.onChange
 * @param {string} props.placeholder
 * @return {object}
 */
function Input(props) {
	return (
		Z('div', { shadowDom: true,}
, Z('style', null, css)
, Z('form', {
				onSubmit: event => {
					event.preventDefault();
					if (props.onChange)
						props.onChange({
							text: event.target.input.value,
							id: incrementId++
						});
					event.target.reset();
				},}
			
, Z('input', { name: "input", type: "text", placeholder: props.placeholder,} )
)
)
	);
}

var css$1 = ":host{display:flex}input{text-align:center;border:none;-webkit-appearance:none;appearance:none;padding:.2rem .5rem;outline:none}input:after{content:url('data:image/svg+xml;utf8,<svg%20xmlns%3D\"http%3A//www.w3.org/2000/svg\"%20width%3D\"40\"%20height%3D\"40\"%20viewBox%3D\"-10%20-18%20100%20135\"><circle%20cx%3D\"50\"%20cy%3D\"50\"%20r%3D\"50\"%20fill%3D\"none\"%20stroke%3D\"%23ededed\"%20stroke-width%3D\"3\"/></svg>')}input:checked:after{content:url('data:image/svg+xml;utf8,<svg%20xmlns%3D\"http%3A//www.w3.org/2000/svg\"%20width%3D\"40\"%20height%3D\"40\"%20viewBox%3D\"-10%20-18%20100%20135\"><circle%20cx%3D\"50\"%20cy%3D\"50\"%20r%3D\"50\"%20fill%3D\"none\"%20stroke%3D\"%23bddad5\"%20stroke-width%3D\"3\"/><path%20fill%3D\"%235dc2af\"%20d%3D\"M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z\"/></svg>')}input:checked~.text{color:#d9d9d9;text-decoration:line-through}.group{display:flex;align-items:center}.text{flex:0%;padding:1rem;font-size:24px;text-align:left}button{color:#cc9a9a;background:none;border:0;font-size:30px;margin-right:1rem}";
styleInject(css$1);

/**
 * Component article, shows the task and allows you to mark how the
 * elimination(props.onRemove) of this has been done(props.onToggle) or eliminated
 * @param {object} props
 * @param {integer|string} props.key
 * @param {function} props.onToggle
 * @param {boolean} props.checked
 * @param {string} props.text
 * @param {function} props.onRemove
 * @return {object}
 */
function Item(props) {
	return (
		Z('div', { shadowDom: true, key: props.key,}
, Z('style', null, css$1)
, Z('input', {
				type: "checkbox",
				onChange: props.onToggle,
				checked: props.checked,}
			)
, Z('div', { class: "text",}, props.text)
, Z('button', { onClick: props.onRemove,}, "x")
)
	);
}

var css$2 = ":host{display:block;box-shadow:0 2px 4px 0 rgba(0,0,0,.2),0 25px 50px 0 rgba(0,0,0,.1);background:#fff}";
styleInject(css$2);

class TagTodo extends Element {
	render() {
		let [state, setState] = R(() => [
			{ text: "my initial todo", checked: false, id: -1 >>> 0 },
			{ text: "Learn about Web Components", checked: true, id: -2 >>> 0 }
		]);
		return (
			Z('host', { shadowDom: true,}
, Z('style', null, css$2)
, Z(Input, {
					placeholder: "What needs to be done?"    ,
					onChange: task => {
						setState(state.concat(task));
					},}
				)
, Z('div', null
, state.map(({ text, checked, id }, localIndex) => (
						Z(Item, {
							key: id,
							text: text,
							checked: checked,
							onRemove: () => {
								setState(state.filter((data, index) => index !== localIndex));
							},
							onToggle: () => {
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
}

customElements.define("atomico-todo", TagTodo);

export default TagTodo;
//# sourceMappingURL=atomico.mjs.map
