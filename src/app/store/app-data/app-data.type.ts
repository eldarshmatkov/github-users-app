import {SearchResponseUser} from '../users/searchResponseUser.type';

export interface AppData {
  searchField?: string;
  usersPerPage?: number;
  currentPage?: number;
  currentUser?: SearchResponseUser;
}

