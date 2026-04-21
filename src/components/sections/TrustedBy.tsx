'use client'

import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const clients = [
  { name: 'Lawazm', monogram: 'LW', country: 'Kuwait' },
  { name: 'Lazurd', monogram: 'LZ', country: 'Kuwait' },
  { name: 'Nutrify.AI', monogram: 'NA', country: 'USA' },
  { name: 'Joyful', monogram: 'JY', country: 'Qatar' },
  { name: 'Chamrosh', monogram: 'CH', country: 'USA' },
  { name: 'Miremadi', monogram: 'MD', country: 'San Diego' },
  { name: 'WellBox', monogram: 'WB', country: 'USA' },
  { name: 'Chayyel', monogram: 'CY', country: 'Global' },
  { name: 'Zahra Farm', monogram: 'ZF', country: 'Middle East' },
]

// Triple for a seamless infinite loop at any viewport width
const loopClients = [...clients, ...clients, ...clients]

const SPEED = 0.048 // px/ms → ~48 px/s

export default function TrustedBy() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 })
  const reducedMotion = useReducedMotion()
  const [paused, setPaused] = useState(false)
  const x = useMotionValue(0)
  // loopWidth = width of one full set of clients (measured after mount)
  const [loopWidth, setLoopWidth] = useState(0)

  useEffect(() => {
    if (trackRef.current) {
      setLoopWidth(trackRef.current.scrollWidth / 3)
    }
  }, [])

  useAnimationFrame((_, delta) => {
    if (paused || reducedMotion || !isInView || loopWidth === 0) return
    const d = Math.min(delta, 80)
    const next = x.get() - d * SPEED
    x.set(next <= -loopWidth ? next + loopWidth : next)
  })

  return (
    <section
      ref={sectionRef}
      aria-label="Trusted by"
      data-testid="trusted-by-section"
      className="relative w-full py-10 sm:py-12 border-y border-white/[0.06] overflow-hidden"
    >
      {/* Edge fades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 z-10 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 z-10 bg-gradient-to-l from-black to-transparent" />

      {/* Label */}
      <motion.p
        initial={reducedMotion ? false : { opacity: 0, y: 6 }}
        animate={reducedMotion ? { opacity: 1 } : isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-center text-zinc-600 subtitle-xs uppercase tracking-widest mb-7"
      >
        Trusted by teams across 3 continents
      </motion.p>

      {/* Scrolling strip */}
      <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <motion.div ref={trackRef} style={{ x }} className="flex items-center gap-3 sm:gap-4 w-max">
          {loopClients.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl flex-shrink-0
                bg-white/[0.03] border border-white/[0.07]
                hover:bg-white/[0.07] hover:border-white/[0.16]
                transition-all duration-300 cursor-default select-none"
            >
              {/* Monogram badge */}
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0
                  bg-gradient-to-br from-white/10 to-white/5 border border-white/10
                  text-white text-[10px] font-bold tracking-wider
                  group-hover:from-white/15 group-hover:to-white/8 transition-all duration-300"
              >
                {client.monogram}
              </div>
              <div className="leading-none">
                <p className="text-zinc-300 text-sm font-semibold group-hover:text-white transition-colors duration-200">
                  {client.name}
                </p>
                <p className="text-zinc-600 text-[10px] mt-0.5 group-hover:text-zinc-500 transition-colors duration-200">
                  {client.country}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
