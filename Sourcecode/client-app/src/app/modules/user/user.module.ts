import { ConfirmDialogComponent } from '../../shared/component/confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareModule } from '../../shared/module/share-module.module';
import { UserSaveComponent } from './components/user-save/user-save.component';
import { UserListComponent } from './components/user-list/user-list.component';





@NgModule({
  imports: [
    CommonModule,
    ShareModule
    ],
  entryComponents: [
    UserSaveComponent,
    ConfirmDialogComponent
  ],
  declarations: [UserListComponent, UserSaveComponent]
})
export class UserModule { }
