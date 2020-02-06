import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchResponseUser} from '../../../store/users/searchResponseUser.type';
import {select, Store} from '@ngrx/store';
import {StoreRootObject} from '../../../store/storeRootObject.type';
import {Subscription} from 'rxjs';
import {selectorUsersResponse} from '../../../store/users/users.selectors';
import * as AppNotificationsActions from '../../../store/app-notifications/app-notifications.actions';
import {EntityState} from '@ngrx/entity';
import {SearchResponseState} from '../../../store/users/searchResponseState.type';
import {callAppNotifications} from '../../../store/app-notifications/app-notifications.actions';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})

export class TableViewComponent implements OnInit, OnDestroy {
  users: SearchResponseUser;
  usersResponseSubscription$: Subscription;

  constructor(private store: Store<StoreRootObject>) {
  }

  ngOnInit() {
    this.usersResponseSubscription$ = this.store.pipe(select(selectorUsersResponse))
      .subscribe(
        (data: SearchResponseState) => {
          this.users = data.items.entities;
          this.store.dispatch(callAppNotifications({payload: {isLoading: false}}));
        },
        (error => {
          console.log(error);
          this.store.dispatch(callAppNotifications({payload: {isLoading: false}}));
        })
      );
  }

  ngOnDestroy(): void {
    this.usersResponseSubscription$.unsubscribe();
  }
}
