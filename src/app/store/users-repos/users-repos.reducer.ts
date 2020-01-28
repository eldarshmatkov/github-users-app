import * as UsersReposActions from './users-repos.actions';
import {UserReposResponse} from './userReposResponse.type';

const initialState: UserReposResponse = {user: '', items: []};

export function usersReposReducer(state = initialState, action: UsersReposActions.ReposLoaded): UserReposResponse {
  switch (action.type) {
    case UsersReposActions.REPOS_LOADED:
      return action.payload;
    default:
      return state;
  }
}
