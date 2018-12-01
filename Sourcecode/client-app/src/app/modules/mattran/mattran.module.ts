import { ConfirmDialogComponent } from './../../shared/component/confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from './../../shared/module/share-module.module';
import { MatTranListComponent } from './components/mattran-list/mattran-list.component';
import { MatTranSaveComponent } from './components/mattran-save/mattran-save.component';




@NgModule({
  imports: [
    CommonModule,
    ShareModule
    ],
  entryComponents: [
    MatTranSaveComponent,
    ConfirmDialogComponent
  ],
  declarations: [MatTranListComponent, MatTranSaveComponent]
})
export class MatTranModule { }
