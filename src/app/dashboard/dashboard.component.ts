import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../shared/services/dashboard.service';
import {PagerService} from '../shared/services/pager.service';

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
  pagedUsers: any[];

  pager: any = {};
  pagedItems: any[];

  constructor(private dashboardService: DashboardService, private pagerService: PagerService) {
  }

  ngOnInit() {

  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.users.total_count, page, this.usersPerPage);
    console.log(this.pager, 'set page');

    // get current page of items
    this.pagedItems = this.users.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  setPagedItems($event) {
    this.pagedUsers = $event;
    console.log($event, 'paged items here');
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
          this.setPage(currentPage);
        },
        err => console.error(err),
      );
  }
}
