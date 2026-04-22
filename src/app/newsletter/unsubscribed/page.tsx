import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Unsubscribed — DevX Newsletter',
  robots: { index: false },
}

interface Props {
  searchParams: Promise<{ status?: string }>
}

export default async function UnsubscribedPage({ searchParams }: Props) {
  const { status } = await searchParams
  const success = status === 'success' || status === 'already'

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-5">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8 bg-zinc-900 border border-white/8">
          <span className="text-2xl">👋</span>
        </div>

        {success ? (
          <>
            <h1 className="heading-subsection text-white mb-4">You have been unsubscribed.</h1>
            <p className="subtitle-sm text-zinc-400 mb-8">
              No more emails from us. If you ever want to come back, you are always welcome.
            </p>
          </>
        ) : (
          <>
            <h1 className="heading-subsection text-white mb-4">Link not found.</h1>
            <p className="subtitle-sm text-zinc-400 mb-8">
              This unsubscribe link is invalid or already used. If you are still receiving emails,
              reply to any newsletter and we will remove you immediately.
            </p>
          </>
        )}

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-zinc-300 text-sm font-medium hover:bg-white/[0.09] transition-colors"
        >
          Back to DevXGroup
        </Link>
      </div>
    </main>
  )
}
