import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DashboardService} from '../../../../../shared/services/dashboard.service';
import {Router} from '@angular/router';
import {reposResponse} from '../../../../../shared/models/reposResponse.type';
import {searchResponseUser} from '../../../../../shared/models/searchResponseUser.type';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit {
  @Input() user: searchResponseUser;
  isExpanded = false;
  userRepos: reposResponse;
  @Output() isLoading = new EventEmitter<boolean>();

  constructor(private dashboardService: DashboardService, private router: Router) {
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

  goToUser() {
    this.router.navigateByUrl(`single-user/${this.user.login}`, {state: {userData: this.user}});
  }
}
