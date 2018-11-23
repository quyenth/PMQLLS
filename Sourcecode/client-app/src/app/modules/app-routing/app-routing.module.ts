import { PageNotFoundComponent } from './../../shared/component/page-not-found/page-not-found.component';
import { CapbacListComponent } from './../capbac/components/capbac-list/capbac-list.component';
import { ChucvuListComponent } from './../chucvu/components/chucvu-list/chucvu-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ChucvuListComponent },
  { path: 'capbac', component: CapbacListComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




