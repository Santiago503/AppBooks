import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { InputGeneric } from './model/inputGeneric';

@Component({
  selector: 'app-inputs-generic',
  templateUrl: './inputs-generic.component.html',
  styleUrls: ['./inputs-generic.component.scss']
})
export class InputsGenericComponent implements OnInit {
  notPermit = [
    'textarea',
    'select',
    'ngselect',
    'ngselectMulti',
    'radio',
    'matSlideToggle'
  ]
  @Input() inputGeneric : InputGeneric[];

  @Input() formGroup: FormGroup;


  @Input() classMain: string;

  @Output() change = new EventEmitter<any>();

  //formArray
  @Input() inputGenericDataArray : InputGeneric[];
  @Input() formArrayName: any;
  @Input() control: any;

  constructor() { }

  ngOnInit(): void {
  }

  getChange(input:InputGeneric , event: any) {
    let newEvent;
    if(input?.typeMethor?.includes('change')){

      if(input?.type?.includes('ngselect')) {
        newEvent = {
          value: event?.term,
          label: input?.label?.toLowerCase()
        }
      }else if (input?.type == 'file'){

        newEvent = {
          value: event?.target?.files,
          label: input?.label?.toLowerCase()
        }

      }else if (input?.type == 'select'){
        newEvent = {
          value: event?.value,
          label: input?.label?.toLowerCase()
        }
      }else{
        newEvent = {
          value: event?.target?.value,
          label: input?.label?.toLowerCase()
        }
      }
      this.change.emit(newEvent);
    }
  }

  get fields() {  return this.formGroup;  }



}
