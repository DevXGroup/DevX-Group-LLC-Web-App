import type { Metadata } from 'next'
import LegalAppAddendumLayout, {
  type LegalSection,
} from '@/components/legal/LegalAppAddendumLayout'
import { createOgImageUrl, createTwitterImageUrl, getSiteUrl } from '@/lib/og'

const siteUrl = getSiteUrl()
const pageUrl = `${siteUrl}/privacy/nutrify-ai`

const ogImage = createOgImageUrl(
  {
    eyebrow: 'Nutrify.AI · Privacy',
    title: 'Privacy Policy — Nutrify.AI',
    subtitle: 'Per-app addendum to DevX Group privacy',
    focus: ['Health Data', 'AI Processors', 'GDPR / CCPA', 'No Tracking'],
  },
  siteUrl
)
const twitterImage = createTwitterImageUrl(
  {
    eyebrow: 'Nutrify.AI · Privacy',
    title: 'Privacy Policy — Nutrify.AI',
    subtitle: 'Per-app addendum to DevX Group privacy',
    focus: ['Health Data', 'AI Processors', 'GDPR / CCPA', 'No Tracking'],
  },
  siteUrl
)

export const metadata: Metadata = {
  title: 'Privacy Policy — Nutrify.AI | DevX Group',
  description:
    'How Nutrify.AI collects, uses, stores, and protects your health, nutrition, and lab data. The per-app addendum to the DevX Group corporate privacy policy.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Privacy Policy — Nutrify.AI',
    description:
      'How Nutrify.AI handles health, nutrition, and lab data. AI processors, retention, deletion, your rights.',
    url: pageUrl,
    siteName: 'DevX Group',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Nutrify.AI Privacy Policy' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — Nutrify.AI',
    description: 'How Nutrify.AI handles health, nutrition, and lab data.',
    images: [twitterImage],
  },
}

