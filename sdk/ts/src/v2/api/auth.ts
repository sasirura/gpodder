import { safeFetch } from '../core/fetch.js';
import { getUsername, setAuthUser } from '../core/session.js';
import { getClientConfig } from './clientconfig.js';

export async function login(username: string, password: string): Promise<void> {
  const config = await getClientConfig();
  const url = `${config.mygpo.baseurl}api/2/auth/${username}/login.json`;

  await safeFetch<void>(url, {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa(`${username}:${password}`),
    },
    body: JSON.stringify({}),
    credentials: 'include',
  });

  setAuthUser({ username: username });
}

export async function logout(): Promise<void> {
  const username = getUsername();
  const config = await getClientConfig();
  const url = `${config.mygpo.baseurl}api/2/auth/${username}/logout.json`;

  await safeFetch<void>(url, {
    method: 'POST',
    body: JSON.stringify({}),
  });

  setAuthUser({
    username: '',
    deviceId: '',
  });
}
