import {Action} from '@ngrx/store';
import {UserCommitsResponseState} from './userCommitsResponseState.type';

export interface CommitsAction extends Action {
  type: string;
  payload?: UserCommitsResponseState;
}
