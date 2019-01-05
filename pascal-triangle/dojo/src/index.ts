import * as PascalTriangle from './pascaltriangle/pascaltriangle';
import * as TriangleItem from './triangleitem/triangleitem';

import { register } from '@dojo/framework/widget-core/registerCustomElement';

register(PascalTriangle.default);
register(TriangleItem.default);
