"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { adminLogout } from "@/lib/admin-auth"
import { toast } from "sonner"
import { getProjects, deleteProject } from "@/app/actions/admin-projects"
import type { projects } from "@/lib/db/schema"
import Link from "next/link"

type Project = typeof projects.$inferSelect

export default function AdminProjects() {
    const [projectList, setProjectList] = useState<Project[]>([])
    const router = useRouter()

    const fetchData = async () => {
        const data = await getProjects()
        setProjectList(data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleDelete = async (id: number) => {
        if (!confirm("Bu projeyi silmek istediğinizden emin misiniz?")) return
        await deleteProject(id)
        await fetchData()
        toast.success("Proje silindi")
    }

    const handleLogout = async () => {
        await adminLogout()
        router.push("/admin/login")
    }

    return (
        <div className="p-8 bg-background min-h-screen text-foreground">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div className="flex items-center gap-6">
                    <h1 className="text-3xl font-bold">Admin Paneli</h1>
                    <div className="flex gap-4">
                        <button onClick={() => router.push("/admin")} className="text-muted-foreground hover:text-foreground font-semibold pb-1">
                            Mesajlar
                        </button>
                        <button className="text-neon-purple font-semibold border-b-2 border-neon-purple pb-1">
                            Projeler
                        </button>
                    </div>
                </div>
                <button onClick={handleLogout} className="rounded-lg bg-neon-purple px-4 py-2 font-mono text-sm font-semibold text-background hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                    Çıkış Yap
                </button>
            </div>

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Projeler</h2>
                <Link
                    href="/admin/projects/new"
                    className="rounded-lg bg-neon-green px-4 py-2 font-mono text-sm font-semibold text-background hover:shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                >
                    + Yeni Proje Ekle
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full table-auto border border-border">
                    <thead className="bg-muted">
                        <tr>
                            <th className="px-4 py-2 text-left">Sıra</th>
                            <th className="px-4 py-2 text-left">Başlık</th>
                            <th className="px-4 py-2 text-left">Slug</th>
                            <th className="px-4 py-2 text-left">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projectList.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="border px-4 py-8 text-center text-muted-foreground">
                                    Henüz proje eklenmemiş.
                                </td>
                            </tr>
                        ) : null}
                        {projectList.map((p) => (
                            <tr key={p.id} className="bg-card">
                                <td className="border px-4 py-2">{p.sortOrder}</td>
                                <td className="border px-4 py-2 font-semibold">{p.title}</td>
                                <td className="border px-4 py-2 text-muted-foreground">{p.slug}</td>
                                <td className="border px-4 py-2 space-x-2">
                                    <Link
                                        href={`/admin/projects/${p.id}`}
                                        className="inline-block rounded bg-neon-purple px-3 py-1 text-xs font-mono text-background hover:opacity-90"
                                    >
                                        Düzenle
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(p.id)}
                                        className="rounded bg-destructive px-3 py-1 text-xs font-mono text-background hover:opacity-90"
                                    >
                                        Sil
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
