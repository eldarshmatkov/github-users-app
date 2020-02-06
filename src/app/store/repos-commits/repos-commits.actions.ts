import {createAction, props} from '@ngrx/store';
import {UserCommitsResponseState} from './userCommitsResponseState.type';

export const LOAD_COMMITS = 'LOAD_COMMITS';
export const COMMITS_LOADED = 'COMMITS_LOADED';
export const COMMITS_FAILED = 'COMMITS_FAILED';

export const loadCommits = createAction(
  LOAD_COMMITS,
  props<{ payload: { userLogin: string; repoName: string } }>()
);

export const commitsFailed = createAction(
  COMMITS_FAILED,
  props<{ payload: UserCommitsResponseState }>()
);
