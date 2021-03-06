import * as AppDataActions from './app-data.actions';
import {AppData} from './app-data.type';
import {CustomAction} from '../custom-action.type';

const initialState: AppData = {
  searchField: '',
  usersPerPage: 10,
  currentPage: 1,
  currentUser: 0,
};


export function appDataReducer(state: AppData = initialState, action: CustomAction): AppData {
  switch (action.type) {
    case AppDataActions.SEARCH_USER:
      return {
        ...state,
        searchField: action.payload.searchField,
      };
    case AppDataActions.SET_USERS_PER_PAGE:
      return {
        ...state,
        usersPerPage: action.payload.usersPerPage,
      };
    case AppDataActions.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload.currentPage,
      };
    case AppDataActions.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser,
      };
    default:
      return state;
  }
}
