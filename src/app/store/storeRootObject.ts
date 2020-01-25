import {appNotificationsReducer} from './app-notifications/app-notifications.reducer';
import {usersReducer} from './users/users.reducer';
import {appDataReducer} from './app-data/app-data.reducer';
import {ActionReducerMap} from '@ngrx/store';
import {StoreRootObject} from '../shared/models/storeRootObject.type';
import {usersReposReducer} from './users-repos/users-repos.reducer';

export const reducers: ActionReducerMap<StoreRootObject> = {
  usersResponse: usersReducer,
  appData: appDataReducer,
  appNotifications: appNotificationsReducer,
  usersReposResponse: usersReposReducer,
};

