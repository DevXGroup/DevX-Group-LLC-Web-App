import type { Metadata } from 'next'
import LegalAppAddendumLayout, {
  type LegalSection,
} from '@/components/legal/LegalAppAddendumLayout'
import { createOgImageUrl, createTwitterImageUrl, getSiteUrl } from '@/lib/og'

const siteUrl = getSiteUrl()
const pageUrl = `${siteUrl}/terms/nutrify-ai`

const ogImage = createOgImageUrl(
  {
    eyebrow: 'Nutrify.AI · Terms',
    title: 'Terms of Service — Nutrify.AI',
    subtitle: 'Subscription, health disclaimer, Apple-required terms',
    focus: ['Subscription', 'Health Disclaimer', 'Apple EULA', 'Limitation of Liability'],
  },
  siteUrl
)
const twitterImage = createTwitterImageUrl(
  {
    eyebrow: 'Nutrify.AI · Terms',
    title: 'Terms of Service — Nutrify.AI',
    subtitle: 'Subscription, health disclaimer, Apple-required terms',
    focus: ['Subscription', 'Health Disclaimer', 'Apple EULA', 'Limitation of Liability'],
  },
  siteUrl
)

export const metadata: Metadata = {
  title: 'Terms of Service — Nutrify.AI | DevX Group',
  description:
    'Subscription terms, auto-renewal disclosure, health-data disclaimer, and Apple-required terms for the Nutrify.AI iOS app.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Terms of Service — Nutrify.AI',
    description: 'Subscription, health disclaimer, Apple-required terms for Nutrify.AI.',
    url: pageUrl,
    siteName: 'DevX Group',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Nutrify.AI Terms of Service' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service — Nutrify.AI',
    description: 'Subscription, health disclaimer, Apple-required terms.',
    images: [twitterImage],
  },
}

