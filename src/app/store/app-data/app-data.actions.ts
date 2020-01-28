import {Action} from '@ngrx/store';
import {AppData} from './app-data.type';

export const SEARCH_USER = 'SEARCH_USER';
export const SET_USERS_PER_PAGE = 'SET_USERS_PER_PAGE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export class SearchUser implements Action {
  readonly type = SEARCH_USER;

  constructor(public payload: AppData) {}
}

export class SetUsersPerPage implements Action {
  readonly type = SET_USERS_PER_PAGE;

  constructor(public payload: AppData) {}
}

export class SetCurrentPage implements Action {
  readonly type = SET_CURRENT_PAGE;

  constructor(public payload: AppData) {}
}

export class SetCurrentUser implements Action {
  readonly type = SET_CURRENT_USER;

  constructor(public payload: AppData) {}
}

export type AppDataActions = SearchUser | SetUsersPerPage | SetCurrentPage | SetCurrentUser;
