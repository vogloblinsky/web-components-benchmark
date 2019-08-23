import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyTodoComponent } from './my-todo.component';
import { TodoItemComponent } from './todo-item.component';
import { TodoInputComponent } from './todo-input.component';

@NgModule({
    imports: [CommonModule],
    declarations: [MyTodoComponent, TodoItemComponent, TodoInputComponent]
})
export class MyTodoModule {}
