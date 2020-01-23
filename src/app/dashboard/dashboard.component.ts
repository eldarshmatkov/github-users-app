import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from '../shared/services/dashboard.service';
import {PaginationPanelComponent} from './components/pagination-panel/pagination-panel.component';
import {Action, ActionsSubject, select, Store} from '@ngrx/store';
import * as UsersActions from '../store/users/users.actions';
import {StoreRootObject} from '../shared/models/storeRootObject.type';
import {Subject, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {selectorAppData} from '../store/app-data/app-data.selectors';
import {selectorAppNotifications} from '../store/app-notifications/app-notifications.selectors';
import * as AppNotificationsActions from '../store/app-notifications/app-notifications.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  isLoading = false;
  appDataSubscription$: Subscription;
  notificationsSubscription$: Subscription;

  constructor(private dashboardService: DashboardService,
              private store: Store<StoreRootObject>) {
  }

  ngOnInit() {
    this.appDataSubscription$ = this.store.pipe(select(selectorAppData))
      .pipe(debounceTime(700))
      .subscribe(
        (data) => {
          if (!data.searchField) {
            return;
          }
          this.store.dispatch(new AppNotificationsActions.CallAppNotifications({isLoading: true}));
          this.store.dispatch(new UsersActions.LoadUsers(
            {
              searchField: data.searchField,
              usersPerPage: data.usersPerPage,
              currentPage: data.currentPage
            }));
        },
        (error => {
          console.log(error);
        })
      );

    this.notificationsSubscription$ = this.store.pipe(select(selectorAppNotifications))
      .subscribe(
        (data) => {
          this.isLoading = data.isLoading;
        },
        (error => {
          console.log(error);
        })
      );
  }

  ngOnDestroy(): void {
    this.appDataSubscription$.unsubscribe();
    this.notificationsSubscription$.unsubscribe();
  }
}
