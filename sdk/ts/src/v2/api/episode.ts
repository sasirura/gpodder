import { safeFetch } from "../core/fetch.js";
import { getUsername } from "../core/session.js"
import type { EpisodeAction, EpisodeActionResponse, EpisodeActionUploadResult } from "../types/episode.js"
import { getClientConfig } from "./clientconfig.js";

export async function uploadEpisodeActions(
    actions: EpisodeAction[]
): Promise<EpisodeActionUploadResult> {
    const username = getUsername()
    const config = await getClientConfig();

    const url = `${config.mygpo.baseurl}episodes/${username}.json`;

    return safeFetch<EpisodeActionUploadResult>(url, {
        method: "POST",
        body: JSON.stringify(actions),
        credentials: "include",
    })
}

export async function getEpisodeActions(options: {
    since?: number
    podcast?: string
    device?: string
    aggregated?: boolean
} = {}): Promise<EpisodeActionResponse> {
    const username = getUsername()
    const config = await getClientConfig();

    const url = new URL(`${config.mygpo.baseurl}episodes/${username}.json`);

    if (options.since !== undefined) url.searchParams.set("since", options.since.toString())
    if (options.podcast) url.searchParams.set("podcast", options.podcast)
    if (options.device) url.searchParams.set("device", options.device)
    if (options.aggregated !== undefined) url.searchParams.set("aggregated", String(options.aggregated))

    return safeFetch<EpisodeActionResponse>(url.toString())
}