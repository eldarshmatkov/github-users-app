import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../shared/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  usersPerPage: number;
  searchByUser = '';
  users;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
  }

  setUsersPerPage($event) {
    this.usersPerPage = $event;
    this.searchUsers(this.searchByUser, this.usersPerPage);
  }

  setSearchByUser($event?) {
    this.searchByUser = $event;
    this.searchUsers(this.searchByUser, this.usersPerPage);
  }

  searchUsers(userName?: string, usersPerPage?: number) {
    this.dashboardService.searchUsers(userName, usersPerPage)
      .subscribe(
        data => {
          console.log(data, 'searchUsers');
          this.users = data;
        },
        err => console.error(err),
      );
  }
}
