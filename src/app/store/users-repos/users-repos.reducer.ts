import * as UsersReposActions from './users-repos.actions';
import {UserReposResponse} from './userReposResponse.type';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {ReposResponse} from './reposResponse.type';
import {UserReposResponseState} from './userReposResponseState.type';
import {ReposState} from './ReposState.type';

export const reposAdapter: EntityAdapter<ReposResponse> = createEntityAdapter<ReposResponse>();

export const initialReposState: ReposState =
  reposAdapter.getInitialState();

const initialState: UserReposResponseState = {
  isLoaded: false,
  items: initialReposState,
};

export function usersReposReducer(state = initialState, action: UsersReposActions.ReposLoaded): UserReposResponseState {
  switch (action.type) {
    case UsersReposActions.REPOS_LOADED:
      return {
        ...state,
        isLoaded: action.payload.isLoaded,
        items: reposAdapter.addMany(action.payload.items, state.items)
      };
    default:
      return state;
  }
}
