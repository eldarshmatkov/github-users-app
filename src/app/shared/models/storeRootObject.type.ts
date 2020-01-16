import {SearchResponse} from './searchResponse.type';
import {AppData} from './app-data.type';
import {AppNotifications} from './app-notifications';

export interface StoreRootObject {
  usersResponse: SearchResponse;
  appData: AppData;
  appNotifications: AppNotifications;
}
