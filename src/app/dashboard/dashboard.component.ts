import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../shared/services/dashboard.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  usersPerPage = 10;
  searchByUser: string;
  paginationCurrentPage = 1;
  users;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
  }

  setUsersPerPage($event) {
    this.usersPerPage = $event;
    this.paginationCurrentPage = 1;
    this.searchUsers(this.searchByUser, this.usersPerPage, this.paginationCurrentPage);
  }

  setSearchByUser($event) {
    this.searchByUser = $event;
    this.searchUsers(this.searchByUser, this.usersPerPage, this.paginationCurrentPage);
  }

  setPaginationOffset($event) {
    console.log($event);
    this.paginationCurrentPage = $event;
    this.searchUsers(this.searchByUser, this.usersPerPage, this.paginationCurrentPage);
  }

  searchUsers(userName: string, usersPerPage: number, currentPage: number) {
    this.dashboardService.searchUsers(userName, usersPerPage, currentPage)
      .subscribe(
        data => {
          console.log(data, 'searchUsers');
          this.users = data;
        },
        err => console.error(err),
      );
  }
}
