import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CommitsResponse} from '../../../../../shared/models/commitsResponse.type';
import {select, Store} from '@ngrx/store';
import {selectorReposCommitsResponse} from '../../../../../store/repos-commits/repos-commits.selectors';
import * as AppNotificationsActions from '../../../../../store/app-notifications/app-notifications.actions';
import {StoreRootObject} from '../../../../../shared/models/storeRootObject.type';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-commits-view',
  templateUrl: './commits-view.component.html',
  styleUrls: ['./commits-view.component.scss']
})
export class CommitsViewComponent implements OnInit, OnDestroy {
  @Input() commit: CommitsResponse;
  fetchReposCommits$: Subscription;

  constructor(private store: Store<StoreRootObject>) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.fetchReposCommits$.unsubscribe();
  }
}
