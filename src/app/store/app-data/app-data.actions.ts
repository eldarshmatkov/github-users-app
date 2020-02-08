import {createAction, props} from '@ngrx/store';
import {AppData} from './app-data.type';

export const SEARCH_USER = 'SEARCH_USER';
export const SET_USERS_PER_PAGE = 'SET_USERS_PER_PAGE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export const searchUser = createAction(
  SEARCH_USER,
  props<{ payload: AppData }>()
);

export const setUsersPerPage = createAction(
  SET_USERS_PER_PAGE,
  props<{ payload: AppData }>()
);

export const setCurrentPage = createAction(
  SET_CURRENT_PAGE,
  props<{ payload: AppData }>()
);

export const setCurrentUser = createAction(
  SET_CURRENT_USER,
  props<{ payload: AppData }>()
);
