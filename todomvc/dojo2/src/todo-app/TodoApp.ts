import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import customElement from '@dojo/framework/widget-core/decorators/customElement';
import { v } from '@dojo/framework/widget-core/d';
import { theme, ThemedMixin } from '@dojo/framework/widget-core/mixins/Themed';

import * as css from './TodoApp.css';

export interface TodoAppProperties {
    firstName?: string;
    list?: string[];
}

@theme(css)
@customElement<TodoAppProperties>({
    tag: 'todo-app',
    events: [],
    attributes: ['firstName'],
    properties: []
})
export default class TodoApp extends ThemedMixin(WidgetBase)<
    TodoAppProperties
> {
    protected render() {
        const { firstName = 'vincent' } = this.properties;

        this.list = [
            { text: 'my initial todo', checked: false },
            { text: 'Learn about Web Components', checked: true }
        ];

        return [
            v('h1', {}, ['Todos WC - Dojo2']),
            v('section', {}, [
                v('todo-input', {}),
                v(
                    'ul',
                    { classes: this.theme(css.listcontainer) },
                    this.list.map(todo => {
                        return v('todo-item', { text: todo.text });
                    })
                )
            ])
        ];
    }
}
