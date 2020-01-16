import * as AppDataActions from './app-data.actions';
import {AppData} from '../../shared/models/app-data.type';

const initialState: AppData = {
  searchField: '',
  usersPerPage: 10,
  currentPage: 1,
};


export function appDataReducer(state = initialState, action: AppDataActions.UpdateAppData): AppData {
  switch (action.type) {
    case AppDataActions.UPDATE_APP_DATA:
      return {
        ...state,
        searchField: action.payload.searchField ? action.payload.searchField : initialState.searchField,
        usersPerPage: action.payload.usersPerPage ? action.payload.usersPerPage : initialState.usersPerPage,
        currentPage: action.payload.currentPage ? action.payload.currentPage : initialState.currentPage,
      };
    default:
      return state;
  }
}
