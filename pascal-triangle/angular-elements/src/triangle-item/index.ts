import 'zone.js/dist/zone';

import '@webcomponents/custom-elements/src/native-shim';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { TriangleItemModule } from './triangle-item.module';

platformBrowserDynamic()
    .bootstrapModule(TriangleItemModule)
    .then(ref => {
        console.log('TriangleItemModule boostraped');
    });
