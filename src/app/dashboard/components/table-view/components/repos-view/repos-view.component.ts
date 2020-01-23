import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DashboardService} from '../../../../../shared/services/dashboard.service';
import {ReposResponse} from '../../../../../shared/models/reposResponse.type';
import {CommitsResponse} from '../../../../../shared/models/commitsResponse.type';
import * as AppNotificationsActions from '../../../../../store/app-notifications/app-notifications.actions';
import {StoreRootObject} from '../../../../../shared/models/storeRootObject.type';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-repos-view',
  templateUrl: './repos-view.component.html',
  styleUrls: ['./repos-view.component.scss']
})
export class ReposViewComponent implements OnInit, OnDestroy {
  @Input() isExpanded: boolean;
  @Input() repos: ReposResponse;
  @Input() userLogin: string;
  reposCommits: CommitsResponse;
  commitsExpanded = false;
  dashboardServiceSubscription$: Subscription;

  constructor(private dashboardService: DashboardService,
              private store: Store<StoreRootObject>) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.dashboardServiceSubscription$.unsubscribe();
  }

  expandRow() {
    if (!this.commitsExpanded) {
      this.store.dispatch(new AppNotificationsActions.CallAppNotifications({isLoading: true}));
      this.dashboardServiceSubscription$ = this.dashboardService.fetchReposCommits(this.userLogin, this.repos.name)
        .subscribe(
          data => {
            this.reposCommits = data;
          },
          err => this.store.dispatch(new AppNotificationsActions.CallAppNotifications({isLoading: false})),
          () => {
            this.store.dispatch(new AppNotificationsActions.CallAppNotifications({isLoading: false}));
          }
        );
    }
    this.commitsExpanded = !this.commitsExpanded;
  }
}
