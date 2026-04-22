import { Metadata } from 'next'
import PortfolioPage from './PortfolioPage'
import { createOgImageUrl, createTwitterImageUrl, getSiteUrl } from '@/lib/og'
import StructuredData from '@/components/seo/StructuredData'
import { portfolioProjects } from '@/data/portfolioProjects'

// Force dynamic rendering to avoid Framer Motion context issues during static generation
export const dynamic = 'force-dynamic'

const siteUrl = getSiteUrl()
const pagePath = '/portfolio'
const pageUrl = `${siteUrl}${pagePath}`
const projectCount = portfolioProjects.length
const ogImage = createOgImageUrl(
  {
    eyebrow: 'Client Case Studies',
    title: 'High-impact Software & AI Delivery',
    subtitle: 'E-commerce • SaaS • AI Platforms • Mobile',
    focus: ['Product Engineering', 'AI Solutions', 'Experience Design', 'Cloud Ops'],
  },
  siteUrl
)
const twitterImage = createTwitterImageUrl(
  {
    eyebrow: 'Client Case Studies',
    title: 'High-impact Software & AI Delivery',
    subtitle: 'E-commerce • SaaS • AI Platforms • Mobile',
    focus: ['Product Engineering', 'AI Solutions', 'Experience Design', 'Cloud Ops'],
  },
  siteUrl
)

export const metadata: Metadata = {
  title: `Portfolio | ${projectCount} Shipped Software Projects | DevX Group`,
  description: `Real projects built by a senior San Diego software team. ${projectCount} shipped products across e-commerce, SaaS, AI tools, and mobile apps. Typical delivery in 4 to 16 weeks.`,
  keywords: [
    'software development portfolio',
    'case studies',
    'e-commerce platforms',
    'SaaS products',
    'mobile app projects',
    'AI tool case studies',
    'shipped software projects',
    'San Diego development team',
  ],
  openGraph: {
    title: `Portfolio | ${projectCount} Shipped Software Projects | DevX Group`,
    description: `Real projects built by a senior San Diego software team. ${projectCount} shipped products across e-commerce, SaaS, AI tools, and mobile apps.`,
    url: pageUrl,
    siteName: 'DevX Group',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'DevX Group Portfolio - Software Development Projects',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `Portfolio | ${projectCount} Shipped Projects | DevX Group`,
    description: `Real projects shipped by a senior San Diego team. E-commerce, SaaS, AI tools, and mobile apps.`,
    images: [twitterImage],
  },
  alternates: {
    canonical: pageUrl,
  },
}

export default function Portfolio() {
  return (
    <>
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: siteUrl },
          { name: 'Portfolio', url: pageUrl },
        ]}
      />
      <PortfolioPage />
    </>
  )
}
