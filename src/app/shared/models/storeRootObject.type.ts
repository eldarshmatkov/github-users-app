import {SearchResponse} from './searchResponse.type';
import {AppData} from './app-data.type';

export interface StoreRootObject {
  usersResponse: SearchResponse;
  appData: AppData;
}
