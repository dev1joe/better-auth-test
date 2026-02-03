import { createAuthClient } from "better-auth/react"
import { twoFactorClient } from "better-auth/plugins"

export const authClient = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    plugins: [
        twoFactorClient({
            onTwoFactorRedirect: () => {
                window.location.href = '/auth/2fa'
            }
        })
    ]
})