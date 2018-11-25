import{html,PolymerElement}from"../../node_modules/@polymer/polymer/polymer-element.js";class TodoApp extends PolymerElement{static get template(){return html`
      <style>
      :host {
        display: block;
      }

      h1 {
        font-size: 70px;
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
      <h1>Todos Polymer 3</h1>
      <section>
        <todo-input></todo-input>
        <ul id="list-container">
          <template is="dom-repeat" items="{{list}}">
            <todo-item text="{{item.text}}" checked="{{item.checked}}" index="{{index}}" on-remove="removeItem" on-toggle="toggleItem"></todo-item>
          </template>
        </ul>
      </section>
    `}static get properties(){return{list:{type:Array,value:[{text:"my initial todo",checked:!1},{text:"Learn about Web Components",checked:!0}]}}}ready(){super.ready();this.$input=this.shadowRoot.querySelector("todo-input");this.$input.addEventListener("onSubmit",this.addItem.bind(this))}addItem(e){this.set("list",[...this.list,{text:e.detail,checked:!1}])}removeItem(e){this.set("list",[...this.list.slice(0,e.detail),...this.list.slice(e.detail+1)])}toggleItem(e){const list=[...this.list],item=list[e.detail];list[e.detail]=Object.assign({},item,{checked:!item.checked});this.set("list",list)}}window.customElements.define("my-todo",TodoApp);
import"../../node_modules/@polymer/iron-form/iron-form.js";import"../../node_modules/@polymer/iron-input/iron-input.js";export class TodoInput extends PolymerElement{static get template(){return html`
        <style>
            :host {
                display: block;
            }
        
            iron-input {
                width: 100%;
            }
        
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
        <iron-form>
            <form id="new-todo-form">
                <iron-input bind-value="{{text}}">
                    <input is="iron-input" id="new-todo" type="text" placeholder="What needs to be done?">
                </iron-input>
            </form>
        </iron-form>
      `}static get properties(){return{text:{type:String,value:""}}}ready(){super.ready();this.$form=this.shadowRoot.querySelector("iron-form");this.$form.addEventListener("iron-form-submit",e=>{if(!this.text)return;this.dispatchEvent(new CustomEvent("onSubmit",{detail:this.text}));this.text=""})}}customElements.define("todo-input",TodoInput);
export class TodoItem extends PolymerElement{static get template(){return html`
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
        <li class$="item [[isCompleted(checked)]]">
            <input type="checkbox" value="{{checked}}" checked="{{checked::change}}">
            <label>{{text}}</label>
            <button class="destroy" on-click="handleOnRemove">x</button>
        </li>
      `}static get properties(){return{checked:{type:Boolean,value:!1},index:{type:Number},text:{type:String,value:""}}}handleOnRemove(e){this.dispatchEvent(new CustomEvent("remove",{detail:this.index}))}handleOnChecked(e){this.dispatchEvent(new CustomEvent("toggle",{detail:this.index}))}isCompleted(completed){return completed?"completed":""}}customElements.define("todo-item",TodoItem);