import {Action} from '@ngrx/store';
import {AppData} from '../../shared/models/app-data.type';

export const UPDATE_APP_DATA = 'UPDATE_APP_DATA';

export class UpdateAppData implements Action {
  readonly type = UPDATE_APP_DATA;

  constructor(public payload: AppData) {

  }
}
