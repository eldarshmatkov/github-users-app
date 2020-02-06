import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map, take} from 'rxjs/operators';
import {select, Store} from '@ngrx/store';
import * as AppDataActions from '../../../store/app-data/app-data.actions';
import {StoreRootObject} from '../../../store/storeRootObject.type';
import {selectorAppData} from '../../../store/app-data/app-data.selectors';
import {AppData} from '../../../store/app-data/app-data.type';

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.scss']
})
export class FilterSearchComponent implements OnInit, OnDestroy {
  searchByUser = '';
  @ViewChild('userSearchInput') userSearchInput: ElementRef;
  inputEvent$: Subscription;
  appDataSubscription$: Subscription;

  constructor(private store: Store<StoreRootObject>) {
  }

  ngOnInit() {
    this.appDataSubscription$ = this.store.pipe(select(selectorAppData))
      .pipe(take(1))
      .subscribe(
        (data: AppData) => {
          if (data) {
            this.searchByUser = data.searchField;
            this.setSearchByUser(this.searchByUser);
          }
        },
        (error => {
          console.log(error);
        })
      );
    this.inputEvent$ = fromEvent<KeyboardEvent>(this.userSearchInput.nativeElement as HTMLInputElement, 'keyup').pipe(
      map((event: KeyboardEvent) => {
        return ((event.target as HTMLInputElement).value);
      }),
      debounceTime(700),
      distinctUntilChanged()
    ).subscribe((inputData: string) => {
      this.setSearchByUser(inputData);
      this.store.dispatch(new AppDataActions.SetCurrentPage({currentPage: 1}));
    });
  }

  ngOnDestroy(): void {
    this.inputEvent$.unsubscribe();
    this.appDataSubscription$.unsubscribe();
  }

  setSearchByUser($event): void {
    // search by user
    this.store.dispatch(new AppDataActions.SearchUser({searchField: $event}));
  }
}
