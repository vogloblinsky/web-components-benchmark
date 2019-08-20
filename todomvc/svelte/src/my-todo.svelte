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
    import { onMount } from 'svelte';

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
    let items;
    let offs = {};
    let toggles = {};

    onMount(() => {
		input = document.querySelector('my-todo').shadowRoot.querySelector('todo-input');
        syncItems();

        setTimeout(() => {
            input.$on('create', (ev) => {
                addItem(ev.detail);
            });
            listemItems();
        }, 1000);
	});

    function syncItems() {
        items = document.querySelector('my-todo').shadowRoot.querySelectorAll('todo-item');
    }

    function listemItems() {
        items.forEach((item) => {
            const off = item.$on('remove', removeItem);
            if (typeof offs[item.index] !== 'undefined') {
                offs[item.index]();
            } else {
                offs[item.index] = off;
            }
            const toggle = item.$on('toggle', toggleItem);
            if (typeof toggles[item.index] !== 'undefined') {
                toggles[item.index]();
            } else {
                toggles[item.index] = toggle;
            }
        });
    }

    function addItem(text) {
        todoList = [...todoList, {
            text,
            checked: false,
            id: todoList[todoList.length - 1].id + 1
        }];
        setTimeout(() => {
            syncItems();
            listemItems();
        }, 1000);
    }

    function removeItem(ev) {
        todoList.splice(parseInt(ev.detail), 1);
        todoList = todoList;
    }

    function toggleItem(ev) {
        const item = todoList[parseInt(ev.detail)];
        todoList[parseInt(ev.detail)] = {
            ...item,
            checked: !item.checked
        };
        todoList = todoList;
    }
</script>

<div>
    <h1>Todos Svelte</h1>
    <section>
        <todo-input on:create={addItem}></todo-input>
        <ul id="list-container">
            {#each todoList as todo, index (todo.id)}
                <todo-item text={todo.text} checked={todo.checked} index={todo.id} on:toggle={toggleItem} on:remove={removeItem}></todo-item>
            {/each}
        </ul>
    </section>
</div>
