import {SearchResponseUser} from './searchResponseUser.type';

export interface SearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: SearchResponseUser[];
}
