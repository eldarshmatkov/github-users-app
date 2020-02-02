import {SearchResponseUsersState} from './searchResponseUsersState.type';

export interface SearchResponseState {
  total_count: number;
  incomplete_results: boolean;
  items: SearchResponseUsersState;
}
