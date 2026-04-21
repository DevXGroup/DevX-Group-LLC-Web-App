'use client'

import { useState, type FormEvent } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'

export default function NewsletterSignup() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const reducedMotion = useReducedMotion()
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'newsletter',
          email: email.trim(),
          message: 'Newsletter signup — Weekly AI & Dev insights',
        }),
      })
      if (!res.ok) throw new Error('Failed')
      setSubmitted(true)
      setEmail('')
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section
      ref={ref}
      data-testid="newsletter-section"
      className="relative py-16 sm:py-20 overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full bg-[#4CD787]/4 blur-[80px]" />
      </div>

      <div className="relative z-10 container mx-auto px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={reducedMotion ? { opacity: 1 } : isInView ? { opacity: 1, y: 0 } : {}}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#4CD787]/10 border border-[#4CD787]/20 mb-5">
            <Mail size={18} className="text-[#4CD787]" />
          </div>

          <h2 className="heading-subsection text-white mb-3">Weekly AI & Dev insights</h2>
          <p className="subtitle-sm text-zinc-500 mb-8 max-w-sm mx-auto">
            Real patterns from shipping AI products, agentic workflows, and MVPs — delivered every
            week.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              aria-live="polite"
              className="flex flex-col items-center gap-3"
            >
              <CheckCircle size={32} className="text-[#4CD787]" />
              <p className="text-white font-semibold">You&apos;re in — welcome aboard.</p>
              <p className="text-zinc-500 text-sm">First issue lands in your inbox shortly.</p>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <div className="flex-1 relative">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError(null)
                  }}
                  placeholder="you@company.com"
                  autoComplete="email"
                  data-testid="newsletter-email-input"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10
                    text-zinc-200 placeholder:text-zinc-600 text-sm
                    focus:outline-none focus:border-[#4CD787]/40 focus:bg-white/[0.07]
                    transition-all duration-200"
                />
                {error && (
                  <p role="alert" className="absolute -bottom-5 left-0 text-red-400 text-xs">
                    {error}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={submitting}
                data-testid="newsletter-submit"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl
                  bg-[#4CD787] hover:bg-[#3bc975] text-black text-sm font-semibold
                  transition-all duration-200 whitespace-nowrap
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  'Subscribing…'
                ) : (
                  <>
                    Subscribe
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          )}

          <p className="text-zinc-700 text-xs mt-6">No spam. Unsubscribe anytime.</p>
        </motion.div>
      </div>
    </section>
  )
}
