import {Component, Input, OnInit} from '@angular/core';
import {DashboardService} from '../../../../../shared/services/dashboard.service';
import {ReposResponse} from '../../../../../store/users-repos/reposResponse.type';
import {CommitsResponse} from '../../../../../store/repos-commits/commitsResponse.type';
import * as AppNotificationsActions from '../../../../../store/app-notifications/app-notifications.actions';
import {StoreRootObject} from '../../../../../store/storeRootObject.type';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {selectorReposCommitsResponse} from '../../../../../store/repos-commits/repos-commits.selectors';
import * as CommitsReposActions from '../../../../../store/repos-commits/repos-commits.actions';

@Component({
  selector: 'app-repos-view',
  templateUrl: './repos-view.component.html',
  styleUrls: ['./repos-view.component.scss']
})
export class ReposViewComponent implements OnInit {
  @Input() isExpanded: boolean;
  @Input() repo: ReposResponse;
  @Input() userLogin: string;
  httpErrorResponse: string;
  isNoCommits = false;
  reposCommits: CommitsResponse[];
  commitsExpanded = false;
  fetchReposCommits$: Subscription;

  constructor(private dashboardService: DashboardService,
              private store: Store<StoreRootObject>) {
  }

  ngOnInit() {
    this.fetchReposCommits$ = this.store.pipe(select(selectorReposCommitsResponse))
      .subscribe(response => {
        if (response.type === CommitsReposActions.COMMITS_LOADED) {
          if (response.payload.repo === this.repo.name) {
            this.reposCommits = response.payload.items;
            this.isNoCommits = false;
          }
        } else if (response.type === CommitsReposActions.COMMITS_FAILED) {
          this.httpErrorResponse = response.payload.error.message;
          this.isNoCommits = true;
        }
        this.store.dispatch(new AppNotificationsActions.CallAppNotifications({isLoading: false}));
      });
  }

  expandRow() {
    if (!this.commitsExpanded) {
      this.store.dispatch(new AppNotificationsActions.CallAppNotifications({isLoading: true}));
      this.store.dispatch(new CommitsReposActions.LoadCommits({userLogin: this.userLogin, repoName: this.repo.name}));
    }
    this.commitsExpanded = !this.commitsExpanded;
  }
}
