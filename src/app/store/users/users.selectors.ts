import {StoreRootObject} from '../../shared/models/storeRootObject.type';
import {createSelector} from '@ngrx/store';

export const rootStore = (state: StoreRootObject) => state;

export const selectorUsersResponse = createSelector(
  rootStore,
  (state: StoreRootObject) => state.usersResponse
);
