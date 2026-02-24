import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { portfolioProjects } from '@/data/portfolioProjects'
import ProjectPage from './ProjectPage'

export async function generateStaticParams() {
  return portfolioProjects.map((p) => ({ 'project-id': p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ 'project-id': string }>
}): Promise<Metadata> {
  const resolvedParams = await params
  const project = portfolioProjects.find((p) => p.id === resolvedParams['project-id'])
  if (!project) return {}
  return {
    title: `${project.title} | DevX Group Portfolio`,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [{ url: project.images.banner }],
      url: `/portfolio/${project.id}`,
    },
  }
}

export default async function Page({ params }: { params: Promise<{ 'project-id': string }> }) {
  const resolvedParams = await params
  const project = portfolioProjects.find((p) => p.id === resolvedParams['project-id'])
  if (!project) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.detailedDescription,
    url: project.visitUrl ?? project.githubUrl,
    applicationCategory: project.category,
    operatingSystem: project.platforms.join(', '),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectPage project={project} />
    </>
  )
}
