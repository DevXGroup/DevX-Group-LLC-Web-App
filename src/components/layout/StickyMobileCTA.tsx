'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion'

const HIDDEN_ROUTES = ['/', '/contact', '/contact/thank-you']
const SCROLL_THRESHOLD = 200

export function StickyMobileCTA() {
  const pathname = usePathname()
  const shouldReduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(false)

  const isHiddenRoute = HIDDEN_ROUTES.includes(pathname)

  useEffect(() => {
    if (isHiddenRoute) {
      setVisible(false)
      return
    }

    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHiddenRoute, pathname])

  const slideVariants: Variants = shouldReduceMotion
    ? {
        hidden: { opacity: 1 },
        visible: { opacity: 1 },
        exit: { opacity: 1 },
      }
    : {
        hidden: { y: '100%', opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.3,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
        },
        exit: {
          y: '100%',
          opacity: 0,
          transition: { duration: 0.2, ease: 'easeIn' },
        },
      }

  const staticVisible = isHiddenRoute ? false : visible

  return (
    <AnimatePresence>
      {staticVisible && (
        <motion.div
          className="fixed bottom-0 inset-x-0 z-[9000] md:hidden bg-black/80 backdrop-blur-md border-t border-white/10 pb-[env(safe-area-inset-bottom)]"
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          data-testid="sticky-mobile-cta"
        >
          <div className="mx-auto max-w-md flex items-center gap-3 px-4 py-3 h-16">
            <Link
              href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative?utm_source=mobile_sticky"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center bg-[#4CD787] text-black text-sm font-semibold rounded-lg min-h-[44px] hover:bg-[#3bc874] transition-colors duration-200"
              data-testid="sticky-mobile-cta-book"
            >
              Book a Call
            </Link>
            <Link
              href="/contact"
              className="flex-1 flex items-center justify-center border border-white/25 text-white text-sm font-medium rounded-lg min-h-[44px] hover:border-white/50 hover:bg-white/5 transition-colors duration-200"
              data-testid="sticky-mobile-cta-contact"
            >
              Contact
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
