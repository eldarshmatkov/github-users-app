import {Component, Input, OnInit} from '@angular/core';
import {DashboardService} from '../../../../../shared/services/dashboard.service';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit {
  @Input() user;
  isExpanded = false;
  userRepos: any;

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
  }

  expandRow(username: string) {
    if (!this.isExpanded) {
      this.dashboardService.fetchUserRepos(username)
        .subscribe(
          data => {
            this.userRepos = data;
          },
          err => console.error(err),
        );
    }

    this.isExpanded = !this.isExpanded;
  }

}
