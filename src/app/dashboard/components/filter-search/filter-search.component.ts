import {Component, ElementRef, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, take} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import * as AppDataActions from '../../../store/app-data/app-data.actions';
import {StoreRootObject} from '../../../shared/models/storeRootObject.type';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.scss']
})
export class FilterSearchComponent implements OnInit, OnDestroy {
  searchByUser = '';
  @ViewChild('userSearchInput') userSearchInput: ElementRef;
  $inputEvent: Subscription;
  $appDataSubscription: Subscription;

  constructor(private store: Store<StoreRootObject>) {
  }

  ngOnInit() {
    this.$appDataSubscription = this.store.select('appData')
      .pipe(take(1))
      .subscribe(
        (data) => {
          if (data) {
            this.searchByUser = data.searchField;
            this.setSearchByUser(this.searchByUser);
          }
        },
        (error => {
          console.log(error);
        })
      );
    this.$inputEvent = fromEvent<KeyboardEvent>(this.userSearchInput.nativeElement as HTMLInputElement, 'keyup').pipe(
      map((event: KeyboardEvent) => {
        return ((event.target as HTMLInputElement).value);
      }),
      debounceTime(700),
      distinctUntilChanged()
    ).subscribe((inputData: string) => {
        this.store.dispatch(new AppDataActions.SetCurrentPage({currentPage: 1}));
        this.setSearchByUser(inputData);
    });
  }

  ngOnDestroy(): void {
    this.$inputEvent.unsubscribe();
    this.$appDataSubscription.unsubscribe();
  }

  setSearchByUser($event): void {
    // search by user
    this.store.dispatch(new AppDataActions.SearchUser({searchField: $event}));
  }
}
