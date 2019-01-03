import { LitElement, html } from '../node_modules/@polymer/lit-element/lit-element.js';

class TodoInput extends LitElement {

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
<form id="new-todo-form" @submit=${this.handleSubmit}>
    <input id="new-todo" type="text" placeholder="What needs to be done?"/>
</form>`;
    }

    handleSubmit(e) {
        e.preventDefault();
        const input = this.shadowRoot.querySelector('#new-todo');
        this.dispatchEvent(new CustomEvent('submit', { detail: input.value }));
        input.value = '';
        input.blur();
    }
}

window.customElements.define('todo-input', TodoInput);
