import { getClientConfig } from './clientconfig.js';
import { safeFetch } from '../core/fetch.js';
import type { SuggestedPodcast } from '../types/suggestion.js';

export async function getSuggestedPodcasts(
  count: number,
): Promise<SuggestedPodcast[]> {
  const config = await getClientConfig();
  const url = `${config.mygpo.baseurl}suggestions/${count}.json`;

  return safeFetch<SuggestedPodcast[]>(url, {
    method: 'GET',
    credentials: 'include',
  });
}
