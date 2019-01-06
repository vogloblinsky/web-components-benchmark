import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import customElement from '@dojo/framework/widget-core/decorators/customElement';
import { v } from '@dojo/framework/widget-core/d';
import { theme, ThemedMixin } from '@dojo/framework/widget-core/mixins/Themed';

import * as css from './TodoInput.m.css';
import { watch } from '@dojo/framework/widget-core/decorators/watch';

export interface TodoInputProperties {
    text?: string;
    onSubmit: (data: any) => void;
}

@theme(css)
@customElement<TodoInputProperties>({
    tag: 'todo-input',
    events: ['onSubmit'],
    attributes: [],
    properties: []
})
export default class TodoInput extends ThemedMixin(WidgetBase)<
    TodoInputProperties
> {
    newtodo: string = '';

    @watch()
    finaltodo: string = '';

    protected render() {
        return [
            v(
                'form',
                {
                    classes: this.theme(css.newtodoform),
                    onsubmit: (e: Event) => {
                        const { onSubmit } = this.properties;
                        e.preventDefault();
                        e.stopPropagation();
                        this.finaltodo = this.newtodo;
                        onSubmit(this.finaltodo);
                    }
                },
                [
                    v('input', {
                        classes: this.theme(css.newtodo),
                        type: 'text',
                        value: '',
                        placeholder: 'What needs to be done?',
                        oninput: (e: Event) => {
                            this.newtodo = (e.target as HTMLInputElement).value;
                        }
                    })
                ]
            )
        ];
    }
}
