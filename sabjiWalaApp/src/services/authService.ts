import { STORAGE_KEYS } from '../config/constants';
import { clearStorage, getItem, setItem } from '../storage/storage';
import { User } from '../types/models';

export async function getUsers() {
  return getItem<User[]>(STORAGE_KEYS.users, []);
}
export async function saveUsers(users: User[]) {
  return setItem(STORAGE_KEYS.users, users);
}
export async function saveSession(userId: string | null) {
  return setItem(STORAGE_KEYS.session, userId);
}
export async function getSession() {
  return getItem<string | null>(STORAGE_KEYS.session, null);
}
export async function resetAppData() {
  return clearStorage();
}
