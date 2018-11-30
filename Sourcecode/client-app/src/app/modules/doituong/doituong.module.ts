import { ConfirmDialogComponent } from './../../shared/component/confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from './../../shared/module/share-module.module';
import { DoiTuongListComponent } from './components/doituong-list/doituong-list.component';
import { DoiTuongSaveComponent } from './components/doituong-save/doituong-save.component';




@NgModule({
  imports: [
    CommonModule,
    ShareModule
    ],
  entryComponents: [
    DoiTuongSaveComponent,
    ConfirmDialogComponent
  ],
  declarations: [DoiTuongListComponent, DoiTuongSaveComponent]
})
export class DoiTuongModule { }