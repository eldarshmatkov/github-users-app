import {Action} from '@ngrx/store';
import {UserCommitsResponse} from '../../shared/models/userCommitsResponse.type';

export const LOAD_COMMITS = 'LOAD_COMMITS';
export const COMMITS_LOADED = 'COMMITS_LOADED';

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
