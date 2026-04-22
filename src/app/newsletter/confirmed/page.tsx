import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, XCircle, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Subscription Confirmed — DevX Newsletter',
  robots: { index: false },
}

interface Props {
  searchParams: Promise<{ status?: string }>
}

export default async function ConfirmedPage({ searchParams }: Props) {
  const { status } = await searchParams

  const isSuccess = status === 'success' || status === 'already'
  const isError = status === 'invalid' || status === 'error'

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-5">
      <div className="max-w-md w-full text-center">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-8 border"
          style={{
            background: isError ? 'rgba(239,68,68,0.08)' : 'rgba(76,215,135,0.08)',
            borderColor: isError ? 'rgba(239,68,68,0.2)' : 'rgba(76,215,135,0.2)',
          }}
        >
          {isError ? (
            <XCircle size={28} className="text-red-400" />
          ) : (
            <CheckCircle size={28} className="text-[#4CD787]" />
          )}
        </div>

        {status === 'success' && (
          <>
            <h1 className="heading-subsection text-white mb-4">You are in.</h1>
            <p className="subtitle-sm text-zinc-400 mb-8">
              Your subscription is confirmed. Look for your first issue this Friday — real AI and
              dev insights, no fluff.
            </p>
          </>
        )}

        {status === 'already' && (
          <>
            <h1 className="heading-subsection text-white mb-4">Already confirmed.</h1>
            <p className="subtitle-sm text-zinc-400 mb-8">
              You are already subscribed. See you Friday.
            </p>
          </>
        )}

        {(status === 'invalid' || status === 'error') && (
          <>
            <h1 className="heading-subsection text-white mb-4">Link expired or invalid.</h1>
            <p className="subtitle-sm text-zinc-400 mb-8">
              Confirmation links expire after 48 hours. Head back and subscribe again — it only
              takes a second.
            </p>
          </>
        )}

        {!status && (
          <>
            <Mail size={28} className="text-[#4CD787] mx-auto mb-4" />
            <h1 className="heading-subsection text-white mb-4">Check your inbox.</h1>
            <p className="subtitle-sm text-zinc-400 mb-8">
              We sent you a confirmation email. Click the link inside to complete your subscription.
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
