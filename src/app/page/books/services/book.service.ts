import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) { }


  getAllBooks(): Observable<any> {
    return this.httpClient.get(environment.urlAPi + 'book');
  }

  getBook(id: number): Observable<any> {
    return this.httpClient.get(environment.urlAPi + `book/${id}`);
  }

  getAuthorByBook(idBook: number): Observable<any> {
    return this.httpClient.get(environment.urlAPi + `book/Authors/${idBook}`);
  }

  postBook(postBody: Book): Observable<any> {
    return this.httpClient.post( environment.urlAPi + 'book', postBody);
  }

  putBook(putBody: Book): Observable<any> {
    return this.httpClient.put( environment.urlAPi + 'book', putBody);
  }

  deleteBook(id: number): Observable<any> {
    return this.httpClient.delete(environment.urlAPi + `book/${id}`);
  }



}
