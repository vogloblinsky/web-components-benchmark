import{html,render}from"../node_modules/lit-html/lit-html.js";import{repeat}from"../node_modules/lit-html/lib/repeat.js";class MyTodo extends HTMLElement{constructor(){super();this._root=this.attachShadow({mode:"open"});this._list=[{id:0,text:"my initial todo",checked:false},{id:1,text:"Learn about Web Components",checked:true}]}connectedCallback(){render(html`
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
                <todo-input></todo-input>
                <ul id="list-container"></ul>
            </section>
        `,this._root);this.$input=this._root.querySelector("todo-input");this.$listContainer=this._root.querySelector("#list-container");this.$input.addEventListener("onSubmit",this.addItem.bind(this));this._render()}addItem(e){let newTodo={text:e.detail,checked:false};this._list.push(newTodo);let $item=document.createElement("todo-item");$item.setAttribute("text",newTodo.text);$item.checked=newTodo.checked;$item.index=this._list.length-1;$item.addEventListener("onRemove",this.removeItem.bind(this));$item.addEventListener("onToggle",this.toggleItem.bind(this));this.$listContainer.appendChild($item)}removeItem(e){this._list.splice(e.detail,1);this.$listContainer.removeChild(e.currentTarget)}toggleItem(e){const item=this._list[e.detail];this._list[e.detail]={...item,checked:!item.checked};this._render()}disconnectedCallback(){}renderList(items){return html`
            ${repeat(items,item=>item.id,(item,index)=>html`
                <todo-item text="${item.text}" checked="${item.checked}" index="${index}"></todo-item>
                `)}
        `}_render(){if(!this.$listContainer)return;render(this.renderList(this._list),this.$listContainer);this.$listContainer.querySelectorAll("todo-item").forEach(item=>{item.addEventListener("onRemove",this.removeItem.bind(this));item.addEventListener("onToggle",this.toggleItem.bind(this))})}}window.customElements.define("my-todo",MyTodo);class TodoInput extends HTMLElement{constructor(){super();this._root=this.attachShadow({mode:"open"})}connectedCallback(){render(html`
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
            <form id="new-todo-form">
                <input id="new-todo" type="text" placeholder="What needs to be done?" />
            </form>
        `,this._root);this.$form=this._root.querySelector("form");this.$input=this._root.querySelector("input");this.$form.addEventListener("submit",e=>{e.preventDefault();if(!this.$input.value)return;this.dispatchEvent(new CustomEvent("onSubmit",{detail:this.$input.value}));this.$input.value=""})}disconnectedCallback(){}}window.customElements.define("todo-input",TodoInput);class TodoItem extends HTMLElement{constructor(){super();this._root=this.attachShadow({mode:"open"});this._checked=false;this._text=""}connectedCallback(){render(html`
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
                <input type="checkbox">
                <label></label>
                <button class="destroy">x</button>
            </li>
        `,this._root);this.$item=this._root.querySelector(".item");this.$removeButton=this._root.querySelector(".destroy");this.$text=this._root.querySelector("label");this.$checkbox=this._root.querySelector("input");this.$removeButton.addEventListener("click",e=>{e.preventDefault();this.dispatchEvent(new CustomEvent("onRemove",{detail:this.index}))});this.$checkbox.addEventListener("click",e=>{e.preventDefault();this.checked=!this._checked;this._render()});this._render()}disconnectedCallback(){}static get observedAttributes(){return["text","index","checked"]}attributeChangedCallback(name,oldValue,newValue){switch(name){case"text":this._text=newValue;break;case"index":this._index=parseInt(newValue);break;case"checked":this._checked=newValue==="false"?false:true;break}}set index(value){this._index=value}get index(){return this._index}set checked(value){this._checked=Boolean(value)}get checked(){return this.hasAttribute("checked")}_render(){if(!this.$item)return;this.$text.textContent=this._text;if(this._checked){this.$item.classList.add("completed");this.$checkbox.setAttribute("checked","")}else{this.$item.classList.remove("completed");this.$checkbox.removeAttribute("checked")}}}window.customElements.define("todo-item",TodoItem);