import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SearchDetailsComponent } from './searches/search-details/search-details.component';
import { SearchListComponent } from './searches/search-list/search-list.component';
import { SearchComponent } from './searches/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchDetailsComponent,
    SearchListComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
