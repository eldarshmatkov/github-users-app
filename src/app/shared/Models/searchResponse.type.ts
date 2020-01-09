import {searchResponseUser} from './searchResponseUser.type';

export type searchResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: searchResponseUser[];
};
