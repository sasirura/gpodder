import { safeFetch } from '../core/fetch.js';
import { getUsername } from '../core/session.js';
import type {
  DeviceSyncStatus,
  UpdateDeviceSyncParams,
} from '../types/synchronization.js';
import { getClientConfig } from './clientconfig.js';

export async function getDeviceSyncStatus(): Promise<DeviceSyncStatus> {
  const username = getUsername();
  const config = await getClientConfig();

  const url = `${config.mygpo.baseurl}api/2/devices/${username}.json`;

  return safeFetch<DeviceSyncStatus>(url, {
    method: 'GET',
    credentials: 'include',
  });
}

export async function updateDeviceSync(
  params: UpdateDeviceSyncParams,
): Promise<DeviceSyncStatus> {
  const username = getUsername();
  const config = await getClientConfig();

  const url = `${config.mygpo.baseurl}api/2/sync-devices/${username}.json`;

  const body = {
    ...(params.synchronize ? { synchronize: params.synchronize } : {}),
    ...(params.stopSynchronize
      ? { 'stop-synchronize': params.stopSynchronize }
      : {}),
  };

  return safeFetch<DeviceSyncStatus>(url, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
