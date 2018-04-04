import { html } from '../node_modules/lit-html/lib/lit-extended.js';
import { render } from '../node_modules/lit-html/lib/lit-extended.js';
import { repeat } from '../node_modules/lit-html/lib/repeat.js';

class MyTodo extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({ mode: 'open' });
        // initial state
        this._list = [{ id: 0, text: 'my initial todo', checked: false }, { id: 1, text: 'Learn about Web Components', checked: true }];

        this._addItem = e => this.addItem(e);
        this._removeItem = e => this.removeItem(e);
        this._toggleItem = e => this.toggleItem(e);
    }

    render() {
        return html`
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
        ${repeat(
            this._list,
            item => item.id,
            (item, index) => html`<todo-item 
                                    text="${item.text}" 
                                    checked="${item.checked}" 
                                    index="${index}" 
                                    on-removed=${this._removeItem}
                                    on-checked=${this._toggleItem}></todo-item>`
        )}
    </ul>
</section>`;
    }

    connectedCallback() {
        this._render();
    }

    addItem(e) {
        this._list = [...this._list, { id: this._list.length, text: e.detail, checked: false }];
        this._render();
    }

    removeItem(e) {
        this._list = [...this._list.slice(0, e.detail), ...this._list.slice(e.detail + 1)];
        this._render();
    }

    toggleItem(e) {
        const item = this._list[e.detail];
        this._list[e.detail] = Object.assign({}, item, { checked: !item.checked });
        this._render();
    }

    _render() {
        render(this.render(), this._root);
    }
}

window.customElements.define('my-todo', MyTodo);



class TodoInput extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({ mode: 'open' });
        this.state = {
            value: ''
        };
        this._handleSubmit = e => this.handleSubmit(e);
        this._handleInput = e => this.handleInput(e);
    }

    render() {
        return html`
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
</form>`;
    }

    handleInput(e) {
        this.state = { value: e.target.value };
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.value) return;
        this.dispatchEvent(new CustomEvent('submit', { detail: this.state.value }));
        this.$input = this._root.querySelector('#new-todo');
        this.$input.value = '';
        this.$input.blur();
    }

    connectedCallback() {
        render(this.render(), this._root);
    }
}

window.customElements.define('todo-input', TodoInput);



class TodoItem extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({ mode: 'open' });
        this._checked = false;
        this._text = '';

        this._handleOnChecked = e => this.handleOnChecked(e);
        this._handleOnRemoved = e => this.handleOnRemoved(e);
    }

    render() {
        return html`
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
</li>`;
    }

    handleOnRemoved(e) {
        this.dispatchEvent(new CustomEvent('removed', { detail: this.index }));
    }

    handleOnChecked(e) {
        this.dispatchEvent(new CustomEvent('checked', { detail: this.index }));
    }

    connectedCallback() {
        // Workaround for lit-html
        setTimeout(() => {
            render(this.render(), this._root);
        }, 0);
    }
}

window.customElements.define('todo-item', TodoItem);
