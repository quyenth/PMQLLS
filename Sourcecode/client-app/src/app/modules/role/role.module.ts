import { ConfirmDialogComponent } from './../../shared/component/confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from './../../shared/module/share-module.module';
import { RoleSaveComponent } from './components/role-save/aspnetroles-save.component';
import { RolesListComponent } from './components/role-list/aspnetroles-list.component';




@NgModule({
  imports: [
    CommonModule,
    ShareModule
    ],
  entryComponents: [
    RoleSaveComponent,
    ConfirmDialogComponent
  ],
  declarations: [ RoleSaveComponent , RolesListComponent]
})
export class RolesModule { }
