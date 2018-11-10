import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import customElement from '@dojo/framework/widget-core/decorators/customElement';
import { v } from '@dojo/framework/widget-core/d';
import { theme, ThemedMixin } from '@dojo/framework/widget-core/mixins/Themed';

import * as css from './TodoInput.css';

export interface TodoInputProperties {
    firstName?: string;
    list?: string[];
}

@theme(css)
@customElement<TodoInputProperties>({
    tag: 'todo-input',
    events: [],
    attributes: ['text'],
    properties: []
})
export default class TodoInput extends ThemedMixin(WidgetBase)<
    TodoInputProperties
> {
    protected render() {
        const { text = 'vincent' } = this.properties;

        return [v('div', {}, [text])];
    }
}
