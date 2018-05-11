import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';
import Button from '@dojo/widgets/button';

import { customElement } from '@dojo/widget-core/decorators/customElement';
import * as css from './styles/pascaltriangle.m.css';

/**
 * @type PascalTriangleProperties
 *
 * Properties that can be set on PascalTriangle components
 */
export interface PascalTriangleProperties {}

export const ThemedBase = ThemedMixin(WidgetBase);

@customElement({
    tag: 'pascal-triangle',
    attributes: [],
    properties: [],
    events: []
})
@theme(css)
export class PascalTriangle<P extends PascalTriangleProperties = PascalTriangleProperties> extends WidgetBase<WidgetProperties> {
    protected render(): DNode | DNode[] {
        return v('div', [
			v('button', {
				onclick: this.handleLoad
			}, ['Load 10']),
			w(Button, ['Load 100']),
			v('button', {
				onclick: this.handleLoad
			}, ['Load 500'])
		]);
	}
	
	handleLoad(e) {
		console.log('handleLoad: ', e);
	}
}

export default PascalTriangle;
