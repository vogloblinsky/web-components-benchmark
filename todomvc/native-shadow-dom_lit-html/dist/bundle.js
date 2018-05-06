const templateCaches=new Map;class TemplateResult{constructor(strings,values,type,partCallback=defaultPartCallback){this.strings=strings;this.values=values;this.type=type;this.partCallback=partCallback}getHTML(){const l=this.strings.length-1;let html="";let isTextBinding=true;for(let i=0;i<l;i++){const s=this.strings[i];html+=s;const closing=findTagClose(s);isTextBinding=closing>-1?closing<s.length:isTextBinding;html+=isTextBinding?nodeMarker:marker}html+=this.strings[l];return html}getTemplateElement(){const template=document.createElement("template");template.innerHTML=this.getHTML();return template}}function defaultTemplateFactory(result){let templateCache=templateCaches.get(result.type);if(templateCache===undefined){templateCache=new Map;templateCaches.set(result.type,templateCache)}let template=templateCache.get(result.strings);if(template===undefined){template=new Template(result,result.getTemplateElement());templateCache.set(result.strings,template)}return template}function render(result,container,templateFactory=defaultTemplateFactory){const template=templateFactory(result);let instance=container.__templateInstance;if(instance!==undefined&&instance.template===template&&instance._partCallback===result.partCallback){instance.update(result.values);return}instance=new TemplateInstance(template,result.partCallback,templateFactory);container.__templateInstance=instance;const fragment=instance._clone();instance.update(result.values);removeNodes(container,container.firstChild);container.appendChild(fragment)}const marker=`{{lit-${String(Math.random()).slice(2)}}}`;const nodeMarker=`\x3c!--${marker}--\x3e`;const markerRegex=new RegExp(`${marker}|${nodeMarker}`);const lastAttributeNameRegex=/[ \x09\x0a\x0c\x0d]([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=/]+)[ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*)$/;function findTagClose(str){const close=str.lastIndexOf(">");const open=str.indexOf("<",close+1);return open>-1?str.length:close}class TemplatePart{constructor(type,index,name,rawName,strings){this.type=type;this.index=index;this.name=name;this.rawName=rawName;this.strings=strings}}class Template{constructor(result,element){this.parts=[];this.element=element;const content=this.element.content;const walker=document.createTreeWalker(content,133,null,false);let index=-1;let partIndex=0;const nodesToRemove=[];let previousNode;let currentNode;while(walker.nextNode()){index++;previousNode=currentNode;const node=currentNode=walker.currentNode;if(node.nodeType===1){if(!node.hasAttributes()){continue}const attributes=node.attributes;let count=0;for(let i=0;i<attributes.length;i++){if(attributes[i].value.indexOf(marker)>=0){count++}}while(count-- >0){const stringForPart=result.strings[partIndex];const attributeNameInPart=lastAttributeNameRegex.exec(stringForPart)[1];const attribute=attributes.getNamedItem(attributeNameInPart);const stringsForAttributeValue=attribute.value.split(markerRegex);this.parts.push(new TemplatePart("attribute",index,attribute.name,attributeNameInPart,stringsForAttributeValue));node.removeAttribute(attribute.name);partIndex+=stringsForAttributeValue.length-1}}else if(node.nodeType===3){const nodeValue=node.nodeValue;if(nodeValue.indexOf(marker)<0){continue}const parent=node.parentNode;const strings=nodeValue.split(markerRegex);const lastIndex=strings.length-1;partIndex+=lastIndex;for(let i=0;i<lastIndex;i++){parent.insertBefore(strings[i]===""?document.createComment(""):document.createTextNode(strings[i]),node);this.parts.push(new TemplatePart("node",index++))}parent.insertBefore(strings[lastIndex]===""?document.createComment(""):document.createTextNode(strings[lastIndex]),node);nodesToRemove.push(node)}else if(node.nodeType===8&&node.nodeValue===marker){const parent=node.parentNode;const previousSibling=node.previousSibling;if(previousSibling===null||previousSibling!==previousNode||previousSibling.nodeType!==Node.TEXT_NODE){parent.insertBefore(document.createComment(""),node)}else{index--}this.parts.push(new TemplatePart("node",index++));nodesToRemove.push(node);if(node.nextSibling===null){parent.insertBefore(document.createComment(""),node)}else{index--}currentNode=previousNode;partIndex++}}for(const n of nodesToRemove){n.parentNode.removeChild(n)}}}const getValue=(part,value)=>{if(isDirective(value)){value=value(part);return directiveValue}return value===null?undefined:value};const directive=f=>{f.__litDirective=true;return f};const isDirective=o=>typeof o==="function"&&o.__litDirective===true;const directiveValue={};const isPrimitiveValue=value=>value===null||!(typeof value==="object"||typeof value==="function");class AttributePart{constructor(instance,element,name,strings){this.instance=instance;this.element=element;this.name=name;this.strings=strings;this.size=strings.length-1;this._previousValues=[]}_interpolate(values,startIndex){const strings=this.strings;const l=strings.length-1;let text="";for(let i=0;i<l;i++){text+=strings[i];const v=getValue(this,values[startIndex+i]);if(v&&v!==directiveValue&&(Array.isArray(v)||typeof v!=="string"&&v[Symbol.iterator])){for(const t of v){text+=t}}else{text+=v}}return text+strings[l]}_equalToPreviousValues(values,startIndex){for(let i=startIndex;i<startIndex+this.size;i++){if(this._previousValues[i]!==values[i]||!isPrimitiveValue(values[i])){return false}}return true}setValue(values,startIndex){if(this._equalToPreviousValues(values,startIndex)){return}const s=this.strings;let value;if(s.length===2&&s[0]===""&&s[1]===""){value=getValue(this,values[startIndex]);if(Array.isArray(value)){value=value.join("")}}else{value=this._interpolate(values,startIndex)}if(value!==directiveValue){this.element.setAttribute(this.name,value)}this._previousValues=values}}class NodePart{constructor(instance,startNode,endNode){this.instance=instance;this.startNode=startNode;this.endNode=endNode;this._previousValue=undefined}setValue(value){value=getValue(this,value);if(value===directiveValue){return}if(isPrimitiveValue(value)){if(value===this._previousValue){return}this._setText(value)}else if(value instanceof TemplateResult){this._setTemplateResult(value)}else if(Array.isArray(value)||value[Symbol.iterator]){this._setIterable(value)}else if(value instanceof Node){this._setNode(value)}else if(value.then!==undefined){this._setPromise(value)}else{this._setText(value)}}_insert(node){this.endNode.parentNode.insertBefore(node,this.endNode)}_setNode(value){if(this._previousValue===value){return}this.clear();this._insert(value);this._previousValue=value}_setText(value){const node=this.startNode.nextSibling;value=value===undefined?"":value;if(node===this.endNode.previousSibling&&node.nodeType===Node.TEXT_NODE){node.textContent=value}else{this._setNode(document.createTextNode(value))}this._previousValue=value}_setTemplateResult(value){const template=this.instance._getTemplate(value);let instance;if(this._previousValue&&this._previousValue.template===template){instance=this._previousValue}else{instance=new TemplateInstance(template,this.instance._partCallback,this.instance._getTemplate);this._setNode(instance._clone());this._previousValue=instance}instance.update(value.values)}_setIterable(value){if(!Array.isArray(this._previousValue)){this.clear();this._previousValue=[]}const itemParts=this._previousValue;let partIndex=0;for(const item of value){let itemPart=itemParts[partIndex];if(itemPart===undefined){let itemStart=this.startNode;if(partIndex>0){const previousPart=itemParts[partIndex-1];itemStart=previousPart.endNode=document.createTextNode("");this._insert(itemStart)}itemPart=new NodePart(this.instance,itemStart,this.endNode);itemParts.push(itemPart)}itemPart.setValue(item);partIndex++}if(partIndex===0){this.clear();this._previousValue=undefined}else if(partIndex<itemParts.length){const lastPart=itemParts[partIndex-1];itemParts.length=partIndex;this.clear(lastPart.endNode.previousSibling);lastPart.endNode=this.endNode}}_setPromise(value){this._previousValue=value;value.then(v=>{if(this._previousValue===value){this.setValue(v)}})}clear(startNode=this.startNode){removeNodes(this.startNode.parentNode,startNode.nextSibling,this.endNode)}}const defaultPartCallback=(instance,templatePart,node)=>{if(templatePart.type==="attribute"){return new AttributePart(instance,node,templatePart.name,templatePart.strings)}else if(templatePart.type==="node"){return new NodePart(instance,node,node.nextSibling)}throw new Error(`Unknown part type ${templatePart.type}`)};class TemplateInstance{constructor(template,partCallback,getTemplate){this._parts=[];this.template=template;this._partCallback=partCallback;this._getTemplate=getTemplate}update(values){let valueIndex=0;for(const part of this._parts){if(part.size===undefined){part.setValue(values[valueIndex]);valueIndex++}else{part.setValue(values,valueIndex);valueIndex+=part.size}}}_clone(){const fragment=document.importNode(this.template.element.content,true);const parts=this.template.parts;if(parts.length>0){const walker=document.createTreeWalker(fragment,133,null,false);let index=-1;for(let i=0;i<parts.length;i++){const part=parts[i];while(index<part.index){index++;walker.nextNode()}this._parts.push(this._partCallback(this,part,walker.currentNode))}}return fragment}}const reparentNodes=(container,start,end=null,before=null)=>{let node=start;while(node!==end){const n=node.nextSibling;container.insertBefore(node,before);node=n}};const removeNodes=(container,startNode,endNode=null)=>{let node=startNode;while(node!==endNode){const n=node.nextSibling;container.removeChild(node);node=n}};const html$1=(strings,...values)=>new TemplateResult(strings,values,"html",extendedPartCallback);const extendedPartCallback=(instance,templatePart,node)=>{if(templatePart.type==="attribute"){if(templatePart.rawName.substr(0,3)==="on-"){const eventName=templatePart.rawName.slice(3);return new EventPart(instance,node,eventName)}const lastChar=templatePart.name.substr(templatePart.name.length-1);if(lastChar==="$"){const name=templatePart.name.slice(0,-1);return new AttributePart(instance,node,name,templatePart.strings)}if(lastChar==="?"){const name=templatePart.name.slice(0,-1);return new BooleanAttributePart(instance,node,name,templatePart.strings)}return new PropertyPart(instance,node,templatePart.rawName,templatePart.strings)}return defaultPartCallback(instance,templatePart,node)};class BooleanAttributePart extends AttributePart{setValue(values,startIndex){const s=this.strings;if(s.length===2&&s[0]===""&&s[1]===""){const value=getValue(this,values[startIndex]);if(value===directiveValue){return}if(value){this.element.setAttribute(this.name,"")}else{this.element.removeAttribute(this.name)}}else{throw new Error("boolean attributes can only contain a single expression")}}}class PropertyPart extends AttributePart{setValue(values,startIndex){const s=this.strings;let value;if(this._equalToPreviousValues(values,startIndex)){return}if(s.length===2&&s[0]===""&&s[1]===""){value=getValue(this,values[startIndex])}else{value=this._interpolate(values,startIndex)}if(value!==directiveValue){this.element[this.name]=value}this._previousValues=values}}class EventPart{constructor(instance,element,eventName){this.instance=instance;this.element=element;this.eventName=eventName}setValue(value){const listener=getValue(this,value);if(listener===this._listener){return}if(listener==null){this.element.removeEventListener(this.eventName,this)}else if(this._listener==null){this.element.addEventListener(this.eventName,this)}this._listener=listener}handleEvent(event){if(typeof this._listener==="function"){this._listener.call(this.element,event)}else if(typeof this._listener.handleEvent==="function"){this._listener.handleEvent(event)}}}const keyMapCache=new WeakMap;function cleanMap(part,key,map){if(!part.startNode.parentNode){map.delete(key)}}function repeat(items,keyFnOrTemplate,template){let keyFn;if(arguments.length===2){template=keyFnOrTemplate}else if(arguments.length===3){keyFn=keyFnOrTemplate}return directive(part=>{if(!(part instanceof NodePart)){throw new Error("repeat can only be used on NodeParts")}let keyMap=keyMapCache.get(part);if(keyMap===undefined){keyMap=new Map;keyMapCache.set(part,keyMap)}const container=part.startNode.parentNode;let index=-1;let currentMarker=part.startNode.nextSibling;for(const item of items){let result;let key;try{++index;result=template(item,index);key=keyFn?keyFn(item):index}catch(e){console.error(e);continue}let itemPart=keyMap.get(key);if(itemPart===undefined){const marker=document.createTextNode("");const endNode=document.createTextNode("");container.insertBefore(marker,currentMarker);container.insertBefore(endNode,currentMarker);itemPart=new NodePart(part.instance,marker,endNode);if(key!==undefined){keyMap.set(key,itemPart)}}else if(currentMarker!==itemPart.startNode){const end=itemPart.endNode.nextSibling;if(currentMarker!==end){reparentNodes(container,itemPart.startNode,end,currentMarker)}}else{currentMarker=itemPart.endNode.nextSibling}itemPart.setValue(result)}if(currentMarker!==part.endNode){removeNodes(container,currentMarker,part.endNode);keyMap.forEach(cleanMap)}})}class MyTodo extends HTMLElement{constructor(){super();this._root=this.attachShadow({mode:"open"});this._list=[{id:0,text:"my initial todo",checked:false},{id:1,text:"Learn about Web Components",checked:true}];this._addItem=(e=>this.addItem(e));this._removeItem=(e=>this.removeItem(e));this._toggleItem=(e=>this.toggleItem(e))}render(){return html$1`
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
        ${repeat(this._list,item=>item.id,(item,index)=>html$1`<todo-item 
                                    text="${item.text}" 
                                    checked="${item.checked}" 
                                    index="${index}" 
                                    on-removed=${this._removeItem}
                                    on-checked=${this._toggleItem}></todo-item>`)}
    </ul>
</section>`}connectedCallback(){this._render()}addItem(e){this._list=[...this._list,{id:this._list.length,text:e.detail,checked:false}];this._render()}removeItem(e){this._list=[...this._list.slice(0,e.detail),...this._list.slice(e.detail+1)];this._render()}toggleItem(e){const item=this._list[e.detail];this._list[e.detail]=Object.assign({},item,{checked:!item.checked});this._render()}_render(){render(this.render(),this._root)}}window.customElements.define("my-todo",MyTodo);class TodoInput extends HTMLElement{constructor(){super();this._root=this.attachShadow({mode:"open"});this.state={value:""};this._handleSubmit=(e=>this.handleSubmit(e));this._handleInput=(e=>this.handleInput(e))}render(){return html$1`
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
    <input id="new-todo" type="text" placeholder="What needs to be done?" on-input=${this._handleInput} value="${this.state.value}"/>
</form>`}handleInput(e){this.state={value:e.target.value}}handleSubmit(e){e.preventDefault();if(!this.state.value)return;this.dispatchEvent(new CustomEvent("submit",{detail:this.state.value}));this.$input=this._root.querySelector("#new-todo");this.$input.value="";this.$input.blur()}connectedCallback(){render(this.render(),this._root)}}window.customElements.define("todo-input",TodoInput);class TodoItem extends HTMLElement{constructor(){super();this._root=this.attachShadow({mode:"open"});this._checked=false;this._text="";this._handleOnChecked=(e=>this.handleOnChecked(e));this._handleOnRemoved=(e=>this.handleOnRemoved(e))}render(){return html$1`
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
    <input type="checkbox" checked=${this.checked} on-change=${this._handleOnChecked}>
    <label>${this.text}</label>
    <button class="destroy" on-click=${this._handleOnRemoved}>x</button>
</li>`}handleOnRemoved(e){this.dispatchEvent(new CustomEvent("removed",{detail:this.index}))}handleOnChecked(e){this.dispatchEvent(new CustomEvent("checked",{detail:this.index}))}connectedCallback(){setTimeout(()=>{render(this.render(),this._root)},0)}}window.customElements.define("todo-item",TodoItem);