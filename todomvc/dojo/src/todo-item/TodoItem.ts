import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import customElement from '@dojo/framework/widget-core/decorators/customElement';
import { v } from '@dojo/framework/widget-core/d';
import { theme, ThemedMixin } from '@dojo/framework/widget-core/mixins/Themed';

import * as css from './TodoItem.css';

export interface TodoItemProperties {
    text?: string;
    checked?: boolean;
    index?: number;
    onChecked?: (data: any) => void;
    onRemoved?: (data: any) => void;
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
        const { text, checked } = this.properties;

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
                        onchange: this.handleOnChecked
                    }),
                    v('label', {}, [text]),
                    v(
                        'button',
                        {
                            classes: this.theme(css.destroy),
                            onclick: this.handleOnRemoved
                        },
                        ['X']
                    )
                ]
            )
        ];
    }

    handleOnRemoved(e) {
        this.properties.onRemoved(this.properties);
    }

    handleOnChecked(e) {
        this.properties.onChecked(this.properties);
    }
}
