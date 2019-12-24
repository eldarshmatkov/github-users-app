import {Component, OnInit} from '@angular/core';
import {Config, DashboardService} from '../../../shared/services/dashboard.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {
  users;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.dashboardService.getUsers()
      .subscribe(
        data => {
          console.log(data);
          this.users = data;
        },
        err => console.error(err),
      );
  }
}
