import { ProjectForm } from "@/components/admin/ProjectForm"
import { getProjectById } from "@/app/actions/admin-projects"
import { notFound } from "next/navigation"

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params
    const id = parseInt(resolvedParams.id)
    if (isNaN(id)) return notFound()

    const project = await getProjectById(id)
    if (!project) return notFound()

    return (
        <div className="p-8 bg-background min-h-screen">
            <ProjectForm initialData={project} />
        </div>
    )
}
