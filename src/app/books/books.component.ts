import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})

export class BooksComponent implements OnInit, AfterViewInit {
  booksForm!: FormGroup;
  authors: any[] = [];
  books: any[] = [];
  displayedColumns: string[] = ['id', 'author', 'name', 'publisher', 'year'];
  dataSource = new MatTableDataSource(this.books);

  @ViewChild(MatSort) sort!: MatSort;

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
          Validators.minLength(4)
        ]
      ]
    })

    this.books = JSON.parse(localStorage.getItem('books') || '[]');
    this.dataSource = new MatTableDataSource(this.books);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  add() {
    this.router.navigate(['/books/add']);
  }
}

