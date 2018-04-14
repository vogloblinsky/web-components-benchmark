import HyperHTMLElement from '../node_modules/hyperhtml-element/esm/index.js';

class TodoInput extends HyperHTMLElement {
    created() {
        this.attachShadow({ mode: 'open' });
        
        this.state = {
            value: ''
        };
        this._handleSubmit = e => this.handleSubmit(e);
        this._handleInput = e => this.handleInput(e);

        this.render();
    }

    handleInput(e) {
        this.state = { value: e.target.value };
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.value) return;
        this.dispatchEvent(new CustomEvent('submit', { detail: this.state.value }));
        this.$input = this.shadowRoot.querySelector('#new-todo');
        this.$input.value = '';
        this.$input.blur();
    }

    render() {
        return this.html`
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
        `;
    }
}

TodoInput.define('todo-input');