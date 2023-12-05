import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private apiUrl = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDwXH7iiPVxiw6jrS4eFA8e4JjaLzv4DFQ&q=SEARCH_QUERY\n'

  constructor(
    private http: HttpClient
  ) {}

  getHomePageVideos(pageToken: string, maxResults: number): Observable<any> {
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('chart', 'mostPopular')
      .set('pageToken', pageToken)
      .set('maxResults', maxResults.toString());
    return this.http.get(`${this.apiUrl}`, {params});
  }

}
