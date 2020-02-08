import {createAction, props} from '@ngrx/store';
import {AppData} from '../app-data/app-data.type';

export const LOAD_USERS = 'LOAD_USERS';
export const USERS_LOADED = 'USERS_LOADED';

export const loadUsers = createAction(
  LOAD_USERS,
  props<{payload: AppData}>()
);
