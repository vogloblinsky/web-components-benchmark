import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import customElement from '@dojo/framework/widget-core/decorators/customElement';
import { v } from '@dojo/framework/widget-core/d';
import { theme, ThemedMixin } from '@dojo/framework/widget-core/mixins/Themed';

import * as css from './TodoItem.css';

export interface TodoItemProperties {
    firstName?: string;
    list?: string[];
}

@theme(css)
@customElement<TodoItemProperties>({
    tag: 'todo-item',
    events: [],
    attributes: ['text'],
    properties: []
})
export default class TodoItem extends ThemedMixin(WidgetBase)<
    TodoItemProperties
> {
    protected render() {
        const { text } = this.properties;

        return [v('div', {}, [text])];
    }
}
