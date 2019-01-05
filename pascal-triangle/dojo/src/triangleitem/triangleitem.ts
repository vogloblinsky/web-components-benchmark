import { DNode } from '@dojo/framework/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/framework/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';

import { customElement } from '@dojo/framework/widget-core/decorators/customElement';

/**
 * @type TriangleItemProperties
 *
 * Properties that can be set on TriangleItem components
 */
export interface TriangleItemProperties {}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement({
    tag: 'triangle-item',
    attributes: ['text'],
    properties: [],
    events: []
})
export class TriangleItem<
    P extends TriangleItemProperties = TriangleItemProperties
> extends ThemedBase<P> {
    protected render(): DNode | DNode[] {
        const { text } = this.properties;
        return v('span', {}, [text]);
    }
}

export default TriangleItem;
