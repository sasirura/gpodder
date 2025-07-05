import { safeFetch } from '../core/fetch.js';
import { getUsername } from '../core/session.js';
import type { QueryParams, Scope, SettingsPayload } from '../types/settings.js';
import { getClientConfig } from './clientconfig.js';

export async function buildSettingsUrl(
  scope: Scope,
  params?: QueryParams,
): Promise<string> {
  const username = getUsername();
  const config = await getClientConfig();

  const url = new URL(
    `${config.mygpo.baseurl}api/2/settings/${username}/${scope}.json`,
  );

  if (params?.podcast) url.searchParams.set('podcast', params.podcast);
  if (params?.device) url.searchParams.set('device', params.device);
  if (params?.episode) url.searchParams.set('episode', params.episode);

  return url.toString();
}

export async function getSettings(
  scope: Scope,
  params?: QueryParams,
): Promise<Record<string, any>> {
  const url = await buildSettingsUrl(scope, params);
  return safeFetch<Record<string, any>>(url);
}

export async function updateSettings(
  scope: Scope,
  settings: SettingsPayload,
  params?: QueryParams,
): Promise<Record<string, any>> {
  const url = await buildSettingsUrl(scope, params);

  return safeFetch<Record<string, any>>(url, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(settings),
  });
}
