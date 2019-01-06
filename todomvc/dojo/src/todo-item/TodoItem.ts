import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import customElement from '@dojo/framework/widget-core/decorators/customElement';
import { v } from '@dojo/framework/widget-core/d';
import { theme, ThemedMixin } from '@dojo/framework/widget-core/mixins/Themed';

import * as css from './TodoItem.m.css';

export interface TodoItemProperties {
    text?: string;
    checked?: boolean;
    index?: number;
    onChecked: (data: any) => void;
    onRemoved: (data: any) => void;
}

@theme(css)
@customElement<TodoItemProperties>({
    tag: 'todo-item',
    events: ['onChecked', 'onRemoved'],
    attributes: ['text', 'checked', 'index'],
    properties: []
})
export default class TodoItem extends ThemedMixin(WidgetBase)<
    TodoItemProperties
> {
    protected render() {
        const { text, checked, onRemoved, onChecked } = this.properties;

        return [
            v(
                'li',
                {
                    classes: [
                        this.theme(css.item),
                        checked ? this.theme(css.completed) : ''
                    ]
                },
                [
                    v('input', {
                        type: 'checkbox',
                        checked: checked,
                        onchange: () => {
                            onChecked(this.properties);
                        }
                    }),
                    v('label', {}, [text]),
                    v(
                        'button',
                        {
                            classes: this.theme(css.destroy),
                            onclick: () => {
                                onRemoved(this.properties);
                            }
                        },
                        ['X']
                    )
                ]
            )
        ];
    }
}
