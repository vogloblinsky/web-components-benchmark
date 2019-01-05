import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import customElement from '@dojo/framework/widget-core/decorators/customElement';
import { v } from '@dojo/framework/widget-core/d';
import { theme, ThemedMixin } from '@dojo/framework/widget-core/mixins/Themed';
import { watch } from '@dojo/framework/widget-core/decorators/watch';

import * as css from './TodoApp.m.css';

@theme(css)
@customElement({
    tag: 'my-todo',
    events: [],
    attributes: [],
    properties: []
})
export default class TodoApp extends ThemedMixin(WidgetBase) {
    @watch()
    private list = [
        { id: 1, text: 'my initial todo', checked: false },
        { id: 2, text: 'Learn about Web Components', checked: true }
    ];

    protected render() {
        return [
            v('h1', {}, ['Todos WC - Dojo2']),
            v('section', {}, [
                v('todo-input', {
                    onsubmit: (e: CustomEvent) => {
                        this.list = [
                            ...this.list,
                            {
                                id: this.list.length,
                                text: e.detail[0],
                                checked: false
                            }
                        ];
                    }
                }),
                v(
                    'ul',
                    { classes: this.theme(css.listcontainer) },
                    this.list.map((todo, index) => {
                        return v('todo-item', {
                            text: todo.text,
                            checked: todo.checked,
                            index: index,
                            onremoved: (e: CustomEvent) => {
                                const data = e.detail[0];
                                this.list = [
                                    ...this.list.slice(0, data.index),
                                    ...this.list.slice(data.index + 1)
                                ];
                            },
                            onchecked: (e: CustomEvent) => {
                                const data = e.detail[0];
                                const item = this.list[data.index];
                                this.list[data.index] = { ...item, checked: !item.checked };
                                this.list = [...this.list];
                            }
                        });
                    })
                )
            ])
        ];
    }
}
