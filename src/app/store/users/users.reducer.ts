import {SearchResponse} from '../../shared/models/searchResponse.type';
import * as UsersActions from './users.actions';

const initialState: SearchResponse = {
  total_count: 0,
  incomplete_results: false,
  items: [],
};


export function usersReducer(state = initialState, action: UsersActions.UpdateSearchResponse): SearchResponse {
  switch (action.type) {
    case UsersActions.UPDATE_SEARCH_RESPONSE:
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
