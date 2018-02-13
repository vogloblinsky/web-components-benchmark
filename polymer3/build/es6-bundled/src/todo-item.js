import{Element as PolymerElement}from'../node_modules/@polymer/polymer/polymer-element.js';import'./todo-item-styles.js';export class TodoItem extends PolymerElement{static get is(){return'todo-item'}static get template(){return`
        <style include="todo-item-style-element"></style>
        <li class$="item [[isCompleted(checked)]]">
            <input type="checkbox" value="{{checked}}" checked="{{checked::change}}">
            <label>{{text}}</label>
            <button class="destroy" on-click="handleOnRemove">x</button>
        </li>
      `}static get properties(){return{checked:{type:Boolean,value:!1},index:{type:Number},text:{type:String,value:''}}}handleOnRemove(){this.dispatchEvent(new CustomEvent('remove',{detail:this.index}))}handleOnChecked(){this.dispatchEvent(new CustomEvent('toggle',{detail:this.index}))}isCompleted(a){return a?'completed':''}}customElements.define(TodoItem.is,TodoItem);