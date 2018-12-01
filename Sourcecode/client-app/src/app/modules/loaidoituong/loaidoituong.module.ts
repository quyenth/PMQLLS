import { ConfirmDialogComponent } from './../../shared/component/confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from './../../shared/module/share-module.module';
import { LoaiDoiTuongListComponent } from './components/loaidoituong-list/loaidoituong-list.component';
import { LoaiDoiTuongSaveComponent } from './components/loaidoituong-save/loaidoituong-save.component';




@NgModule({
  imports: [
    CommonModule,
    ShareModule
    ],
  entryComponents: [
    LoaiDoiTuongSaveComponent,
    ConfirmDialogComponent
  ],
  declarations: [LoaiDoiTuongListComponent, LoaiDoiTuongSaveComponent]
})
export class LoaiDoiTuongModule { }
