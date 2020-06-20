import { Component, OnInit, Output,EventEmitter, ElementRef } from '@angular/core';

import { YoutubeSearchService } from '../youtube-search.service';
import { fromEvent } from 'rxjs';
import { map, filter,debounceTime, tap, switchMap } from 'rxjs/Operators';
import { SearchResult } from 'src/app/search-result.model';


@Component({
  selector: 'app-search-box',
  template: `
  <div class="ui search">
  <div class="ui icon input">
  <input type="text" class="form control" placeholder="Search" autofocus>
  <i class="search icon"></i>
  </div>
  <div class="results"></div>
</div>
  `
  
})
export class SearchBoxComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(private youtube: YoutubeSearchService, private el: ElementRef) { }

  ngOnInit() {
    fromEvent(this.el.nativeElement, 'keyup').pipe(
    map((e:any)=>e.target.value),
    filter((text: string)=>text.length > 1),
    debounceTime(250),
    tap(()=>this.loading.emit(true)),
    switchMap((query: string)=>this.youtube.search(query)))
    .subscribe((results: SearchResult[])=>{
       this.loading.emit(false);
       this.results.emit(results);
      },
      (err:any)=>{
        console.log(err);
        this.loading.emit(false);
      },
      ()=>{this.loading.emit(false);});
  }

}
