import {Component, OnInit, Input, OnChanges, Output, EventEmitter, OnDestroy} from '@angular/core';
import {SearchResponseUser} from '../../../shared/models/searchResponseUser.type';
import {select, Store} from '@ngrx/store';
import {StoreRootObject} from '../../../shared/models/storeRootObject.type';
import {Subscription} from 'rxjs';
import {selectorUsersResponse} from '../../../store/users/users.selectors';
import * as AppNotificationsActions from '../../../store/app-notifications/app-notifications.actions';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})

export class TableViewComponent implements OnInit, OnDestroy {
  users: SearchResponseUser[];
  usersResponseSubscription$: Subscription;

  constructor(private store: Store<StoreRootObject>) {
  }

  ngOnInit() {
    this.usersResponseSubscription$ = this.store.pipe(select(selectorUsersResponse))
      .subscribe(
        (data) => {
          this.users = data.items;
          this.store.dispatch(new AppNotificationsActions.CallAppNotifications({isLoading: false}));
        },
        (error => {
          console.log(error);
          this.store.dispatch(new AppNotificationsActions.CallAppNotifications({isLoading: false}));
        })
      );
  }

  ngOnDestroy(): void {
    this.usersResponseSubscription$.unsubscribe();
  }
}
