import * as ReposCommitsActions from './repos-commits.actions';
import {UserCommitsResponseState} from './userCommitsResponseState.type';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {CommitsResponse} from './commitsResponse.type';
import {CommitsState} from './commitsState.type';
import {HttpErrorResponse} from '@angular/common/http';

export const commitsAdapter: EntityAdapter<CommitsResponse> =
  createEntityAdapter<CommitsResponse>({
    selectId: (model: CommitsResponse) => model.sha,
  });

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
      return {
        ...state,
        repo: action.payload.repo,
        // TODO: Заменить на AddMany
        items: commitsAdapter.addAll(action.payload.items, state.items),
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
