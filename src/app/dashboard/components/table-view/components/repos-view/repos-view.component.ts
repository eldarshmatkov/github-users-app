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
import {UserCommitsResponseState} from '../../../../../store/repos-commits/userCommitsResponseState.type';

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
      .subscribe((response: UserCommitsResponseState) => {
        if (response) {
          // TODO: Перенести функционал в селектор selectorReposCommitsResponse, брать выборку по конкретной repo id из store
          if (response.repo === this.repo.name) {
            // TODO: Сделать поток с ошибками и слушать его - вместо этого функционала if (response.error.status > 0) {
            if (response.error.status > 0) {
              this.httpErrorResponse = response.error.error.message;
              this.reposCommits = [];
              this.isNoCommits = true;
            } else {
              this.reposCommits = Object.values(response.items.entities);
              this.isNoCommits = false;
            }
            // TODO: Перенести вызов action в effects/reducer - понять куда лучше
            this.store.dispatch(new AppNotificationsActions.CallAppNotifications({isLoading: false}));
          }
        }
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
