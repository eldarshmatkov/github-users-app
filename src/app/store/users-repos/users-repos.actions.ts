import {createAction, props} from '@ngrx/store';

export const LOAD_REPOS = 'LOAD_REPOS';
export const REPOS_LOADED = 'REPOS_LOADED';

export const loadRepos = createAction(
  LOAD_REPOS,
  props<{ payload: string }>()
);
