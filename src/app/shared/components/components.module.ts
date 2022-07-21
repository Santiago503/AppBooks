  import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardContainerComponent } from './card-container/card-container.component';
import { ButtonAddComponent } from './button-add/button-add.component';
import { InputsGenericComponent } from './inputs-generic/inputs-generic.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/material/material.module';

const components = [CardContainerComponent,ButtonAddComponent, InputsGenericComponent]
@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,

  ],
  exports: [
    ...components
  ]
})
export class ComponentsModule { }
