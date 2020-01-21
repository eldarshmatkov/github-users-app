import { Injectable } from '@angular/core';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import {map, catchError, exhaustMap} from 'rxjs/operators';
import {DashboardService} from '../../shared/services/dashboard.service';
import {CustomAction} from '../../shared/models/custom-action.type';

@Injectable()
export class UsersEffects {

  @Effect()
  loadUsers$ = this.actions$.pipe(
    ofType('LOAD_USERS'),
    exhaustMap((action: CustomAction) => this.dashboardService.searchUsers(action.payload)
      .pipe(
        map(users => ({ type: 'USERS_LOADED', payload: users })),
        catchError(() => EMPTY)
      ))
    );

  constructor(
    private actions$: Actions,
    private dashboardService: DashboardService
  ) {}
}
