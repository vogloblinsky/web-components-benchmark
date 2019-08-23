import { ɵrenderComponent, IterableDiffers } from '@angular/core';
import { MyTodoComponent } from './my-todo.component';

// Manual Custom Elements Wrapper that uses Ivy to render
// Angular Component
// The APIs are current private and can change
// The upcoming version of Angular Elements will automate
// this task
export class MyTodoElement extends HTMLElement {
    private comp: MyTodoComponent;

    constructor() {
        super();
        this.comp = ɵrenderComponent(MyTodoComponent, { host: this });
    }
}
