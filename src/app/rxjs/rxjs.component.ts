import {Component, OnInit} from '@angular/core';
import {YoutubeService} from "../service/youtube.service";
import {concatMap, map} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit {
  favorites = false;
  videoThumbnails: string[] = [];
  title: string [] = [];
  currentPageToken: string | undefined ;
  allVideoThumbnails: string[] = [];
  cards: { url: string; title: string; favorites: boolean; }[] = [];
  videosPerPage = 6;

  constructor(
    private youtubeService: YoutubeService,
    private router: Router
  ) {
  }

  ngOnInit() {
    const storedData = JSON.parse(localStorage.getItem('saveData') || '[]');
    console.log('Stored Data:', storedData);

    this.youtubeService.getHomePageVideos("", this.videosPerPage).subscribe((data: any) => {
      this.videoThumbnails = data.items.map((item: any) => item.snippet.thumbnails.high.url);
      this.title = data.items.map((item: any) => item.snippet.localized.title);

      this.allVideoThumbnails = [...this.videoThumbnails];

      // Проверяем наличие сохраненных данных в localStorage
      if (storedData.length > 0) {
        this.allVideoThumbnails.forEach((url, index) => {
          const savedData = storedData.find((item: any) => item.title === this.title[index]);
          this.cards.push({
            url: url,
            title: this.title[index],
            favorites: savedData ? savedData.favorites : false
          });
        });
      } else {
        // Если сохраненных данных нет, инициализируем массив cards без favorites
        this.allVideoThumbnails.forEach((url, index) => {
          this.cards.push({url: url, title: this.title[index], favorites: false});
        });
      }

      this.currentPageToken = data.nextPageToken;
    });
  }


  loadMoreVideos() {
    if (this.currentPageToken) {
      this.youtubeService.getHomePageVideos(this.currentPageToken, this.videosPerPage).subscribe((data: any) => {
        console.log('Received additional videos:', data);
        const additionalThumbnails = data.items.map((item: any) =>
          item.snippet.thumbnails.high.url);
        const additionalTitles = data.items.map((item: any) => item.snippet.localized.title);
        console.log('Additional Thumbnails:', additionalThumbnails);

        additionalTitles.forEach((title: string, index: number) => {
          const url = additionalThumbnails[index];
          const existingCard = this.cards.find(card => card.title === title);
          if (existingCard) {
            existingCard.favorites = true;
          } else {
            this.cards.push({url: url, title: title, favorites: false});
          }
        });

        // Обновляем токен следующей страницы
        this.currentPageToken = data.nextPageToken;
      });
    }
  }

  toggleFavorite(index: number) {
    const card = this.cards[index];
    card.favorites = !card.favorites;

    let storedData: any[] = JSON.parse(localStorage.getItem('saveData') || '[]');

    if (!Array.isArray(storedData)) {
      storedData = [];
    }

    if (!card.favorites) {
      storedData = storedData.filter((item: any) => item.title !== card.title);
    } else {
      const existingItemIndex = storedData.findIndex((item: any) => item.title === card.title);
      if (existingItemIndex !== -1) {
        storedData[existingItemIndex].favorites = true;
      } else {
        storedData.push({ ...card });
      }
    }

    localStorage.setItem('saveData', JSON.stringify(storedData));
    console.log('Сохраненные данные в LocalStorage:', storedData);
  }

  favorite() {
    this.router.navigate(['/rxjs/favorite']);
  }
}
