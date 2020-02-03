import * as ReposCommitsActions from './repos-commits.actions';
import {UserCommitsResponseState} from './userCommitsResponseState.type';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {CommitsResponse} from './commitsResponse.type';
import {CommitsState} from './commitsState.type';
import {HttpErrorResponse} from '@angular/common/http';

export const commitsAdapter: EntityAdapter<CommitsResponse> =
  createEntityAdapter<CommitsResponse>();

export const initialCommitsState: CommitsState =
  commitsAdapter.getInitialState();

const initialState: UserCommitsResponseState = {
  repo: '',
  items: initialCommitsState,
};

export function reposCommitsReducer(state = initialState, action: ReposCommitsActions.CommitsLoaded | ReposCommitsActions.CommitsFailed)
  : UserCommitsResponseState {
  switch (action.type) {
    case ReposCommitsActions.COMMITS_LOADED:
      const newArray = action.payload.items.map((x, i) => ({...x, id: i, }));
      return {
        ...state,
        repo: action.payload.repo,
        items: commitsAdapter.addAll(newArray, state.items),
        error: new HttpErrorResponse({status: 0})
      };
    case ReposCommitsActions.COMMITS_FAILED:
      return {
        ...state,
        repo: action.payload.repo,
        items: initialCommitsState,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
