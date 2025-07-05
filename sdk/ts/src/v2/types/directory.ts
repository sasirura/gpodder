export interface Tag {
    title: string
    tag: string
    usage: number
}

export interface Podcast {
    url: string
    title: string
    author: string
    description: string
    subscribers: number
    logo_url: string
    website?: string
    mygpo_link?: string
    position_last_week?: number
}

export interface PodcastData {
    website: string
    mygpo_link: string
    description: string
    subscribers: number
    title: string
    author: string
    url: string
    logo_url: string
}

export interface EpisodeData {
    title: string
    url: string
    podcast_title: string
    podcast_url: string
    description: string
    website: string
    released: string
    mygpo_link: string
}