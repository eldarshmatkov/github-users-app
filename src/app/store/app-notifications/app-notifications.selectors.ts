import {StoreRootObject} from '../storeRootObject.type';
import {createSelector} from '@ngrx/store';

export const rootStore = (state: StoreRootObject) => state;

export const selectorAppNotifications = createSelector(
  rootStore,
  (state: StoreRootObject) => state.appNotifications
);
