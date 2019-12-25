import {Component, OnInit} from '@angular/core';
import {DashboardService} from '../shared/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  usersPerPage: number;
  searchByUser: string;
  users;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.searchUsers();
  }

  setUsersPerPage($event) {
    this.usersPerPage = $event;
  }

  setSearchByUser($event?) {
    this.searchByUser = $event;
    this.searchUsers($event);
  }

  searchUsers(user?: string) {
    this.dashboardService.searchUsers(user)
      .subscribe(
        data => {
          console.log(data, 'searchUsers');
          this.users = data;
        },
        err => console.error(err),
      );
  }
}
