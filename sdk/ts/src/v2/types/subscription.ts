export type Subscription = {
  url: string;
  title?: string;
  description?: string;
  website?: string;
  subscribers?: number;
  logo_url?: string;
  mygpo_link?: string;
};

export type SubscriptionList = Subscription[];

export type SubscriptionDeltaResponse = {
  add: string[];
  remove: string[];
  timestamp: number;
  update_urls?: [string, string][];
};
