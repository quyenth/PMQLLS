import { ConfirmDialogComponent } from './../../shared/component/confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from './../../shared/module/share-module.module';
import { DonViListComponent } from './components/donvi-list/donvi-list.component';
import { DonViSaveComponent } from './components/donvi-save/donvi-save.component';




@NgModule({
  imports: [
    CommonModule,
    ShareModule
    ],
  entryComponents: [
    DonViSaveComponent,
    ConfirmDialogComponent
  ],
  declarations: [DonViListComponent, DonViSaveComponent]
})
export class DonViModule { }