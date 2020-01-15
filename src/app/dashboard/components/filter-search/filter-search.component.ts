import {Component, ElementRef, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Store} from '@ngrx/store';
import {SearchResponse} from '../../../shared/models/searchResponse.type';
import {AppData} from '../../../shared/models/app-data.type';
import * as AppDataActions from '../../../store/app-data/app-data.actions'

@Component({
  selector: 'app-filter-search',
  templateUrl: './filter-search.component.html',
  styleUrls: ['./filter-search.component.scss']
})
export class FilterSearchComponent implements OnInit, OnDestroy {
  searchByUser = '';
  @ViewChild('userSearchInput') userSearchInput: ElementRef;
  $inputEvent: Subscription;

  constructor(private store: Store<{ usersResponse: SearchResponse, appData: AppData }>) {
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
    this.store.dispatch(new AppDataActions.UpdateAppData({searchField: $event}));
  }
}
