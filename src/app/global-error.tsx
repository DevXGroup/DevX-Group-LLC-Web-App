'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          background: '#000',
          color: '#fff',
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        }}
      >
        <main
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 5rem)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              margin: 0,
              color: '#ef4444',
            }}
          >
            Something broke
          </h1>
          <p
            style={{
              maxWidth: '32rem',
              marginTop: '1.25rem',
              color: 'rgba(255,255,255,0.7)',
              fontSize: '1.05rem',
              lineHeight: 1.6,
            }}
          >
            The page failed to load. Refresh to try again, or head back home.
          </p>
          {error.digest && (
            <code
              style={{
                marginTop: '1rem',
                padding: '0.4rem 0.75rem',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '0.5rem',
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              {error.digest}
            </code>
          )}
          <div
            style={{
              marginTop: '2rem',
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <button
              type="button"
              onClick={reset}
              style={{
                background: '#ef4444',
                color: '#fff',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
            <a
              href="/home"
              style={{
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.5rem',
                fontSize: '0.95rem',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              Back to home
            </a>
          </div>
        </main>
      </body>
    </html>
  )
}
