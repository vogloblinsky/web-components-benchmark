import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { BrowserModule } from '@angular/platform-browser';
import { PascalTriangleComponent } from './pascal-triangle.component';

@NgModule({
    imports: [BrowserModule],
    declarations: [PascalTriangleComponent],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    entryComponents: [PascalTriangleComponent]
})
export class PascalTriangleModule {
    constructor(private injector: Injector) {
        const customElement = createCustomElement(PascalTriangleComponent, { injector });
        customElements.define('pascal-triangle', customElement);
    }
    ngDoBootstrap() {}
}
