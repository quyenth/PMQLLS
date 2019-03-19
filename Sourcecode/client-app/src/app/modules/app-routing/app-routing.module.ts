import { PhieuCungCapListComponent } from './../ncc_phieucungcap/components/ncc_phieucungcap-list/ncc_phieucungcap-list.component';
import { SoQuyenListComponent } from './../soquyen/components/soquyen-list/soquyen-list.component';
import { LietSyListComponent } from './../lietsy/components/lietsy-list/lietsy-list.component';
import { UserRolesListComponent } from './../user_role/components/aspnetuserroles-list/user_roles-list.component';
import { RolesListComponent } from './../role/components/role-list/aspnetroles-list.component';
import { DiemCaoListComponent } from './../diemcao/components/diemcao-list/diemcao-list.component';
import { LoaiDoiTuongListComponent } from './../loaidoituong/components/loaidoituong-list/loaidoituong-list.component';
import { DonViListComponent } from './../donvi/components/donvi-list/donvi-list.component';
import { DoiTuongListComponent } from './../doituong/components/doituong-list/doituong-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { RegisterComponent } from './../register/register.component';
import { MatTranListComponent } from './../mattran/components/mattran-list/mattran-list.component';
import { XaListComponent } from './../xa/components/xa-list/xa-list.component';
import { ChucVuListComponent } from './../chucvu/components/chucvu-list/chucvu-list.component';
import { PageNotFoundComponent } from './../../shared/component/page-not-found/page-not-found.component';
import { CapbacListComponent } from './../capbac/components/capbac-list/capbac-list.component';
import { TinhListComponent } from './../tinh/components/tinh-list/tinh-list.component';
import { HuyenListComponent } from './../huyen/components/huyen-list/huyen-list.component';
import { LoginPageComponent } from './../login/components/login-page/login-page.component';
import { ThoiKyListComponent } from '../thoiky/components/thoiky-list/thoiky-list.component';
import { UserListComponent } from '../user/components/user-list/user-list.component';

const routes: Routes = [
  { path: '', component: LietSyListComponent },
  { path: 'chucvu', component: ChucVuListComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'capbac', component: CapbacListComponent },
  { path: 'xa', component: XaListComponent },
  { path: 'tinh', component: TinhListComponent },
  { path: 'huyen', component: HuyenListComponent },
  { path: 'thoiky', component: ThoiKyListComponent },
  { path: 'mattran', component: MatTranListComponent },
  { path: 'doituong', component: DoiTuongListComponent },
  { path: 'donvi', component: DonViListComponent },
  { path: 'loaidoituong', component: LoaiDoiTuongListComponent },
  { path: 'diemcao', component: DiemCaoListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'role', component: RolesListComponent },
  { path: 'user_role', component: UserRolesListComponent },
  { path: 'lietsi', component: LietSyListComponent },
  { path: 'soquyen', component: SoQuyenListComponent },
  { path: 'phieucungcap', component: PhieuCungCapListComponent },
  { path: 'user', component: UserListComponent },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }




