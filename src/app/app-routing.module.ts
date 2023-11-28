import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthorsComponent} from "./authors/authors.component";
import {BooksComponent} from "./books/books.component";
import {AuthorsAddComponent} from "./authors/authors-add/authors-add.component";
import {BooksAddComponent} from "./books/books-add/books-add.component";

const routes: Routes = [
  { path: '', redirectTo: '/authors', pathMatch: 'full' },
  { path: 'authors', component: AuthorsComponent},
  { path: 'authors/add', component: AuthorsAddComponent},
  { path: 'books', component: BooksComponent },
  { path: 'books/add', component: BooksAddComponent },
  { path: '**', redirectTo: '/authors' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
