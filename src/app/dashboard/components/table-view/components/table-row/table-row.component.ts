import {Component, Input, OnInit} from '@angular/core';
import {DashboardService} from '../../../../../shared/services/dashboard.service';
import {Router} from '@angular/router';
import {SearchResponseUser} from '../../../../../store/users/searchResponseUser.type';
import {StoreRootObject} from '../../../../../store/storeRootObject.type';
import {select, Store} from '@ngrx/store';
import {callAppNotifications} from '../../../../../store/app-notifications/app-notifications.actions';
import {loadRepos} from '../../../../../store/users-repos/users-repos.actions';
import {getReposArray} from '../../../../../store/users-repos/users-repos.selectors';
import {Subscription} from 'rxjs';
import {UserReposResponse} from '../../../../../store/users-repos/userReposResponse.type';
import {setCurrentUser} from '../../../../../store/app-data/app-data.actions';
import {UserReposResponseState} from '../../../../../store/users-repos/userReposResponseState.type';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.scss']
})
export class TableRowComponent implements OnInit {
  @Input() user: SearchResponseUser;
  @Input() userRepos: UserReposResponseState;
  userReposWithArray: UserReposResponse;
  fetchUserRepos$: Subscription;
  isExpanded = false;
  isLoaded = false;

  constructor(private dashboardService: DashboardService,
              private router: Router,
              private store: Store<StoreRootObject>) {
  }

  ngOnInit() {
    this.fetchUserRepos$ = this.store.pipe(select(getReposArray(this.user.id)))
      .subscribe((response: UserReposResponse) => {
        if (response.items.length) {
          this.userReposWithArray = response;
          this.isLoaded = response.isLoaded;
        }
      });
  }

  expandRow(username: string) {
    if (!this.isExpanded) {
      this.store.dispatch(loadRepos({payload: username}));
      this.isExpanded = true;
      this.isLoaded = false;
    } else {
      this.isExpanded = false;
    }
  }

  goToUser() {
    this.store.dispatch(setCurrentUser({payload: {currentUser: this.user.id}}));
    this.router.navigateByUrl(`single-user/${this.user.login}`);
  }
}
