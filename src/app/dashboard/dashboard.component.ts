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
import {UsersEffects} from '../store/users/users.effects';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(PaginationPanelComponent) paginationPanel: PaginationPanelComponent;
  usersPerPage: number;
  searchByUser: string;
  paginationCurrentPage = 1;
  isLoading = false;
  appDataSubscription: Subscription;
  notificationsSubscription: Subscription;
  usersEffectSubscription: Subscription;

  constructor(private dashboardService: DashboardService,
              private store: Store<StoreRootObject>,
              private usersEffects: UsersEffects) {
  }

  ngOnInit() {
    this.appDataSubscription = this.store.pipe(select(selectorAppData))
      .pipe(debounceTime(700))
      .subscribe(
        (data) => {
          this.searchByUser = data.searchField;
          this.usersPerPage = data.usersPerPage;
          this.paginationCurrentPage = data.currentPage;

          this.callSearchUsers();
        },
        (error => {
          console.log(error);
        })
      );

    this.notificationsSubscription = this.store.pipe(select(selectorAppNotifications))
      .subscribe(
        (data) => {
          this.isLoading = data.isLoading;
        },
        (error => {
          console.log(error);
        })
      );

    this.usersEffectSubscription = this.usersEffects.loadUsers$
      .subscribe(data => {
        this.paginationPanel.users = data.payload;
        this.paginationPanel.setPage(this.paginationCurrentPage);
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this.appDataSubscription.unsubscribe();
    this.notificationsSubscription.unsubscribe();
    this.usersEffectSubscription.unsubscribe();
  }

  callSearchUsers(): void {
    this.searchUsers(this.searchByUser, this.usersPerPage, this.paginationCurrentPage);
  }

  searchUsers(searchField: string, usersPerPage: number, currentPage: number): boolean | void {
    if (!searchField) {
      return false;
    }
    this.isLoading = true;
    this.store.dispatch(new UsersActions.LoadUsers({searchField, usersPerPage, currentPage}));
  }
}
