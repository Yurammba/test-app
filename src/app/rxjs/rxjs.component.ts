import {Component, OnInit, OnDestroy} from '@angular/core';
import {YoutubeService} from "../service/youtube.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  videos = this.youtubeService;

  constructor(
    private youtubeService: YoutubeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.youtubeService.store();
  }

  loadMoreVideos() {
    this.youtubeService.loadMoreVideos();
  }

  toggleFavorite(card: any) {
    card.favorites = !card.favorites;
    let storedData: any[] = JSON.parse(localStorage.getItem('saveData')!) || [];
    if (card.favorites) {
      const existingItemIndex = storedData.findIndex((item: any) => item.title === card.title);
      if (existingItemIndex !== -1) {
        storedData[existingItemIndex].favorites = true;
      } else {
        storedData.push({...card});
      }
    } else {
      storedData = storedData.filter((item: any) => item.title !== card.title);
    }
    localStorage.setItem('saveData', JSON.stringify(storedData));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.youtubeService.resetData();
  }

  favorite() {
    this.router.navigate(['/rxjs/favorite']);
  }
}
