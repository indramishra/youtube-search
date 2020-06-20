import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SearchResult } from 'src/app/search-result.model';

export const YOUTUBE_API_KEY = 'AIzaSyAXPuJQpP3ltkoiI9A9msPIZR68No0HcBw';
export const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search';


@Injectable()
export class YoutubeSearchService {

  constructor(private http: HttpClient, @Inject(YOUTUBE_API_KEY)  private apiKey: string, @Inject(YOUTUBE_API_URL) private apiUrl: string  ) { }


  search(query: string): Observable<SearchResult[]>{
    const params: string= [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`
    ].join('&');
    const queryUrl = `${this.apiUrl}?${params}`;
    return this.http.get(queryUrl).pipe(map((response: Response)=>{
      return <any>response['items'].map(item=>{
        return new SearchResult({
          id: item.id.videoId,
          title: item.snippet.title,
          description: item.snippet.description,
          thumbnailUrl: item.snippet.thumbnails.high.url
        });
      });
    }));
  }
}
