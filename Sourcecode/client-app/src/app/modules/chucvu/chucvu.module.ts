import { ConfirmDialogComponent } from './../../shared/component/confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from './../../shared/module/share-module.module';
import { ChucVuListComponent } from './components/chucvu-list/chucvu-list.component';
import { ChucVuSaveComponent } from './components/chucvu-save/chucvu-save.component';




@NgModule({
  imports: [
    CommonModule,
    ShareModule
    ],
  entryComponents: [
    ChucVuSaveComponent,
    ConfirmDialogComponent
  ],
  declarations: [ChucVuListComponent, ChucVuSaveComponent]
})
export class ChucVuModule { }