const sections: LegalSection[] = [
  {
    id: 'acceptance',
    number: '1',
    title: 'Acceptance',
    paragraphs: [
      'By creating an account, signing in, or using Nutrify.AI ("the Service"), you agree to these Terms and to our Privacy Policy. If you do not agree, do not use the Service.',
    ],
  },
  {
    id: 'service',
    number: '2',
    title: 'The Service',
    paragraphs: [
      'Nutrify.AI is a personal nutrition, exercise, sleep, and lab-data assistant that uses third-party AI models to generate suggestions based on the data you log. The Service is NOT a medical device, NOT a substitute for professional medical advice, and any output should be reviewed with a licensed clinician before acting on it.',
    ],
  },
  {
    id: 'eligibility',
    number: '3',
    title: 'Eligibility',
    paragraphs: [
      'You must be at least 16 years old to use the Service (17+ where Apple’s App Store rating applies). You may not use the Service if you are barred from doing so under the laws of your jurisdiction.',
    ],
  },
  {
    id: 'accounts',
    number: '4',
    title: 'Accounts',
    paragraphs: [
      <>
        You are responsible for the security of your account credentials and for everything that
        happens under your account. Notify us at{' '}
        <a
          href="mailto:security@devxgroup.io"
          className="text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          security@devxgroup.io
        </a>{' '}
        immediately if you suspect unauthorized access.
      </>,
    ],
  },
  {
    id: 'subscription',
    number: '5',
    title: 'Subscription, billing, auto-renewal',
    paragraphs: [
      'Pro is a recurring subscription billed by Apple via the App Store (and, in future, by Google via Google Play). Pricing in USD: $9.99 / month or $69.99 / year (subject to local-store conversion).',
      'The 7-day free trial begins on first Pro purchase and converts automatically unless cancelled at least 24 hours before the trial ends. Subscriptions auto-renew at the end of each period unless cancelled in iOS Settings → Apple ID → Subscriptions.',
      'Refunds are handled exclusively by Apple under its published refund policy; we cannot issue refunds.',
    ],
  },
  {
    id: 'acceptable-use',
    number: '6',
    title: 'Acceptable use',
    paragraphs: ['You may not:'],
    bullets: [
      {
        body: 'Use the Service to seek emergency medical advice (call your local emergency number).',
      },
      {
        body: 'Use the Service to circumvent dietary or medication advice from a licensed clinician.',
      },
      {
        body: 'Reverse-engineer the app, the Edge Functions, or any anti-tamper measures, except as expressly permitted by mandatory local law.',
      },
      {
        body: "Send content that infringes on someone's IP, contains malware, harasses anyone, or is illegal.",
      },
      {
        body: "Probe or attack our infrastructure, attempt to extract other users' data, or bypass row-level security.",
      },
      {
        body: 'Use automated scripts to flood the Service or its AI providers ("rate-limit abuse").',
      },
    ],
  },
  {
    id: 'health-disclaimer',
    number: '7',
    title: 'Health-data disclaimer',
    paragraphs: ['You acknowledge that:'],
    bullets: [
      {
        body: 'The AI may produce inaccurate, incomplete, or contextually inappropriate advice. You will not rely on it for any medical decision.',
      },
      {
        body: 'Lab-document parsing is automated; a clinician must validate any extracted value before clinical use.',
      },
      {
        body: 'You will consult a doctor before changing diet, exercise, supplements, or medication.',
      },
    ],
  },
  {
    id: 'ip',
    number: '8',
    title: 'Intellectual property',
    paragraphs: [
      'You retain ownership of all data you log. You grant DevX Group a worldwide, royalty-free license to process that data only to operate, secure, and improve the Service for you, including transmitting bounded slices to AI providers under §4 of the Privacy Policy. We do not use your data to train models.',
      'The Service, the Nutrify.AI mark, and all software and content not provided by you are owned by DevX Group LLC and licensed (not sold) to you for personal, non-commercial use.',
    ],
  },
  {
    id: 'termination',
    number: '9',
    title: 'Termination',
    paragraphs: [
      'You may terminate at any time by deleting your account from inside the app. We may suspend or terminate your access if you breach these Terms, with or without notice depending on the severity. Upon termination your data is deleted under the schedule in Privacy §6.',
    ],
  },
  {
    id: 'disclaimers',
    number: '10',
    title: 'Disclaimers',
    paragraphs: [
      'THE SERVICE IS PROVIDED "AS IS", WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ACCURACY OF AI OUTPUT. We do not warrant that the Service will be uninterrupted or error-free.',
    ],
  },
  {
    id: 'liability',
    number: '11',
    title: 'Limitation of liability',
    paragraphs: [
      'To the maximum extent permitted by law, DEVX GROUP LLC, ITS DIRECTORS, EMPLOYEES, AND CONTRACTORS WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF DATA, PROFITS, OR REVENUE, ARISING FROM YOUR USE OF THE SERVICE. OUR TOTAL AGGREGATE LIABILITY WILL NOT EXCEED THE GREATER OF (A) FEES YOU PAID US IN THE 12 MONTHS BEFORE THE CLAIM, OR (B) USD $50.',
      'This limitation applies even if a remedy fails of its essential purpose. Some jurisdictions do not allow these exclusions; in those, the exclusions apply to the maximum extent permitted.',
    ],
  },
  {
    id: 'indemnity',
    number: '12',
    title: 'Indemnity',
    paragraphs: [
      "You agree to defend and indemnify DevX Group LLC against any claim arising from (a) your breach of these Terms, (b) your misuse of the Service, or (c) content you submit that infringes a third party's rights.",
    ],
  },
  {
    id: 'governing-law',
    number: '13',
    title: 'Governing law and disputes',
    paragraphs: [
      'These Terms are governed by the laws of the State of California, USA, without regard to conflict-of-laws rules. Disputes will be resolved by binding individual arbitration under the rules of the American Arbitration Association, except that either party may bring a small-claims action in its local court. Class actions and class arbitration are waived to the maximum extent permitted by law.',
      'EU/UK consumers retain mandatory rights to bring claims in their local courts under their national law; nothing in these Terms overrides those rights.',
    ],
  },
  {
    id: 'changes',
    number: '14',
    title: 'Changes to these Terms',
    paragraphs: [
      'We will notify you in-app before any material change takes effect. If you continue using the Service after the effective date, you accept the new Terms. If not, stop using the Service and delete your account.',
    ],
  },
  {
    id: 'apple',
    number: '15',
    title: 'Apple-specific terms',
    paragraphs: [
      'You acknowledge that these Terms are between you and DevX Group LLC, not Apple, and that Apple is not responsible for the Service or its content. Apple is, however, a third-party beneficiary of these Terms and may enforce them against you. Maintenance and support obligations are between you and DevX Group; if the Service fails any warranty, you may notify Apple, who will refund the purchase price (if applicable) and bear no further obligation.',
    ],
  },
  {
    id: 'contact',
    number: '16',
    title: 'Contact',
    paragraphs: [
      <>
        Legal questions:{' '}
        <a
          href="mailto:legal@devxgroup.io"
          className="text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          legal@devxgroup.io
        </a>
      </>,
      'DevX Group LLC, San Diego, California, USA',
    ],
  },
]

export default function NutrifyAiTermsPage() {
  return (
    <LegalAppAddendumLayout
      appName="Nutrify.AI"
      documentKind="Terms of Service"
      effectiveDate="May 1, 2026"
      lastUpdated="May 1, 2026"
      appHomeHref="/portfolio/nutrify-ai"
      corporatePolicyHref="/terms"
      siblingDocumentHref="/privacy/nutrify-ai"
      siblingDocumentLabel="Privacy Policy"
      contactEmail="legal@devxgroup.io"
      summary={
        <>
          Nutrify.AI Pro is a $9.99/month or $69.99/year auto-renewing subscription billed by Apple
          with a 7-day free trial. The app provides general wellness information, not medical
          advice. Apple handles all refunds. These Terms include an arbitration clause and a class
          waiver where permitted by law.
        </>
      }
      sections={sections}
    />
  )
}
