import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthorsComponent} from "./authors/authors.component";
import {BooksComponent} from "./books/books.component";
import {AuthorsAddComponent} from "./authors/authors-add/authors-add.component";
import {BooksAddComponent} from "./books/books-add/books-add.component";
import {RxjsComponent} from "./rxjs/rxjs.component";
import {RxjsFavoriteComponent} from "./rxjs/rxjs-favorite/rxjs-favorite.component";

const routes: Routes = [
  { path: '', redirectTo: '/authors', pathMatch: 'full' },
  { path: 'authors', component: AuthorsComponent},
  { path: 'authors/add', component: AuthorsAddComponent},
  { path: 'books', component: BooksComponent },
  { path: 'books/add', component: BooksAddComponent },
  { path: 'rxjs', component: RxjsComponent },
  { path: 'rxjs/favorite', component: RxjsFavoriteComponent },
  { path: '**', redirectTo: '/authors' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
