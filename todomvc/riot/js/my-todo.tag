<my-todo>
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
        <todo-input ref="input"></todo-input>
        <ul id="list-container">
            <todo-item each={todo in _list} text={todo.text} index={todo.id} parentview={parent}></todo-item>
        </ul>
    </section>
    <script>
        this._list = [{ id: 0, text: 'my initial todo', checked: false }, { id: 1, text: 'Learn about Web Components', checked: true }];
        this.on('mount', function() {
            var input = this.refs.input
            input.on('newtodos', onnewtodos);
        });
        onnewtodos = (data) => {
            this._list = [...this._list, { id: Date.now(), text: data, checked: false }];
            this.update();
        }
        this.removeTodo = (data) => {
            var index = this._list.findIndex((e) => e.id === data);
            this._list = [...this._list.slice(0, index), ...this._list.slice(index + 1)];
            this.update();
        }
    </script>
</my-todo>