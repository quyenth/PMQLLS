import { ConfirmDialogComponent } from './../../shared/component/confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from './../../shared/module/share-module.module';
import { TinhListComponent } from './components/tinh-list/tinh-list.component';
import { TinhSaveComponent } from './components/tinh-save/tinh-save.component';
import { TinhDialogComponent } from './components/tinh-dialog/tinh-dialog.component';




@NgModule({
  imports: [
    CommonModule,
    ShareModule
    ],
  entryComponents: [
    TinhSaveComponent,
    ConfirmDialogComponent,
    TinhDialogComponent,
    TinhListComponent
  ],
  declarations: [TinhListComponent, TinhSaveComponent, TinhDialogComponent]
})
export class TinhModule {

}
