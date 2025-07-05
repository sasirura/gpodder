import { safeFetch } from "../core/fetch.js";
import { getAuthUser, getDeviceId, getUsername, setAuthUser } from "../core/session.js";
import type { Device, DeviceUpdates, UpdateDevicePayload } from "../types/device.js";
import { getClientConfig } from "./clientconfig.js";

export async function listDevices(): Promise<Device[]> {
    const config = await getClientConfig();
    const username = getUsername();
    const url = `${config.mygpo.baseurl}api/2/devices/${username}.json`;

    return safeFetch<Device[]>(url, {
        method: "GET",
        credentials: "include"
    });
}

export async function setDevice(deviceId: string) {
    const user = getAuthUser();
    setAuthUser({
        ...user,
        deviceId: deviceId
    });
}

export async function updateDevice(data: UpdateDevicePayload): Promise<Device[]> {
    const config = await getClientConfig();
    const username = getUsername();
    const deviceId = getDeviceId()

    const url = `${config.mygpo.baseurl}api/2/devices/${username}/${deviceId}.json`;

    return safeFetch<Device[]>(url, {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include"
    });
}

export async function getDeviceUpdates(options?: {
    since?: number
    includeActions?: boolean
}): Promise<DeviceUpdates> {
    const username = getUsername()
    const config = await getClientConfig()
    const deviceId = getDeviceId()

    const params = new URLSearchParams()
    if (options?.since) params.set("since", options.since.toString())
    if (options?.includeActions) params.set("include_actions", "true")

    const url = `${config.mygpo.baseurl}api/2/updates/${username}/${deviceId}.json?${params.toString()}`

    return safeFetch<DeviceUpdates>(url, {
        method: "GET",
        credentials: "include"
    })
}

