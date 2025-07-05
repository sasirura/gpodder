import { getClientConfig } from '../api/clientconfig.js';
import { safeFetch } from '../core/fetch.js';
import { getUsername } from '../core/session.js';
import type { PodcastListInfo } from '../types/list.js';

export async function createPodcastList(
  title: string,
  feeds: string[],
): Promise<Response> {
  const username = getUsername();
  const config = await getClientConfig();

  const url = new URL(`${config.mygpo.baseurl}lists/${username}/create.json`);
  url.searchParams.set('title', title);

  return safeFetch(url.toString(), {
    method: 'POST',
    body: JSON.stringify(feeds),
    credentials: 'include',
  });
}

export async function getPodcastLists(): Promise<PodcastListInfo[]> {
  const username = getUsername();
  const config = await getClientConfig();

  const url = `${config.mygpo.baseurl}/lists/${username}.json`;

  return safeFetch<PodcastListInfo[]>(url, {
    method: 'GET',
    credentials: 'include',
  });
}

export async function updatePodcastList(
  listName: string,
  feeds: string[],
): Promise<Response> {
  const username = getUsername();
  const config = await getClientConfig();

  const url = new URL(
    `${config.mygpo.baseurl}lists/${username}/list/${listName}.json`,
  );

  return safeFetch(url.toString(), {
    method: 'PUT',
    body: JSON.stringify(feeds),
    credentials: 'include',
  });
}

export async function deletePodcastList(listName: string): Promise<void> {
  const username = getUsername();
  const config = await getClientConfig();

  const url = `${config.mygpo.baseurl}lists/${username}/list/${listName}.json`;

  return safeFetch(url, {
    method: 'DELETE',
    credentials: 'include',
  });
}
