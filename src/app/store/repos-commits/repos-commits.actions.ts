import {Action} from '@ngrx/store';
import {CommitsAction} from './commitsAction.type';
import {CommitsState} from './commitsState.type';
import {UserCommitsResponse} from './userCommitsResponse.type';
import {UserCommitsResponseState} from './userCommitsResponseState.type';

export const LOAD_COMMITS = 'LOAD_COMMITS';
export const COMMITS_LOADED = 'COMMITS_LOADED';
export const COMMITS_FAILED = 'COMMITS_FAILED';

export class LoadCommits implements Action {
  readonly type = LOAD_COMMITS;

  constructor(public payload: {userLogin: string, repoName: string}) {

  }
}

export class CommitsLoaded implements Action {
  readonly type = COMMITS_LOADED;

  constructor(public payload: UserCommitsResponse) {

  }
}

export class CommitsFailed implements Action {
  readonly type = COMMITS_FAILED;

  constructor(public payload: UserCommitsResponseState) {

  }
}
