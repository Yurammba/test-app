import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class YoutubeService {
  private apiUrl = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyDwXH7iiPVxiw6jrS4eFA8e4JjaLzv4DFQ&q=SEARCH_QUERY\n'
  public currentPageToken?: string;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  public videoStore$ = new BehaviorSubject<any>([]);

  public loadMoreVideos(maxResults: number = 6) {
    this.store(maxResults, this.currentPageToken);
  }

  public resetData() {
    this.videoStore$.next([]);
  }

  public store(maxResults: number = 6, pageToken?: string) {
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('chart', 'mostPopular')
      .set('pageToken', pageToken || '')
      .set('maxResults', maxResults.toString());

    this.httpClient.get(this.apiUrl, {params}).subscribe(
      (storeData: any) => {
        const storedData = JSON.parse(localStorage.getItem('saveData') || '[]');

        const fullData = storeData.items.map((item: any) => ({
          videoThumbnails: item.snippet.thumbnails.high.url,
          title: item.snippet.localized.title,
          favorites: storedData.find((storeItem: any) =>
            storeItem.title === item.snippet.localized.title)
        }))

        this.currentPageToken = storeData.nextPageToken;
        const currentData = this.videoStore$.getValue();
        const updatedData = [...currentData, ...fullData];

        this.videoStore$.next(updatedData);
      });
  }
}

