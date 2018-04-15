Slim.tag(
    'todo-input',
    `
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
    <form id="new-todo-form">
        <input id="new-todo" s:id="new_item_input" type="text" keydown="handleKeyDown" placeholder="What needs to be done?" />
    </form>`,
    class TodoInput extends Slim {
        handleKeyDown(e) {
            if (e.which === 13) {
                e.preventDefault();
                this.callAttribute('on-add', e.target.value);
                this.new_item_input.value = '';
                this.new_item_input.blur();
            }
        }
    }
);