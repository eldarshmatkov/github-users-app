import {Component, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from '../shared/services/dashboard.service';
import {PaginationPanelComponent} from './components/pagination-panel/pagination-panel.component';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import * as UsersActions from '../store/users/users.actions';
import {searchResponse} from '../shared/Models/searchResponse.type';

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
  isLoading = false;


  constructor(private dashboardService: DashboardService,
              private store: Store<{ usersResponse: searchResponse}>) {
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

  changePageEvent($event) {
    this.searchUsers(this.searchByUser, this.usersPerPage, $event);
  }

  setUsersPerPage($event) {
    this.usersPerPage = $event;
    this.paginationCurrentPage = 1;
    this.searchUsers(this.searchByUser, this.usersPerPage, this.paginationCurrentPage);
  }

  setSearchByUser($event) {
    this.searchByUser = $event;
    this.paginationCurrentPage = 1;
    this.searchUsers(this.searchByUser, this.usersPerPage, this.paginationCurrentPage);
  }

  searchUsers(userName: string, usersPerPage: number, currentPage: number) {
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
