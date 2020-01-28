import {SearchResponse} from './searchResponse.type';
import * as UsersActions from './users.actions';

const initialState: SearchResponse = {
  total_count: 0,
  incomplete_results: false,
  items: [],
};


export function usersReducer(state = initialState, action: UsersActions.UsersLoaded): SearchResponse {
  switch (action.type) {
    case UsersActions.USERS_LOADED:
      return {
        ...state,
        total_count: action.payload.total_count,
        incomplete_results: action.payload.incomplete_results,
        items: [...action.payload.items],
      };
    default:
      return state;
  }
}
