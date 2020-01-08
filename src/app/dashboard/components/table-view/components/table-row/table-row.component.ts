import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Output() isLoading = new EventEmitter<boolean>();

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
  }

  expandRow(username: string) {
    if (!this.isExpanded) {
      this.isLoading.emit(true);
      this.dashboardService.fetchUserRepos(username)
        .subscribe(
          data => {
            this.userRepos = data;
          },
          err => this.isLoading.emit(false),
          () => {
            this.isLoading.emit(false);
          }
        );
    }

    this.isExpanded = !this.isExpanded;
  }

}
