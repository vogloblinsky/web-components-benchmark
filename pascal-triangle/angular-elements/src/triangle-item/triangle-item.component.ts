import {
    Component,
    EventEmitter,
    Input,
    ViewEncapsulation
} from '@angular/core';

@Component({
    selector: 'triangle-item',
    template: `
    <span>{{text}}</span>`
})
export class TriangleItemComponent {
    @Input()
    text;

    constructor() {}
}
