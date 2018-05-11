import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';

import { customElement } from '@dojo/widget-core/decorators/customElement';

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
export class TriangleItem<P extends TriangleItemProperties = TriangleItemProperties> extends WidgetBase<WidgetProperties> {
	constructor() {
		super();
	}

    protected render(): DNode | DNode[] {
		return v('span', [this.properties['text']]);
	}
}

export default TriangleItem;
