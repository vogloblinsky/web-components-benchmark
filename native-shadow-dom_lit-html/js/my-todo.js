import { html } from '../node_modules/lit-html/lib/lit-extended.js';
import { render } from '../node_modules/lit-html/lib/lit-extended.js';
import { repeat } from '../node_modules/lit-html/lib/repeat.js';

class MyTodo extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({ 'mode': 'open' });
        // initial state
        this._list = [
            { id: 0, text: 'my initial todo', checked: false },
            { id: 1, text: 'Learn about Web Components', checked: true }
        ];
    }

    get template() {
        const template = html`
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
    <todo-input on-submit=${this.addItem.bind(this)}></todo-input>
    <ul id="list-container">
        ${repeat( this._list, item => item.id, (item, index) => html`<todo-item 
                                                                    text="${item.text}" 
                                                                    checked="${item.checked}" 
                                                                    index="${index}" 
                                                                    on-removed=${this.removeItem.bind(this)}
                                                                    on-checked=${this.toggleItem.bind(this)}></todo-item>`)}
    </ul>
</section>`
        return template;
    }

    connectedCallback() {
        this._render();
        this.$input = this._root.querySelector('todo-input');
        this.$input.addEventListener('onSubmit', this.addItem.bind(this));
    }

    addItem(e) {
        this._list = [...this._list, { id: this._list.length, text: e.detail, checked: false, }];
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
        render(this.template, this._root);
    }
}

window.customElements.define('my-todo', MyTodo);