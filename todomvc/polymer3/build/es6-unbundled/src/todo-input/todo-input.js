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