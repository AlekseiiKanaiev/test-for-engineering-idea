import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ContentComponent } from './components/content/content.component';
import { FilterComponent } from './components/filter/filter.component';
import { DrinksListComponent } from './components/content/drinks-list/drinks-list.component';
import { GetDataService } from './_services/get-data.service';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    FilterComponent,
    DrinksListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GetDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
