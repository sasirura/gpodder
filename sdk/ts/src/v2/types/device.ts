import type { EpisodeActionType } from "./episode.js";

export type DeviceType = string

export interface Device {
    id: string;
    caption: string;
    type: DeviceType;
    subscriptions: number;
}

export interface UpdateDevicePayload {
    caption?: string;
    type?: DeviceType;
}

export interface DevicePodcastAdd {
    title: string;
    url: string;
    description: string;
    subscribers: number;
    logo_url: string | null;
    website: string;
    mygpo_link: string;
}

export interface DevicePodcastUpdate {
    title: string;
    url: string;
    podcast_title: string;
    podcast_url: string;
    description: string;
    website: string;
    mygpo_link: string;
    released: string;
    status: "new" | "play" | "download" | "delete"
    action?: EpisodeActionType
}

export interface DeviceUpdates {
    add: DevicePodcastAdd[];
    remove: string[];
    updates: DevicePodcastUpdate[];
    timestamp: number;
}