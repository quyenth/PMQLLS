import { XaListComponent } from './../xa/components/xa-list/xa-list.component';
import { ChucVuListComponent } from './../chucvu/components/chucvu-list/chucvu-list.component';
import { PageNotFoundComponent } from './../../shared/component/page-not-found/page-not-found.component';
import { CapbacListComponent } from './../capbac/components/capbac-list/capbac-list.component';

import { TinhListComponent } from './../tinh/components/tinh-list/tinh-list.component';
import { LoginPageComponent } from './../login/components/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ChucVuListComponent },
  { path: 'chucvu', component: ChucVuListComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'capbac', component: CapbacListComponent },
  { path: 'xa', component: XaListComponent },
  { path: 'tinh', component: TinhListComponent },
  { path: '**', component: PageNotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }




