export type EpisodeActionType =
  | 'download'
  | 'play'
  | 'delete'
  | 'new'
  | 'flattr';

export type EpisodeAction = {
  podcast: string;
  episode: string;
  action: EpisodeActionType;
  device?: string;
  timestamp?: string; // ISO 8601
  started?: number; // only for "play"
  position?: number; // only for "play"
  total?: number; // only for "play"
};

export type EpisodeActionUploadResult = {
  timestamp: number;
  update_urls?: [string, string][];
};

export type EpisodeActionResponse = {
  actions: EpisodeAction[];
  timestamp: number;
};
