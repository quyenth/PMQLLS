import { ConfirmDialogComponent } from './../../shared/component/confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from './../../shared/module/share-module.module';
import { XaListComponent } from './components/xa-list/xa-list.component';
import { XaSaveComponent } from './components/xa-save/xa-save.component';




@NgModule({
  imports: [
    CommonModule,
    ShareModule
    ],
  entryComponents: [
    XaSaveComponent,
    ConfirmDialogComponent
  ],
  declarations: [XaListComponent, XaSaveComponent]
})
export class XaModule { }