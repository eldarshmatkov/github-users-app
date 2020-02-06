import {StoreRootObject} from '../storeRootObject.type';
import {createSelector} from '@ngrx/store';
import {UserReposResponseState} from './userReposResponseState.type';
import {ReposResponse} from './reposResponse.type';

export const rootStore = (state: StoreRootObject) => state;

export const selectorUsersReposResponse = createSelector(
  rootStore,
  (state: StoreRootObject) => state.usersReposResponse
);

export const getReposArray = (userId: number) => createSelector(
  selectorUsersReposResponse,
  (state: UserReposResponseState) => {
    const reposArrayAll = Object.values(state.items.entities);
    return {
      isLoaded: state.isLoaded,
      items: reposArrayAll.filter((el: ReposResponse) => el.owner.id === userId)
    };
  }
);
