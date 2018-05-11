import { DNode, WidgetProperties } from '@dojo/widget-core/interfaces';
import { ThemedMixin, theme } from '@dojo/widget-core/mixins/Themed';
import { WidgetBase } from '@dojo/widget-core/WidgetBase';
import { v, w } from '@dojo/widget-core/d';

import { customElement } from '@dojo/widget-core/decorators/customElement';

/**
 * @type PascalTriangleProperties
 *
 * Properties that can be set on PascalTriangle components
 */
export interface PascalTriangleProperties {}

export const ThemedBase = ThemedMixin(WidgetBase);

let _length = 100;

function generateData(rows) {
    const n = rows;

    const data = [];
    data[0] = [1];
    data[1] = [1, 1];

    for (let row = 2; row < n; row++) {
      data[row] = [1];

      for (let col = 1; col <= row - 1; col++) {
        const prevRow = data[row - 1];
        data[row][col] = prevRow[col] + prevRow[col - 1];
        data[row].push(1);
      }
    }
    return data;
}

@customElement({
    tag: 'pascal-triangle',
    attributes: [],
    properties: [],
    events: []
})
export class PascalTriangle<P extends PascalTriangleProperties = PascalTriangleProperties> extends WidgetBase<WidgetProperties> {
	length: number;
	list;

	constructor() {
		super();
		this.length = _length;
		this.list = generateData(this.length);
	}

    protected render(): DNode | DNode[] {
		return v('div', [
			v('div', [
				v('button', {
					'data-value': '10',
					onclick: this.handleLoad
				}, ['Load 10']),
				v('button', {
					'data-value': '100',
					onclick: this.handleLoad
				}, ['Load 100']),
				v('button', {
					'data-value': '500',
					onclick: this.handleLoad
				}, ['Load 500'])
			]),
			v('div', this.list.map((line) => 
				v('div', line.map((item) => 
					v('triangle-item', {
						'text': `${item}`
					})
				))
			))
		]);
	}
	
	handleLoad(e) {
		console.log('handleLoad: ', e.target.getAttribute('data-value'));
		this.length = parseInt(e.target.getAttribute('data-value'));
		this.list = generateData(this.length);
	}
}

export default PascalTriangle;
