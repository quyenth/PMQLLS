import { ConfirmDialogComponent } from './../../shared/component/confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from './../../shared/module/share-module.module';
import { PhieuCungCapListComponent } from './components/ncc_phieucungcap-list/ncc_phieucungcap-list.component';
import { PhieuCungCapSaveComponent } from './components/ncc_phieucungcap-save/ncc_phieucungcap-save.component';




@NgModule({
  imports: [
    CommonModule,
    ShareModule
    ],
  entryComponents: [
    PhieuCungCapSaveComponent,
    ConfirmDialogComponent
  ],
  declarations: [PhieuCungCapListComponent, PhieuCungCapSaveComponent]
})
export class PhieuCungCapModule { }
