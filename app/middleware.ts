"use server"

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { isAdminAuthenticated } from "@/lib/admin-auth"

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Only protect admin routes
    if (pathname.startsWith("/admin")) {
        const authed = await isAdminAuthenticated()
        if (!authed) {
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
