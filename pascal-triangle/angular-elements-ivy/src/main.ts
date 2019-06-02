import { enableProdMode } from '@angular/core';

import { environment } from './environments/environment';

import { PascalTriangleElement } from './app/pascal-triangle.element';
import { TriangleItemElement } from './app/triangle-item.element';

if (environment.production) {
    enableProdMode();
}

//customElements.define('triangle-item', TriangleItemElement);
customElements.define('pascal-triangle', PascalTriangleElement);
