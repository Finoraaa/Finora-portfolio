"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const ADMIN_COOKIE_NAME = "finora_admin_session"
// Session token validity: 24 hours
const SESSION_DURATION = 24 * 60 * 60 * 1000

function generateToken(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let token = ""
    for (let i = 0; i < 64; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return token + "_" + Date.now()
}

export async function adminLogin(password: string): Promise<{ success: boolean; error?: string }> {
    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminPassword) {
        console.error("ADMIN_PASSWORD is not set in environment variables")
        return { success: false, error: "Sunucu yapılandırma hatası." }
    }

    if (password !== adminPassword) {
        return { success: false, error: "Geçersiz şifre." }
    }

    const token = generateToken()
    const cookieStore = await cookies()

    cookieStore.set(ADMIN_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: SESSION_DURATION / 1000,
        path: "/",
    })

    return { success: true }
}

export async function adminLogout() {
    const cookieStore = await cookies()
    cookieStore.delete(ADMIN_COOKIE_NAME)
    redirect("/admin/login")
}

export async function isAdminAuthenticated(): Promise<boolean> {
    const cookieStore = await cookies()
    const session = cookieStore.get(ADMIN_COOKIE_NAME)

    if (!session?.value) return false

    // Check if token has timestamp and is not expired
    const parts = session.value.split("_")
    const timestamp = parseInt(parts[parts.length - 1])

    if (isNaN(timestamp)) return false
    if (Date.now() - timestamp > SESSION_DURATION) {
        cookieStore.delete(ADMIN_COOKIE_NAME)
        return false
    }

    return true
}
