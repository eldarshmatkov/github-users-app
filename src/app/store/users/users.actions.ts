import {Action} from '@ngrx/store';
import {SearchResponse} from '../../shared/models/searchResponse.type';

export const UPDATE_SEARCH_RESPONSE = 'UPDATE_SEARCH_RESPONSE';

export class UpdateSearchResponse implements Action {
  readonly type = UPDATE_SEARCH_RESPONSE;

  constructor(public payload: SearchResponse) {

  }
}
