import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChucvuAddComponent } from './components/chucvu-add/chucvu-add.component';
import { ChucvuListComponent } from './components/chucvu-list/chucvu-list.component';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule
  ],
  declarations: [ChucvuListComponent],
  exports: [ChucvuListComponent]
})
export class ChucvuModule { }
