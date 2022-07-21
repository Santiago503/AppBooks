import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { ListComponent } from './components/list/list.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MaterialModule } from 'src/material/material.module';
import { FormControlBookComponent } from './components/form-control-book/form-control-book.component';


@NgModule({
  declarations: [
    ListComponent,
    FormControlBookComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    ComponentsModule,
    MaterialModule

  ],
  entryComponents: [FormControlBookComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BooksModule { }
