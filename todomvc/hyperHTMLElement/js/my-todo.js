import HyperHTMLElement from '../node_modules/hyperhtml-element/esm/index.js';

class MyTodo extends HyperHTMLElement {
    created() {
        this.attachShadow({
            mode: 'open'
        });

        this._list = [
            {
                id: 0,
                text: 'my initial todo',
                checked: false
            },
            {
                id: 1,
                text: 'Learn about Web Components',
                checked: true
            }
        ];

        this.render();
    }

    onsubmit(e) {
        this._list = [
            ...this._list,
            {
                id: this._list.length,
                text: e.detail,
                checked: false
            }
        ];
        this.render();
    }

    onremoved(e) {
        this._list.splice(e.detail, 1);
        this.render();
    }

    onchecked(e) {
        const item = this._list[e.detail];
        this._list[e.detail] = Object.assign({}, item, {
            checked: !item.checked
        });
        this.render();
    }

    render() {
        return this.html`
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
        <h1>Todos hyperHTML</h1>
        <section>
            <todo-input onsubmit=${this}></todo-input>
            <ul id="list-container">
            ${this._list.map(
                (item, index) => HyperHTMLElement.wire(
                    item
                )`<todo-item index="${index}" 
                                                                                text="${
                                                                                    item.text
                                                                                }" 
                                                                                checked="${
                                                                                    item.checked
                                                                                }" 
                                                                                onremoved="${this}"
                                                                                onchecked="${this}"></todo-item>`
            )}
            </ul>
        </section>
        `;
    }
}

MyTodo.define('my-todo');
