export interface DeviceSyncStatus {
    synchronized: string[][]
    "not-synchronized": string[]
}

export interface UpdateDeviceSyncParams {
    synchronize?: [string, string][]
    stopSynchronize?: string[]
}