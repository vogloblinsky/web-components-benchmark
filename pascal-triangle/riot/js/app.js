import { register, mount, component } from 'riot';
import pascalTriangle from './pascal-triangle.js';
import triangleItem from './triangle-item.js';

register('triangle-item', triangleItem);
mount('triangle-item');

component(pascalTriangle)(document.querySelector('pascal-triangle'));
