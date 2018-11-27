import { WeElement, h, define } from 'omi'

class TodoInput extends WeElement {
    constructor() {
        super();
        this._root = this;
    }

    install() {
        this.state = {
            value: ''
        };
    }

    css() {
        return `
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
        `
    }

    handleInput(e) {
        this.state = {
            value: e.target.value
        };
    }
    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.value) return;
        this.fire('submit', {
            data: this.state.value
        });
        this.$input = this._root.shadowRoot.querySelector('#new-todo');
        this.$input.value = '';
        this.state.value = '';
        this.$input.blur();
    }

    render(props, data, store) {
        return (
            <form id="new-todo-form" onSubmit={this.handleSubmit.bind(this)}>
                <input id="new-todo" type="text" placeholder="What needs to be done?" onInput={this.handleInput.bind(this)} value={this.state.value}/>
            </form>
        )
    }
}

define('todo-input', TodoInput);