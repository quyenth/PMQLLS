import { ConfirmDialogComponent } from './../../shared/component/confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from './../../shared/module/share-module.module';
import { SoQuyenListComponent } from './components/soquyen-list/soquyen-list.component';
import { SoQuyenSaveComponent } from './components/soquyen-save/soquyen-save.component';




@NgModule({
  imports: [
    CommonModule,
    ShareModule
    ],
  entryComponents: [
    SoQuyenSaveComponent,
    ConfirmDialogComponent
  ],
  declarations: [SoQuyenListComponent, SoQuyenSaveComponent]
})
export class SoQuyenModule { }