import * as ReposCommitsActions from './repos-commits.actions';
import {UserCommitsResponseState} from './userCommitsResponseState.type';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {CommitsResponse} from './commitsResponse.type';
import {CommitsState} from './commitsState.type';
import {HttpErrorResponse} from '@angular/common/http';
import {CustomAction} from '../custom-action.type';

export const commitsAdapter: EntityAdapter<CommitsResponse> =
  createEntityAdapter<CommitsResponse>({
    selectId: (model: CommitsResponse) => model.sha,
  });

export const initialCommitsState: CommitsState =
  commitsAdapter.getInitialState();

const initialState: UserCommitsResponseState = {
  items: initialCommitsState,
  error: new HttpErrorResponse({status: 0}),
};

export function reposCommitsReducer(state: UserCommitsResponseState = initialState, action: CustomAction)
  : UserCommitsResponseState {
  switch (action.type) {
    case ReposCommitsActions.COMMITS_LOADED:
      return {
        ...state,
        items: commitsAdapter.addMany(action.payload.items, state.items),
      };
    case ReposCommitsActions.COMMITS_FAILED:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
