import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {DashboardService} from '../../shared/services/dashboard.service';
import {CustomAction} from '../../shared/models/custom-action.type';
import {COMMITS_LOADED, LOAD_COMMITS} from './repos-commits.actions';


@Injectable()
export class ReposCommitsEffects {

  @Effect()
  loadCommits$ = this.actions$.pipe(
    ofType(LOAD_COMMITS),
    switchMap((action: CustomAction) => this.dashboardService.fetchReposCommits(action.payload.userLogin, action.payload.repoName)
      .pipe(
        map(repos => ({type: COMMITS_LOADED, payload: {repo: action.payload.repoName, items: repos}})),
        catchError((err) => EMPTY
        )
      ))
  );

  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService
  ) {
  }
}