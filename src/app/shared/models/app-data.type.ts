import {SearchResponseUser} from './searchResponseUser.type';

export interface AppData {
  searchField?: string;
  usersPerPage?: number;
  currentPage?: number;
  currentUser?: SearchResponseUser;
}

