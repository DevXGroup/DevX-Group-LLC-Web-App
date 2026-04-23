'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { useIsMobile } from '@/hooks/use-mobile'

const calendlyEmbedUrl =
  'https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?hide_gdpr_banner=1&embed_type=Inline&background_color=050505&text_color=E2E8F0&primary_color=4CD787&utm_source=thank_you_page'

export default function ThankYouClient() {
  const isMobile = useIsMobile()
  const calendlyContainerRef = useRef<HTMLDivElement | null>(null)
  const calendlyScriptPromiseRef = useRef<Promise<void> | null>(null)
  const [calendlyLoading, setCalendlyLoading] = useState(true)
  const [calendlyHeight, setCalendlyHeight] = useState(1100)

  const clampCalendlyHeight = useCallback(
    (height: number) => {
      const minHeight = isMobile ? 1180 : 1000
      const maxHeight = isMobile ? 1800 : 1600
      return Math.min(Math.max(height, minHeight), maxHeight)
    },
    [isMobile]
  )

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateHeight = () => {
      const viewportHeight = typeof window.innerHeight !== 'undefined' ? window.innerHeight : 0
      const baseHeight = viewportHeight + (isMobile ? 420 : 240)
      const nextHeight = clampCalendlyHeight(baseHeight)
      setCalendlyHeight((prev) => (prev === nextHeight ? prev : nextHeight))
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    window.addEventListener('orientationchange', updateHeight)
    return () => {
      window.removeEventListener('resize', updateHeight)
      window.removeEventListener('orientationchange', updateHeight)
    }
  }, [clampCalendlyHeight, isMobile])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const allowedOrigins = new Set(['https://calendly.com', 'https://calendly.eu'])

    const handleMessage = (event: MessageEvent) => {
      if (!allowedOrigins.has(event.origin)) return
      const data = event.data
      if (!data || typeof data !== 'object') return

      if (data.event === 'calendly.page_height') {
        setCalendlyLoading(false)
        const payload = data.payload
        if (!payload) return
        const incomingHeight = Number(payload.height)
        if (!Number.isFinite(incomingHeight) || incomingHeight <= 0) return

        const bufferedHeight = incomingHeight + (isMobile ? 160 : 120)
        const nextHeight = clampCalendlyHeight(bufferedHeight)
        setCalendlyHeight((prev) => (prev === nextHeight ? prev : nextHeight))
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [clampCalendlyHeight, isMobile])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const containerElement = calendlyContainerRef.current
    if (!containerElement) return

    let isCancelled = false
    let observer: IntersectionObserver | null = null

    const clearContainer = (el: HTMLElement) => {
      while (el.firstChild) {
        el.removeChild(el.firstChild)
      }
    }

    const initializeWidget = () => {
      if (
        isCancelled ||
        !window.Calendly ||
        typeof window.Calendly.initInlineWidget !== 'function' ||
        !containerElement.isConnected
      ) {
        return
      }

      clearContainer(containerElement)

      try {
        window.Calendly.initInlineWidget({
          url: calendlyEmbedUrl,
          parentElement: containerElement,
          textColor: '#E2E8F0',
          primaryColor: '#4CD787',
          backgroundColor: '#050505',
          branding: false,
        })
      } catch (error) {
        console.error('Failed to initialize Calendly widget:', error)
      }
    }

    const loadCalendly = () => {
      if (window.Calendly && typeof window.Calendly.initInlineWidget === 'function') {
        initializeWidget()
        return
      }

      if (!calendlyScriptPromiseRef.current) {
        calendlyScriptPromiseRef.current = new Promise((resolve, reject) => {
          const script = document.createElement('script')
          script.src = 'https://assets.calendly.com/assets/external/widget.js'
          script.async = true
          script.onload = () => {
            if (window.Calendly && typeof window.Calendly.initInlineWidget === 'function') {
              resolve()
            } else {
              reject(new Error('Calendly widget function not available after script load'))
            }
          }
          script.onerror = () => reject(new Error('Failed to load Calendly widget script'))
          document.head.appendChild(script)
        })
      }

      calendlyScriptPromiseRef.current
        ?.then(() => {
          if (!isCancelled) initializeWidget()
        })
        .catch((error) => {
          calendlyScriptPromiseRef.current = null
          if (process.env.NODE_ENV !== 'production') {
            console.error('Calendly initialization error:', error)
          }
        })
    }

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (entry?.isIntersecting) {
            loadCalendly()
            observer?.disconnect()
          }
        },
        { rootMargin: '200px' }
      )
      observer.observe(containerElement)
    } else {
      loadCalendly()
    }

    return () => {
      isCancelled = true
      if (observer) observer.disconnect()
      clearContainer(containerElement)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Confirmation hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a1a] to-black" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

        <div className="relative container mx-auto px-4 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex justify-center mb-8"
          >
            <div className="w-20 h-20 rounded-full bg-[#4CD787]/15 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-[#4CD787]" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            style={{ fontFamily: 'var(--font-playfair-display)' }}
          >
            Message received
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="subtitle-lg mb-10"
          >
            We reply within 24 hours. While you&apos;re here, grab a free 30-minute consultation
            slot below.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/"
              className="inline-block text-sm text-foreground/50 hover:text-foreground transition-colors duration-200 underline underline-offset-4"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Calendly embed */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4">
          <div className="bg-transparent rounded-2xl overflow-hidden">
            <div className="relative rounded-xl">
              {calendlyLoading && (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-6 z-10 rounded-xl"
                  style={{ backgroundColor: '#050505', minHeight: 420 }}
                >
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-[#4CD787]/30 border-t-[#4CD787] animate-spin" />
                    <p className="text-body-small text-slate-400">Loading scheduler&hellip;</p>
                  </div>
                  <div className="w-full max-w-sm space-y-3 px-8 opacity-30">
                    <div className="h-3 bg-white/10 rounded animate-pulse" />
                    <div className="h-3 bg-white/10 rounded animate-pulse w-4/5" />
                    <div className="grid grid-cols-7 gap-2 mt-4">
                      {Array.from({ length: 35 }).map((_, i) => (
                        <div key={i} className="h-8 bg-white/10 rounded animate-pulse" />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div
                ref={calendlyContainerRef}
                className="w-full rounded-xl overflow-hidden"
                style={{
                  minWidth: '320px',
                  minHeight: calendlyHeight,
                  height: calendlyHeight,
                  backgroundColor: '#050505',
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
