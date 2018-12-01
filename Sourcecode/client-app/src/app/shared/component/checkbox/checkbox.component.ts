import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-checkbox]',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  @Input() value: boolean;

  @Output()
  valueChange = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit() {
  }



  set message(val) {
    this.value = val;
    this.valueChange.emit(this.value);
  }
}
