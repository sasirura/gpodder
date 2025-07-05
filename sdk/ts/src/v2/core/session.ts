import type { User } from '../types/user.js';

let authUser: User;

export function setAuthUser(user: User) {
  authUser = user;
}

export function getAuthUser(): User {
  if (!authUser) throw new Error('User not authenticated');
  if (!authUser.username) throw new Error('Username not set in user object');
  return authUser;
}

export function getUsername(): string {
  return getAuthUser().username;
}

export function getDeviceId(): string {
  const user = getAuthUser();
  if (!user.deviceId)
    throw new Error('Device ID not set. Call setDevice(deviceId) first.');
  return user.deviceId;
}

export function setDevice(deviceId: string) {
  const user = getAuthUser();
  setAuthUser({ ...user, deviceId });
}
