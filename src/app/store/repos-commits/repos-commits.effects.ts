import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {DashboardService} from '../../shared/services/dashboard.service';
import {CustomAction} from '../custom-action.type';
import * as ReposCommitsActions from './repos-commits.actions';
import {commitsFailed} from './repos-commits.actions';
import {AppNotifications} from '../app-notifications/app-notifications';
import {Store} from '@ngrx/store';
import {callAppNotifications} from '../app-notifications/app-notifications.actions';


@Injectable()
export class ReposCommitsEffects {

  @Effect()
  loadCommits$ = this.actions$.pipe(
    ofType(ReposCommitsActions.LOAD_COMMITS),
    tap(() => {this.store.dispatch(callAppNotifications({payload: {isLoading: true}})); }),
    switchMap((action: CustomAction) => this.dashboardService.fetchReposCommits(action.payload.userLogin, action.payload.repoName)
      .pipe(
        map(repos => ({type: ReposCommitsActions.COMMITS_LOADED, payload: {items: repos}})),
        catchError(err => of(
          commitsFailed({payload: {error: err}})
          )
        ),
        tap(() => {this.store.dispatch(callAppNotifications({payload: {isLoading: false}})); })
      ))
  );

  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService,
    private store: Store<AppNotifications>,
  ) {
  }
}
