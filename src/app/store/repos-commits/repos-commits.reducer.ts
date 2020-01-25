import * as ReposCommitsActions from './repos-commits.actions';
import {UserCommitsResponse} from '../../shared/models/userCommitsResponse.type';

const initialState: UserCommitsResponse = {repo: '', items: []};

export function
reposCommitsReducer(state = initialState, action: ReposCommitsActions.CommitsLoaded | ReposCommitsActions.CommitsLoadedError)
  : UserCommitsResponse | string {
  switch (action.type) {
    case ReposCommitsActions.COMMITS_LOADED:
      return action.payload;
    default:
      return state;
  }
}
