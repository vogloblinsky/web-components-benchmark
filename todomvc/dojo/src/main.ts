import TodoApp from './todo-app/TodoApp';
import TodoInput from './todo-input/TodoInput';
import TodoItem from './todo-item/TodoItem';

import { register } from '@dojo/framework/widget-core/registerCustomElement';

register(TodoApp);
register(TodoItem);
register(TodoInput);
