import {CommitsState} from './commitsState.type';
import {HttpErrorResponse} from '@angular/common/http';

export interface UserCommitsResponseState {
  repo: string;
  items: CommitsState;
  error?: HttpErrorResponse;
}

