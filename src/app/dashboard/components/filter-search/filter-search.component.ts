import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {fromEvent, Observable, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.scss']
})
export class FilterSearchComponent implements OnInit, OnDestroy {
  searchByUser = 'Coolio';
  @Output() searchByUserChange = new EventEmitter<string>();
  @ViewChild('userSearchInput') userSearchInput: ElementRef;
  $inputEvent: Subscription;

  constructor() {
  }

  ngOnInit() {
    this.$inputEvent = fromEvent<KeyboardEvent>(this.userSearchInput.nativeElement as HTMLInputElement, 'keyup').pipe(
      map((event: KeyboardEvent) => {
        return ((event.target as HTMLInputElement).value);
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

  setSearchByUser($event): void {
    this.searchByUserChange.emit($event);
  }
}
