import { safeFetch } from '../core/fetch.js';
import { getDeviceId, getUsername } from '../core/session.js';
import type {
  SubscriptionDeltaResponse,
  SubscriptionList,
} from '../types/subscription.js';
import { getClientConfig } from './clientconfig.js';

export async function getSubscriptionsOfDevice(): Promise<SubscriptionList> {
  const username = getUsername();
  const deviceId = getDeviceId();
  const config = await getClientConfig();

  const url = `${config.mygpo.baseurl}subscriptions/${username}/${deviceId}.json`;

  return safeFetch<SubscriptionList>(url, {
    method: 'GET',
    credentials: 'include',
  });
}

export async function getAllSubscriptions(): Promise<SubscriptionList> {
  const username = getUsername();
  const config = await getClientConfig();

  const url = `${config.mygpo.baseurl}subscriptions/${username}.json`;

  return safeFetch<SubscriptionList>(url, {
    method: 'GET',
    credentials: 'include',
  });
}

export async function uploadSubscriptions(
  subscriptions: string[],
): Promise<void> {
  const username = getUsername();
  const deviceId = getDeviceId();
  const config = await getClientConfig();

  const url = `${config.mygpo.baseurl}subscriptions/${username}/${deviceId}.json`;

  return safeFetch(url, {
    method: 'PUT',
    body: JSON.stringify(subscriptions),
    credentials: 'include',
  });
}

export async function updateSubscriptionsDelta(changes: {
  add?: string[];
  remove?: string[];
}): Promise<SubscriptionDeltaResponse> {
  const username = getUsername();
  const deviceId = getDeviceId();
  const config = await getClientConfig();

  const url = `${config.mygpo.baseurl}subscriptions/${username}/${deviceId}.json`;

  return safeFetch(url, {
    method: 'POST',
    body: JSON.stringify(changes),
    credentials: 'include',
  });
}

export async function getSubscriptionChanges(
  since: number,
): Promise<SubscriptionDeltaResponse> {
  const username = getUsername();
  const deviceId = getDeviceId();
  const config = await getClientConfig();

  const url = new URL(
    `${config.mygpo.baseurl}subscriptions/${username}/${deviceId}.json`,
  );
  url.searchParams.set('since', since.toString());

  return safeFetch<SubscriptionDeltaResponse>(url.toString());
}
