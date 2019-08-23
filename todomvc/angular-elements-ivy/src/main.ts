import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';

import { MyTodoElement } from './app/my-todo.element';

if (environment.production) {
    enableProdMode();
}

customElements.define('my-todo', MyTodoElement);
