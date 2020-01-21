import {Action} from '@ngrx/store';
import {SearchResponse} from '../../shared/models/searchResponse.type';
import {AppData} from '../../shared/models/app-data.type';

export const LOAD_USERS = 'LOAD_USERS';
export const USERS_LOADED = 'USERS_LOADED';

export class LoadUsers implements Action {
  readonly type = LOAD_USERS;

  constructor(public payload: AppData) {

  }
}

export class UsersLoaded implements Action {
  readonly type = USERS_LOADED;

  constructor(public payload: SearchResponse) {

  }
}
