import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ResponseData } from 'src/app/shared/models/Response';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { Book } from '../../models/book';
import { BookService } from './../../services/book.service';
import { FormControlBookComponent } from './../form-control-book/form-control-book.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit  {
  displayedColumns: string[] = ['id', 'title', 'pageCount', 'publishDate', 'action'];
  dataSource = new MatTableDataSource<Book>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  loading: boolean;
  filterValue: boolean;

  constructor(private _liveAnnouncer: LiveAnnouncer, public bookService: BookService, private alertServ: AlertService) {}


  ngOnInit(): void {
    this.getAllBooks();
  }

  getAllBooks() {
    this.loading = true;
    this.bookService
        .getAllBooks()
        .subscribe
        ({
          next: (resp: ResponseData) => {
            this.dataSource           = new MatTableDataSource<Book>(resp.data);
            this.dataSource.paginator = this.paginator;
            this.loading = false;
          },
          error: (e) => {
            console.log(e)
            this.alertServ.swalBasic('An error has occurred', 'Could not load information, please try again','error');
          }})
  }

  applyFilter(filterValue: any) {

    if ((filterValue?.keyCode == 13 && (typeof filterValue != "string") || (typeof filterValue === "string"))) {
            //simulate API
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          }, 500);
    }
  }



  create() {
    this.bookService.onCreateDialog(FormControlBookComponent, '90','50');
  }

  onUpdate(element: any, type: boolean) {

  }

  async onDelete(element: any) {

    let confirm = await this.alertServ.SwalConfirm().then( resp => {
      return resp;
    })

    if(!confirm.isConfirmed) return



    this.bookService.deleteBook(element?.id)
    .subscribe
    ({
      next: (resp: ResponseData) => {
        this.alertServ.swalBasic('Congratulation!!','Book Deleted','success');
      },
      error: (e) => {
        console.log(e)
        this.alertServ.swalBasic('An error has occurred', 'Could not load information, please try again','error');
      }})
  }

}
