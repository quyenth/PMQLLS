import { ResponseInterceptor } from './core/interceptors/ResponseInterceptor';
import { AuthService } from './shared/services/auth.Service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './core/interceptors/JwtInterceptor';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderRightComponent } from './shared/header/header-right/header-right.component';
import { HeaderDropdownMenuComponent } from './shared/header/header-dropdown-menu/header-dropdown-menu.component';
import { HeaderLogoComponent } from './shared/header/header-logo/header-logo.component';
import { ChucvuModule } from './modules/chucvu/chucvu.module';
import { FormsModule } from '@angular/forms';
import { ModalService } from './shared/services/modal.Service';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeaderRightComponent,
    HeaderDropdownMenuComponent,
    HeaderLogoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChucvuModule,
    FormsModule,
    ModalModule
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
