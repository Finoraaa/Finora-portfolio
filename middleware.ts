import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const ADMIN_COOKIE_NAME = "finora_admin_session"
const SESSION_DURATION = 24 * 60 * 60 * 1000

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Only protect admin routes
    if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
        const session = request.cookies.get(ADMIN_COOKIE_NAME)

        let isAuthenticated = false
        if (session?.value) {
            const parts = session.value.split("_")
            const timestamp = parseInt(parts[parts.length - 1])
            if (!isNaN(timestamp) && (Date.now() - timestamp <= SESSION_DURATION)) {
                isAuthenticated = true
            }
        }

        if (!isAuthenticated) {
            const loginUrl = new URL("/admin/login", request.url)
            loginUrl.searchParams.set("redirect", pathname)
            return NextResponse.redirect(loginUrl)
        }
    }

    return NextResponse.next()
}


export const config = {
    matcher: ["/admin/:path*"],
}

