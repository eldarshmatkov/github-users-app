import {StoreRootObject} from '../storeRootObject.type';
import {createSelector} from '@ngrx/store';
import {UserCommitsResponseState} from './userCommitsResponseState.type';
import {CommitsResponse} from './commitsResponse.type';

export const rootStore = (state: StoreRootObject) => state;

export const selectorReposCommitsResponse = createSelector(
  rootStore,
  (state: StoreRootObject) => state.reposCommitsResponse
);

export const getCommitsArray = (repoUrl: string) => createSelector(
  selectorReposCommitsResponse,
  (state: UserCommitsResponseState) => {
    const commitsArrayAll = Object.values(state.items.entities);
    return commitsArrayAll.filter((el: CommitsResponse) => {
      if (el.url.indexOf(repoUrl) >= 0) {
        return true;
      }
    });
  }
);

export const getCommitsError = (repoUrl: string) => createSelector(
  selectorReposCommitsResponse,
  (state: UserCommitsResponseState) => {
    if (state.error.url && state.error.url.indexOf(repoUrl) >= 0) {
      return state.error;
    }
  }
);
