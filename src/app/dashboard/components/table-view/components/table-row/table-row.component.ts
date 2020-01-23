import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DashboardService} from '../../../../../shared/services/dashboard.service';
import {Router} from '@angular/router';
import {ReposResponse} from '../../../../../shared/models/reposResponse.type';
import {SearchResponseUser} from '../../../../../shared/models/searchResponseUser.type';
import {StoreRootObject} from '../../../../../shared/models/storeRootObject.type';
import {Store} from '@ngrx/store';
import * as AppNotificationsActions from '../../../../../store/app-notifications/app-notifications.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit, OnDestroy {
  @Input() user: SearchResponseUser;
  isExpanded = false;
  userRepos: ReposResponse;
  fetchUsers$: Subscription;

  constructor(private dashboardService: DashboardService,
              private router: Router,
              private store: Store<StoreRootObject>) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.fetchUsers$.unsubscribe();
  }

  expandRow(username: string) {
    if (!this.isExpanded) {
      this.store.dispatch(new AppNotificationsActions.CallAppNotifications({isLoading: true}));
      this.fetchUsers$ = this.dashboardService.fetchUserRepos(username)
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
