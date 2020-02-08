import * as UsersActions from './users.actions';
import {SearchResponseState} from './searchResponseState.type';
import {SearchResponseUser} from './searchResponseUser.type';
import {createEntityAdapter, EntityAdapter} from '@ngrx/entity';
import {SearchResponseUsersState} from './searchResponseUsersState.type';
import {CustomAction} from '../custom-action.type';
import {HttpErrorResponse} from '@angular/common/http';

export const usersAdapter: EntityAdapter<SearchResponseUser> =
  createEntityAdapter<SearchResponseUser>();

export const initialUsersState: SearchResponseUsersState =
  usersAdapter.getInitialState();

const initialState: SearchResponseState = {
  total_count: 0,
  incomplete_results: false,
  items: initialUsersState,
  error: new HttpErrorResponse({status: 0}),
};

export function usersReducer(state: SearchResponseState = initialState, action: CustomAction): SearchResponseState {
  switch (action.type) {
    case UsersActions.USERS_LOADED:
      return {
        ...state,
        total_count: action.payload.total_count,
        incomplete_results: action.payload.incomplete_results,
        items: usersAdapter.addAll(action.payload.items, state.items),
        error: new HttpErrorResponse({status: 0}),
      };
    case UsersActions.USERS_FAILED:
      return {
        ...state,
        error: action.payload.error
      };
    default:
      return state;
  }
}
