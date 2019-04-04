import { Component, OnInit, ElementRef} from '@angular/core';

@Component({
  selector: 'tab-title',
  template: '<ng-content></ng-content>',
})
export class TabTitleComponent implements OnInit {
  public elRef: ElementRef;

  constructor(elRef: ElementRef) {
    this.elRef = elRef;
  }

  ngOnInit() {
  }

}
