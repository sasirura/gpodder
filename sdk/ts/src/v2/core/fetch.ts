import fetchCookie from "fetch-cookie";

const cookieFetch = fetchCookie(fetch)
export async function safeFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await cookieFetch(url, options)

    if (!response.ok) {
        const message = `Fetch failed: ${response.status} ${response.statusText}`;
        throw new Error(message);
    }

    const contentType = response.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
        return undefined as unknown as T;
    }

    const text = await response.text();
    if (!text) {
        return undefined as unknown as T;
    }

    try {
        return JSON.parse(text);
    } catch (err) {
        throw new Error("Failed to parse JSON: " + (err as Error).message);
    }

}


