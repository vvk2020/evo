import { NgModule } from '@angular/core';
import { TableComponent } from './table.component';

//Angular Material
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, MatTableModule],
  exports: [TableComponent],
})
export class TableModule {}
