import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}

// Minimal test page - uses no external components
export default function SentryExamplePage() {
  return (
    <div
      style={{ padding: '20px', color: 'white', backgroundColor: '#1a1a1a', minHeight: '100vh' }}
    >
      <h1>Sentry Test Page</h1>
      <p>This is a minimal test page.</p>
    </div>
  )
}
