// @jsx h

import Element, {
    h
} from '@skatejs/element-preact';
import { html } from "./_";

export class App extends Element {
    static get props() {
        return {
            list: Array
        };
    }

    constructor() {
        super();
        this.list = [{
                text: 'my initial todo',
                checked: false
            },
            {
                text: 'Learn about Web Components',
                checked: true
            }
        ];
    }

    handleCheck = e => {
        this.list[e.detail.index].checked = !e.detail.value;
    };
    handleRemove = e => {
        this.list = this.list.filter(
                (item, index) => index !== e.detail.index
            );
    };
    handleSubmit = e => {
        this.list = [...this.list, {
                text: e.detail.value,
                checked: false
            }];
    };

    renderItem(item, index) {
        return html`<todo-item checked="${item.checked}"
                    index="${index}"
                    onCheck="${this.handleCheck.bind(this)}"
                    onRemove="${this.handleRemove.bind(this)}">${item.text}</todo-item>`;
    }

    render() {
        return html`
            <div>
                <style>
                    :host {
                        display: block;
                    }

                    h1 {
                        font-size: 60px;
                        font-weight: 100;
                        text-align: center;
                        color: rgba(175, 47, 47, 0.15);
                    }

                    section {
                        background: #fff;
                        margin: 130px 0 40px 0;
                        position: relative;
                        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
                            0 25px 50px 0 rgba(0, 0, 0, 0.1);
                    }

                    #list-container {
                        margin: 0;
                        padding: 0;
                        list-style: none;
                        border-top: 1px solid #e6e6e6;
                    }
                </style>
                <h1>SkateJS & Preact</h1>
                <section>
                    <todo-input onSubmit="${this.handleSubmit.bind(this)}"></todo-input>
                    <ul id="list-container">
                        ${this.list.map(this.renderItem.bind(this))}
                    </ul>
                </section>
            </div>
        `;
    }
}