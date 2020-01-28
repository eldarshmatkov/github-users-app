import {SearchResponse} from './users/searchResponse.type';
import {AppData} from './app-data/app-data.type';
import {AppNotifications} from './app-notifications/app-notifications';
import {UserReposResponse} from './users-repos/userReposResponse.type';
import {UserCommitsResponse} from './repos-commits/userCommitsResponse.type';
import {CustomAction} from './custom-action.type';

export interface StoreRootObject {
  usersResponse: SearchResponse;
  appData: AppData;
  appNotifications: AppNotifications;
  usersReposResponse: UserReposResponse;
  reposCommitsResponse: CustomAction;
}
