import { ConfirmDialogComponent } from './../../shared/component/confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from './../../shared/module/share-module.module';
import { CapbacListComponent } from './components/capbac-list/capbac-list.component';
import { CapbacDialogComponent } from './components/capbac-dialog/capbac-dialog.component';




@NgModule({
  imports: [
    CommonModule,
    ShareModule
    ],
  entryComponents: [
    CapbacDialogComponent,
    ConfirmDialogComponent
  ],
  declarations: [CapbacListComponent, CapbacDialogComponent]
})
export class CapbacModule { }
