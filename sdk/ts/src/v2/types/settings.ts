export type Scope = "account" | "device" | "podcast" | "episode"

export type SettingsPayload = {
    set?: Record<string, any>
    remove?: string[]
}

export type QueryParams = {
    podcast?: string
    device?: string
    episode?: string
}