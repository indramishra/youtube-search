import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { YoutubeSearchComponent } from './youtube-search/youtube-search.component';
import { youtubeSearchInjactables } from './youtube-search/youtube-search.injactables';
import { YoutubeSearchResultComponent } from './youtube-search/youtube-search-result/youtube-search-result.component';
import { SearchBoxComponent } from './youtube-search/search-box/search-box.component';


@NgModule({
  declarations: [
    AppComponent,
    YoutubeSearchComponent,
    YoutubeSearchResultComponent,
    SearchBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule
  ],
  providers: [youtubeSearchInjactables],
  bootstrap: [AppComponent]
})
export class AppModule { }
