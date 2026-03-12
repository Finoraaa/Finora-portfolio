"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createProject, updateProject, type InsertProjectParams } from "@/app/actions/admin-projects"
import { toast } from "sonner"
import type { projects } from "@/lib/db/schema"
import Link from "next/link"

type Project = typeof projects.$inferSelect

export function ProjectForm({ initialData }: { initialData?: Project }) {
    const router = useRouter()
    const isEdit = !!initialData
    
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<InsertProjectParams>({
        slug: initialData?.slug || "",
        title: initialData?.title || "",
        link: initialData?.link || "",
        descriptionEn: initialData?.descriptionEn || "",
        descriptionTr: initialData?.descriptionTr || "",
        challengeEn: initialData?.challengeEn || "",
        challengeTr: initialData?.challengeTr || "",
        solutionEn: initialData?.solutionEn || "",
        solutionTr: initialData?.solutionTr || "",
        featuresEn: initialData?.featuresEn || [],
        featuresTr: initialData?.featuresTr || [],
        tags: initialData?.tags || [],
        sortOrder: initialData?.sortOrder || 0
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: keyof InsertProjectParams) => {
        const val = e.target.value.split(",").map(s => s.trim()).filter(Boolean)
        setFormData(prev => ({ ...prev, [fieldName]: val }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (isEdit) {
                await updateProject(initialData!.id, formData)
                toast.success("Proje güncellendi!")
            } else {
                await createProject(formData)
                toast.success("Proje eklendi!")
                router.push("/admin/projects")
            }
        } catch (error) {
            console.error(error)
            toast.error("Bir hata oluştu. Slug benzersiz olmayabilir.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-6 border-b border-border pb-4">
                <h2 className="text-xl font-bold">{isEdit ? "Projeyi Düzenle" : "Yeni Proje"}</h2>
                <Link href="/admin/projects" className="text-sm text-muted-foreground hover:text-foreground">
                    İptal / Geri Dön
                </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold mb-2">Başlık</label>
                    <input required name="title" value={formData.title} onChange={handleChange} className="w-full rounded border bg-background px-4 py-2" placeholder="My Awesome Project" />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2">Slug (URL)</label>
                    <input required name="slug" value={formData.slug} onChange={handleChange} className="w-full rounded border bg-background px-4 py-2" placeholder="my-awesome-project" />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2">Dış Link (İsteğe bağlı)</label>
                    <input name="link" value={formData.link || ""} onChange={handleChange} className="w-full rounded border bg-background px-4 py-2" placeholder="https://example.com" />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2">Sıra (Sort Order)</label>
                    <input type="number" required name="sortOrder" value={formData.sortOrder} onChange={e => setFormData(prev => ({...prev, sortOrder: parseInt(e.target.value)}))} className="w-full rounded border bg-background px-4 py-2" />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">Etiketler (Tags - Virgülle ayırın)</label>
                    <input required type="text" value={formData.tags.join(", ")} onChange={e => handleArrayChange(e, 'tags')} className="w-full rounded border bg-background px-4 py-2" placeholder="React, Node.js, AI" />
                </div>

                <div className="md:col-span-2 border-t border-border pt-4 mt-2">
                    <h3 className="text-lg font-bold text-neon-purple mb-4">Kart Metinleri (Kısa)</h3>
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2">Kısa Açıklama (TR)</label>
                    <textarea required rows={3} name="descriptionTr" value={formData.descriptionTr} onChange={handleChange} className="w-full rounded border bg-background px-4 py-2" />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2">Kısa Açıklama (EN)</label>
                    <textarea required rows={3} name="descriptionEn" value={formData.descriptionEn} onChange={handleChange} className="w-full rounded border bg-background px-4 py-2" />
                </div>

                <div className="md:col-span-2 border-t border-border pt-4 mt-2">
                    <h3 className="text-lg font-bold text-neon-green mb-4">Detay Sayfası Metinleri (Uzun)</h3>
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2">Zorluk / Hikaye (TR)</label>
                    <textarea required rows={4} name="challengeTr" value={formData.challengeTr} onChange={handleChange} className="w-full rounded border bg-background px-4 py-2" />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2">Zorluk / Hikaye (EN)</label>
                    <textarea required rows={4} name="challengeEn" value={formData.challengeEn} onChange={handleChange} className="w-full rounded border bg-background px-4 py-2" />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2">Çözüm (TR)</label>
                    <textarea required rows={4} name="solutionTr" value={formData.solutionTr} onChange={handleChange} className="w-full rounded border bg-background px-4 py-2" />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2">Çözüm (EN)</label>
                    <textarea required rows={4} name="solutionEn" value={formData.solutionEn} onChange={handleChange} className="w-full rounded border bg-background px-4 py-2" />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-2">Özellikler (TR - Virgülle ayırın)</label>
                    <input required type="text" value={formData.featuresTr.join(", ")} onChange={e => handleArrayChange(e, 'featuresTr')} className="w-full rounded border bg-background px-4 py-2" placeholder="Özellik 1, Özellik 2" />
                </div>
                <div>
                    <label className="block text-sm font-semibold mb-2">Özellikler (EN - Virgülle ayırın)</label>
                    <input required type="text" value={formData.featuresEn.join(", ")} onChange={e => handleArrayChange(e, 'featuresEn')} className="w-full rounded border bg-background px-4 py-2" placeholder="Feature 1, Feature 2" />
                </div>

            </div>
            
            <div className="pt-6">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-neon-purple py-3 font-mono font-bold text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                    {loading ? "Kaydediliyor..." : "Kaydet"}
                </button>
            </div>
        </form>
    )
}
