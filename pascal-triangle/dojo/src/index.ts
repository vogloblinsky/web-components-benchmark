import * as PascalTriangle from './pascaltriangle/PascalTriangle';
import * as TriangleItem from './triangleitem/TriangleItem';

import { register } from '@dojo/framework/widget-core/registerCustomElement';

register(PascalTriangle.default);
register(TriangleItem.default);
