import {CommitsState} from './commitsState.type';
import {HttpErrorResponse} from '@angular/common/http';

export interface UserCommitsResponseState {
  items: CommitsState;
  error?: HttpErrorResponse;
}

