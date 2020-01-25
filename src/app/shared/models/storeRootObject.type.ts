import {SearchResponse} from './searchResponse.type';
import {AppData} from './app-data.type';
import {AppNotifications} from './app-notifications';
import {ReposResponse} from './reposResponse.type';
import {UserReposResponse} from './userReposResponse.type';
import {UserCommitsResponse} from './userCommitsResponse.type';

export interface StoreRootObject {
  usersResponse: SearchResponse;
  appData: AppData;
  appNotifications: AppNotifications;
  usersReposResponse: UserReposResponse;
  reposCommitsResponse: UserCommitsResponse;
}
