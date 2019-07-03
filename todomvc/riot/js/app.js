import { register, mount, component } from 'riot';
import myTodo from './my-todo.js';
import todoItem from './todo-item.js';
import todoInput from './todo-input.js';

register('todo-item', todoItem);
mount('todo-item');

register('todo-input', todoInput);
mount('todo-input');

component(myTodo)(document.querySelector('my-todo'));
