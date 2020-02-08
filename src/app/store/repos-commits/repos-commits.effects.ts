import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {EMPTY, of} from 'rxjs';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {DashboardService} from '../../shared/services/dashboard.service';
import {CustomAction} from '../custom-action.type';
import * as ReposCommitsActions from './repos-commits.actions';
import {commitsFailed} from './repos-commits.actions';


@Injectable()
export class ReposCommitsEffects {

  @Effect()
  loadCommits$ = this.actions$.pipe(
    ofType(ReposCommitsActions.LOAD_COMMITS),
    switchMap((action: CustomAction) => this.dashboardService.fetchReposCommits(action.payload.userLogin, action.payload.repoName)
      .pipe(
        map(repos => ({type: ReposCommitsActions.COMMITS_LOADED, payload: {items: repos}})),
        catchError(err => of(
          commitsFailed({payload: {error: err}})
          )
        )
      ))
  );

  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService
  ) {
  }
}
