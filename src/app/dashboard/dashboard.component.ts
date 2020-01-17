import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from '../shared/services/dashboard.service';
import {PaginationPanelComponent} from './components/pagination-panel/pagination-panel.component';
import {Store} from '@ngrx/store';
import * as UsersActions from '../store/users/users.actions';
import {StoreRootObject} from '../shared/models/storeRootObject.type';
import {Subscription} from 'rxjs';

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

  constructor(private dashboardService: DashboardService,
              private store: Store<StoreRootObject>) {
  }

  ngOnInit() {
    this.appDataSubscription = this.store.select('appData').subscribe(
      (data) => {
        console.log(data, 'subscribe to appData');
        this.searchByUser = data.searchField;
        this.usersPerPage = data.usersPerPage;
        this.paginationCurrentPage = data.currentPage;

        this.callSearchUsers();
      },
      (error => {
        console.log(error);
      })
    );

    this.notificationsSubscription = this.store.select('appNotifications').subscribe(
      (data) => {
        console.log(data, 'subscribe to Notifications');
        this.isLoading = data.isLoading;
      },
      (error => {
        console.log(error);
      })
    );
  }

  ngOnDestroy(): void {
    this.appDataSubscription.unsubscribe();
    this.notificationsSubscription.unsubscribe();
  }

  callSearchUsers(): void {
    this.searchUsers(this.searchByUser, this.usersPerPage, this.paginationCurrentPage);
  }

  searchUsers(userName: string, usersPerPage: number, currentPage: number): boolean | void {
    if (!userName) {
      return false;
    }
    this.isLoading = true;
    this.dashboardService.searchUsers(userName, usersPerPage, currentPage)
      .subscribe(
        data => {
          this.store.dispatch(new UsersActions.UpdateSearchResponse(data));
          this.paginationPanel.users = data;
          this.paginationPanel.setPage(currentPage);
        },
        err => this.isLoading = false,
        () => {
          this.isLoading = false;
        }
      );
  }
}
