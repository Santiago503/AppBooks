import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { Author } from '../../models/author';
import { BookService } from '../../services/book.service';
import { inputGenericData } from './dataInputs';
import { ResponseData } from './../../../../shared/models/Response';

@Component({
  selector: 'app-form-control-book',
  templateUrl: './form-control-book.component.html',
  styleUrls: ['./form-control-book.component.scss']
})
export class FormControlBookComponent implements OnInit {
  inputGenericData = inputGenericData;
  CreateOrEdit: boolean;//true it create
  title = 'Create a Book';
  loading = false;

  constructor(private fb: FormBuilder,
    public bookService: BookService,
    private alertServ: AlertService,
    @Inject(MAT_DIALOG_DATA) public matDialogData: any) {
      //if  Mat Dialog have data then insert into Form
    matDialogData?.data ? this.patchValueForm( matDialogData?.data ) : null;
      //if it Edit or See
    this.editingOrCreating(matDialogData)
  }

  ngOnInit(): void {
  }

  FormBuilder  = this.fb.group({
      id                 :[0]
     ,title              :['', Validators.required]
     ,description        :['', Validators.required]
     ,pageCount          :[0, Validators.required]
     ,excerpt            :['', Validators.required]
     ,publishDate        :['', Validators.required]
  });

  patchValueForm(data: any) {
    data.publishDate = formatDate( data?.publishDate , 'yyyy-MM-dd', 'en-US')
    this.FormBuilder.patchValue(data);
  }

  validateForm() {
    this.FormBuilder.markAllAsTouched();

    if (this.FormBuilder.invalid) {
      return false;
    }

    return true;
  }

  editingOrCreating(data: any) {

    if( data?.data == undefined ) {
      this.FormBuilder.enable();
      this.CreateOrEdit = true;
      this.title = 'Create a Book'
    }else if(data?.formEnableOrdisable) {
      this.FormBuilder.enable();
      this.CreateOrEdit = false;
      this.title = 'Edition a Book #' + this.FormBuilder.value?.id;
    }else {
      this.FormBuilder.disable();
      this.CreateOrEdit = false;
      this.title = 'Seeing a Book #' + this.FormBuilder.value?.id;
    }

  }

  saveOrEdit() {
    let valid = this.validateForm();
    if(!valid) { return }

    this.loading = true;
    let data = this.FormBuilder.value;

    //if it Edit then put else post
    let verbHttp = this.FormBuilder.value.id == 0
                ? this.bookService.postBook(data)
                : this.bookService.putBook(data);


    verbHttp
    .subscribe
    ({
    next: (resp) => {
      this.alertServ.swalBasic('Congratulation!!','Book Created Successful','success');
      this.bookService.dialogClose();
      this.loading = false;
    },
    error: (e) => {
      console.log(e)
      this.loading = false;
      this.alertServ.swalBasic('An error has occurred', 'Could not create book, please try again','error');
    }})

  }

  GetAuthor() {
    if(!this.FormBuilder.value.id) return

    this.bookService
    .getAuthorByBook(this.FormBuilder.value.id)
    .subscribe
    ({
    next: (resp: ResponseData) => {
      this.bookService.author = resp.data;
    },
    error: (e) => {
      console.log(e)
      this.alertServ.swalBasic('An error has occurred', 'Could not create book, please try again','error');
    }})
  }

}
