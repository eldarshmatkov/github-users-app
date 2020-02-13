import {StoreRootObject} from '../storeRootObject.type';
import {createSelector} from '@ngrx/store';

export const rootStore = (state: StoreRootObject) => state;

export const selectorAppData = createSelector(
  rootStore,
  (state: StoreRootObject) => state.appData
);

export const selectorUserEntityById = (id: number) => createSelector(
  rootStore,
  (state: StoreRootObject) => state.usersResponse.items.entities[id]
);
