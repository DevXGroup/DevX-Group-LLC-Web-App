import type { Metadata } from 'next'
import LegalAppAddendumLayout, {
  type LegalSection,
} from '@/components/legal/LegalAppAddendumLayout'
import { createOgImageUrl, createTwitterImageUrl, getSiteUrl } from '@/lib/og'

const siteUrl = getSiteUrl()
const pageUrl = `${siteUrl}/terms/transcribr`

const ogImage = createOgImageUrl(
  {
    eyebrow: 'Transcribr · License',
    title: 'License & Terms — Transcribr',
    subtitle: 'macOS app · standard EULA',
    focus: ['One-time License', 'No Warranty', 'Apple EULA', 'Local-Only Software'],
  },
  siteUrl
)
const twitterImage = createTwitterImageUrl(
  {
    eyebrow: 'Transcribr · License',
    title: 'License & Terms — Transcribr',
    subtitle: 'macOS app · standard EULA',
    focus: ['One-time License', 'No Warranty', 'Apple EULA', 'Local-Only Software'],
  },
  siteUrl
)

export const metadata: Metadata = {
  title: 'License & Terms — Transcribr | DevX Group',
  description:
    'License grant, warranty disclaimer, limitation of liability, and Apple-required EULA terms for the Transcribr macOS app.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'License & Terms — Transcribr',
    description: 'License grant, warranty disclaimer, Apple-required terms.',
    url: pageUrl,
    siteName: 'DevX Group',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Transcribr License & Terms' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'License & Terms — Transcribr',
    description: 'License grant, warranty disclaimer, Apple-required terms.',
    images: [twitterImage],
  },
}

const sections: LegalSection[] = [
  {
    id: 'acceptance',
    number: '1',
    title: 'Acceptance',
    paragraphs: [
      'By installing or using Transcribr ("the Software"), you agree to these Terms and to the Transcribr Privacy Policy. If you do not agree, do not install or use the Software.',
    ],
  },
  {
    id: 'license',
    number: '2',
    title: 'License grant',
    paragraphs: [
      'DevX Group LLC grants you a limited, non-exclusive, non-transferable, revocable license to install and use Transcribr on Macs you own or control, for your personal or internal business use, subject to these Terms and (where applicable) the Apple Licensed Application End User License Agreement.',
      'For Mac App Store distributions, the Apple-provided LAEULA at https://www.apple.com/legal/internet-services/itunes/dev/stdeula/ applies in addition to these Terms; if any provision conflicts, the LAEULA controls for App Store users.',
    ],
  },
  {
    id: 'restrictions',
    number: '3',
    title: 'Restrictions',
    paragraphs: ['You may not:'],
    bullets: [
      {
        body: 'Reverse-engineer, decompile, or disassemble the Software except as expressly permitted by mandatory local law.',
      },
      { body: 'Remove, alter, or obscure copyright, trademark, or other proprietary notices.' },
      { body: 'Distribute, sublicense, lend, lease, or rent copies of the Software.' },
      {
        body: 'Use the Software to violate the rights of third parties, including downloading copyrighted media you are not authorized to obtain.',
      },
      {
        body: 'Use the Software in any application where failure could result in death, personal injury, or severe physical or environmental damage.',
      },
    ],
  },
  {
    id: 'third-party',
    number: '4',
    title: 'Third-party components',
    paragraphs: [
      'Transcribr ships with the following third-party open-source components, each under its respective license: WhisperKit (MIT) for on-device speech recognition; optional integrations with OpenAI and Ollama operate under their own terms and are activated only by you. Use of yt-dlp (DMG distribution only) is governed by yt-dlp’s own license and the terms of any source platform you fetch media from. You are responsible for compliance.',
    ],
  },
  {
    id: 'no-medical-no-legal',
    number: '5',
    title: 'Not professional advice',
    paragraphs: [
      'Transcribr is a transcription tool. Transcripts may contain errors. Do not rely on Transcribr output for medical, legal, financial, regulatory, broadcast-captioning, or court-of-record purposes without independent human review.',
    ],
  },
  {
    id: 'updates',
    number: '6',
    title: 'Updates',
    paragraphs: [
      'We may release updates that fix bugs, improve performance, or add features. Updates are governed by these Terms unless an updated EULA accompanies the release.',
    ],
  },
  {
    id: 'termination',
    number: '7',
    title: 'Termination',
    paragraphs: [
      'These Terms remain in effect until terminated. Your rights terminate automatically if you breach these Terms. On termination you must uninstall the Software and remove all copies.',
    ],
  },
  {
    id: 'disclaimers',
    number: '8',
    title: 'Disclaimers',
    paragraphs: [
      'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND TRANSCRIPTION ACCURACY. We do not warrant that the Software will be uninterrupted, error-free, or compatible with any specific macOS version.',
    ],
  },
  {
    id: 'liability',
    number: '9',
    title: 'Limitation of liability',
    paragraphs: [
      'To the maximum extent permitted by law, DEVX GROUP LLC, ITS DIRECTORS, EMPLOYEES, AND CONTRACTORS WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF DATA, PROFITS, OR REVENUE, ARISING FROM YOUR USE OF THE SOFTWARE. OUR TOTAL AGGREGATE LIABILITY WILL NOT EXCEED THE GREATER OF (A) FEES YOU PAID US FOR THE SOFTWARE IN THE 12 MONTHS BEFORE THE CLAIM, OR (B) USD $50.',
    ],
  },
  {
    id: 'governing-law',
    number: '10',
    title: 'Governing law and disputes',
    paragraphs: [
      'These Terms are governed by the laws of the State of California, USA, without regard to conflict-of-laws rules. Disputes will be resolved by binding individual arbitration under the rules of the American Arbitration Association, except that either party may bring a small-claims action in its local court. Class actions and class arbitration are waived to the maximum extent permitted by law.',
      'EU/UK consumers retain mandatory rights to bring claims in their local courts under their national law; nothing in these Terms overrides those rights.',
    ],
  },
  {
    id: 'apple',
    number: '11',
    title: 'Apple-specific terms (Mac App Store distribution)',
    paragraphs: [
      'You acknowledge that these Terms are between you and DevX Group LLC, not Apple, and that Apple is not responsible for the Software or its content. Apple is a third-party beneficiary of these Terms and may enforce them against you. Maintenance and support obligations are between you and DevX Group; if the Software fails any warranty, you may notify Apple, who will refund the purchase price (if applicable) and bear no further obligation.',
    ],
  },
  {
    id: 'contact',
    number: '12',
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

export default function TranscribrTermsPage() {
  return (
    <LegalAppAddendumLayout
      appName="Transcribr"
      documentKind="License & Terms"
      effectiveDate="May 1, 2026"
      lastUpdated="May 1, 2026"
      appHomeHref="/portfolio"
      corporatePolicyHref="/terms"
      siblingDocumentHref="/privacy/transcribr"
      siblingDocumentLabel="Privacy Policy"
      contactEmail="legal@devxgroup.io"
      summary={
        <>
          Transcribr is a macOS app provided under a standard end-user license. The Software is
          provided "as is", with no warranty, including no warranty of transcription accuracy. Mac
          App Store users are also bound by the Apple LAEULA. Don’t reverse-engineer, don’t
          redistribute, don’t use it to violate someone else’s rights, and don’t sue us for $80
          worth of consequential damages.
        </>
      }
      sections={sections}
    />
  )
}
