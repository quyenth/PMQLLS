import { ShareModule } from './../../shared/module/share-module.module';
import { AppRoutingModule } from './../app-routing/app-routing.module';
import { RegisterComponent } from './register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule, AppRoutingModule , ShareModule
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule { }
