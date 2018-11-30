import { ConfirmDialogComponent } from './../../shared/component/confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from './../../shared/module/share-module.module';
import { LietSyListComponent } from './components/lietsy-list/lietsy-list.component';
import { LietSySaveComponent } from './components/lietsy-save/lietsy-save.component';




@NgModule({
  imports: [
    CommonModule,
    ShareModule
    ],
  entryComponents: [
    LietSySaveComponent,
    ConfirmDialogComponent
  ],
  declarations: [LietSyListComponent, LietSySaveComponent]
})
export class LietSyModule { }