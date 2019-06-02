import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PascalTriangleComponent } from './pascal-triangle.component';
import { TriangleItemComponent } from './triangle-item.component';

@NgModule({
    imports: [CommonModule],
    declarations: [PascalTriangleComponent, TriangleItemComponent]
})
export class PascalTriangleModule {}
