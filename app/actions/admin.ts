"use server"

import { db } from "@/lib/db"
import { messages } from "@/lib/db/schema"
import { eq, desc, count, and } from "drizzle-orm"
import { isAdminAuthenticated } from "@/lib/admin-auth"

async function checkAuth() {
    const authed = await isAdminAuthenticated()
    if (!authed) throw new Error("Unauthorized")
}

export async function getMessages() {
    await checkAuth()
    return db
        .select()
        .from(messages)
        .where(eq(messages.isArchived, false))
        .orderBy(desc(messages.createdAt))
}

export async function getArchivedMessages() {
    await checkAuth()
    return db
        .select()
        .from(messages)
        .where(eq(messages.isArchived, true))
        .orderBy(desc(messages.createdAt))
}

export async function markAsRead(id: number) {
    await checkAuth()
    await db.update(messages).set({ isRead: true }).where(eq(messages.id, id))
    return { success: true }
}

export async function markAsUnread(id: number) {
    await checkAuth()
    await db.update(messages).set({ isRead: false }).where(eq(messages.id, id))
    return { success: true }
}

export async function archiveMessage(id: number) {
    await checkAuth()
    await db.update(messages).set({ isArchived: true }).where(eq(messages.id, id))
    return { success: true }
}

export async function unarchiveMessage(id: number) {
    await checkAuth()
    await db.update(messages).set({ isArchived: false }).where(eq(messages.id, id))
    return { success: true }
}

export async function deleteMessage(id: number) {
    await checkAuth()
    await db.delete(messages).where(eq(messages.id, id))
    return { success: true }
}

export async function getDashboardStats() {
    await checkAuth()

    const [totalResult] = await db.select({ count: count() }).from(messages)
    const [unreadResult] = await db
        .select({ count: count() })
        .from(messages)
        .where(and(eq(messages.isRead, false), eq(messages.isArchived, false)))
    const [archivedResult] = await db
        .select({ count: count() })
        .from(messages)
        .where(eq(messages.isArchived, true))

    return {
        total: totalResult?.count ?? 0,
        unread: unreadResult?.count ?? 0,
        archived: archivedResult?.count ?? 0,
        read: (totalResult?.count ?? 0) - (unreadResult?.count ?? 0) - (archivedResult?.count ?? 0),
    }
}
