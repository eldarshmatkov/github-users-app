import {SearchResponseUsersState} from './searchResponseUsersState.type';
import {HttpErrorResponse} from '@angular/common/http';

export interface SearchResponseState {
  total_count: number;
  incomplete_results: boolean;
  items: SearchResponseUsersState;
  error?: HttpErrorResponse;
}
