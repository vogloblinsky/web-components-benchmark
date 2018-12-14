import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { BrowserModule } from '@angular/platform-browser';

import { PascalTriangleComponent } from './pascal-triangle.component';
import { TriangleItemComponent } from '../triangle-item/triangle-item.component';

@NgModule({
    imports: [BrowserModule],
    declarations: [PascalTriangleComponent, TriangleItemComponent],
    entryComponents: [PascalTriangleComponent]
})
export class PascalTriangleModule {
    constructor(private injector: Injector) {
        const customElement = createCustomElement(PascalTriangleComponent, {
            injector
        });
        customElements.define('pascal-triangle', customElement);
    }
    ngDoBootstrap() {}
}
