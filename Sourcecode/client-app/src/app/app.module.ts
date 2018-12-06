import { DiemCaoModule } from './modules/diemcao/diemcao.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './core/interceptors/JwtInterceptor';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { ComponentLoaderFactory } from 'ngx-bootstrap/loader';


import { DoiTuongModule } from './modules/doituong/doituong.module';
import { DonViModule } from './modules/donvi/donvi.module';
import { XaModule } from './modules/xa/xa.module';
import { ChucVuModule } from './modules/chucvu/chucvu.module';
import { CapbacModule } from './modules/capbac/capbac.module';
import { ResponseInterceptor } from './core/interceptors/ResponseInterceptor';
import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { AuthService } from './shared/services/auth.Service';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/component/header/header.component';
import { FooterComponent } from './shared/component/footer/footer.component';
import { HeaderRightComponent } from './shared/component/header/header-right/header-right.component';
import { HeaderDropdownMenuComponent } from './shared/component/header/header-dropdown-menu/header-dropdown-menu.component';
import { HeaderLogoComponent } from './shared/component/header/header-logo/header-logo.component';
import { ModalService } from './shared/services/modal.Service';
import { TinhModule } from './modules/tinh/tinh.module';
import { HuyenModule } from './modules/huyen/huyen.module';
import { PageNotFoundComponent } from './shared/component/page-not-found/page-not-found.component';
import { LoginModule } from './modules/login/login.module';
import { ConfirmationDialogService } from './shared/services/confirmDialog.service';
import { ThoiKyModule } from './modules/thoiky/thoiky.module';
import { MatTranModule } from './modules/mattran/mattran.module';
import { LoaiDoiTuongModule } from './modules/loaidoituong/loaidoituong.module';
import { RegisterModule } from './modules/register/register.module';
import { RolesModule } from './modules/role/role.module';
import { UserRolesModule } from './modules/user_role/user_role.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeaderRightComponent,
    HeaderDropdownMenuComponent,
    HeaderLogoComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChucVuModule,
    CapbacModule,
    TinhModule,
    HuyenModule,
    XaModule,
    FormsModule,
    ModalModule,
    LoginModule,
    RegisterModule,
    AppRoutingModule,
    NgxSpinnerModule,
    ThoiKyModule,
    MatTranModule,
    DoiTuongModule,
    DonViModule,
    LoaiDoiTuongModule,
    DiemCaoModule,
    RolesModule,
    UserRolesModule
  ],
  providers: [
    AuthService
    , {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true
    },
    ModalService,
    BsModalService,
    ComponentLoaderFactory,
    ConfirmationDialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
