import * as ReposCommitsActions from './repos-commits.actions';
import {UserCommitsResponse} from './userCommitsResponse.type';
import {CustomAction} from '../custom-action.type';

const initialState: UserCommitsResponse = {repo: '', items: []};

export function
reposCommitsReducer(state, action: ReposCommitsActions.CommitsLoaded | ReposCommitsActions.CommitsFailed)
  : UserCommitsResponse | CustomAction {
  switch (action.type) {
    case ReposCommitsActions.COMMITS_LOADED:
      return action;
    case ReposCommitsActions.COMMITS_FAILED:
      return action;
    default:
      return initialState;
  }
}
