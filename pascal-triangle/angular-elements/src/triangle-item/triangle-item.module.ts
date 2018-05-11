import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { BrowserModule } from '@angular/platform-browser';
import { TriangleItemComponent } from './triangle-item.component';

@NgModule({
    imports: [BrowserModule],
    declarations: [TriangleItemComponent],
    entryComponents: [TriangleItemComponent]
})
export class TriangleItemModule {
    constructor(private injector: Injector) {
        const customElement = createCustomElement(TriangleItemComponent, { injector });
        customElements.define('triangle-item', customElement);
    }
    ngDoBootstrap() {}
}
