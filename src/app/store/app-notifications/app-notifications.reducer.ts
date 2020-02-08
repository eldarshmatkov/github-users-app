import * as CallNotificationsActions from './app-notifications.actions';
import {AppNotifications} from './app-notifications';
import {CustomAction} from '../custom-action.type';

const initialState: AppNotifications = {
  isLoading: false,
};


export function appNotificationsReducer(state: AppNotifications = initialState, action: CustomAction): AppNotifications {
  switch (action.type) {
    case CallNotificationsActions.CALL_APP_NOTIFICATIONS:
      return {
        ...state,
        isLoading: action.payload.isLoading ? action.payload.isLoading : initialState.isLoading,
      };
    default:
      return state;
  }
}
