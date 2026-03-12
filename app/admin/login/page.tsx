"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { adminLogin } from "@/lib/admin-auth"
import { toast } from "sonner"

export default function AdminLoginPage() {
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        const result = await adminLogin(password)
        setLoading(false)
        if (result.success) {
            toast.success("Giriş başarılı!")
            const redirect = new URLSearchParams(window.location.search).get("redirect")
            router.push(redirect || "/admin")
        } else {
            toast.error(result.error || "Giriş başarısız")
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-lg"
            >
                <h2 className="mb-6 text-center text-2xl font-bold text-foreground">
                    Admin Girişi
                </h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-muted-foreground">
                        Şifre
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder-muted-foreground/50 focus:border-neon-purple focus:outline-none focus:ring-1 focus:ring-neon-purple"
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-neon-purple px-4 py-2 font-mono text-sm font-semibold text-background transition-all hover:shadow-[0_0_25px_rgba(168,85,247,0.4),0_0_50px_rgba(168,85,247,0.15)] disabled:opacity-70"
                >
                    {loading ? "Giriş yapılıyor..." : "Giriş"}
                </button>
            </form>
        </div>
    )
}
