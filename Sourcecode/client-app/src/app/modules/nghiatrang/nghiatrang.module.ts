import { ConfirmDialogComponent } from './../../shared/component/confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from './../../shared/module/share-module.module';
import { NghiaTrangListComponent } from './components/nghiatrang-list/nghiatrang-list.component';
import { NghiaTrangSaveComponent } from './components/nghiatrang-save/nghiatrang-save.component';




@NgModule({
  imports: [
    CommonModule,
    ShareModule
    ],
  entryComponents: [
    NghiaTrangSaveComponent,
    ConfirmDialogComponent
  ],
  declarations: [NghiaTrangListComponent, NghiaTrangSaveComponent]
})
export class NghiaTrangModule { }