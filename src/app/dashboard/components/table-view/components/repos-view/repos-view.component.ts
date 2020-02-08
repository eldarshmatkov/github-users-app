import {Component, Input, OnInit} from '@angular/core';
import {DashboardService} from '../../../../../shared/services/dashboard.service';
import {ReposResponse} from '../../../../../store/users-repos/reposResponse.type';
import {CommitsResponse} from '../../../../../store/repos-commits/commitsResponse.type';
import {callAppNotifications} from '../../../../../store/app-notifications/app-notifications.actions';
import {StoreRootObject} from '../../../../../store/storeRootObject.type';
import {select, Store} from '@ngrx/store';
import {Subscription} from 'rxjs';
import {getCommitsArray, getCommitsError} from '../../../../../store/repos-commits/repos-commits.selectors';
import {loadCommits} from '../../../../../store/repos-commits/repos-commits.actions';
import {HttpErrorResponse} from '@angular/common/http';

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
  commitsError$: Subscription;

  constructor(private dashboardService: DashboardService,
              private store: Store<StoreRootObject>) {
  }

  ngOnInit() {
    this.fetchReposCommits$ = this.store.pipe(select(getCommitsArray(this.repo.url)))
      .subscribe((response: CommitsResponse[]) => {
        if (response) {
          this.reposCommits = response;
          this.store.dispatch(callAppNotifications({payload: {isLoading: false}}));
        }
      });

    this.commitsError$ = this.store.pipe(select(getCommitsError(this.repo.url)))
      .subscribe((response: HttpErrorResponse) => {
        if (response && response.status > 0) {
          this.httpErrorResponse = response.error.message;
          this.isNoCommits = true;
        } else {
          this.isNoCommits = false;
        }
      });
  }

  expandRow() {
    if (!this.commitsExpanded) {
      this.store.dispatch(callAppNotifications({payload: {isLoading: true}}));
      this.store.dispatch(loadCommits({payload: {userLogin: this.userLogin, repoName: this.repo.name}}));
    }
    this.commitsExpanded = !this.commitsExpanded;
  }
}
