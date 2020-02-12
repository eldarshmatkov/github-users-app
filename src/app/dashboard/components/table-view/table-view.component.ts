import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchResponseUser} from '../../../store/users/searchResponseUser.type';
import {select, Store} from '@ngrx/store';
import {StoreRootObject} from '../../../store/storeRootObject.type';
import {Subscription} from 'rxjs';
import {selectorUsersResponse, usersResponseError} from '../../../store/users/users.selectors';
import {callAppNotifications} from '../../../store/app-notifications/app-notifications.actions';
import {SearchResponseState} from '../../../store/users/searchResponseState.type';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})

export class TableViewComponent implements OnInit, OnDestroy {
  users: SearchResponseUser;
  usersResponseSubscription$: Subscription;
  responseErrorSubscription$: Subscription;
  errorMessage: string;

  constructor(private store: Store<StoreRootObject>) {
  }

  ngOnInit() {
    this.usersResponseSubscription$ = this.store.pipe(select(selectorUsersResponse))
      .subscribe(
        (data: SearchResponseState) => {
          this.users = data.items.entities;
        },
        (error => {
          console.log(error);
        })
      );
    this.responseErrorSubscription$ = this.store.pipe(select(usersResponseError))
      .subscribe(
        (error: HttpErrorResponse) => {
          if (error.status > 0) {
            this.errorMessage = error.error.message;
          } else {
            this.errorMessage = '';
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.usersResponseSubscription$.unsubscribe();
  }
}
