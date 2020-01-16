import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DashboardService} from '../../../../../shared/services/dashboard.service';
import {Router} from '@angular/router';
import {ReposResponse} from '../../../../../shared/models/reposResponse.type';
import {SearchResponseUser} from '../../../../../shared/models/searchResponseUser.type';
import {StoreRootObject} from '../../../../../shared/models/storeRootObject.type';
import {Store} from '@ngrx/store';
import * as AppNotificationsActions from '../../../../../store/app-notifications/app-notifications.actions';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit {
  @Input() user: SearchResponseUser;
  isExpanded = false;
  userRepos: ReposResponse;

  constructor(private dashboardService: DashboardService,
              private router: Router,
              private store: Store<StoreRootObject>) {
  }

  ngOnInit() {
  }

  expandRow(username: string) {
    if (!this.isExpanded) {
      this.store.dispatch(new AppNotificationsActions.CallAppNotifications({isLoading: true}));
      this.dashboardService.fetchUserRepos(username)
        .subscribe(
          data => {
            this.userRepos = data;
          },
          err => this.store.dispatch(new AppNotificationsActions.CallAppNotifications({isLoading: false})),
          () => {
            this.store.dispatch(new AppNotificationsActions.CallAppNotifications({isLoading: false}));
          }
        );
    }

    this.isExpanded = !this.isExpanded;
  }

  goToUser() {
    this.router.navigateByUrl(`single-user/${this.user.login}`, {state: {userData: this.user}});
  }
}