const sections: LegalSection[] = [
  {
    id: 'summary',
    number: '1',
    title: 'Plain-language summary',
    paragraphs: [
      'Nutrify.AI is a personal nutrition, exercise, sleep, and lab-data assistant. We collect what you tell us and what you log, store it in your account, and send a bounded slice to third-party AI providers when you ask the AI for help. We do not sell your data and do not use it to train third-party models. You can delete everything from inside the app at any time.',
    ],
  },
  {
    id: 'collected',
    number: '2',
    title: 'What we collect',
    table: {
      headers: ['Category', 'Examples', 'Source'],
      rows: [
        [
          <strong key="a">Account identifiers</strong>,
          'Email, Apple/Google sign-in subject ID, Supabase user ID',
          'You, when you sign up',
        ],
        [
          <strong key="b">Profile</strong>,
          'Name, age, sex, height, weight, goals, dietary preferences, activity level',
          'You, during onboarding & in Settings',
        ],
        [
          <strong key="c">Health logs</strong>,
          'Meals (text + photos), workouts (sets, reps, weight, RPE, duration, extras), sleep (duration, quality, factors), supplements, body weight history',
          'You, in the app',
        ],
        [
          <strong key="d">Lab results</strong>,
          'PDF/image uploads of blood work + structured analyte values extracted by AI OCR',
          'You, when you upload',
        ],
        [
          <strong key="e">Personal Notes / Journal</strong>,
          'Free-form text, biomarkers, symptoms, mood entries you type into the Journal',
          'You',
        ],
        [
          <strong key="f">Subscription state</strong>,
          'Active / inactive Pro tier, RevenueCat anonymous user ID',
          'RevenueCat (our payments processor)',
        ],
        [<strong key="g">Diagnostics</strong>, 'Crash logs, error stack traces (no PII)', 'Sentry'],
        [
          <strong key="h">Local-only signals</strong>,
          'Streak counts, app preferences, cached AI responses',
          'On-device only (SharedPreferences)',
        ],
      ],
    },
    paragraphs: [
      <span key="not-collected">
        <strong>We do NOT collect:</strong> precise location, contacts, browsing history outside the
        app, microphone audio (speech-to-text converts voice to text on-device or via Apple
        SpeechFramework before any text leaves your device), Apple HealthKit data (not yet
        integrated), social-graph data.
      </span>,
    ],
  },
  {
    id: 'how-we-use',
    number: '3',
    title: 'How we use your data',
    table: {
      headers: ['Purpose', 'Lawful basis (GDPR)', 'Data used'],
      rows: [
        [
          'Provide the core service — log, chart, summarize your health data',
          'Contract performance',
          'All health logs, profile',
        ],
        [
          'Generate personalized AI recommendations (chat, daily actions, meal plans, sleep insights, supplement advice, workout plans, lab summaries)',
          'Contract performance',
          'A bounded user-context slice + your prompt; sent to Gemini (Google) and, on quota failover, Anthropic Claude',
        ],
        [
          'Extract structured analyte values from lab PDFs/images',
          'Contract performance',
          'Uploaded file; sent to Gemini',
        ],
        [
          'Bill subscriptions',
          'Contract performance',
          'Apple/Google receipt (handled by Apple StoreKit + RevenueCat)',
        ],
        [
          'Detect, fix, and prevent crashes',
          'Legitimate interest',
          'Stack traces, device model, OS version',
        ],
        [
          'Comply with App Store, GDPR, CCPA, and applicable consumer-protection law',
          'Legal obligation',
          'Whatever the law requires',
        ],
      ],
    },
    paragraphs: [
      <span key="never">
        <strong>We do NOT use your data for:</strong> advertising, behavioral profiling outside the
        app, model training (third-party or our own), sale to data brokers.
      </span>,
    ],
  },
  {
    id: 'processors',
    number: '4',
    title: 'Third-party processors',
    paragraphs: [
      'We share data only with the processors strictly required to operate the app, each under a written data-processing agreement.',
    ],
    table: {
      headers: ['Processor', 'Role', 'Data sent'],
      rows: [
        [
          'Supabase Inc.',
          'Authentication, database, file storage (US)',
          'Account + health data + lab files',
        ],
        [
          'Google LLC (Gemini API)',
          'LLM inference, embeddings, OCR (US)',
          'Per-request user-context slice + prompt',
        ],
        [
          'Anthropic, PBC (Claude API)',
          'LLM inference fallback when Gemini is rate-limited (US)',
          'Same per-request slice as Gemini',
        ],
        [
          'Apple Inc.',
          'App Store sign-in, push notifications, StoreKit',
          'Apple-managed identifiers',
        ],
        ['Google LLC (Sign-in with Google)', 'OAuth sign-in (US)', 'Google account ID, email'],
        [
          'RevenueCat Inc.',
          'Subscription management abstraction (US)',
          'Anonymous user ID, Apple/Google receipt',
        ],
        [
          'Functional Software, Inc. (Sentry)',
          'Crash + error reporting (US)',
          'Stack traces, device model, app version',
        ],
        ['DevX Group LLC', 'Operator (us, US)', 'All of the above, scoped to your account'],
      ],
    },
  },
  {
    id: 'storage',
    number: '5',
    title: 'Where your data is stored',
    paragraphs: [
      'Primary storage is Supabase US-East. Processing for AI inference happens on the AI vendor’s infrastructure (Google US, Anthropic US). Crash diagnostics live on Sentry US. By using Nutrify.AI you consent to international transfer of your data, including, where applicable, transfer outside the European Economic Area, the United Kingdom, or other jurisdictions, under the EU Standard Contractual Clauses or equivalent legal mechanism.',
    ],
  },
  {
    id: 'retention',
    number: '6',
    title: 'How long we keep your data',
    table: {
      headers: ['Data', 'Retention'],
      rows: [
        [
          'Account + all health logs + journal + lab files',
          'Until you delete your account (hard-delete with 14-day grace window)',
        ],
        [
          'AI inference logs at vendors',
          'Per vendor terms (Google ≤ 24h abuse-monitoring; Anthropic ≤ 30d enterprise; neither uses your data to train models)',
        ],
        ['Backups', 'Supabase point-in-time recovery up to 7 days'],
        ['Crash diagnostics', '90 days at Sentry, then auto-deleted'],
        ['Subscription receipts', '7 years (tax/audit obligation)'],
      ],
    },
  },
  {
    id: 'rights',
    number: '7',
    title: 'Your rights',
    paragraphs: ['Regardless of jurisdiction, you can:'],
    bullets: [
      {
        label: 'Export',
        body: 'Settings → Account → "Export My Data" (CSV bundle of every table; planned for build 24)',
      },
      {
        label: 'Correct',
        body: 'Edit any log directly in the app; the underlying row updates immediately',
      },
      {
        label: 'Delete',
        body: 'Settings → Account → "Delete Account" — hard-deletes your row in auth.users and cascade-deletes every child table within minutes',
      },
      {
        label: 'Object / restrict / portability',
        body: (
          <>
            Email{' '}
            <a
              href="mailto:privacy@devxgroup.io"
              className="text-emerald-400 hover:text-emerald-300"
            >
              privacy@devxgroup.io
            </a>
          </>
        ),
      },
      { label: 'Opt out of sale', body: 'We do not sell. There is nothing to opt out of.' },
      {
        label: "Children's data",
        body: 'Nutrify.AI is not directed to children under 16. We do not knowingly collect data from anyone under 16.',
      },
    ],
    trailing: (
      <p className="text-slate-300/90 leading-relaxed">
        If you live in the EEA, UK, or Switzerland, you may also lodge a complaint with your
        national data-protection authority.
      </p>
    ),
  },
  {
    id: 'security',
    number: '8',
    title: 'Security',
    paragraphs: [
      'In transit: TLS 1.2+ on every API call. Authentication: Supabase Auth + Apple/Google OAuth + Sign-in-with-Apple. Authorization: Postgres row-level security — every read/write is scoped to your auth.uid(); enforced in the database, not the application. Storage: Apple-managed iCloud-encrypted on device; Supabase-managed AES-256 encryption at rest. API secrets: never embedded in the app binary; all AI keys live server-side in Supabase Edge Function environment variables.',
      'We are a small team. We will not promise SOC 2 today; we will tell you the truth: we follow the practices SOC 2 demands (least-privilege access, encrypted at rest and in transit, audit logs, password rotation, deny-by-default RLS) but we are not externally audited yet.',
    ],
  },
  {
    id: 'health-disclaimer',
    number: '9',
    title: 'Health-data disclaimer',
    paragraphs: [
      'Nutrify.AI is NOT a medical device. The advice, summaries, and recommendations the app produces are general wellness information, not medical diagnosis or treatment. Always consult a licensed clinician before changing your diet, exercise, supplementation, or medication.',
    ],
  },
  {
    id: 'children',
    number: '10',
    title: 'Children and parental control',
    paragraphs: [
      'The app is rated 17+ on the App Store given the unrestricted scope of AI conversations on health topics. We do not market to children and do not collect data from anyone under 16.',
    ],
  },
  {
    id: 'changes',
    number: '11',
    title: 'Changes to this policy',
    paragraphs: [
      'If we materially change how we collect or use data, we will (a) update this page, (b) bump the "Last updated" date, and (c) on your next app launch, surface a non-dismissable banner explaining the change before you can continue. Non-material clarifications update silently.',
    ],
  },
  {
    id: 'contact',
    number: '12',
    title: 'Contact',
    paragraphs: [
      <>
        Privacy questions:{' '}
        <a
          href="mailto:privacy@devxgroup.io"
          className="text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          privacy@devxgroup.io
        </a>{' '}
        — typical response within 5 business days.
      </>,
      'DevX Group LLC, San Diego, California, USA',
    ],
  },
]

export default function NutrifyAiPrivacyPage() {
  return (
    <LegalAppAddendumLayout
      appName="Nutrify.AI"
      documentKind="Privacy Policy"
      effectiveDate="May 1, 2026"
      lastUpdated="May 1, 2026"
      appHomeHref="/portfolio/nutrify-ai"
      corporatePolicyHref="/privacy"
      siblingDocumentHref="/terms/nutrify-ai"
      siblingDocumentLabel="Terms of Service"
      contactEmail="privacy@devxgroup.io"
      summary={
        <>
          Nutrify.AI logs only what you tell it: meals, workouts, sleep, labs, weight, journal
          entries. A bounded slice of that goes to Google Gemini or Anthropic Claude only when you
          ask the AI for help. We never use your data to train third-party models. Delete your
          account from inside the app and everything is gone within minutes.
        </>
      }
      sections={sections}
    />
  )
}
