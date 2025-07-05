import { safeFetch } from '../core/fetch.js';
import type { ClientConfig } from '../types/index.js';

const DEFAULT_CONFIG: ClientConfig = {
  mygpo: { baseurl: 'https://gpodder.net/' },
  'mygpo-feedservice': { baseurl: 'https://mygpo-feedservice.appspot.com/' },
  update_timeout: 604800,
};

let cachedConfig: ClientConfig | null = null;
let lastFetched = 0;

export async function getClientConfig(): Promise<ClientConfig> {
  const now = Date.now() / 1000;

  if (cachedConfig && now - lastFetched < cachedConfig.update_timeout) {
    return cachedConfig;
  }

  try {
    const config = await safeFetch<ClientConfig>(
      'https://gpodder.net/clientconfig.json',
    );
    cachedConfig = { ...DEFAULT_CONFIG, ...config };
    lastFetched = now;
    return cachedConfig;
  } catch (error) {
    console.warn('Falling back to default client config.');
    return DEFAULT_CONFIG;
  }
}
