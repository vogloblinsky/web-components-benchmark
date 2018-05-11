import {
    Component,
    EventEmitter,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';
import { _length, generateData } from './utils';

@Component({
    selector: 'pascal-triangle',
    template: `
<div>
    <button data-value="10" (click)="handleLoad($event)">Load 10</button>
    <button data-value="100" (click)="handleLoad($event)">Load 100</button>
    <button data-value="500" (click)="handleLoad($event)">Load 500</button>
</div>
<div>
    <div *ngFor="let line of _list">
        <triangle-item *ngFor="let item of line" text="{{item}}"></triangle-item>
    </div>
</div>`
})
export class PascalTriangleComponent {
    _length = _length;
    _list;

    constructor() {
        this._list = generateData(_length);
    }

    handleLoad(e) {
        this._length = parseInt(e.target.getAttribute('data-value'));       
        this._list = generateData(this._length);
    }
}
