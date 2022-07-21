import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/shared/services/alert/alert.service';
import { BookService } from '../../services/book.service';
import { inputGenericData } from './dataInputs';

@Component({
  selector: 'app-form-control-book',
  templateUrl: './form-control-book.component.html',
  styleUrls: ['./form-control-book.component.scss']
})
export class FormControlBookComponent implements OnInit {
  inputGenericData = inputGenericData;
  edit: boolean;


  constructor(private fb: FormBuilder, public bookService: BookService, private alertServ: AlertService) { }

  ngOnInit(): void {
  }

   FormBuilder  = this.fb.group({
      id                 :[0]
     ,title              :['', Validators.required]
     ,description        :['', Validators.required]
     ,pageCount          :[0]
     ,excerpt            :['', Validators.required]
     ,publishDate        :['', Validators.required]
   });


   validateForm() {
    this.FormBuilder.markAllAsTouched();

    if (this.FormBuilder.invalid) {
      return false;
    }

    return true;
  }

   saveOrEdit() {
     let valid = this.validateForm();
     if(!valid) { return }


     console.log(this.FormBuilder.value)
     let data = this.FormBuilder.value;

     this.bookService.postBook(data)
     .subscribe
     ({
      next: (resp) => {
        this.alertServ.swalBasic('Congratulation!!','Book Created Successful','success');
        this.bookService.dialogClose();
      },
      error: (e) => {
        console.log(e)
        this.alertServ.swalBasic('An error has occurred', 'Could not create book, please try again','error');
      }})

   }

}
