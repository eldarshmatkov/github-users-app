import {StoreRootObject} from '../storeRootObject.type';
import {createSelector} from '@ngrx/store';
import {SearchResponseState} from './searchResponseState.type';

export const rootStore = (state: StoreRootObject) => state;

export const selectorUsersResponse = createSelector(
  rootStore,
  (state: StoreRootObject) => state.usersResponse
);

export const usersResponseError = createSelector(
  selectorUsersResponse,
  (state: SearchResponseState) => state.error
);


