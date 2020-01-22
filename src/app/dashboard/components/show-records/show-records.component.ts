import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as AppDataActions from '../../../store/app-data/app-data.actions';
import {StoreRootObject} from '../../../shared/models/storeRootObject.type';
import {Subscription} from 'rxjs';
import {take} from 'rxjs/operators';
import {selectorAppData} from '../../../store/app-data/app-data.selectors';

@Component({
  selector: 'app-show-records',
  templateUrl: './show-records.component.html',
  styleUrls: ['./show-records.component.scss']
})
export class ShowRecordsComponent implements OnInit, OnDestroy {
  usersPerPage = 10;
  usersPerPageOptions: number[] = [5, 10, 20, 40, 80];
  $appDataSubscription: Subscription;

  constructor(private store: Store<StoreRootObject>) {
  }

  ngOnInit() {
    this.$appDataSubscription = this.store.pipe(select(selectorAppData))
      .pipe(take(1))
      .subscribe(
        (data) => {
          if (data) {
            this.usersPerPage = data.usersPerPage;
            this.setUserPerPage(data.usersPerPage);
          }
        },
        (error => {
          console.log(error);
        })
      );
  }

  ngOnDestroy(): void {
    this.$appDataSubscription.unsubscribe();
  }

  selectModelChange($event) {
    this.setUserPerPage($event);
    this.resetPager();
  }

  setUserPerPage($event): void {
    // set users per page
    this.store.dispatch(new AppDataActions.SetUsersPerPage({usersPerPage: $event}));
  }

  resetPager(): void {
    this.store.dispatch(new AppDataActions.SetCurrentPage({currentPage: 1}));
  }
}
