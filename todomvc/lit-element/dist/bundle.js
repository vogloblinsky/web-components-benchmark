window.JSCompiler_renameProperty=function(prop,obj){return prop};let dedupeId=0;const dedupingMixin=function(mixin){let mixinApplications=mixin.__mixinApplications;if(!mixinApplications){mixinApplications=new WeakMap;mixin.__mixinApplications=mixinApplications}let mixinDedupeId=dedupeId++;function dedupingMixin(base){let baseSet=base.__mixinSet;if(baseSet&&baseSet[mixinDedupeId]){return base}let map=mixinApplications;let extended=map.get(base);if(!extended){extended=mixin(base);map.set(base,extended)}let mixinSet=Object.create(extended.__mixinSet||baseSet||null);mixinSet[mixinDedupeId]=true;extended.__mixinSet=mixinSet;return extended}return dedupingMixin};let microtaskCurrHandle=0;let microtaskLastHandle=0;let microtaskCallbacks=[];let microtaskNodeContent=0;let microtaskNode=document.createTextNode("");new window.MutationObserver(microtaskFlush).observe(microtaskNode,{characterData:true});function microtaskFlush(){const len=microtaskCallbacks.length;for(let i=0;i<len;i++){let cb=microtaskCallbacks[i];if(cb){try{cb()}catch(e){setTimeout(()=>{throw e})}}}microtaskCallbacks.splice(0,len);microtaskLastHandle+=len}const microTask={run(callback){microtaskNode.textContent=microtaskNodeContent++;microtaskCallbacks.push(callback);return microtaskCurrHandle++},cancel(handle){const idx=handle-microtaskLastHandle;if(idx>=0){if(!microtaskCallbacks[idx]){throw new Error("invalid async handle: "+handle)}microtaskCallbacks[idx]=null}}};const microtask=microTask;const PropertiesChanged=dedupingMixin(superClass=>{class PropertiesChanged extends superClass{static createProperties(props){const proto=this.prototype;for(let prop in props){if(!(prop in proto)){proto._createPropertyAccessor(prop)}}}static attributeNameForProperty(property){return property.toLowerCase()}static typeForProperty(name){}_createPropertyAccessor(property,readOnly){this._addPropertyToAttributeMap(property);if(!this.hasOwnProperty("__dataHasAccessor")){this.__dataHasAccessor=Object.assign({},this.__dataHasAccessor)}if(!this.__dataHasAccessor[property]){this.__dataHasAccessor[property]=true;this._definePropertyAccessor(property,readOnly)}}_addPropertyToAttributeMap(property){if(!this.hasOwnProperty("__dataAttributes")){this.__dataAttributes=Object.assign({},this.__dataAttributes)}if(!this.__dataAttributes[property]){const attr=this.constructor.attributeNameForProperty(property);this.__dataAttributes[attr]=property}}_definePropertyAccessor(property,readOnly){Object.defineProperty(this,property,{get(){return this._getProperty(property)},set:readOnly?function(){}:function(value){this._setProperty(property,value)}})}constructor(){super();this.__dataEnabled=false;this.__dataReady=false;this.__dataInvalid=false;this.__data={};this.__dataPending=null;this.__dataOld=null;this.__dataInstanceProps=null;this.__serializing=false;this._initializeProperties()}ready(){this.__dataReady=true;this._flushProperties()}_initializeProperties(){for(let p in this.__dataHasAccessor){if(this.hasOwnProperty(p)){this.__dataInstanceProps=this.__dataInstanceProps||{};this.__dataInstanceProps[p]=this[p];delete this[p]}}}_initializeInstanceProperties(props){Object.assign(this,props)}_setProperty(property,value){if(this._setPendingProperty(property,value)){this._invalidateProperties()}}_getProperty(property){return this.__data[property]}_setPendingProperty(property,value,ext){let old=this.__data[property];let changed=this._shouldPropertyChange(property,value,old);if(changed){if(!this.__dataPending){this.__dataPending={};this.__dataOld={}}if(this.__dataOld&&!(property in this.__dataOld)){this.__dataOld[property]=old}this.__data[property]=value;this.__dataPending[property]=value}return changed}_invalidateProperties(){if(!this.__dataInvalid&&this.__dataReady){this.__dataInvalid=true;microtask.run(()=>{if(this.__dataInvalid){this.__dataInvalid=false;this._flushProperties()}})}}_enableProperties(){if(!this.__dataEnabled){this.__dataEnabled=true;if(this.__dataInstanceProps){this._initializeInstanceProperties(this.__dataInstanceProps);this.__dataInstanceProps=null}this.ready()}}_flushProperties(){const props=this.__data;const changedProps=this.__dataPending;const old=this.__dataOld;if(this._shouldPropertiesChange(props,changedProps,old)){this.__dataPending=null;this.__dataOld=null;this._propertiesChanged(props,changedProps,old)}}_shouldPropertiesChange(currentProps,changedProps,oldProps){return Boolean(changedProps)}_propertiesChanged(currentProps,changedProps,oldProps){}_shouldPropertyChange(property,value,old){return old!==value&&(old===old||value===value)}attributeChangedCallback(name,old,value){if(old!==value){this._attributeToProperty(name,value)}if(super.attributeChangedCallback){super.attributeChangedCallback(name,old,value)}}_attributeToProperty(attribute,value,type){if(!this.__serializing){const map=this.__dataAttributes;const property=map&&map[attribute]||attribute;this[property]=this._deserializeValue(value,type||this.constructor.typeForProperty(property))}}_propertyToAttribute(property,attribute,value){this.__serializing=true;value=arguments.length<3?this[property]:value;this._valueToNodeAttribute(this,value,attribute||this.constructor.attributeNameForProperty(property));this.__serializing=false}_valueToNodeAttribute(node,value,attribute){const str=this._serializeValue(value);if(str===undefined){node.removeAttribute(attribute)}else{node.setAttribute(attribute,str)}}_serializeValue(value){switch(typeof value){case"boolean":return value?"":undefined;default:return value!=null?value.toString():undefined}}_deserializeValue(value,type){switch(type){case Boolean:return value!==null;case Number:return Number(value);default:return value}}}return PropertiesChanged});function normalizeProperties(props){const output={};for(let p in props){const o=props[p];output[p]=typeof o==="function"?{type:o}:o}return output}const PropertiesMixin=dedupingMixin(superClass=>{const base=PropertiesChanged(superClass);function superPropertiesClass(constructor){const superCtor=Object.getPrototypeOf(constructor);return superCtor.prototype instanceof PropertiesMixin?superCtor:null}function ownProperties(constructor){if(!constructor.hasOwnProperty(JSCompiler_renameProperty("__ownProperties",constructor))){let props=null;if(constructor.hasOwnProperty(JSCompiler_renameProperty("properties",constructor))&&constructor.properties){props=normalizeProperties(constructor.properties)}constructor.__ownProperties=props}return constructor.__ownProperties}class PropertiesMixin extends base{static get observedAttributes(){const props=this._properties;return props?Object.keys(props).map(p=>this.attributeNameForProperty(p)):[]}static finalize(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__finalized",this))){const superCtor=superPropertiesClass(this);if(superCtor){superCtor.finalize()}this.__finalized=true;this._finalizeClass()}}static _finalizeClass(){const props=ownProperties(this);if(props){this.createProperties(props)}}static get _properties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("__properties",this))){const superCtor=superPropertiesClass(this);this.__properties=Object.assign({},superCtor&&superCtor._properties,ownProperties(this))}return this.__properties}static typeForProperty(name){const info=this._properties[name];return info&&info.type}_initializeProperties(){this.constructor.finalize();super._initializeProperties()}connectedCallback(){if(super.connectedCallback){super.connectedCallback()}this._enableProperties()}disconnectedCallback(){if(super.disconnectedCallback){super.disconnectedCallback()}}}return PropertiesMixin});const templateCaches=new Map;class TemplateResult{constructor(strings,values,type,partCallback=defaultPartCallback){this.strings=strings;this.values=values;this.type=type;this.partCallback=partCallback}getHTML(){const l=this.strings.length-1;let html="";let isTextBinding=true;for(let i=0;i<l;i++){const s=this.strings[i];html+=s;const closing=findTagClose(s);isTextBinding=closing>-1?closing<s.length:isTextBinding;html+=isTextBinding?nodeMarker:marker}html+=this.strings[l];return html}getTemplateElement(){const template=document.createElement("template");template.innerHTML=this.getHTML();return template}}function defaultTemplateFactory(result){let templateCache=templateCaches.get(result.type);if(templateCache===undefined){templateCache=new Map;templateCaches.set(result.type,templateCache)}let template=templateCache.get(result.strings);if(template===undefined){template=new Template(result,result.getTemplateElement());templateCache.set(result.strings,template)}return template}function render(result,container,templateFactory=defaultTemplateFactory){const template=templateFactory(result);let instance=container.__templateInstance;if(instance!==undefined&&instance.template===template&&instance._partCallback===result.partCallback){instance.update(result.values);return}instance=new TemplateInstance(template,result.partCallback,templateFactory);container.__templateInstance=instance;const fragment=instance._clone();instance.update(result.values);removeNodes(container,container.firstChild);container.appendChild(fragment)}const marker=`{{lit-${String(Math.random()).slice(2)}}}`;const nodeMarker=`\x3c!--${marker}--\x3e`;const markerRegex=new RegExp(`${marker}|${nodeMarker}`);const lastAttributeNameRegex=/[ \x09\x0a\x0c\x0d]([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)[ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*)$/;function findTagClose(str){const close=str.lastIndexOf(">");const open=str.indexOf("<",close+1);return open>-1?str.length:close}class TemplatePart{constructor(type,index,name,rawName,strings){this.type=type;this.index=index;this.name=name;this.rawName=rawName;this.strings=strings}}class Template{constructor(result,element){this.parts=[];this.element=element;const content=this.element.content;const walker=document.createTreeWalker(content,133,null,false);let index=-1;let partIndex=0;const nodesToRemove=[];let previousNode;let currentNode;while(walker.nextNode()){index++;previousNode=currentNode;const node=currentNode=walker.currentNode;if(node.nodeType===1){if(!node.hasAttributes()){continue}const attributes=node.attributes;let count=0;for(let i=0;i<attributes.length;i++){if(attributes[i].value.indexOf(marker)>=0){count++}}while(count-- >0){const stringForPart=result.strings[partIndex];const attributeNameInPart=lastAttributeNameRegex.exec(stringForPart)[1];const attribute=attributes.getNamedItem(attributeNameInPart);const stringsForAttributeValue=attribute.value.split(markerRegex);this.parts.push(new TemplatePart("attribute",index,attribute.name,attributeNameInPart,stringsForAttributeValue));node.removeAttribute(attribute.name);partIndex+=stringsForAttributeValue.length-1}}else if(node.nodeType===3){const nodeValue=node.nodeValue;if(nodeValue.indexOf(marker)<0){continue}const parent=node.parentNode;const strings=nodeValue.split(markerRegex);const lastIndex=strings.length-1;partIndex+=lastIndex;node.textContent=strings[lastIndex];for(let i=0;i<lastIndex;i++){parent.insertBefore(document.createTextNode(strings[i]),node);this.parts.push(new TemplatePart("node",index++))}}else if(node.nodeType===8&&node.nodeValue===marker){const parent=node.parentNode;const previousSibling=node.previousSibling;if(previousSibling===null||previousSibling!==previousNode||previousSibling.nodeType!==Node.TEXT_NODE){parent.insertBefore(document.createTextNode(""),node)}else{index--}this.parts.push(new TemplatePart("node",index++));nodesToRemove.push(node);if(node.nextSibling===null){parent.insertBefore(document.createTextNode(""),node)}else{index--}currentNode=previousNode;partIndex++}}for(const n of nodesToRemove){n.parentNode.removeChild(n)}}}const getValue=(part,value)=>{if(isDirective(value)){value=value(part);return directiveValue}return value===null?undefined:value};const directive=f=>{f.__litDirective=true;return f};const isDirective=o=>typeof o==="function"&&o.__litDirective===true;const directiveValue={};const isPrimitiveValue=value=>value===null||!(typeof value==="object"||typeof value==="function");class AttributePart{constructor(instance,element,name,strings){this.instance=instance;this.element=element;this.name=name;this.strings=strings;this.size=strings.length-1;this._previousValues=[]}_interpolate(values,startIndex){const strings=this.strings;const l=strings.length-1;let text="";for(let i=0;i<l;i++){text+=strings[i];const v=getValue(this,values[startIndex+i]);if(v&&v!==directiveValue&&(Array.isArray(v)||typeof v!=="string"&&v[Symbol.iterator])){for(const t of v){text+=t}}else{text+=v}}return text+strings[l]}_equalToPreviousValues(values,startIndex){for(let i=startIndex;i<startIndex+this.size;i++){if(this._previousValues[i]!==values[i]||!isPrimitiveValue(values[i])){return false}}return true}setValue(values,startIndex){if(this._equalToPreviousValues(values,startIndex)){return}const s=this.strings;let value;if(s.length===2&&s[0]===""&&s[1]===""){value=getValue(this,values[startIndex]);if(Array.isArray(value)){value=value.join("")}}else{value=this._interpolate(values,startIndex)}if(value!==directiveValue){this.element.setAttribute(this.name,value)}this._previousValues=values}}class NodePart{constructor(instance,startNode,endNode){this.instance=instance;this.startNode=startNode;this.endNode=endNode;this._previousValue=undefined}setValue(value){value=getValue(this,value);if(value===directiveValue){return}if(isPrimitiveValue(value)){if(value===this._previousValue){return}this._setText(value)}else if(value instanceof TemplateResult){this._setTemplateResult(value)}else if(Array.isArray(value)||value[Symbol.iterator]){this._setIterable(value)}else if(value instanceof Node){this._setNode(value)}else if(value.then!==undefined){this._setPromise(value)}else{this._setText(value)}}_insert(node){this.endNode.parentNode.insertBefore(node,this.endNode)}_setNode(value){if(this._previousValue===value){return}this.clear();this._insert(value);this._previousValue=value}_setText(value){const node=this.startNode.nextSibling;value=value===undefined?"":value;if(node===this.endNode.previousSibling&&node.nodeType===Node.TEXT_NODE){node.textContent=value}else{this._setNode(document.createTextNode(value))}this._previousValue=value}_setTemplateResult(value){const template=this.instance._getTemplate(value);let instance;if(this._previousValue&&this._previousValue.template===template){instance=this._previousValue}else{instance=new TemplateInstance(template,this.instance._partCallback,this.instance._getTemplate);this._setNode(instance._clone());this._previousValue=instance}instance.update(value.values)}_setIterable(value){if(!Array.isArray(this._previousValue)){this.clear();this._previousValue=[]}const itemParts=this._previousValue;let partIndex=0;for(const item of value){let itemPart=itemParts[partIndex];if(itemPart===undefined){let itemStart=this.startNode;if(partIndex>0){const previousPart=itemParts[partIndex-1];itemStart=previousPart.endNode=document.createTextNode("");this._insert(itemStart)}itemPart=new NodePart(this.instance,itemStart,this.endNode);itemParts.push(itemPart)}itemPart.setValue(item);partIndex++}if(partIndex===0){this.clear();this._previousValue=undefined}else if(partIndex<itemParts.length){const lastPart=itemParts[partIndex-1];itemParts.length=partIndex;this.clear(lastPart.endNode.previousSibling);lastPart.endNode=this.endNode}}_setPromise(value){this._previousValue=value;value.then(v=>{if(this._previousValue===value){this.setValue(v)}})}clear(startNode=this.startNode){removeNodes(this.startNode.parentNode,startNode.nextSibling,this.endNode)}}const defaultPartCallback=(instance,templatePart,node)=>{if(templatePart.type==="attribute"){return new AttributePart(instance,node,templatePart.name,templatePart.strings)}else if(templatePart.type==="node"){return new NodePart(instance,node,node.nextSibling)}throw new Error(`Unknown part type ${templatePart.type}`)};class TemplateInstance{constructor(template,partCallback,getTemplate){this._parts=[];this.template=template;this._partCallback=partCallback;this._getTemplate=getTemplate}update(values){let valueIndex=0;for(const part of this._parts){if(part.size===undefined){part.setValue(values[valueIndex]);valueIndex++}else{part.setValue(values,valueIndex);valueIndex+=part.size}}}_clone(){const fragment=document.importNode(this.template.element.content,true);const parts=this.template.parts;if(parts.length>0){const walker=document.createTreeWalker(fragment,133,null,false);let index=-1;for(let i=0;i<parts.length;i++){const part=parts[i];while(index<part.index){index++;walker.nextNode()}this._parts.push(this._partCallback(this,part,walker.currentNode))}}return fragment}}const reparentNodes=(container,start,end=null,before=null)=>{let node=start;while(node!==end){const n=node.nextSibling;container.insertBefore(node,before);node=n}};const removeNodes=(container,startNode,endNode=null)=>{let node=startNode;while(node!==endNode){const n=node.nextSibling;container.removeChild(node);node=n}};const html$1=(strings,...values)=>new TemplateResult(strings,values,"html",extendedPartCallback);const extendedPartCallback=(instance,templatePart,node)=>{if(templatePart.type==="attribute"){if(templatePart.rawName.startsWith("on-")){const eventName=templatePart.rawName.slice(3);return new EventPart(instance,node,eventName)}if(templatePart.name.endsWith("$")){const name=templatePart.name.slice(0,-1);return new AttributePart(instance,node,name,templatePart.strings)}if(templatePart.name.endsWith("?")){const name=templatePart.name.slice(0,-1);return new BooleanAttributePart(instance,node,name,templatePart.strings)}return new PropertyPart(instance,node,templatePart.rawName,templatePart.strings)}return defaultPartCallback(instance,templatePart,node)};class BooleanAttributePart extends AttributePart{setValue(values,startIndex){const s=this.strings;if(s.length===2&&s[0]===""&&s[1]===""){const value=getValue(this,values[startIndex]);if(value===directiveValue){return}if(value){this.element.setAttribute(this.name,"")}else{this.element.removeAttribute(this.name)}}else{throw new Error("boolean attributes can only contain a single expression")}}}class PropertyPart extends AttributePart{setValue(values,startIndex){const s=this.strings;let value;if(this._equalToPreviousValues(values,startIndex)){return}if(s.length===2&&s[0]===""&&s[1]===""){value=getValue(this,values[startIndex])}else{value=this._interpolate(values,startIndex)}if(value!==directiveValue){this.element[this.name]=value}this._previousValues=values}}class EventPart{constructor(instance,element,eventName){this.instance=instance;this.element=element;this.eventName=eventName}setValue(value){const listener=getValue(this,value);const previous=this._listener;if(listener===previous){return}this._listener=listener;if(previous!=null){this.element.removeEventListener(this.eventName,previous)}if(listener!=null){this.element.addEventListener(this.eventName,listener)}}}class LitElement extends(PropertiesMixin(HTMLElement)){constructor(){super(...arguments);this.__renderComplete=null;this.__resolveRenderComplete=null;this.__isInvalid=false}ready(){this.attachShadow({mode:"open"});super.ready()}_shouldPropertiesChange(_props,_changedProps,_prevProps){return true}_propertiesChanged(props,changedProps,prevProps){this.__isInvalid=false;super._propertiesChanged(props,changedProps,prevProps);const result=this.render(props);if(result){render(result,this.shadowRoot)}this.didRender(props,changedProps,prevProps);if(this.__resolveRenderComplete){this.__resolveRenderComplete()}}_flushProperties(){super._flushProperties();if(this.__dataPending){console.warn(`Setting properties in response to properties changing considered harmful. Offending properties: ${Object.keys(this.__dataPending)}.`)}}render(_props){throw new Error("render() not implemented")}didRender(_props,_changedProps,_prevProps){}invalidate(){this._invalidateProperties()}_invalidateProperties(){this.__isInvalid=true;super._invalidateProperties()}get renderComplete(){if(!this.__renderComplete){this.__renderComplete=new Promise(resolve=>{this.__resolveRenderComplete=(()=>{this.__resolveRenderComplete=this.__renderComplete=null;resolve()})});if(!this.__isInvalid&&this.__resolveRenderComplete){this.__resolveRenderComplete()}}return this.__renderComplete}}const keyMapCache=new WeakMap;function cleanMap(part,key,map){if(!part.startNode.parentNode){map.delete(key)}}function repeat(items,keyFnOrTemplate,template){let keyFn;if(arguments.length===2){template=keyFnOrTemplate}else if(arguments.length===3){keyFn=keyFnOrTemplate}return directive(part=>{if(!(part instanceof NodePart)){throw new Error("repeat can only be used on NodeParts")}let keyMap=keyMapCache.get(part);if(keyMap===undefined){keyMap=new Map;keyMapCache.set(part,keyMap)}const container=part.startNode.parentNode;let index=-1;let currentMarker=part.startNode.nextSibling;for(const item of items){let result;let key;try{++index;result=template(item,index);key=keyFn?keyFn(item):index}catch(e){console.error(e);continue}let itemPart=keyMap.get(key);if(itemPart===undefined){const marker=document.createTextNode("");const endNode=document.createTextNode("");container.insertBefore(marker,currentMarker);container.insertBefore(endNode,currentMarker);itemPart=new NodePart(part.instance,marker,endNode);if(key!==undefined){keyMap.set(key,itemPart)}}else if(currentMarker!==itemPart.startNode){const end=itemPart.endNode.nextSibling;if(currentMarker!==end){reparentNodes(container,itemPart.startNode,end,currentMarker)}}else{currentMarker=itemPart.endNode.nextSibling}itemPart.setValue(result)}if(currentMarker!==part.endNode){removeNodes(container,currentMarker,part.endNode);keyMap.forEach(cleanMap)}})}class MyTodo extends LitElement{static get properties(){return{list:Array}}constructor(){super();this.list=[{id:0,text:"my initial todo",checked:false},{id:1,text:"Learn about Web Components",checked:true}];this._addItem=(e=>this.addItem(e));this._removeItem=(e=>this.removeItem(e));this._toggleItem=(e=>this.toggleItem(e))}ready(){super.ready()}render(){return html$1`
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
    <todo-input on-submit=${this._addItem}></todo-input>
    <ul id="list-container">
        ${repeat(this.list,item=>item.id,(item,index)=>html$1`<todo-item 
                                    text="${item.text}" 
                                    checked="${item.checked}" 
                                    index="${index}" 
                                    on-removed=${this._removeItem}
                                    on-checked=${this._toggleItem}></todo-item>`)}
    </ul>
</section>`}addItem(e){this.list=[...this.list,{id:this.list.length,text:e.detail,checked:false}]}removeItem(e){this.list=[...this.list.slice(0,e.detail),...this.list.slice(e.detail+1)]}toggleItem(e){const item=this.list[e.detail];this.list[e.detail]=Object.assign({},item,{checked:!item.checked})}}window.customElements.define("my-todo",MyTodo);class TodoInput extends LitElement{static get properties(){return{newtodo:String}}constructor(){super();this._handleSubmit=(e=>this.handleSubmit(e));this._handleInput=(e=>this.handleInput(e))}ready(){super.ready()}render(){return html$1`
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
<form id="new-todo-form" on-submit=${this._handleSubmit}>
    <input id="new-todo" type="text" placeholder="What needs to be done?" value="" on-input=${this._handleInput}/>
</form>`}handleInput(e){this.newtodo=e.target.value}handleSubmit(e){e.preventDefault();this.dispatchEvent(new CustomEvent("submit",{detail:this.newtodo}));this.$input=this.shadowRoot.querySelector("#new-todo");this.$input.value="";this.$input.blur()}}window.customElements.define("todo-input",TodoInput);class TodoItem extends LitElement{static get properties(){return{checked:Boolean,index:Number,text:String}}constructor(){super();this.checked=false;this.text="";this.index=0;this._handleOnChecked=(e=>this.handleOnChecked(e));this._handleOnRemoved=(e=>this.handleOnRemoved(e))}ready(){super.ready()}render({checked:checked,index:index,text:text}){return html$1`
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
    <input type="checkbox" checked=${checked} on-change=${this._handleOnChecked}>
    <label>${text}</label>
    <button class="destroy" on-click=${this._handleOnRemoved}>x</button>
</li>`}handleOnRemoved(e){this.dispatchEvent(new CustomEvent("removed",{detail:this.index}))}handleOnChecked(e){this.dispatchEvent(new CustomEvent("checked",{detail:this.index}))}}window.customElements.define("todo-item",TodoItem);