import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {EMPTY} from 'rxjs';
import {catchError, exhaustMap, map} from 'rxjs/operators';
import {DashboardService} from '../../shared/services/dashboard.service';
import {CustomAction} from '../../shared/models/custom-action.type';
import {LOAD_REPOS, REPOS_LOADED} from './users-repos.actions';

@Injectable()
export class UsersReposEffects {

  @Effect()
  loadRepos$ = this.actions$.pipe(
    ofType(LOAD_REPOS),
    exhaustMap((action: CustomAction) => this.dashboardService.fetchUserRepos(action.payload)
      .pipe(
        map(repos => ({ type: REPOS_LOADED, payload: {user: action.payload, items: repos} })),
        catchError(() => EMPTY)
      ))
  );

  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService
  ) {}
}
