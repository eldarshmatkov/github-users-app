import {AppData} from './app-data/app-data.type';
import {AppNotifications} from './app-notifications/app-notifications';
import {SearchResponseState} from './users/searchResponseState.type';
import {UserReposResponseState} from './users-repos/userReposResponseState.type';
import {UserCommitsResponseState} from './repos-commits/userCommitsResponseState.type';

export interface StoreRootObject {
  usersResponse: SearchResponseState;
  appData: AppData;
  appNotifications: AppNotifications;
  usersReposResponse: UserReposResponseState;
  reposCommitsResponse: UserCommitsResponseState;
}
