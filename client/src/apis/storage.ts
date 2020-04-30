import { AsyncStorage } from 'react-native';
import { from } from 'rxjs';

export function getUserId() {
  return from(AsyncStorage.getItem('userId'));
}

export function saveUserId(userId: string) {
  return from(AsyncStorage.setItem('userId', userId));
}

export function deleteUserId() {
  return from(AsyncStorage.removeItem('userId'));
}
