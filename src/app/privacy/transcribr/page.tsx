import type { Metadata } from 'next'
import LegalAppAddendumLayout, {
  type LegalSection,
} from '@/components/legal/LegalAppAddendumLayout'
import { createOgImageUrl, createTwitterImageUrl, getSiteUrl } from '@/lib/og'

const siteUrl = getSiteUrl()
const pageUrl = `${siteUrl}/privacy/transcribr`

const ogImage = createOgImageUrl(
  {
    eyebrow: 'Transcribr · Privacy',
    title: 'Privacy Policy — Transcribr',
    subtitle: '100% local. Audio never leaves your Mac.',
    focus: ['Local Processing', 'No Backend', 'No Telemetry', 'On-Device AI'],
  },
  siteUrl
)
const twitterImage = createTwitterImageUrl(
  {
    eyebrow: 'Transcribr · Privacy',
    title: 'Privacy Policy — Transcribr',
    subtitle: '100% local. Audio never leaves your Mac.',
    focus: ['Local Processing', 'No Backend', 'No Telemetry', 'On-Device AI'],
  },
  siteUrl
)

export const metadata: Metadata = {
  title: 'Privacy Policy — Transcribr | DevX Group',
  description:
    'How Transcribr handles your audio: 100% on-device transcription via WhisperKit. No backend, no telemetry, no analytics. Optional integrations explained.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Privacy Policy — Transcribr',
    description:
      '100% local audio transcription on macOS. No backend, no telemetry. The per-app addendum to the DevX Group corporate privacy policy.',
    url: pageUrl,
    siteName: 'DevX Group',
    images: [{ url: ogImage, width: 1200, height: 630, alt: 'Transcribr Privacy Policy' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy — Transcribr',
    description: '100% local audio transcription on macOS. No backend, no telemetry.',
    images: [twitterImage],
  },
}

const sections: LegalSection[] = [
  {
    id: 'summary',
    number: '1',
    title: 'Summary',
    paragraphs: [
      'Transcribr is a native macOS application that turns audio and video into text on your Mac. This addendum explains what Transcribr does — and just as importantly, what it does not do — with your data.',
    ],
    bullets: [
      { body: 'Transcribr does not have a backend. There is no Transcribr server.' },
      { body: 'Audio you record or transcribe stays on your Mac.' },
      {
        body: 'Transcribr does not collect, store, sell, or share your transcripts, audio recordings, or usage data.',
      },
      {
        body: 'Transcribr does not include analytics, telemetry, crash reporting, or advertising SDKs.',
      },
      {
        body: 'The only network requests Transcribr can initiate on your behalf are those you explicitly enable (see §3).',
      },
    ],
  },
  {
    id: 'local-processing',
    number: '2',
    title: 'What Transcribr processes locally',
    paragraphs: [
      'To do its job, Transcribr reads and processes the following data on your Mac. None of it is transmitted off your Mac unless you opt in.',
    ],
    table: {
      headers: ['Data', 'Purpose', 'Storage'],
      rows: [
        [
          'Audio captured from the microphone',
          'Real-time and post-recording transcription',
          'In-memory and temporary files on disk; cleaned up after use unless you save to the recording library',
        ],
        [
          'Audio/video files you drop into the app or select',
          'File transcription',
          'Read from the location you chose; not copied unless you save to the library',
        ],
        [
          'Transcripts',
          'Display, copy, and export',
          "Stored locally in the app's data directory and any export location you choose",
        ],
        ['Saved recordings', 'Library replay and re-transcription', 'Local app storage only'],
        [
          'Whisper model files',
          'Local speech recognition',
          'Cached in the WhisperKit model directory inside the app sandbox',
        ],
        [
          'API keys (OpenAI)',
          'Optional cleanup integration',
          'Stored in the macOS Keychain; never written in plain text',
        ],
        [
          'App preferences (selected model, language, hotkey, etc.)',
          'Restore your settings between launches',
          'macOS user defaults',
        ],
      ],
    },
  },
  {
    id: 'permissions',
    number: '3',
    title: 'Permissions Transcribr requests',
    table: {
      headers: ['Permission', 'Why'],
      rows: [
        ['Microphone', 'Required for live recording and global hold-to-talk dictation.'],
        [
          'Input Monitoring',
          'Required to detect the global hold-to-talk shortcut while you use other apps.',
        ],
        [
          'Accessibility',
          'Required so Transcribr can paste the transcribed text into the frontmost app and, where macOS allows, suppress the shortcut key from leaking into focused text fields.',
        ],
        [
          'User-selected file read/write',
          'Required to read media files you drop or pick, and to save exports where you choose.',
        ],
        [
          'Network (client)',
          'Used only for Whisper model downloads from Hugging Face on first use of a given model and for the optional integrations below.',
        ],
      ],
    },
    paragraphs: [
      'You can revoke any permission at any time in System Settings → Privacy & Security.',
    ],
  },
  {
    id: 'network',
    number: '4',
    title: 'Network use',
    paragraphs: ['Transcribr only makes outbound network requests in the following situations:'],
    bullets: [
      {
        label: 'WhisperKit',
        body: "The first time you use a given Whisper model size, the app downloads the model files from Hugging Face's CDN. This is initiated only after you select a model. The audio you transcribe is never uploaded.",
      },
      {
        label: 'OpenAI (optional)',
        body: (
          <>
            If you choose to provide an OpenAI API key for transcript cleanup or summarization,
            Transcribr will send the relevant text (not audio) to{' '}
            <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">api.openai.com</code> using
            your key. Use of OpenAI is governed by{' '}
            <a
              href="https://openai.com/policies/privacy-policy"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
              rel="noopener noreferrer"
              target="_blank"
            >
              OpenAI’s privacy policy
            </a>
            .
          </>
        ),
      },
      {
        label: 'Ollama (optional)',
        body: (
          <>
            If you run{' '}
            <a
              href="https://ollama.com"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
              rel="noopener noreferrer"
              target="_blank"
            >
              Ollama
            </a>{' '}
            locally on your Mac, Transcribr will send transcripts over{' '}
            <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">http://127.0.0.1:11434</code>{' '}
            to the Ollama daemon you control. This traffic does not leave your machine.
          </>
        ),
      },
      {
        label: 'Direct media URLs',
        body: 'When you paste a direct media URL, Transcribr fetches the file via standard HTTP. Only the host you typed receives the request. (Mac App Store build.)',
      },
      {
        label: 'yt-dlp ingestion',
        body: 'The standalone DMG version of Transcribr can hand a URL to a locally installed yt-dlp binary so it can download from supported platforms. This is not part of the Mac App Store build. Any traffic is between your Mac and the platform yt-dlp connects to.',
      },
    ],
    trailing: (
      <p className="text-slate-300 leading-relaxed">
        Transcribr does not use any analytics, advertising, attribution, or crash-reporting SDKs.
      </p>
    ),
  },
  {
    id: 'never',
    number: '5',
    title: 'What we do not do',
    bullets: [
      { body: 'We do not run a Transcribr backend.' },
      { body: 'We do not collect device identifiers, IP addresses, or behavioral data.' },
      { body: 'We do not sell, share, or monetize user data.' },
      { body: 'We do not use your audio or transcripts to train any model.' },
      { body: 'We do not contact any server on launch other than as listed above.' },
    ],
  },
  {
    id: 'children',
    number: '6',
    title: "Children's privacy",
    paragraphs: [
      'Transcribr is not directed at children under the age of 13. We do not knowingly collect any data from children.',
    ],
  },
  {
    id: 'retention',
    number: '7',
    title: 'Data retention and deletion',
    paragraphs: [
      'All data Transcribr touches lives on your Mac. To delete it, drag Transcribr to the Trash and remove the following directories:',
    ],
    bullets: [
      {
        body: (
          <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">
            ~/Library/Containers/com.devxgroup.transcribr
          </code>
        ),
        label: 'App Store build',
      },
      {
        body: (
          <code className="text-xs bg-white/5 px-1.5 py-0.5 rounded">
            ~/Library/Application Support/Transcribr
          </code>
        ),
        label: 'DMG build',
      },
      { body: 'The macOS Keychain entry for any saved OpenAI API key.', label: 'Keychain' },
    ],
  },
  {
    id: 'changes',
    number: '8',
    title: 'Changes to this policy',
    paragraphs: [
      'If we make a material change to this policy, we will update the "Last updated" date at the top and post a notice in the app’s release notes.',
    ],
  },
  {
    id: 'contact',
    number: '9',
    title: 'Contact',
    paragraphs: [
      <>
        Questions about this policy or about your data:{' '}
        <a
          href="mailto:support@devxgroup.io"
          className="text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          support@devxgroup.io
        </a>
      </>,
    ],
  },
]

export default function TranscribrPrivacyPage() {
  return (
    <LegalAppAddendumLayout
      appName="Transcribr"
      documentKind="Privacy Policy"
      effectiveDate="May 1, 2026"
      lastUpdated="May 1, 2026"
      appHomeHref="/portfolio"
      corporatePolicyHref="/privacy"
      siblingDocumentHref="/terms/transcribr"
      siblingDocumentLabel="License & Terms"
      contactEmail="support@devxgroup.io"
      summary={
        <>
          Transcribr is a 100% on-device macOS transcription app. Your audio never leaves your Mac
          unless you opt into an integration. There is no Transcribr backend, no telemetry, no
          analytics, no advertising, and we never use your data to train any model.
        </>
      }
      sections={sections}
    />
  )
}
