import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';

import { PascalTriangleElement } from './app/pascal-triangle.element';

if (environment.production) {
    enableProdMode();
}

customElements.define('pascal-triangle', PascalTriangleElement);
