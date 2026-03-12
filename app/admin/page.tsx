"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { adminLogout } from "@/lib/admin-auth"
import { toast } from "sonner"
import { getDashboardStats, getMessages, markAsRead, markAsUnread, archiveMessage, unarchiveMessage, deleteMessage } from "@/app/actions/admin"

interface Message {
    id: number
    name: string
    email: string
    subject: string
    message: string
    isRead: boolean
    isArchived: boolean
    createdAt: Date
}

export default function AdminDashboard() {
    const [messages, setMessages] = useState<Message[]>([])
    const [stats, setStats] = useState<{ total: number; unread: number; archived: number; read: number }>({ total: 0, unread: 0, archived: 0, read: 0 })
    const router = useRouter()

    const fetchData = async () => {
        const msgs = await getMessages()
        setMessages(msgs)
        const s = await getDashboardStats()
        setStats(s)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleMarkRead = async (id: number, read: boolean) => {
        if (read) await markAsUnread(id)
        else await markAsRead(id)
        await fetchData()
        toast.success(read ? "Okunmadı" : "Okundu")
    }

    const handleArchive = async (id: number, archived: boolean) => {
        if (archived) await unarchiveMessage(id)
        else await archiveMessage(id)
        await fetchData()
        toast.success(archived ? "Arşivden çıkarıldı" : "Arşive alındı")
    }

    const handleDelete = async (id: number) => {
        await deleteMessage(id)
        await fetchData()
        toast.success("Mesaj silindi")
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
                        <button className="text-neon-purple font-semibold border-b-2 border-neon-purple pb-1">
                            Mesajlar
                        </button>
                        <button onClick={() => router.push("/admin/projects")} className="text-muted-foreground hover:text-foreground font-semibold pb-1">
                            Projeler
                        </button>
                    </div>
                </div>
                <button onClick={handleLogout} className="rounded-lg bg-neon-purple px-4 py-2 font-mono text-sm font-semibold text-background hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                    Çıkış Yap
                </button>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="rounded-lg bg-card p-4 shadow">
                    <h2 className="text-lg font-medium">Toplam Mesaj</h2>
                    <p className="text-2xl font-bold text-neon-purple">{stats.total}</p>
                </div>
                <div className="rounded-lg bg-card p-4 shadow">
                    <h2 className="text-lg font-medium">Okunmamış</h2>
                    <p className="text-2xl font-bold text-neon-purple">{stats.unread}</p>
                </div>
                <div className="rounded-lg bg-card p-4 shadow">
                    <h2 className="text-lg font-medium">Arşivlenmiş</h2>
                    <p className="text-2xl font-bold text-neon-purple">{stats.archived}</p>
                </div>
            </div>
            <h2 className="mb-4 text-2xl font-semibold">Gelen Mesajlar</h2>
            <div className="overflow-x-auto">
                <table className="w-full table-auto border border-border">
                    <thead className="bg-muted">
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">İsim</th>
                            <th className="px-4 py-2">E-posta</th>
                            <th className="px-4 py-2">Konu</th>
                            <th className="px-4 py-2">Durum</th>
                            <th className="px-4 py-2">İşlemler</th>
                        </tr>
                    </thead>
                    <tbody>
                        {messages.map((msg) => (
                            <tr key={msg.id} className={msg.isRead ? "bg-background" : "bg-muted"}>
                                <td className="border px-4 py-2 text-center">{msg.id}</td>
                                <td className="border px-4 py-2">{msg.name}</td>
                                <td className="border px-4 py-2">{msg.email}</td>
                                <td className="border px-4 py-2">{msg.subject}</td>
                                <td className="border px-4 py-2 text-center">
                                    {msg.isRead ? "Okundu" : "Okunmadı"}
                                </td>
                                <td className="border px-4 py-2 space-x-2">
                                    <button onClick={() => handleMarkRead(msg.id, msg.isRead)} className="rounded bg-neon-purple px-2 py-1 text-xs font-mono text-background hover:opacity-90">
                                        {msg.isRead ? "Okunmadı işaretle" : "Okundu işaretle"}
                                    </button>
                                    <button onClick={() => handleArchive(msg.id, msg.isArchived)} className="rounded bg-neon-green px-2 py-1 text-xs font-mono text-background hover:opacity-90">
                                        {msg.isArchived ? "Arşivden çıkar" : "Arşive al"}
                                    </button>
                                    <button onClick={() => handleDelete(msg.id)} className="rounded bg-destructive px-2 py-1 text-xs font-mono text-background hover:opacity-90">
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
