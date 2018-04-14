const G=document.defaultView;const ELEMENT_NODE=1;const TEXT_NODE=3;const COMMENT_NODE=8;const DOCUMENT_FRAGMENT_NODE=11;const VOID_ELEMENTS=/^area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr$/i;const OWNER_SVG_ELEMENT="ownerSVGElement";const SVG_NAMESPACE="http://www.w3.org/2000/svg";const CONNECTED="connected";const DISCONNECTED="dis"+CONNECTED;const EXPANDO="_hyper: ";const SHOULD_USE_TEXT_CONTENT=/^style|textarea$/i;const UID=EXPANDO+(Math.random()*new Date|0)+";";const UIDC="\x3c!--"+UID+"--\x3e";let Event=G.Event;try{new Event("Event")}catch(o_O){Event=function(type){const e=document.createEvent("Event");e.initEvent(type,false,false);return e}}const Map=G.Map||function Map(){const keys=[],values=[];return{get(obj){return values[keys.indexOf(obj)]},set(obj,value){values[keys.push(obj)-1]=value}}};const WeakMap=G.WeakMap||function WeakMap(){return{get(obj){return obj[UID]},set(obj,value){Object.defineProperty(obj,UID,{configurable:true,value:value})}}};const WeakSet=G.WeakSet||function WeakSet(){const wm=new WeakMap;return{add(obj){wm.set(obj,true)},has(obj){return wm.get(obj)===true}}};const isArray=Array.isArray||(toString=>arr=>toString.call(arr)==="[object Array]")({}.toString);const trim=UID.trim||function(){return this.replace(/^\s+|\s+$/g,"")};function Component(){return this}function setup(content){const children=new WeakMap;const create=Object.create;const createEntry=(wm,id,component)=>{wm.set(id,component);return component};const get=(Class,info,context,id)=>{switch(typeof id){case"object":case"function":const wm=info.w||(info.w=new WeakMap);return wm.get(id)||createEntry(wm,id,new Class(context));default:const sm=info.p||(info.p=create(null));return sm[id]||(sm[id]=new Class(context))}};const set=context=>{const info={w:null,p:null};children.set(context,info);return info};Object.defineProperties(Component,{for:{configurable:true,value(context,id){const info=children.get(context)||set(context);return get(this,info,context,id==null?"default":id)}}});Object.defineProperties(Component.prototype,{handleEvent:{value(e){const ct=e.currentTarget;this["getAttribute"in ct&&ct.getAttribute("data-call")||"on"+e.type](e)}},html:lazyGetter("html",content),svg:lazyGetter("svg",content),state:lazyGetter("state",function(){return this.defaultState}),defaultState:{get(){return{}}},setState:{value(state,render){const target=this.state;const source=typeof state==="function"?state.call(this,target):state;for(const key in source)target[key]=source[key];if(render!==false)this.render();return this}}})}const lazyGetter=(type,fn)=>{const secret="_"+type+"$";return{get(){return this[secret]||(this[type]=fn.call(this,type))},set(value){Object.defineProperty(this,secret,{configurable:true,value:value})}}};const intents={};const keys=[];const hasOwnProperty=intents.hasOwnProperty;let length=0;var Intent={define:(intent,callback)=>{if(!(intent in intents)){length=keys.push(intent)}intents[intent]=callback},invoke:(object,callback)=>{for(let i=0;i<length;i++){let key=keys[i];if(hasOwnProperty.call(object,key)){return intents[key](object[key],callback)}}}};const create=(node,type)=>doc(node).createElement(type);const doc=node=>node.ownerDocument||node;const fragment=node=>doc(node).createDocumentFragment();const text=(node,text)=>doc(node).createTextNode(text);const spaces=" \\f\\n\\r\\t";const almostEverything="[^ "+spaces+"\\/>\"'=]+";const attrName="[ "+spaces+"]+"+almostEverything;const tagName="<([A-Za-z]+[A-Za-z0-9:_-]*)((?:";const attrPartials="(?:=(?:'[^']*?'|\"[^\"]*?\"|<[^>]*?>|"+almostEverything+"))?)";const attrSeeker=new RegExp(tagName+attrName+attrPartials+"+)([ "+spaces+"]*/?>)","g");const selfClosing=new RegExp(tagName+attrName+attrPartials+"*)([ "+spaces+"]*/>)","g");const testFragment=fragment(document);const hasAppend="append"in testFragment;const hasContent="content"in create(document,"template");testFragment.appendChild(text(testFragment,"g"));testFragment.appendChild(text(testFragment,""));const hasDoomedCloneNode=testFragment.cloneNode(true).childNodes.length===1;const hasImportNode="importNode"in document;const append=hasAppend?(node,childNodes)=>{node.append.apply(node,childNodes)}:(node,childNodes)=>{const length=childNodes.length;for(let i=0;i<length;i++){node.appendChild(childNodes[i])}};const findAttributes=new RegExp("("+attrName+"=)(['\"]?)"+UIDC+"\\2","gi");const comments=($0,$1,$2,$3)=>"<"+$1+$2.replace(findAttributes,replaceAttributes)+$3;const replaceAttributes=($0,$1,$2)=>$1+($2||'"')+UID+($2||'"');const createFragment=(node,html)=>(OWNER_SVG_ELEMENT in node?SVGFragment:HTMLFragment)(node,html.replace(attrSeeker,comments));const cloneNode=hasDoomedCloneNode?node=>{const clone=node.cloneNode();const childNodes=node.childNodes||[];const length=childNodes.length;for(let i=0;i<length;i++){clone.appendChild(cloneNode(childNodes[i]))}return clone}:node=>node.cloneNode(true);const importNode=hasImportNode?(doc$$1,node)=>doc$$1.importNode(node,true):(doc$$1,node)=>cloneNode(node);const slice=[].slice;const unique=template=>TL(template);let TL=template=>{if(template.propertyIsEnumerable("raw")||/Firefox\/(\d+)/.test((G.navigator||{}).userAgent)&&parseFloat(RegExp.$1)<55){const templateObjects={};TL=(template=>{const key="_"+template.join(UID);return templateObjects[key]||(templateObjects[key]=template)})}else{TL=(template=>template)}return TL(template)};const HTMLFragment=hasContent?(node,html)=>{const container=create(node,"template");container.innerHTML=html;return container.content}:(node,html)=>{const container=create(node,"template");const content=fragment(node);if(/^[^\S]*?<(col(?:group)?|t(?:head|body|foot|r|d|h))/i.test(html)){const selector=RegExp.$1;container.innerHTML="<table>"+html+"</table>";append(content,slice.call(container.querySelectorAll(selector)))}else{container.innerHTML=html;append(content,slice.call(container.childNodes))}return content};const SVGFragment=hasContent?(node,html)=>{const content=fragment(node);const container=doc(node).createElementNS(SVG_NAMESPACE,"svg");container.innerHTML=html;append(content,slice.call(container.childNodes));return content}:(node,html)=>{const content=fragment(node);const container=create(node,"div");container.innerHTML='<svg xmlns="'+SVG_NAMESPACE+'">'+html+"</svg>";append(content,slice.call(container.firstChild.childNodes));return content};function Wire(childNodes){this.childNodes=childNodes;this.length=childNodes.length;this.first=childNodes[0];this.last=childNodes[this.length-1]}Wire.prototype.insert=function insert(){const df=fragment(this.first);append(df,this.childNodes);return df};Wire.prototype.remove=function remove(){const first=this.first;const last=this.last;if(this.length===2){last.parentNode.removeChild(last)}else{const range=doc(first).createRange();range.setStartBefore(this.childNodes[1]);range.setEndAfter(last);range.deleteContents()}return first};const createPath=node=>{const path=[];let parentNode;switch(node.nodeType){case ELEMENT_NODE:case DOCUMENT_FRAGMENT_NODE:parentNode=node;break;case COMMENT_NODE:parentNode=node.parentNode;prepend(path,parentNode,node);break;default:parentNode=node.ownerElement;break}for(node=parentNode;parentNode=parentNode.parentNode;node=parentNode){prepend(path,parentNode,node)}return path};const prepend=(path,parent,node)=>{path.unshift(path.indexOf.call(parent.childNodes,node))};var Path={create:(type,node,name)=>({type:type,name:name,node:node,path:createPath(node)}),find:(node,path)=>{const length=path.length;for(let i=0;i<length;i++){node=node.childNodes[path[i]]}return node}};const IS_NON_DIMENSIONAL=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;var Style=(node,original,isSVG)=>{if(isSVG){const style=original.cloneNode(true);style.value="";node.setAttributeNode(style);return update(style,isSVG)}return update(node.style,isSVG)};const update=(style,isSVG)=>{let oldType,oldValue;return newValue=>{switch(typeof newValue){case"object":if(newValue){if(oldType==="object"){if(!isSVG){if(oldValue!==newValue){for(const key in oldValue){if(!(key in newValue)){style[key]=""}}}}}else{if(isSVG)style.value="";else style.cssText=""}const info=isSVG?{}:style;for(const key in newValue){const value=newValue[key];info[key]=typeof value==="number"&&!IS_NON_DIMENSIONAL.test(key)?value+"px":value}oldType="object";if(isSVG)style.value=toStyle(oldValue=info);else oldValue=newValue;break}default:if(oldValue!=newValue){oldType="string";oldValue=newValue;if(isSVG)style.value=newValue||"";else style.cssText=newValue||""}break}}};const hyphen=/([^A-Z])([A-Z]+)/g;const ized=($0,$1,$2)=>$1+"-"+$2.toLowerCase();const toStyle=object=>{const css=[];for(const key in object){css.push(key.replace(hyphen,ized),":",object[key],";")}return css.join("")};const identity=O=>O;const remove=(parentNode,before,after)=>{const range=parentNode.ownerDocument.createRange();range.setStartBefore(before);range.setEndAfter(after);range.deleteContents()};const domdiff=(parentNode,currentNodes,futureNodes,getNode,beforeNode)=>{const get=getNode||identity;const before=beforeNode==null?null:get(beforeNode,0);let currentStart=0,futureStart=0;let currentEnd=currentNodes.length-1;let currentStartNode=currentNodes[0];let currentEndNode=currentNodes[currentEnd];let futureEnd=futureNodes.length-1;let futureStartNode=futureNodes[0];let futureEndNode=futureNodes[futureEnd];while(currentStart<=currentEnd&&futureStart<=futureEnd){if(currentStartNode==null){currentStartNode=currentNodes[++currentStart]}else if(currentEndNode==null){currentEndNode=currentNodes[--currentEnd]}else if(futureStartNode==null){futureStartNode=futureNodes[++futureStart]}else if(futureEndNode==null){futureEndNode=futureNodes[--futureEnd]}else if(currentStartNode==futureStartNode){currentStartNode=currentNodes[++currentStart];futureStartNode=futureNodes[++futureStart]}else if(currentEndNode==futureEndNode){currentEndNode=currentNodes[--currentEnd];futureEndNode=futureNodes[--futureEnd]}else if(currentStartNode==futureEndNode){parentNode.insertBefore(get(currentStartNode,1),get(currentEndNode,-0).nextSibling);currentStartNode=currentNodes[++currentStart];futureEndNode=futureNodes[--futureEnd]}else if(currentEndNode==futureStartNode){parentNode.insertBefore(get(currentEndNode,1),get(currentStartNode,0));currentEndNode=currentNodes[--currentEnd];futureStartNode=futureNodes[++futureStart]}else{let index=currentNodes.indexOf(futureStartNode);if(index<0){parentNode.insertBefore(get(futureStartNode,1),get(currentStartNode,0));futureStartNode=futureNodes[++futureStart]}else{let i=index;let f=futureStart;while(i<=currentEnd&&f<=futureEnd&&currentNodes[i]===futureNodes[f]){i++;f++}if(1<i-index){if(--index===currentStart){parentNode.removeChild(get(currentStartNode,-1))}else{remove(parentNode,get(currentStartNode,-1),get(currentNodes[index],-1))}currentStart=i;futureStart=f;currentStartNode=currentNodes[i];futureStartNode=futureNodes[f]}else{const el=currentNodes[index];currentNodes[index]=null;parentNode.insertBefore(get(el,1),get(currentStartNode,0));futureStartNode=futureNodes[++futureStart]}}}}if(currentStart<=currentEnd||futureStart<=futureEnd){if(currentStart>currentEnd){const pin=futureNodes[futureEnd+1];const place=pin==null?before:get(pin,0);if(futureStart===futureEnd){parentNode.insertBefore(get(futureNodes[futureStart],1),place)}else{const fragment=parentNode.ownerDocument.createDocumentFragment();while(futureStart<=futureEnd){fragment.appendChild(get(futureNodes[futureStart++],1))}parentNode.insertBefore(fragment,place)}}else{if(currentNodes[currentStart]==null)currentStart++;if(currentStart===currentEnd){parentNode.removeChild(get(currentNodes[currentStart],-1))}else{remove(parentNode,get(currentNodes[currentStart],-1),get(currentNodes[currentEnd],-1))}}}return futureNodes};const components=new WeakSet;function Cache(){}Cache.prototype=Object.create(null);const asHTML=html=>({html:html});const asNode=(item,i)=>{return"ELEMENT_NODE"in item?item:item.constructor===Wire?1/i<0?i?item.remove():item.last:i?item.insert():item.first:asNode(item.render(),i)};const canDiff=value=>"ELEMENT_NODE"in value||value instanceof Wire||value instanceof Component;const create$1=(root,paths)=>{const updates=[];const length=paths.length;for(let i=0;i<length;i++){const info=paths[i];const node=Path.find(root,info.path);switch(info.type){case"any":updates.push(setAnyContent(node,[]));break;case"attr":updates.push(setAttribute(node,info.name,info.node));break;case"text":updates.push(setTextContent(node));node.textContent="";break}}return updates};const find=(node,paths,parts)=>{const childNodes=node.childNodes;const length=childNodes.length;for(let i=0;i<length;i++){let child=childNodes[i];switch(child.nodeType){case ELEMENT_NODE:findAttributes$1(child,paths,parts);find(child,paths,parts);break;case COMMENT_NODE:if(child.textContent===UID){parts.shift();paths.push(SHOULD_USE_TEXT_CONTENT.test(node.nodeName)?Path.create("text",node):Path.create("any",child))}break;case TEXT_NODE:if(SHOULD_USE_TEXT_CONTENT.test(node.nodeName)&&trim.call(child.textContent)===UIDC){parts.shift();paths.push(Path.create("text",node))}break}}};const findAttributes$1=(node,paths,parts)=>{const cache=new Cache;const attributes=node.attributes;const array=slice.call(attributes);const remove=[];const length=array.length;for(let i=0;i<length;i++){const attribute=array[i];if(attribute.value===UID){const name=attribute.name;if(!(name in cache)){const realName=parts.shift().replace(/^(?:|[\S\s]*?\s)(\S+?)=['"]?$/,"$1");cache[name]=attributes[realName]||attributes[realName.toLowerCase()];paths.push(Path.create("attr",cache[name],realName))}remove.push(attribute)}}const len=remove.length;for(let i=0;i<len;i++){const attribute=remove[i];if(/^id$/i.test(attribute.name))node.removeAttribute(attribute.name);else node.removeAttributeNode(remove[i])}const nodeName=node.nodeName;if(/^script$/i.test(nodeName)){const script=document.createElement(nodeName);for(let i=0;i<attributes.length;i++){script.setAttributeNode(attributes[i].cloneNode(true))}script.textContent=node.textContent;node.parentNode.replaceChild(script,node)}};const invokeAtDistance=(value,callback)=>{callback(value.placeholder);if("text"in value){Promise.resolve(value.text).then(String).then(callback)}else if("any"in value){Promise.resolve(value.any).then(callback)}else if("html"in value){Promise.resolve(value.html).then(asHTML).then(callback)}else{Promise.resolve(Intent.invoke(value,callback)).then(callback)}};const isPromise_ish=value=>value!=null&&"then"in value;const setAnyContent=(node,childNodes)=>{let fastPath=false;let oldValue;const anyContent=value=>{switch(typeof value){case"string":case"number":case"boolean":if(fastPath){if(oldValue!==value){oldValue=value;childNodes[0].textContent=value}}else{fastPath=true;oldValue=value;childNodes=domdiff(node.parentNode,childNodes,[text(node,value)],asNode,node)}break;case"object":case"undefined":if(value==null){fastPath=false;childNodes=domdiff(node.parentNode,childNodes,[],asNode,node);break}default:fastPath=false;oldValue=value;if(isArray(value)){if(value.length===0){if(childNodes.length){childNodes=domdiff(node.parentNode,childNodes,[],asNode,node)}}else{switch(typeof value[0]){case"string":case"number":case"boolean":anyContent({html:value});break;case"object":if(isArray(value[0])){value=value.concat.apply([],value)}if(isPromise_ish(value[0])){Promise.all(value).then(anyContent);break}default:childNodes=domdiff(node.parentNode,childNodes,value,asNode,node);break}}}else if(canDiff(value)){childNodes=domdiff(node.parentNode,childNodes,value.nodeType===DOCUMENT_FRAGMENT_NODE?slice.call(value.childNodes):[value],asNode,node)}else if(isPromise_ish(value)){value.then(anyContent)}else if("placeholder"in value){invokeAtDistance(value,anyContent)}else if("text"in value){anyContent(String(value.text))}else if("any"in value){anyContent(value.any)}else if("html"in value){childNodes=domdiff(node.parentNode,childNodes,slice.call(createFragment(node,[].concat(value.html).join("")).childNodes),asNode,node)}else if("length"in value){anyContent(slice.call(value))}else{anyContent(Intent.invoke(value,anyContent))}break}};return anyContent};const setAttribute=(node,name,original)=>{const isSVG=OWNER_SVG_ELEMENT in node;let oldValue;if(name==="style"){return Style(node,original,isSVG)}else if(/^on/.test(name)){let type=name.slice(2);if(type===CONNECTED||type===DISCONNECTED){if(notObserving){notObserving=false;observe()}components.add(node)}else if(name.toLowerCase()in node){type=type.toLowerCase()}return newValue=>{if(oldValue!==newValue){if(oldValue)node.removeEventListener(type,oldValue,false);oldValue=newValue;if(newValue)node.addEventListener(type,newValue,false)}}}else if(name==="data"||!isSVG&&name in node){return newValue=>{if(oldValue!==newValue){oldValue=newValue;if(node[name]!==newValue){node[name]=newValue;if(newValue==null){node.removeAttribute(name)}}}}}else{let owner=false;const attribute=original.cloneNode(true);return newValue=>{if(oldValue!==newValue){oldValue=newValue;if(attribute.value!==newValue){if(newValue==null){if(owner){owner=false;node.removeAttributeNode(attribute)}attribute.value=newValue}else{attribute.value=newValue;if(!owner){owner=true;node.setAttributeNode(attribute)}}}}}}};const setTextContent=node=>{let oldValue;const textContent=value=>{if(oldValue!==value){oldValue=value;if(typeof value==="object"&&value){if(isPromise_ish(value)){value.then(textContent)}else if("placeholder"in value){invokeAtDistance(value,textContent)}else if("text"in value){textContent(String(value.text))}else if("any"in value){textContent(value.any)}else if("html"in value){textContent([].concat(value.html).join(""))}else if("length"in value){textContent(slice.call(value).join(""))}else{textContent(Intent.invoke(value,textContent))}}else{node.textContent=value==null?"":value}}};return textContent};var Updates={create:create$1,find:find};let notObserving=true;function observe(){const dispatchAll=(nodes,type)=>{const event=new Event(type);const length=nodes.length;for(let i=0;i<length;i++){let node=nodes[i];if(node.nodeType===ELEMENT_NODE){dispatchTarget(node,event)}}};const dispatchTarget=(node,event)=>{if(components.has(node)){node.dispatchEvent(event)}const children=node.children;const length=children.length;for(let i=0;i<length;i++){dispatchTarget(children[i],event)}};try{new MutationObserver(records=>{const length=records.length;for(let i=0;i<length;i++){let record=records[i];dispatchAll(record.removedNodes,DISCONNECTED);dispatchAll(record.addedNodes,CONNECTED)}}).observe(document,{subtree:true,childList:true})}catch(o_O){document.addEventListener("DOMNodeRemoved",event=>{dispatchAll([event.target],DISCONNECTED)},false);document.addEventListener("DOMNodeInserted",event=>{dispatchAll([event.target],CONNECTED)},false)}}const bewitched=new WeakMap;const templates=new Map;function render(template){const wicked=bewitched.get(this);if(wicked&&wicked.template===unique(template)){update$1.apply(wicked.updates,arguments)}else{upgrade.apply(this,arguments)}return this}function upgrade(template){template=unique(template);const info=templates.get(template)||createTemplate.call(this,template);const fragment=importNode(this.ownerDocument,info.fragment);const updates=Updates.create(fragment,info.paths);bewitched.set(this,{template:template,updates:updates});update$1.apply(updates,arguments);this.textContent="";this.appendChild(fragment)}function update$1(){const length=arguments.length;for(let i=1;i<length;i++){this[i-1](arguments[i])}}function createTemplate(template){const paths=[];const html=template.join(UIDC).replace(SC_RE,SC_PLACE);const fragment=createFragment(this,html);Updates.find(fragment,paths,template.slice());const info={fragment:fragment,paths:paths};templates.set(template,info);return info}const SC_RE=selfClosing;const SC_PLACE=($0,$1,$2)=>{return VOID_ELEMENTS.test($1)?$0:"<"+$1+$2+"></"+$1+">"};const wires=new WeakMap;const wire=(obj,type)=>obj==null?content(type||"html"):weakly(obj,type||"html");const content=type=>{let wire,container,content,template,updates;return function(statics){statics=unique(statics);let setup=template!==statics;if(setup){template=statics;content=fragment(document);container=type==="svg"?document.createElementNS(SVG_NAMESPACE,"svg"):content;updates=render.bind(container)}updates.apply(null,arguments);if(setup){if(type==="svg"){append(content,slice.call(container.childNodes))}wire=wireContent(content)}return wire}};const weakly=(obj,type)=>{const i=type.indexOf(":");let wire=wires.get(obj);let id=type;if(-1<i){id=type.slice(i+1);type=type.slice(0,i)||"html"}if(!wire)wires.set(obj,wire={});return wire[id]||(wire[id]=content(type))};const wireContent=node=>{const childNodes=node.childNodes;const length=childNodes.length;const wireNodes=[];for(let i=0;i<length;i++){let child=childNodes[i];if(child.nodeType===ELEMENT_NODE||trim.call(child.textContent).length!==0){wireNodes.push(child)}}return wireNodes.length===1?wireNodes[0]:new Wire(wireNodes)};const bind=context=>render.bind(context);const define=Intent.define;hyper.Component=Component;hyper.bind=bind;hyper.define=define;hyper.diff=domdiff;hyper.hyper=hyper;hyper.wire=wire;setup(content);function hyper(HTML){return arguments.length<2?HTML==null?content("html"):typeof HTML==="string"?hyper.wire(null,HTML):"raw"in HTML?content("html")(HTML):"nodeType"in HTML?hyper.bind(HTML):weakly(HTML,"html"):("raw"in HTML?content("html"):hyper.wire).apply(null,arguments)}const defineProperty=Object.defineProperty;class HyperHTMLElement extends HTMLElement{static define(name){const Class=this;const proto=Class.prototype;(Class.observedAttributes||[]).forEach(name=>{if(!(name in proto))defineProperty(proto,name.replace(/-([a-z])/g,($0,$1)=>$1.toUpperCase()),{configurable:true,get(){return this.getAttribute(name)},set(value){this.setAttribute(name,value)}})});const onChanged=proto.attributeChangedCallback;const hasChange=!!onChanged;const created=proto.created;if(created){defineProperty(proto,"_init$",{configurable:true,writable:true,value:true});defineProperty(proto,"attributeChangedCallback",{configurable:true,value(name,prev,curr){if(this._init$){checkReady.call(this,created)}if(hasChange&&prev!==curr){onChanged.apply(this,arguments)}}});const onConnected=proto.connectedCallback;const hasConnect=!!onConnected;defineProperty(proto,"connectedCallback",{configurable:true,value(){if(this._init$){checkReady.call(this,created)}if(hasConnect){onConnected.apply(this,arguments)}}})}else if(hasChange){defineProperty(proto,"attributeChangedCallback",{configurable:true,value(name,prev,curr){if(prev!==curr){onChanged.apply(this,arguments)}}})}Object.getOwnPropertyNames(proto).forEach(key=>{if(/^handle[A-Z]/.test(key)){const _key$="_"+key+"$";const method=proto[key];defineProperty(proto,key,{configurable:true,get(){return this[_key$]||(this[_key$]=method.bind(this))}})}});if(!("handleEvent"in proto)){defineProperty(proto,"handleEvent",{configurable:true,value(event){this[(event.currentTarget.dataset||{}).call||"on"+event.type](event)}})}customElements.define(name,Class);return Class}get html(){return this._html$||(this.html=bind(this.shadowRoot||this._shadowRoot||this))}set html(value){defineProperty(this,"_html$",{configurable:true,value:value})}render(){}get defaultState(){return{}}get state(){return this._state$||(this.state=this.defaultState)}set state(value){defineProperty(this,"_state$",{configurable:true,value:value})}setState(state,render){const target=this.state;const source=typeof state==="function"?state.call(this,target):state;for(const key in source)target[key]=source[key];if(render!==false)this.render();return this}}HyperHTMLElement.Component=Component;HyperHTMLElement.bind=bind;HyperHTMLElement.intent=define;HyperHTMLElement.wire=wire;HyperHTMLElement.hyper=hyper;const dom={handleEvent:function(e){if(dom.ready){document.removeEventListener(e.type,dom,false);dom.list.splice(0).forEach(function(fn){fn()})}},get ready(){return document.readyState==="complete"},list:[]};if(!dom.ready){document.addEventListener("DOMContentLoaded",dom,false)}function checkReady(created){if(dom.ready||isReady.call(this,created)){if(this._init$){created.call(defineProperty(this,"_init$",{value:false}))}}else{dom.list.push(checkReady.bind(this,created))}}function isReady(created){let el=this;do{if(el.nextSibling)return true}while(el=el.parentNode);setTimeout(checkReady.bind(this,created));return false}class MyTodo extends HyperHTMLElement{created(){this.attachShadow({mode:"open"});this._list=[{id:0,text:"my initial todo",checked:false},{id:1,text:"Learn about Web Components",checked:true}];this._addItem=(e=>this.addItem(e));this._removeItem=(e=>this.removeItem(e));this._toggleItem=(e=>this.toggleItem(e));this.render()}addItem(e){this._list=[...this._list,{id:this._list.length,text:e.detail,checked:false}];this.render()}removeItem(e){this._list.splice(e.detail,1);this.render()}toggleItem(e){const item=this._list[e.detail];this._list[e.detail]=Object.assign({},item,{checked:!item.checked});this.render()}render(){return this.html`
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
        <h1>Todos WC</h1>
        <section>
            <todo-input onsubmit=${this._addItem}></todo-input>
            <ul id="list-container">
            ${this._list.map((item,index)=>HyperHTMLElement.wire(item)`<todo-item index="${index}" 
                                                                                text="${item.text}" 
                                                                                checked="${item.checked}" 
                                                                                onremoved="${this._removeItem}"
                                                                                onchecked="${this._toggleItem}"></todo-item>`)}
            </ul>
        </section>
        `}}MyTodo.define("my-todo");class TodoInput extends HyperHTMLElement{created(){this.attachShadow({mode:"open"});this.state={value:""};this._handleSubmit=(e=>this.handleSubmit(e));this._handleInput=(e=>this.handleInput(e));this.render()}handleInput(e){this.state={value:e.target.value}}handleSubmit(e){e.preventDefault();if(!this.state.value)return;this.dispatchEvent(new CustomEvent("submit",{detail:this.state.value}));this.$input=this.shadowRoot.querySelector("#new-todo");this.$input.value="";this.$input.blur()}render(){return this.html`
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
    <form id="new-todo-form" onsubmit=${this._handleSubmit}>
        <input id="new-todo" type="text" placeholder="What needs to be done?" oninput=${this._handleInput} value="${this.state.value}"/>
    </form>
        `}}TodoInput.define("todo-input");class TodoItem extends HyperHTMLElement{created(){this._handleOnChecked=(e=>this.handleOnChecked(e));this._handleOnRemoved=(e=>this.handleOnRemoved(e));this.render()}static get observedAttributes(){return["text","checked","index"]}attributeChangedCallback(name,oldValue,newValue){this[name]=newValue;this.render()}handleOnRemoved(e){this.dispatchEvent(new CustomEvent("removed",{detail:this.index,bubbles:true}))}handleOnChecked(e){this.dispatchEvent(new CustomEvent("checked",{detail:this.index,bubbles:true}))}render(){if(typeof this.text!=="string"||typeof this.checked!=="string"){return}return this.html`
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
        height: auto;
        position: absolute;
        top: 9px;
        bottom: 0;
        margin: auto 0;
        border: none;
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
    <input type="checkbox" checked=${this.checked==="true"} onchange=${this._handleOnChecked}>
    <label>${this.text}</label>
    <button class="destroy" onclick=${this._handleOnRemoved}>x</button>
</li>
        `}}TodoItem.define("todo-item");