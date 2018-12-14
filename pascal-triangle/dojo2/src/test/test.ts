import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import customElement from '@dojo/framework/widget-core/decorators/customElement';
import { v } from '@dojo/framework/widget-core/d';
import { ThemedMixin } from '@dojo/framework/widget-core/mixins/Themed';

@customElement({
    tag: 'the-test',
    events: [],
    attributes: [],
    properties: []
})
export default class TestItem extends ThemedMixin(WidgetBase) {
    protected render() {
        return [
            v('form', {}, [
                v('input', {
                    type: 'text',
                    value: '',
                    placeholder: 'What needs to be done ???'
                })
            ])
        ];
    }
}
