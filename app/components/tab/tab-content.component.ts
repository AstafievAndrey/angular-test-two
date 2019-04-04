import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'tab-content',
  template: '<ng-content></ng-content>',
})
export class TabContentComponent implements OnInit {

  public elRef: ElementRef;

  constructor(elRef: ElementRef) {
    this.elRef = elRef;
  }

  ngOnInit() {
  }

}
