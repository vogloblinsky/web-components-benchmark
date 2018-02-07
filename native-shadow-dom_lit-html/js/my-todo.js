import { html, render } from '../node_modules/lit-html/lit-html.js';
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

    connectedCallback() {
        render(html`
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
        `, this._root);
        this.$input = this._root.querySelector('todo-input');
        this.$listContainer = this._root.querySelector('#list-container');
        this.$input.addEventListener('onSubmit', this.addItem.bind(this));
        this._render();
    }

    addItem(e) {
        let newTodo = { text: e.detail, checked: false, };
        this._list.push(newTodo);
        //this._render();
        let $item = document.createElement('todo-item');
        $item.setAttribute('text', newTodo.text);
        $item.checked = newTodo.checked;
        $item.index = this._list.length - 1;
        $item.addEventListener('onRemove', this.removeItem.bind(this));
        $item.addEventListener('onToggle', this.toggleItem.bind(this));
        this.$listContainer.appendChild($item);
    }

    removeItem(e) {
        this._list.splice(e.detail, 1);
        //this._render();
        this.$listContainer.removeChild(e.currentTarget);
    }

    toggleItem(e) {
        const item = this._list[e.detail];
        
        this._list[e.detail] = {
            ...item,
            checked: !item.checked
        };
        
        this._render();
    }

    disconnectedCallback() { }

    renderList(items) {
        return html`
            ${repeat(
                items,
                item => item.id,
                (item, index) => html`
                <todo-item text="${item.text}" checked="${item.checked}" index="${index}"></todo-item>
                `
            )}
        `;
    }

    _render() {
        if (!this.$listContainer) return;
        // empty the list
        //render(html``, this.$listContainer);

        render(this.renderList(this._list), this.$listContainer);
        
        this.$listContainer.querySelectorAll('todo-item').forEach(item => {
            item.addEventListener('onRemove', this.removeItem.bind(this));
            item.addEventListener('onToggle', this.toggleItem.bind(this));
        });
    }
}

window.customElements.define('my-todo', MyTodo);