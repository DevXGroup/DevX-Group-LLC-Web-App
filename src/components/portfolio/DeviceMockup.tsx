'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Screen = { src: string; alt: string }

interface DeviceMockupProps {
  variant: 'phone' | 'monitor' | 'desktop'
  screens: Screen[]
  /** ms between slides */
  interval?: number
  /** Category accent color used for ambient glow */
  accent?: string
  className?: string
  /** Pause auto-advance (e.g. when card is offscreen) */
  paused?: boolean
}

const fade = {
  initial: { opacity: 0, scale: 1.02 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 },
}

export default function DeviceMockup({
  variant,
  screens,
  interval = 3200,
  accent = '#4CD787',
  className = '',
  paused = false,
}: DeviceMockupProps) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const safeScreens = screens.length ? screens : []
  const count = safeScreens.length

  useEffect(() => {
    if (reduce || paused || count <= 1) return
    const id = window.setInterval(() => setI((v) => (v + 1) % count), interval)
    return () => clearInterval(id)
  }, [reduce, paused, count, interval])

  const active = safeScreens[Math.min(i, count - 1)]
  if (!active) return null

  return (
    <div className={`relative flex items-center justify-center w-full h-full ${className}`}>
      {/* Ambient accent glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(60% 50% at 50% 55%, ${accent}26 0%, transparent 70%)`,
        }}
      />

      {variant === 'phone' && (
        <PhoneFrame accent={accent}>
          <Slides active={active} index={i} reduce={reduce} />
        </PhoneFrame>
      )}
      {variant === 'monitor' && (
        <MonitorFrame>
          <Slides active={active} index={i} reduce={reduce} cover />
        </MonitorFrame>
      )}
      {variant === 'desktop' && (
        <DesktopFrame accent={accent}>
          <Slides active={active} index={i} reduce={reduce} cover />
        </DesktopFrame>
      )}
    </div>
  )
}

function Slides({
  active,
  index,
  reduce,
  cover = false,
}: {
  active: Screen
  index: number
  reduce: boolean | null
  cover?: boolean
}) {
  return (
    <AnimatePresence initial={false} mode="sync">
      <motion.div
        key={`${index}-${active.src}`}
        className="absolute inset-0"
        variants={fade}
        initial={reduce ? false : 'initial'}
        animate="animate"
        {...(reduce ? {} : { exit: 'exit' as const })}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Image
          src={active.src}
          alt={active.alt}
          fill
          className={cover ? 'object-cover object-top' : 'object-cover'}
          sizes="(max-width: 640px) 70vw, 360px"
          priority={index === 0}
        />
      </motion.div>
    </AnimatePresence>
  )
}

function PhoneFrame({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <div
      className="relative"
      style={{
        // Height-led sizing keeps the phone inside the card stage no matter how tall
        height: '90%',
        aspectRatio: '1320 / 2868',
        borderRadius: 26,
        padding: 4,
        background: 'linear-gradient(160deg,#2a2f33 0%,#0a0d10 60%,#05080a 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: `
          0 26px 60px rgba(0,0,0,0.55),
          0 10px 24px ${accent}22,
          inset 0 1px 0 rgba(255,255,255,0.06),
          inset 0 0 0 1px rgba(255,255,255,0.03)
        `,
      }}
    >
      {/* Dynamic island */}
      <span
        aria-hidden
        className="absolute z-[3] rounded-full"
        style={{
          top: 6,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '32%',
          height: 11,
          background: '#000',
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      />
      <div
        className="relative w-full h-full overflow-hidden"
        style={{ borderRadius: 22, background: '#05080a' }}
      >
        {children}
      </div>
    </div>
  )
}

function MonitorFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative"
      style={{
        width: 'min(86%, 320px)',
        maxHeight: '95%',
        aspectRatio: '16 / 10',
        borderRadius: 12,
        background: 'linear-gradient(180deg,#1a1d20 0%,#0d0f12 100%)',
        border: '1px solid rgba(255,255,255,0.10)',
        padding: 1,
        boxShadow: `
          0 28px 60px rgba(0,0,0,0.55),
          inset 0 1px 0 rgba(255,255,255,0.06)
        `,
      }}
    >
      {/* Window chrome */}
      <div
        className="relative flex items-center gap-1.5 px-2.5"
        style={{
          height: 18,
          borderTopLeftRadius: 11,
          borderTopRightRadius: 11,
          background: 'linear-gradient(180deg,#23272b 0%,#16191c 100%)',
        }}
      >
        <span className="block w-2 h-2 rounded-full bg-[#ff5f57]/85" />
        <span className="block w-2 h-2 rounded-full bg-[#febc2e]/85" />
        <span className="block w-2 h-2 rounded-full bg-[#28c840]/85" />
      </div>
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: 'calc(100% - 18px)',
          borderBottomLeftRadius: 11,
          borderBottomRightRadius: 11,
          background: '#0d0f12',
        }}
      >
        {children}
      </div>
    </div>
  )
}

