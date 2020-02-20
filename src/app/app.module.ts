import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ContentComponent } from './components/content/content.component';
import { FilterComponent } from './components/filter/filter.component';
import { GetDataService } from './_services/get-data.service';
import { ToTopComponent } from './components/to-top/to-top.component';

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    FilterComponent,
    ToTopComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [GetDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
