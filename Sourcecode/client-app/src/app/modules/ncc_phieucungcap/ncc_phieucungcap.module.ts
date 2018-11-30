import { ConfirmDialogComponent } from './../../shared/component/confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from './../../shared/module/share-module.module';
import { Ncc_PhieuCungCapListComponent } from './components/ncc_phieucungcap-list/ncc_phieucungcap-list.component';
import { Ncc_PhieuCungCapSaveComponent } from './components/ncc_phieucungcap-save/ncc_phieucungcap-save.component';




@NgModule({
  imports: [
    CommonModule,
    ShareModule
    ],
  entryComponents: [
    Ncc_PhieuCungCapSaveComponent,
    ConfirmDialogComponent
  ],
  declarations: [Ncc_PhieuCungCapListComponent, Ncc_PhieuCungCapSaveComponent]
})
export class Ncc_PhieuCungCapModule { }