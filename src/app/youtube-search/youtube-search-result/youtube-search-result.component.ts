import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { SearchResult } from 'src/app/search-result.model';

@Component({
  selector: 'app-youtube-search-result',
  template:`<img src="{{ result.thumbnailUrl }}"/>
  <div class="caption">
    <h3>{{ result.title }}</h3>
    <p>{{ result.description }}</p>
    <a target="_blank" class="button button-outline" href="{{ result.videoUrl }}">Watch</a>
  </div>
`
})
export class YoutubeSearchResultComponent implements OnInit {
  @Input() result: SearchResult;
  @HostBinding('attr.class') cssClass = 'thumbnail';

  constructor() { }

  ngOnInit() {
  }

}
