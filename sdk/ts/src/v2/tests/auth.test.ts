import { login, logout } from '../api/auth.js'
import { beforeEach, vi, test, describe, it, expect } from 'vitest'
import * as clientconfig from '../api/clientconfig.js'

const mockConfig = {
    mygpo: { baseurl: "https://mock-api/" },
    "mygpo-feedservice": { baseurl: "https://mock-feed/" },
    update_timeout: 604800,
};

beforeEach(() => {
    vi.restoreAllMocks()

    vi.spyOn(clientconfig, "getClientConfig").mockResolvedValue(mockConfig)
})

describe("auth", () => {
    it("performs login with correct request", async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({})
        })
        global.fetch = fetchMock as any
        await login("testuser", "testpass")

        expect(fetchMock).toHaveBeenCalledWith(
            "https://mock-api/api/2/auth/testuser/login.json",
            expect.objectContaining({
                method: "POST",
                headers: expect.objectContaining({
                    Authorization: "Basic" + btoa("testuser:testpass")
                }),
                credentials: "include",
            })
        )
    })

    it("performs logout with correct request", async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({})
        })
        global.fetch = fetchMock as any
        await logout()

        expect(fetchMock).toHaveBeenCalledWith(
            "https://mock-api/api/2/auth/testuser/logout.json",
            expect.objectContaining({
                method: "POST",
                credentials: "include",
            })
        )
    })
    it("throws on failed login", async () => {
        global.fetch = vi.fn().mockResolvedValue({
            ok: false,
            status: 401,
            statusText: "Unauthorized",
            json: async () => ({}),
        });
        await expect(login("bad", "creds")).rejects.toThrow("Fetch failed: 401 Unauthorized");
    });
})
