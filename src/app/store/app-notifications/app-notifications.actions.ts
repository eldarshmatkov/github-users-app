import {Action} from '@ngrx/store';
import {AppNotifications} from '../../shared/models/app-notifications';

export const CALL_APP_NOTIFICATIONS = 'CALL_APP_NOTIFICATIONS';

export class CallAppNotifications implements Action {
  readonly type = CALL_APP_NOTIFICATIONS;

  constructor(public payload: AppNotifications) {

  }
}
