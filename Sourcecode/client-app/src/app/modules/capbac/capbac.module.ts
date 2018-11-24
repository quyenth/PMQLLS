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
  ],
  declarations: [CapbacListComponent, CapbacDialogComponent]
})
export class CapbacModule { }
