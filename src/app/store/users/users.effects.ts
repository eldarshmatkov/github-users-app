import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, exhaustMap, map, switchMap, switchMapTo, tap} from 'rxjs/operators';
import {DashboardService} from '../../shared/services/dashboard.service';
import {CustomAction} from '../custom-action.type';
import {LOAD_USERS, USERS_LOADED, usersFailed} from './users.actions';
import {CALL_APP_NOTIFICATIONS, callAppNotifications} from '../app-notifications/app-notifications.actions';
import {Store} from '@ngrx/store';
import {AppNotifications} from '../app-notifications/app-notifications';

@Injectable()
export class UsersEffects {

  @Effect()
  loadUsers$ = this.actions$.pipe(
    ofType(LOAD_USERS),
    tap(() => {this.store.dispatch(callAppNotifications({payload: {isLoading: true}})); }),
    exhaustMap((action: CustomAction) => this.dashboardService.searchUsers(action.payload)
      .pipe(
        map(users => ({ type: USERS_LOADED, payload: users })),
        catchError((err) => of(
          usersFailed({payload: {error: err}})
        )),
        tap(() => {this.store.dispatch(callAppNotifications({payload: {isLoading: false}})); })
      ))
    );

  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService,
    private store: Store<AppNotifications>,
  ) {}
}
