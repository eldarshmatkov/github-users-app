import {Action} from '@ngrx/store';
import {UserReposResponse} from './userReposResponse.type';

export const LOAD_REPOS = 'LOAD_REPOS';
export const REPOS_LOADED = 'REPOS_LOADED';

export class LoadRepos implements Action {
  readonly type = LOAD_REPOS;

  constructor(public payload: string) {

  }
}

export class ReposLoaded implements Action {
  readonly type = REPOS_LOADED;

  constructor(public payload: UserReposResponse) {

  }
}
