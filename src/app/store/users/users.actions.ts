import {createAction, props} from '@ngrx/store';
import {AppData} from '../app-data/app-data.type';
import {HttpErrorResponse} from '@angular/common/http';

export const LOAD_USERS = 'LOAD_USERS';
export const USERS_LOADED = 'USERS_LOADED';
export const USERS_FAILED = 'USERS_FAILED';

export const loadUsers = createAction(
  LOAD_USERS,
  props<{ payload: AppData }>()
);

export const usersFailed = createAction(
  USERS_FAILED,
  props<{ payload: { error: HttpErrorResponse } }>()
);
