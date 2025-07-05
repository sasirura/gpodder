import { safeFetch } from '../core/fetch.js';
import type {
  EpisodeData,
  Podcast,
  PodcastData,
  Tag,
} from '../types/directory.js';
import { getClientConfig } from './clientconfig.js';

export async function getTopTags(count: number): Promise<Tag[]> {
  const config = await getClientConfig();
  const url = `${config.mygpo.baseurl}api/2/tags/${count}.json`;

  return safeFetch<Tag[]>(url, {
    method: 'GET',
  });
}

export async function getPodcastsForTag(
  tag: string,
  count: number,
): Promise<Podcast[]> {
  const config = await getClientConfig();
  const url = `${config.mygpo.baseurl}api/2/tag/${tag}/${count}.json`;

  return safeFetch<Podcast[]>(url, {
    method: 'GET',
  });
}

export async function getPodcastData(feedUrl: string): Promise<PodcastData> {
  const config = await getClientConfig();
  const url = `${config.mygpo.baseurl}api/2/data/podcast.json?url=${encodeURIComponent(feedUrl)}`;

  return safeFetch<PodcastData>(url, {
    method: 'GET',
  });
}

export async function getEpisodeData(
  podcastUrl: string,
  episodeUrl: string,
): Promise<EpisodeData> {
  const config = await getClientConfig();

  const encodedPodcastUrl = encodeURIComponent(podcastUrl);
  const encodedEpisodeUrl = encodeURIComponent(episodeUrl);
  const url = `${config.mygpo.baseurl}api/2/data/episode.json?podcast=${encodedPodcastUrl}&url=${encodedEpisodeUrl}`;

  return safeFetch<EpisodeData>(url, {
    method: 'GET',
  });
}

export async function getPodcastTopList(number: number): Promise<Podcast[]> {
  const config = await getClientConfig();
  const url = `${config.mygpo.baseurl}toplist/${number}.json}`;

  return safeFetch<Podcast[]>(url, {
    method: 'GET',
  });
}

export async function searchPodcasts(query: string): Promise<Podcast[]> {
  const config = await getClientConfig();
  const url = `${config.mygpo.baseurl}search.json?q=${encodeURIComponent(query)}}`;

  return safeFetch<Podcast[]>(url, {
    method: 'GET',
  });
}
