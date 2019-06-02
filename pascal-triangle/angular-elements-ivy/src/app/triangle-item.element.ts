import { ɵrenderComponent } from '@angular/core';
import { TriangleItemComponent } from './triangle-item.component';

// Manual Custom Elements Wrapper that uses Ivy to render
// Angular Component
// The APIs are current private and can change
// The upcoming version of Angular Elements will automate
// this task
export class TriangleItemElement extends HTMLElement {
    private comp: TriangleItemComponent;

    constructor() {
        // console.log('TriangleItemComponent');

        super();
        this.comp = ɵrenderComponent(TriangleItemComponent, { host: this });
    }
}
