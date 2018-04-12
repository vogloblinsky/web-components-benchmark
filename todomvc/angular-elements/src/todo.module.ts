import { NgModule, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { createCustomElement } from '@angular/elements';

import { BrowserModule } from '@angular/platform-browser';
import { MyTodo } from './my-todo';
import { TodoInput } from './todo-input';
import { TodoItem } from './todo-item';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [MyTodo, TodoInput, TodoItem],
  entryComponents: [MyTodo],
})
export class TodoModule {
  constructor(private injector: Injector) {
    console.log('TodoModule cstr');
    const customElement = createCustomElement(MyTodo, { injector });
    customElements.define('my-todo', customElement);
  }
  ngDoBootstrap() {
      console.log('ngDoBootstrap');
  }
}
