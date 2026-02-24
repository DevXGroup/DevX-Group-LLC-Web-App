import type { MetadataRoute } from 'next'

import { getSiteUrl } from '@/lib/og'
import { portfolioProjects } from '@/data/portfolioProjects'

const staticRoutes = [
  // /home is the real content page; / is a JS-redirect splash (excluded from sitemap)
  { path: '/home', priority: 1.0, changeFrequency: 'daily' as const },
  { path: '/about', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/portfolio', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/pricing', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/contact', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
  { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl()
  const lastModified = new Date()

  const staticEntries = staticRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const portfolioEntries = portfolioProjects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.id}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticEntries, ...portfolioEntries]
}
