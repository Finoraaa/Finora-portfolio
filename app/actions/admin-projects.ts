"use server"

import { db } from "@/lib/db"
import { projects } from "@/lib/db/schema"
import { eq, desc } from "drizzle-orm"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { revalidatePath, unstable_noStore as noStore } from "next/cache"

async function checkAuth() {
    const authed = await isAdminAuthenticated()
    if (!authed) throw new Error("Unauthorized")
}

export async function getProjects() {
    noStore()
    return db.select().from(projects).orderBy(projects.sortOrder)
}

export async function getProjectById(id: number) {
    const [project] = await db.select().from(projects).where(eq(projects.id, id))
    return project || null
}

export async function getProjectBySlug(slug: string) {
    const [project] = await db.select().from(projects).where(eq(projects.slug, slug))
    return project || null
}

export type InsertProjectParams = typeof projects.$inferInsert

export async function createProject(data: InsertProjectParams) {
    await checkAuth()
    const [newProject] = await db.insert(projects).values(data).returning()
    revalidatePath("/")
    revalidatePath("/admin/projects")
    return newProject
}

export async function updateProject(id: number, data: Partial<InsertProjectParams>) {
    await checkAuth()
    const [updated] = await db.update(projects).set(data).where(eq(projects.id, id)).returning()
    revalidatePath("/")
    revalidatePath("/admin/projects")
    if (updated) {
        revalidatePath(`/projects/${updated.slug}`)
    }
    return updated
}

export async function deleteProject(id: number) {
    await checkAuth()
    const [deleted] = await db.delete(projects).where(eq(projects.id, id)).returning()
    revalidatePath("/")
    revalidatePath("/admin/projects")
    if (deleted) {
        revalidatePath(`/projects/${deleted.slug}`)
    }
    return { success: true }
}
