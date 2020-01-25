import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DashboardService} from '../../../../../shared/services/dashboard.service';
import {Router} from '@angular/router';
import {ReposResponse} from '../../../../../shared/models/reposResponse.type';
import {SearchResponseUser} from '../../../../../shared/models/searchResponseUser.type';
import {StoreRootObject} from '../../../../../shared/models/storeRootObject.type';
import {select, Store} from '@ngrx/store';
import * as AppNotificationsActions from '../../../../../store/app-notifications/app-notifications.actions';
import * as UsersReposActions from '../../../../../store/users-repos/users-repos.actions';
import {selectorUsersReposResponse} from '../../../../../store/users-repos/users-repos.selectors';
import {Subscription} from 'rxjs';
import {UserReposResponse} from '../../../../../shared/models/userReposResponse.type';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit {
  @Input() user: SearchResponseUser;
  @Input() userRepos: UserReposResponse;
  fetchUserRepos$: Subscription;
  isExpanded = false;

  constructor(private dashboardService: DashboardService,
              private router: Router,
              private store: Store<StoreRootObject>) {
  }

  ngOnInit() {
    this.fetchUserRepos$ = this.store.pipe(select(selectorUsersReposResponse))
      .subscribe((response) => {
        // check if this is user you clicked on
        if (response.user === this.user.login) {
          // check if it is have items in response
          if (response.items.length === 0) {
            this.userRepos = {user: response.user, items: []};
            this.store.dispatch(new AppNotificationsActions.CallAppNotifications({isLoading: false}));
            return;
          }
          this.userRepos = response;
          this.store.dispatch(new AppNotificationsActions.CallAppNotifications({isLoading: false}));
        }
      });
  }

  expandRow(username: string) {
    if (!this.isExpanded) {
      this.store.dispatch(new AppNotificationsActions.CallAppNotifications({isLoading: true}));
      this.store.dispatch(new UsersReposActions.LoadRepos(username));
    }
    this.isExpanded = !this.isExpanded;
  }

  goToUser() {
    this.router.navigateByUrl(`single-user/${this.user.login}`, {state: {userData: this.user}});
  }
}
