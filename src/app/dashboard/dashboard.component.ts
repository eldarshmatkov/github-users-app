import {Component, OnInit, ViewChild} from '@angular/core';
import {DashboardService} from '../shared/services/dashboard.service';
import {PaginationPanelComponent} from './components/pagination-panel/pagination-panel.component';
import {searchResponse} from '../shared/models/searchResponse.type';

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
  users: searchResponse;
  isLoading = false;


  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {

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
          this.users = data;
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
