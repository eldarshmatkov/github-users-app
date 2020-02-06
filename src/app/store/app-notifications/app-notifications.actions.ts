import {createAction, props} from '@ngrx/store';
import {AppNotifications} from './app-notifications';

export const CALL_APP_NOTIFICATIONS = 'CALL_APP_NOTIFICATIONS';

export const callAppNotifications = createAction(
  CALL_APP_NOTIFICATIONS,
  props<{ payload: AppNotifications }>()
);
