import { ConfirmDialogComponent } from '../../shared/component/confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from '../../shared/module/share-module.module';
import { UserRolesSaveComponent } from './components/aspnetuserroles-save/user_roles-save.component';
import { UserRolesListComponent } from './components/aspnetuserroles-list/user_roles-list.component';




@NgModule({
  imports: [
    CommonModule,
    ShareModule
    ],
  entryComponents: [
    UserRolesSaveComponent,
    ConfirmDialogComponent
  ],
  declarations: [UserRolesListComponent, UserRolesSaveComponent]
})
export class UserRolesModule { }
