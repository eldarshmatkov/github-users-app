import * as AppDataActions from './app-data.actions';
import {AppData} from '../../shared/models/app-data.type';

const initialState: AppData = {
  searchField: '',
  usersPerPage: 10,
  currentPage: 1,
};


export function appDataReducer(state = initialState, action: AppDataActions.AppDataActions): AppData {
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
    default:
      return state;
  }
}