import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSort} from "@angular/material/sort";
import {Router} from '@angular/router';
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})

export class AuthorsComponent implements OnInit, AfterViewInit {
  authors: any[] = [];
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'father_name', 'birthday'];
  dataSource = new MatTableDataSource(this.authors);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.authors = JSON.parse(localStorage.getItem('authors') || '[]');
    this.dataSource = new MatTableDataSource(this.authors);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  add() {
    this.router.navigate(['/authors/add']);
  }
}
