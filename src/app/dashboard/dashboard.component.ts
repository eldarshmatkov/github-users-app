import {AfterContentChecked, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from '../shared/services/dashboard.service';
import {select, Store} from '@ngrx/store';
import * as UsersActions from '../store/users/users.actions';
import {StoreRootObject} from '../store/storeRootObject.type';
import {Subscription} from 'rxjs';
import {selectorAppData} from '../store/app-data/app-data.selectors';
import {selectorAppNotifications} from '../store/app-notifications/app-notifications.selectors';
import * as AppNotificationsActions from '../store/app-notifications/app-notifications.actions';
import {debounceTime} from 'rxjs/operators';
import {AppData} from '../store/app-data/app-data.type';
import {AppNotifications} from '../store/app-notifications/app-notifications';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterContentChecked {
  isLoading = false;
  appDataSubscription$: Subscription;
  notificationsSubscription$: Subscription;

  constructor(private dashboardService: DashboardService,
              private store: Store<StoreRootObject>,
              private changeDetector: ChangeDetectorRef) {
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngOnInit() {
    this.appDataSubscription$ = this.store.pipe(select(selectorAppData))
      .subscribe(
        (data: AppData) => {
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
        (data: AppNotifications) => {
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
