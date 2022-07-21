import { Component, OnInit } from '@angular/core';
import { Author } from '../../models/author';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {
  constructor(public bookService: BookService) { }

  ngOnInit(): void {
  }

}
