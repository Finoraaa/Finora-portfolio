import { getProjectBySlug } from "@/app/actions/admin-projects"
import { notFound } from "next/navigation"
import ProjectDetailView from "./ProjectDetailView"

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params
    const project = await getProjectBySlug(resolvedParams.slug)

    if (!project) {
        notFound()
    }

    return <ProjectDetailView project={project} />
}
