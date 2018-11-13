import * as TodoApp from './todo-app/TodoApp';
import * as TodoInput from './todo-input/TodoInput';
import * as TodoItem from './todo-item/TodoItem';

import { register } from '@dojo/framework/widget-core/registerCustomElement';

register(TodoApp.default);
register(TodoItem.default);
register(TodoInput.default);
