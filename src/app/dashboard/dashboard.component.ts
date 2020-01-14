import {Component, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from '../shared/services/dashboard.service';
import {PaginationPanelComponent} from './components/pagination-panel/pagination-panel.component';
import {SearchResponse} from '../shared/models/searchResponse.type';
import {Store} from '@ngrx/store';
import * as UsersActions from '../store/users/users.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild(PaginationPanelComponent) paginationPanel: PaginationPanelComponent;
  usersPerPage = 10;
  searchByUser: string;
  paginationCurrentPage = 1;
  users: SearchResponse;
  isLoading = false;


  constructor(private dashboardService: DashboardService,
              private store: Store<{ usersResponse: SearchResponse}>) {
  }

  ngOnInit() {
    this.store.select('usersResponse').subscribe(
  (data) => {
    console.log(data, 'subscribe to searchResponse data');
  },
  (error => {console.log(error); })
);
    /*this.store.select('searchResponse').subscribe(
      (data) => {console.log(data, 'subscribe to searchResponse data'); },
      (error => {console.log(error); })
    );*/
  }

  changePageEvent($event): void {
    this.searchUsers(this.searchByUser, this.usersPerPage, $event);
  }

  setUsersPerPage($event): void {
    this.usersPerPage = $event;
    this.paginationCurrentPage = 1;
    this.searchUsers(this.searchByUser, this.usersPerPage, this.paginationCurrentPage);
  }

  setSearchByUser($event): void {
    this.searchByUser = $event;
    this.paginationCurrentPage = 1;
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
          // this.users = data;
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
