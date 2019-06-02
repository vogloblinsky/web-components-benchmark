import { ɵrenderComponent } from '@angular/core';
import { PascalTriangleComponent } from './pascal-triangle.component';

// Manual Custom Elements Wrapper that uses Ivy to render
// Angular Component
// The APIs are current private and can change
// The upcoming version of Angular Elements will automate
// this task
export class PascalTriangleElement extends HTMLElement {
    private comp: PascalTriangleComponent;

    constructor() {
        // console.log('PascalTriangleElement');

        super();
        this.comp = ɵrenderComponent(PascalTriangleComponent, { host: this });
    }
}
