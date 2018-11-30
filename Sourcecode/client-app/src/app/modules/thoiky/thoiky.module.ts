import { ConfirmDialogComponent } from './../../shared/component/confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from './../../shared/module/share-module.module';
import { ThoiKyListComponent } from './components/thoiky-list/thoiky-list.component';
import { ThoiKySaveComponent } from './components/thoiky-save/thoiky-save.component';




@NgModule({
  imports: [
    CommonModule,
    ShareModule
    ],
  entryComponents: [
    ThoiKySaveComponent,
    ConfirmDialogComponent
  ],
  declarations: [ThoiKyListComponent, ThoiKySaveComponent]
})
export class ThoiKyModule { }