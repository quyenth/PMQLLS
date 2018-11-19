import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChucvuAddComponent } from './components/chucvu-add/chucvu-add.component';
import { ChucvuListComponent } from './components/chucvu-list/chucvu-list.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule
  ],
  declarations: [ChucvuListComponent],
  exports: [ChucvuListComponent]
})
export class ChucvuModule { }
