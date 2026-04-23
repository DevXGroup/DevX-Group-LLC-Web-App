import { Metadata } from 'next'
import HomePageClient from './HomePageClient'
import { createOgImageUrl, createTwitterImageUrl, getSiteUrl } from '@/lib/og'

// Force dynamic rendering to avoid Framer Motion context issues during static generation
export const dynamic = 'force-dynamic'

const siteUrl = getSiteUrl()
const pagePath = '/home'
const pageUrl = `${siteUrl}${pagePath}`
const ogImage = createOgImageUrl(
  {
    eyebrow: 'Senior Software Team',
    title: 'Your Vision, Engineered.',
    subtitle: 'Web • Mobile • AI Projects Shipped Fast',
    focus: ['Fast Delivery', 'Proven Record', 'Transparent Pricing'],
  },
  siteUrl
)
const twitterImage = createTwitterImageUrl(
  {
    eyebrow: 'Senior Software Team',
    title: 'Your Vision, Engineered.',
    subtitle: 'Web • Mobile • AI Projects Shipped Fast',
    focus: ['Fast Delivery', 'Proven Record', 'Transparent Pricing'],
  },
  siteUrl
)

export const metadata: Metadata = {
  title: 'DevX Group | San Diego Software Team for Web, Mobile, and AI Products',
  description:
    'San Diego software team building production web apps, iOS and Android apps, and AI agents. Senior engineers, transparent pricing, delivery in 4 to 12 weeks.',
  keywords: [
    'San Diego software development',
    'senior software team',
    'web app development',
    'mobile app development',
    'AI agents',
    'RAG systems',
    'custom software',
    'MVP development',
    'product engineering',
    'startup development partner',
  ],
  openGraph: {
    title: 'DevX Group | San Diego Software Team for Web, Mobile, and AI Products',
    description:
      'San Diego software team building production web apps, mobile apps, and AI agents. Senior engineers and transparent pricing with delivery in 4 to 12 weeks.',
    url: pageUrl,
    siteName: 'DevX Group',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'DevX Group - Your Vision, Engineered',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevX Group | San Diego Software Team',
    description:
      'Senior team building web, mobile, and AI products. Transparent pricing, delivery in 4 to 12 weeks.',
    images: [twitterImage],
  },
  alternates: {
    canonical: pageUrl,
  },
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'DevX Group',
  url: siteUrl,
  logo: `${siteUrl}/devxgroup-logo.svg`,
  description:
    'Senior software team shipping high-impact web, mobile, and AI projects fast. AI automation, agentic AI solutions, rapid MVP launches, and stunning UI/UX.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'San Diego',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-442-544-0591',
    contactType: 'customer service',
  },
  sameAs: ['https://github.com/DevXGroup'],
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      {/* SEO Content - Server-rendered for crawlers */}
      <div className="sr-only">
        <h1>DevX Group - Your Vision, Engineered</h1>
        <p>
          Senior software team shipping high-impact web, mobile, and AI projects fast. Fast
          delivery, proven record, and transparent pricing. We engineer your vision into reality
          with our expert team in San Diego.
        </p>
        <h2>Our Services</h2>
        <ul>
          <li>AI Automation</li>
          <li>Agentic AI Solutions</li>
          <li>Rapid MVP Launches</li>
          <li>Stunning UI/UX Design</li>
          <li>RAG Systems</li>
          <li>Intelligent Workflows</li>
          <li>Mobile App Development</li>
          <li>Web Development</li>
        </ul>
        <h2>Why Choose DevX Group</h2>
        <p>
          With 15+ years of experience at companies like Amazon, Qualcomm, and Viasat, our senior
          team delivers high-impact projects fast. We combine deep engineering expertise with
          collaborative leadership to turn your vision into reality.
        </p>
      </div>

      <HomePageClient />
    </>
  )
}
