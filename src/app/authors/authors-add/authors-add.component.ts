import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-authors-add',
  templateUrl: './authors-add.component.html',
  styleUrls: ['./authors-add.component.scss']
})
export class AuthorsAddComponent implements OnInit {
  authorForm!: FormGroup;
  authors: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.authorForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      father_name: ['', Validators.required],
      birthday: ['',
        [Validators.required,
          Validators.pattern('\\d{2}\\.\\d{2}\\.\\d{4}')
        ]
      ]
    });
    this.authors = JSON.parse(localStorage.getItem('authors') || '[]');
  }

  save() {
    if (this.authorForm.valid) {
      let storedAuthors = JSON.parse(localStorage.getItem('authors') || '[]');
      const newAuthor = {id: this.generateUniqueId(storedAuthors), ...this.authorForm.value};
      const isUnique = this.isAuthorUnique(newAuthor, storedAuthors);
      if (isUnique) {
        storedAuthors.push(newAuthor);
        localStorage.setItem('authors', JSON.stringify(storedAuthors));

        this.authors = storedAuthors;
        this.authorForm.reset();
        this.router.navigate(['/']);
      }
    }
  }

  generateUniqueId(existingAuthors: any[]): number {
    const lastId = existingAuthors.length > 0 ? Math.max(...existingAuthors.map(author => author.id)) : 0;
    return lastId + 1;
  }

  isAuthorUnique(newAuthor: any, existingAuthors: any[]): boolean {
    return !existingAuthors.some(author =>
      author.first_name === newAuthor.first_name &&
      author.last_name === newAuthor.last_name &&
      author.father_name === newAuthor.father_name &&
      author.birthday === newAuthor.birthday
    );
  }
}

