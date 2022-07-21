import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  totalSize: any;
  currentPage: number;
  pageSize: any;

  constructor(private httpClient: HttpClient, private dialog: MatDialog) { }


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
    return this.httpClient.put( environment.urlAPi + `book/${putBody.id}`, putBody);
  }

  deleteBook(id: number): Observable<any> {
    return this.httpClient.delete(environment.urlAPi + `book/${id}`);
  }

//method for create dialog of A-Material
  onCreateDialog(
    components: any,
    heightPorcent?: string,
    width?: string,
    formEnableOrdisable: boolean = true,
    data?: any,
    disableClose: boolean = false,
    autoFocus: boolean = true,
    maxWidth?: string,
    position: string = 'center'
  ) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = disableClose;
      dialogConfig.autoFocus = autoFocus;
      dialogConfig.panelClass = 'custom-dialog-container';

      dialogConfig.minHeight = "350Px";
      dialogConfig.minWidth  = "300px";


      if(position == 'right') {
        dialogConfig.position = { right : '0px', top   : '0px' };
      }else if(position == 'left') {
        dialogConfig.position = { left  : '0px', top   : '0px'  };
      }else if(position == 'top') {
        dialogConfig.position = { left  : '0px', right: '0px', top   : '0px'  };
      }

      if (width) dialogConfig.width = width + '%';
      if (maxWidth) dialogConfig.maxWidth  = maxWidth;

      if (heightPorcent) dialogConfig.height = heightPorcent + '%';

      dialogConfig.data = { data: data, formEnableOrdisable: formEnableOrdisable, };

      const dg = this.dialog.open(components, dialogConfig);
      return dg;
    }

    dialogClose(){
      this.dialog.closeAll();
    }


}
