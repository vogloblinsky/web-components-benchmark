import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import customElement from '@dojo/framework/widget-core/decorators/customElement';
import { v } from '@dojo/framework/widget-core/d';
import { theme, ThemedMixin } from '@dojo/framework/widget-core/mixins/Themed';

import * as css from './TodoInput.css';
import { watch } from '@dojo/framework/widget-core/decorators/watch';

export interface TodoInputProperties {
    text?: string;
    onSubmit?: (data: any) => void;
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
                    onsubmit: this.handleSubmit
                },
                [
                    v('input', {
                        classes: this.theme(css.newtodo),
                        type: 'text',
                        value: '',
                        placeholder: 'What needs to be done?',
                        oninput: this.handleInput
                    })
                ]
            )
        ];
    }

    handleInput(e) {
        this.newtodo = e.target.value;
    }

    handleSubmit(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        this.finaltodo = this.newtodo;
        this.properties.onSubmit(this.finaltodo);
    }
}
