<svelte:options tag="my-todo"/>

<style>
    h1 {
        font-size: 90px;
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

<script>
	let todoList = [{
            text: 'my initial todo',
            checked: false,
            id: 0
        },
        {
            text: 'Learn about Web Components',
            checked: true,
            id: 1
        }
    ];

    let input;

    import { onMount } from 'svelte';

    onMount(async () => {
		input = document.querySelector('my-todo').shadowRoot.querySelector('todo-input');
        console.log(input);

        input.addEventListener('createee', function (ev) {
            console.log('createee');
        });
	});

    console.log(todoList);

    function addItem(text) {
        console.log('addItem: ', text);
        const { todoList } = this.get();
        todoList.push({
            text,
            checked: false,
            id: todoList[todoList.length - 1].id + 1
        });
        this.set({
            todoList
        });
    }

    function removeItem(index) {
        console.log('removeItem: ', index);
        const { todoList } = this.get();
        todoList.splice(index, 1);
        this.set({
            todoList
        });
    }

    function toggleItem(item) {
        console.log('toggleItem: ', item);
        item.checked = !item.checked
        this.set({
            todoList: this.get().todoList
        });
    }
</script>

<div>
    <h1>Todos Svelte</h1>
    <section>
        <todo-input on:createee={addItem}></todo-input>
        <ul id="list-container">
            {#each todoList as todo, index (todo.id)}
                <todo-item text={todo.text} checked={todo.checked} on:toggle={toggleItem} on:remove={removeItem}></todo-item>
            {/each}
        </ul>
    </section>
</div>
