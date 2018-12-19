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

        ul {
            margin: 0;
            padding: 0;
            list-style: none;
            border-top: 1px solid #e6e6e6;
        }
    </style>
    <h1>Todos Riot</h1>
    <section>
        <todo-input on-new-todo={onNewTodo}/>
        <ul>
            <li data-is="todo-item"
                each={todo in list}
                on-change={onChangeTodo}
                on-remove={onRemoveTodo}
                todo={todo}>
            </li>
        </ul>
    </section>
    <script>
        this.list = [
            { id: 0, text: 'my initial todo', checked: false },
            { id: 1, text: 'Learn about Web Components', checked: true }
        ]

        onNewTodo(text) {
            this.list.push({ id: Date.now(), text, checked: false })
            this.update()
        }

        onChangeTodo(id, checked) {
            const todo = this.list.find(e => e.id === id)

            todo.checked = checked
            this.update()
        }

        onRemoveTodo(id) {
            const index = this.list.findIndex(e => e.id === id)

            this.list.splice(index, 1)
            this.update()
        }
    </script>
</my-todo>