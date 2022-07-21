import {  Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
  filterValue: string;

  constructor(public bookService: BookService, private alertServ: AlertService) {}

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

            if(this.filterValue != undefined) {
              this.dataSource.filter = this.filterValue;//set filter
            }
          },
          error: (e) => {
            console.log(e)
            this.loading = false;
            this.alertServ.swalBasic('An error has occurred', 'Could not load information, please try again','error');
          }})
  }

  applyFilter(filterValue: any) {

    if (filterValue?.keyCode == 13 ) {
            //simulate API
        this.loading = true;
        setTimeout(() => {
          filterValue = filterValue?.target?.value;
          this.setFilter(filterValue)
          this.loading = false;
          }, 500);
    }
  }

  setFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.filterValue  = filterValue;
    this.dataSource.filter = filterValue;//set filter
  }

  create() {
   let dg =  this.bookService.onCreateDialog(FormControlBookComponent, '90','50');

    dg.afterClosed().subscribe((resp) => {
      this.getAllBooks();
   });
  }

  onUpdate(element: any, typeCan: boolean) {
    //no need to do a query to find the item because the list has the entire item
    let dg = this.bookService.onCreateDialog(FormControlBookComponent, '90', '50', typeCan, element, false, true, '900px');

    if(typeCan){
      dg.afterClosed().subscribe((resp) => {
        this.getAllBooks();
     });
    }
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
        this.getAllBooks();
      },
      error: (e) => {
        console.log(e)
        this.alertServ.swalBasic('An error has occurred', 'Could not load information, please try again','error');
      }})
  }

}
