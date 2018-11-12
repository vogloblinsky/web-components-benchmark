import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import customElement from '@dojo/framework/widget-core/decorators/customElement';
import { v } from '@dojo/framework/widget-core/d';
import { theme, ThemedMixin } from '@dojo/framework/widget-core/mixins/Themed';
import { watch } from '@dojo/framework/widget-core/decorators/watch';

import * as css from './TodoApp.css';

export interface TodoAppProperties {
    list?: string[];
}

@theme(css)
@customElement<TodoAppProperties>({
    tag: 'todo-app',
    events: [],
    attributes: [],
    properties: []
})
export default class TodoApp extends ThemedMixin(WidgetBase)<
    TodoAppProperties
> {
    @watch()
    private list = [];

    constructor() {
        super();
        this.list = [
            { text: 'my initial todo', checked: false },
            { text: 'Learn about Web Components', checked: true }
        ];
    }
    protected render() {
        return [
            v('h1', {}, ['Todos WC - Dojo2']),
            v('section', {}, [
                v('todo-input', {
                    onsubmit: this.addItem
                }),
                v(
                    'ul',
                    { classes: this.theme(css.listcontainer) },
                    this.list.map((todo, index) => {
                        return v('todo-item', {
                            text: todo.text,
                            checked: todo.checked,
                            index: index,
                            onremoved: this.removeItem,
                            onchecked: this.toggleItem
                        });
                    })
                )
            ])
        ];
    }

    addItem(e) {
        this.list = [
            ...this.list,
            {
                id: this.list.length,
                text: e.detail[0],
                checked: false
            }
        ];
    }

    removeItem(e) {
        const data = e.detail[0];
        this.list = [
            ...this.list.slice(0, data.index),
            ...this.list.slice(data.index + 1)
        ];
    }

    toggleItem(e) {
        const data = e.detail[0];
        const item = this.list[data.index];
        this.list[data.index] = Object.assign({}, item, {
            checked: !item.checked
        });
        this.list = [...this.list];
    }
}
