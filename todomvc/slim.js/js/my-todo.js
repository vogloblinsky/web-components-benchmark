
Slim.tag(
    'my-todo',
    `
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
        <todo-input on-add="handleAdd"></todo-input>
        <ul id="list-container">
            <todo-item s:repeat="items" on-remove="handleRemove"></todo-item>
        </ul>
    </section>`,
    class MyTag extends Slim {
        onBeforeCreated() {
            this.items = [{ text: 'my initial todo', checked: false, index: 0 }, { text: 'Learn about Web Components', checked: true, index: 1 }];
        }
        handleAdd(text) {
            this.items = [...this.items, { index: this.items.length, text: text }];
        }
        handleRemove(index) {
            this.items = [...this.items.slice(0, index), ...this.items.slice(index + 1)];
        }
    }
);