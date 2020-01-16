import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from '../shared/services/dashboard.service';
import {PaginationPanelComponent} from './components/pagination-panel/pagination-panel.component';
import {SearchResponse} from '../shared/models/searchResponse.type';
import {Store} from '@ngrx/store';
import * as UsersActions from '../store/users/users.actions';
import {AppData} from '../shared/models/app-data.type';
import {StoreRootObject} from '../shared/models/storeRootObject.type';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(PaginationPanelComponent) paginationPanel: PaginationPanelComponent;
  usersPerPage = 10;
  searchByUser: string;
  paginationCurrentPage = 1;
  isLoading = false;
  storeSubscription: Subscription;

  constructor(private dashboardService: DashboardService,
              private store: Store<StoreRootObject>) {
  }

  ngOnInit() {
    this.storeSubscription = this.store.select('appData').subscribe(
      (data) => {
        console.log(data, 'subscribe to appData');
        this.searchByUser = data.searchField ? data.searchField : this.searchByUser;
        this.usersPerPage = data.usersPerPage ? data.usersPerPage : this.usersPerPage;
        this.paginationCurrentPage = data.currentPage ? data.currentPage : this.paginationCurrentPage;
        this.isLoading = data.isLoading ? data.isLoading : this.isLoading;

        this.callSearchUsers();
      },
      (error => {
        console.log(error);
      })
    );
  }

  ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
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
