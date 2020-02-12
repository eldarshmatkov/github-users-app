import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {catchError, exhaustMap, map, tap} from 'rxjs/operators';
import {DashboardService} from '../../shared/services/dashboard.service';
import {CustomAction} from '../custom-action.type';
import {LOAD_REPOS, REPOS_LOADED} from './users-repos.actions';
import {callAppNotifications} from '../app-notifications/app-notifications.actions';
import {Store} from '@ngrx/store';
import {AppNotifications} from '../app-notifications/app-notifications';

@Injectable()
export class UsersReposEffects {

  @Effect()
  loadRepos$ = this.actions$.pipe(
    ofType(LOAD_REPOS),
    tap(() => {this.store.dispatch(callAppNotifications({payload: {isLoading: true}})); }),
    exhaustMap((action: CustomAction) => this.dashboardService.fetchUserRepos(action.payload)
      .pipe(
        map(repos => ({ type: REPOS_LOADED, payload: {isLoaded: true, items: repos} })),
        catchError(() => EMPTY),
        tap(() => {this.store.dispatch(callAppNotifications({payload: {isLoading: false}})); })
      ))
  );

  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService,
    private store: Store<AppNotifications>,
  ) {}
}
