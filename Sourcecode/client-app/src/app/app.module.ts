import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderRightComponent } from './shared/header/header-right/header-right.component';
import { HeaderDropdownMenuComponent } from './shared/header/header-dropdown-menu/header-dropdown-menu.component';
import { HeaderLogoComponent } from './shared/header/header-logo/header-logo.component';

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
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
