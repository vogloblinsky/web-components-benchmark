<svelte:options tag="todo-input"/>

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

<script>
    import { createEventDispatcher, onMount } from 'svelte';
    const dispatch = createEventDispatcher();
	export let text = '';

    let input;

    onMount(async () => {
		input = document.querySelector('my-todo').shadowRoot.querySelector('todo-input');
	});

    function create(e) {
        e.preventDefault();
        dispatch('create', text);
        text = '';
        input.blur();
    }
</script>

<form id="new-todo-form" on:submit={(e) => create(e)}>
    <input bind:value={text} id="new-todo" type="text" placeholder="What needs to be done?" />
</form>