/**
 * iMac-style standalone monitor with neck and base.
 * Used for native desktop apps (Transcribr, etc.) where a browser-window frame
 * would misrepresent the product.
 */
function DesktopFrame({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <div
      className="relative flex flex-col items-center"
      style={{ width: 'min(82%, 300px)', maxHeight: '100%' }}
    >
      {/* Display */}
      <div
        className="relative w-full"
        style={{
          aspectRatio: '16 / 10',
          borderRadius: 14,
          padding: 7,
          background: 'linear-gradient(160deg,#1d2024 0%,#0a0c0f 70%,#05070a 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: `
            0 24px 50px rgba(0,0,0,0.6),
            0 8px 20px ${accent}1f,
            inset 0 1px 0 rgba(255,255,255,0.06),
            inset 0 0 0 1px rgba(255,255,255,0.03)
          `,
        }}
      >
        {/* Camera notch */}
        <span
          aria-hidden
          className="absolute z-[3] rounded-full"
          style={{
            top: 2,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 4,
            height: 4,
            background: 'rgba(255,255,255,0.18)',
            boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.4)',
          }}
        />
        <div
          className="relative w-full h-full overflow-hidden"
          style={{ borderRadius: 8, background: '#05080a' }}
        >
          {children}
        </div>
      </div>

      {/* Neck — thin tapered stand */}
      <svg
        aria-hidden
        viewBox="0 0 100 22"
        preserveAspectRatio="none"
        style={{
          width: '32%',
          height: 22,
          marginTop: -1,
          filter: `drop-shadow(0 2px 6px rgba(0,0,0,0.5))`,
        }}
      >
        <defs>
          <linearGradient id={`neck-${accent.replace('#', '')}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#2a2e34" />
            <stop offset="100%" stopColor="#14171a" />
          </linearGradient>
        </defs>
        <path
          d="M30 0 L70 0 L78 22 L22 22 Z"
          fill={`url(#neck-${accent.replace('#', '')})`}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="0.5"
        />
      </svg>

      {/* Base — wider arc */}
      <div
        style={{
          width: '54%',
          height: 6,
          marginTop: -2,
          borderRadius: '50% / 100% 100% 0 0',
          background: 'linear-gradient(180deg,#22262b 0%,#0d0f12 100%)',
          border: '1px solid rgba(255,255,255,0.06)',
          boxShadow: `
            0 6px 14px rgba(0,0,0,0.55),
            inset 0 1px 0 rgba(255,255,255,0.05)
          `,
        }}
      />

      {/* Soft floor reflection */}
      <div
        aria-hidden
        style={{
          width: '70%',
          height: 8,
          marginTop: 4,
          borderRadius: '50%',
          background: `radial-gradient(ellipse, ${accent}26 0%, transparent 70%)`,
          opacity: 0.6,
          filter: 'blur(4px)',
        }}
      />
    </div>
  )
}
