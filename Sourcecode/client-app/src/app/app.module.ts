import { CapbacModule } from './modules/capbac/capbac.module';
import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { ResponseInterceptor } from './core/interceptors/ResponseInterceptor';
import { AuthService } from './shared/services/auth.Service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './core/interceptors/JwtInterceptor';
import { HeaderComponent } from './shared/component/header/header.component';
import { FooterComponent } from './shared/component/footer/footer.component';
import { HeaderRightComponent } from './shared/component/header/header-right/header-right.component';
import { HeaderDropdownMenuComponent } from './shared/component/header/header-dropdown-menu/header-dropdown-menu.component';
import { HeaderLogoComponent } from './shared/component/header/header-logo/header-logo.component';
import { ChucvuModule } from './modules/chucvu/chucvu.module';
import { FormsModule } from '@angular/forms';
import { ModalService } from './shared/services/modal.Service';
import { TinhModule } from './modules/tinh/tinh.module';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { PageNotFoundComponent } from './shared/component/page-not-found/page-not-found.component';
import { ComponentLoaderFactory } from 'ngx-bootstrap/loader';
import { LoginModule } from './modules/login/login.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ConfirmationDialogService } from './shared/services/confirmDialog.service';


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
    ChucvuModule,
    CapbacModule,
    TinhModule,
    FormsModule,
    ModalModule,
    LoginModule,
    AppRoutingModule,
    NgxSpinnerModule
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
