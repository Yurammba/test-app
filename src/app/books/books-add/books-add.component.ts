import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-books-add',
  templateUrl: './books-add.component.html',
  styleUrls: ['./books-add.component.scss']
})

export class BooksAddComponent implements OnInit {
  booksForm!: FormGroup;
  authors: any[] = [];
  books: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.authors = JSON.parse(localStorage.getItem('authors') || '[]')
    this.booksForm = this.formBuilder.group({
      author: ['', Validators.required],
      name: ['', Validators.required],
      publisher: ['', Validators.required],
      year: ['',
        [Validators.required,
          Validators.maxLength(4),
          Validators.minLength(4),
          this.isNumber
        ]
      ]
    })
    this.books = JSON.parse(localStorage.getItem('books') || '[]');
  }

  isNumber(control: FormControl) {
    const value = control.value;
    const isValidNumber = !isNaN(value) && !isNaN(parseFloat(value));
    return isValidNumber ? null : {notANumber: true};
  }

  generateUniqueId(existingBooks: any[]): number {
    const lastId = existingBooks.length > 0 ? Math.max(...existingBooks.map(book => book.id)) + 1 : 0;
    return lastId;
  }

  save() {
    if (this.booksForm.valid) {
      let storedAuthors = JSON.parse(localStorage.getItem('books') || '[]');
      const newBook = {id: this.generateUniqueId(storedAuthors), ...this.booksForm.value};
      storedAuthors.push(newBook);
      localStorage.setItem('books', JSON.stringify(storedAuthors));

      this.books = storedAuthors;
      this.booksForm.reset();
      this.router.navigate(['/books'])
    }
  }
}
