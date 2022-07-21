import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button-add',
  templateUrl: './button-add.component.html',
  styleUrls: ['./button-add.component.scss']
})
export class ButtonAddComponent implements OnInit {
  @Input() labelText: string;
  @Output() Onclick = new EventEmitter<MouseEvent>();

  constructor() { }

  ngOnInit(): void {
  }


  click(dataEmit: any) {
    this.Onclick.emit(dataEmit);
  }

}
