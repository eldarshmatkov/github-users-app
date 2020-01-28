import * as ReposCommitsActions from './repos-commits.actions';
import {CustomAction} from '../custom-action.type';

export function
reposCommitsReducer(state, action: ReposCommitsActions.CommitsLoaded | ReposCommitsActions.CommitsFailed)
  : CustomAction {
  switch (action.type) {
    case ReposCommitsActions.COMMITS_LOADED:
      return action;
    case ReposCommitsActions.COMMITS_FAILED:
      return action;
  }
}
