import { safeFetch } from "../core/fetch.js";
import { getUsername } from "../core/session.js"
import type { FavoriteEpisode } from "../types/favorite.js"
import { getClientConfig } from "./clientconfig.js";

export async function getFavoriteEpisodes(): Promise<FavoriteEpisode[]> {
    const username = getUsername()
    const config = await getClientConfig();

    const url = `${config.mygpo.baseurl}episodes/${username}.json`;

    return safeFetch<FavoriteEpisode[]>(url, {
        method: "GET",
        credentials: "include"
    })
}