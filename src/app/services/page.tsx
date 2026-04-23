import { Metadata } from 'next'
import ServicesPage from './ServicesPage'
import { createOgImageUrl, createTwitterImageUrl, getSiteUrl } from '@/lib/og'
import StructuredData from '@/components/seo/StructuredData'

// Force dynamic rendering to avoid Framer Motion context issues during static generation
export const dynamic = 'force-dynamic'

const siteUrl = getSiteUrl()
const pagePath = '/services'
const pageUrl = `${siteUrl}${pagePath}`
const ogImage = createOgImageUrl(
  {
    eyebrow: 'Services',
    title: 'Software Development & Agentic AI Services',
    subtitle: 'Custom Apps • Mobile • IoT • Automation',
    focus: ['Product Engineering', 'Agentic AI', 'RAG Systems', 'IoT & Cloud'],
  },
  siteUrl
)
const twitterImage = createTwitterImageUrl(
  {
    eyebrow: 'Services',
    title: 'Software Development & Agentic AI Services',
    subtitle: 'Custom Apps • Mobile • IoT • Automation',
    focus: ['Product Engineering', 'Agentic AI', 'RAG Systems', 'IoT & Cloud'],
  },
  siteUrl
)

export const metadata: Metadata = {
  title: 'Custom Software Development Services | Web, Mobile, AI Agents | DevX Group',
  description:
    'Senior team shipping custom web apps, native iOS and Android apps, AI agents, RAG systems, and cloud platforms. Based in San Diego, working with startups and enterprise.',
  keywords: [
    'custom software development',
    'web application development',
    'mobile app development',
    'AI agents',
    'RAG systems',
    'workflow automation',
    'IoT integration',
    'cloud platforms',
    'San Diego software team',
    'product engineering',
  ],
  openGraph: {
    title: 'Custom Software Development Services | Web, Mobile, AI Agents | DevX Group',
    description:
      'Senior team building custom web apps, native mobile apps, AI agents, and cloud platforms. Based in San Diego.',
    url: pageUrl,
    siteName: 'DevX Group',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'DevX Group Software Development Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Custom Software Development Services | DevX Group',
    description:
      'Senior team building web apps, mobile apps, AI agents, and cloud platforms. Based in San Diego.',
    images: [twitterImage],
  },
  alternates: {
    canonical: pageUrl,
  },
}

export default function Services() {
  return (
    <>
      <StructuredData
        type="breadcrumb"
        breadcrumbs={[
          { name: 'Home', url: siteUrl },
          { name: 'Services', url: pageUrl },
        ]}
      />
      <ServicesPage />
    </>
  )
}
