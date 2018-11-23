import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CapbacListComponent } from './components/capbac-list/capbac-list.component';
import { CapbacDialogComponent } from './components/capbac-dialog/capbac-dialog.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CapbacListComponent, CapbacDialogComponent]
})
export class CapbacModule { }
