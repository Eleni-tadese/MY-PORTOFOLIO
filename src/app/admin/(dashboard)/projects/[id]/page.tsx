import { notFound } from "next/navigation";
import ProjectEditor from "@/components/admin/editors/ProjectEditor";
import { getAdminContent } from "../../../data";
import PageHeader from "../../PageHeader";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { content, problem } = await getAdminContent();
  const project = content.projects.find((p) => p.id === Number(id));
  if (!project) notFound();
  return (
    <>
      <PageHeader title={project.title} description="Edit details, screenshots and the case study." problem={problem} />
      <ProjectEditor key={project.id} project={project} />
    </>
  );
}
