import { ConfirmDialogComponent } from './../../shared/component/confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from './../../shared/module/share-module.module';
import { HuyenListComponent } from './components/huyen-list/huyen-list.component';
import { HuyenSaveComponent } from './components/huyen-save/huyen-save.component';




@NgModule({
  imports: [
    CommonModule,
    ShareModule
    ],
  entryComponents: [
    HuyenSaveComponent,
    ConfirmDialogComponent
  ],
  declarations: [HuyenListComponent, HuyenSaveComponent]
})
export class HuyenModule { }