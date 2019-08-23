import {
    Component,
    EventEmitter,
    Output,
    ViewEncapsulation,
    ChangeDetectionStrategy
} from '@angular/core';

@Component({
    selector: 'todo-input',
    template: `
        <form (ngSubmit)="handleOnSubmit($event)">
            <input
                type="text"
                placeholder="What needs to be done?"
                [(ngModel)]="newTodo"
            />
        </form>
    `,
    styles: [
        `
            :host {
                display: block;
            }
            form {
                position: relative;
                font-size: 24px;
                border-bottom: 1px solid #ededed;
            }
            input {
                padding: 16px 16px 16px 60px;
                border: none;
                background: rgba(0, 0, 0, 0.003);
                position: relative;
                margin: 0;
                width: 100%;
                font-size: 24px;
                font-family: inherit;
                font-weight: inherit;
                line-height: 1.4em;
                border: 0;
                outline: none;
                color: inherit;
                padding: 6px;
                border: 1px solid #ccc;
                box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
                box-sizing: border-box;
            }
        `
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.Native
})
export class TodoInputComponent {
    @Output() onTodoInputSubmit = new EventEmitter<string>();

    newTodo;

    constructor() {}

    handleOnSubmit(e) {
        console.log(this.newTodo);

        this.onTodoInputSubmit.emit(this.newTodo);
    }
}
