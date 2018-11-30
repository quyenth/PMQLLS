import { ConfirmDialogComponent } from './../../shared/component/confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from './../../shared/module/share-module.module';
import { DiemCaoListComponent } from './components/diemcao-list/diemcao-list.component';
import { DiemCaoSaveComponent } from './components/diemcao-save/diemcao-save.component';




@NgModule({
  imports: [
    CommonModule,
    ShareModule
    ],
  entryComponents: [
    DiemCaoSaveComponent,
    ConfirmDialogComponent
  ],
  declarations: [DiemCaoListComponent, DiemCaoSaveComponent]
})
export class DiemCaoModule { }