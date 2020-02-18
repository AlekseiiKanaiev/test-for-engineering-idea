import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { DrinksComponent } from './drinks/drinks.component';
import { DrinkslistComponent } from './drinks/drinkslist/drinkslist.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    DrinksComponent,
    DrinkslistComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
