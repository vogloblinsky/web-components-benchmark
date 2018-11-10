import{html,PolymerElement}from"../../node_modules/@polymer/polymer/polymer-element.js";class TodoApp extends PolymerElement{static get template(){return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `}static get properties(){return{prop1:{type:String,value:"todo-app"}}}}window.customElements.define("todo-app",TodoApp);