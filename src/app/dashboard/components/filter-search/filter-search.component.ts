import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.scss']
})
export class FilterSearchComponent implements OnInit, OnDestroy {
  searchByUser = 'coolname';
  @Output() searchByUserChange = new EventEmitter<string>();
  @ViewChild('userSearchInput') userSearchInput: ElementRef;
  $inputEvent: Subscription;

  constructor() {
  }

  ngOnInit() {
    this.$inputEvent = fromEvent(this.userSearchInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value;
      }),
      debounceTime(700),
      distinctUntilChanged()
    ).subscribe((inputData: string) => {
      this.setSearchByUser(inputData);
    });
    this.setSearchByUser(this.searchByUser);
  }

  ngOnDestroy(): void {
    this.$inputEvent.unsubscribe();
  }

  setSearchByUser($event) {
    this.searchByUserChange.emit($event);
  }
}
