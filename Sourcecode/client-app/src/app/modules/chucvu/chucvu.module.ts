import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChucvuAddComponent } from './components/chucvu-add/chucvu-add.component';
import { ChucvuListComponent } from './components/chucvu-list/chucvu-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ ChucvuAddComponent, , ChucvuListComponent]
})
export class ChucvuModule { }
