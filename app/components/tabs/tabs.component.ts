import { Component, OnInit, ContentChildren, QueryList, AfterContentInit, OnDestroy, OnChanges } from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tabs',
  template: '<ng-content></ng-content>',
})
export class TabsComponent implements OnInit, OnDestroy, OnChanges, AfterContentInit {

  private countTab: number;
  private changesSubscription: Subscription;

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  constructor() { }

  private checkActive() {
    let hasActive = false;
    this.tabs.forEach((item, index) => {
      if (item.active$.value) {
        hasActive = item.active$.value;
      }
    });
    if (hasActive === false && this.tabs.length !== 0) {
       this.tabs.first.setActive(true);
    }
  }

  private setDeactive(activeIndex) {
    this.tabs.forEach((item, index) => {
      if (activeIndex !== index) {
        item.setActive(false);
      }
    });
  }

  private init() {
    this.countTab = this.tabs.length;
    this.tabs.forEach((item, index) => {
      if (index === 0) {
        item.setActive(true);
      }
      this.setSubcribe(item, index);
    });
    this.changesSubscription = this.tabs.changes.subscribe(item => {
      if (this.countTab > item.length || this.countTab === 0) {
        this.checkActive();
      }
      if (item.length !== 0) {
        this.setSubcribe(item.last, item.length - 1);
      }
      this.countTab = this.tabs.length;
    });
  }

  private setSubcribe(item, index) {
    item.active$.subscribe((active) => {
      if (active) {
        this.setDeactive(index);
      }
    });
  }

  ngAfterContentInit() {
    this.init();
  }

  ngOnChanges() {
    console.log('changes');
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.changesSubscription.unsubscribe();
  }
}
