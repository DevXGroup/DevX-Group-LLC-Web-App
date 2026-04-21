'use client'

import { useState, type FormEvent } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'

export default function NewsletterSignup() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.25 })
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

  const fadeUp = (delay = 0) =>
    reducedMotion
      ? { initial: false as const, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: isInView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
        }

  return (
    <section
      ref={ref}
      data-testid="newsletter-section"
      className="relative py-20 sm:py-28 overflow-hidden"
    >
      {/* Top edge line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] rounded-full bg-[#4CD787]/4 blur-[120px]"
      />

      <div className="relative z-10 container mx-auto px-5 sm:px-8 md:px-10 lg:px-14 xl:px-16 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left — editorial copy */}
          <div>
            <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 mb-6">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-[#4CD787]/12 border border-[#4CD787]/25">
                <Mail size={13} className="text-[#4CD787]" />
              </span>
              <span className="text-[#4CD787] text-xs font-medium tracking-widest uppercase font-mono">
                Weekly Newsletter
              </span>
            </motion.div>

            <motion.h2
              {...fadeUp(0.08)}
              className="heading-subsection text-white mb-5 leading-[1.1]"
            >
              AI and Dev insights
              <br />
              <span className="text-zinc-500">every single week</span>
            </motion.h2>

            <motion.p
              {...fadeUp(0.14)}
              className="subtitle-sm text-zinc-400 leading-relaxed max-w-sm"
            >
              Real patterns from shipping AI products, agentic workflows, and MVPs. Delivered
              straight to your inbox every Friday.
            </motion.p>

            <motion.div {...fadeUp(0.2)} className="flex items-center gap-3 mt-8">
              <div className="flex -space-x-2">
                {['M', 'A', 'S', 'J'].map((initial, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400 font-medium"
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <p className="text-zinc-600 text-xs">Founders and engineers read this weekly</p>
            </motion.div>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                aria-live="polite"
                className="flex flex-col items-start gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-[#4CD787]/10 border border-[#4CD787]/25 flex items-center justify-center">
                  <CheckCircle size={20} className="text-[#4CD787]" />
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">You are in. Welcome aboard.</p>
                  <p className="text-zinc-500 text-sm mt-1">Your first issue arrives shortly.</p>
                </div>
              </motion.div>
            ) : (
              <motion.form {...fadeUp(0.1)} onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row gap-3 mb-3">
                  <div className="flex-1">
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
                      className="w-full px-4 py-3.5 rounded-xl bg-white/[0.04] border border-white/10
                        text-zinc-200 placeholder:text-zinc-600 text-sm
                        focus:outline-none focus:border-[#4CD787]/35 focus:bg-white/[0.06]
                        transition-all duration-200"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    data-testid="newsletter-submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl
                      bg-[#4CD787] hover:bg-[#3bc975] active:bg-[#32b368] text-black text-sm font-semibold
                      transition-all duration-200 whitespace-nowrap
                      disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      'Subscribing...'
                    ) : (
                      <>
                        Subscribe <ArrowRight size={14} />
                      </>
                    )}
                  </button>
                </div>

                {error && (
                  <p role="alert" className="text-red-400 text-xs mb-2">
                    {error}
                  </p>
                )}

                <p className="text-zinc-700 text-xs">No spam. Unsubscribe at any time.</p>
              </motion.form>
            )}

            {/* Decorative rule */}
            <div className="hidden lg:block absolute left-1/2 top-[10%] bottom-[10%] w-px bg-gradient-to-b from-transparent via-white/8 to-transparent pointer-events-none -translate-x-1/2" />
          </div>
        </div>
      </div>
    </section>
  )
}
