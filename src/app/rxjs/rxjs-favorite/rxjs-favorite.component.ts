import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-rxjs-favorite',
  templateUrl: './rxjs-favorite.component.html',
  styleUrls: ['./rxjs-favorite.component.scss']
})
export class RxjsFavoriteComponent implements OnInit {
  favoritesData: any[] = [];

  ngOnInit(): void {
    const savedData = localStorage.getItem('saveData');
    if (savedData) {
      this.favoritesData = JSON.parse(savedData);
    }
  }

  removeFromFavorites(index: number): void {
    this.favoritesData.splice(index, 1);
    localStorage.setItem('saveData', JSON.stringify(this.favoritesData));
  }
}
