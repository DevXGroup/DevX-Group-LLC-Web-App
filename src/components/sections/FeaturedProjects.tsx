'use client'

import { motion, useAnimationFrame, useInView, useMotionValue } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState, useCallback } from 'react'
import { ArrowRight, Check, ExternalLink, Github, Smartphone, Star } from 'lucide-react'
import { categoryColors, portfolioProjects } from '@/data/portfolioProjects'
import BlurText from '@animations/BlurText'
import NutrifyBanner from '@sections/NutrifyBanner'

const featured = portfolioProjects.filter((p) => p.isFeatured)

// carousel constants
const CARD_W = 400
const CARD_GAP = 28
const STRIDE = CARD_W + CARD_GAP
const SPEED = 0.036 // px per ms → ~36 px/s
const LOOP_WIDTH = featured.length * STRIDE

// 3 copies: one full set of content on either side of the starting position
const loopCards = [...featured, ...featured, ...featured]

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [paused, setPaused] = useState(false)
  const isDragging = useRef(false)
  const dragStart = useRef<{ clientX: number; originX: number } | null>(null)
  // Start in the middle copy so there's a full copy-width of content in both directions
  const x = useMotionValue(-LOOP_WIDTH)

  useAnimationFrame((_, delta) => {
    if (paused || isDragging.current || !isInView) return
    const d = Math.min(delta, 80)
    const next = x.get() - d * SPEED
    // Wrap at the end of copy 2 — snaps back to equivalent position in copy 1
    x.set(next <= -2 * LOOP_WIDTH ? next + LOOP_WIDTH : next)
  })

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      isDragging.current = true
      dragStart.current = { clientX: e.clientX, originX: x.get() }
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    },
    [x]
  )

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging.current || !dragStart.current) return
      const delta = e.clientX - dragStart.current.clientX
      // Direct delta — no normalization, track has 3 copies so there's
      // always content within a full copy-width of the start position
      x.set(dragStart.current.originX + delta)
    },
    [x]
  )

  const onPointerUp = useCallback(() => {
    isDragging.current = false
    dragStart.current = null
    // Re-anchor to the copy-2 range so auto-scroll re-enters the loop immediately.
    // Copies are identical, so a LOOP_WIDTH shift is visually invisible.
    let cur = x.get()
    while (cur > -LOOP_WIDTH) cur -= LOOP_WIDTH
    while (cur <= -2 * LOOP_WIDTH) cur += LOOP_WIDTH
    x.set(cur)
  }, [x])

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#4CD787]/5 blur-[120px]" />
        <div className="absolute right-1/4 top-1/3 w-[400px] h-[400px] rounded-full bg-[#9d4edd]/5 blur-[100px]" />
      </div>

      <div className="relative z-10">
        {/* Section header */}
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-14 sm:mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#4CD787]/30 bg-[#4CD787]/5 text-[#4CD787] text-xs font-medium tracking-wider uppercase mb-6">
              <Star size={12} className="fill-[#4CD787]" />
              Featured Work
            </div>
            <BlurText
              text="Open-source & client projects"
              className="justify-center text-center text-white mb-4 section-title-hero font-editorial"
              delay={50}
              startDelay={150}
              stepDuration={0.4}
              once={true}
            />
            <p className="subtitle text-white/60 max-w-xl mx-auto">
              Built by DevX Group — shipped products demonstrating our depth across AI, web, mobile,
              and real-time systems.
            </p>
          </motion.div>
        </div>

        {/* ── Scroll track ─────────────────────────────────────────── */}
        <div
          className="relative cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            setPaused(false)
            onPointerUp()
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          {/* Edge fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 z-20 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 z-20 bg-gradient-to-l from-black to-transparent" />

          <motion.div style={{ x }} className="flex select-none">
            {loopCards.map((project, i) => {
              const categoryColor =
                categoryColors[project.category as keyof typeof categoryColors] || '#4CD787'

              return (
                <motion.div
                  key={`${project.id}-${i}`}
                  className="group relative flex flex-col rounded-2xl bg-white/[0.03] border border-white/10
                    hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300
                    overflow-hidden flex-shrink-0"
                  style={{ width: CARD_W, marginRight: CARD_GAP }}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  {/* Category glow on hover */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                    style={{
                      background: `radial-gradient(500px circle at 50% 0%, ${categoryColor}08, transparent 70%)`,
                    }}
                  />

                  {/* ── Banner ──────────────────────────────────── */}
                  <div className="relative aspect-video overflow-hidden bg-zinc-900">
                    {project.id === 'nutrify-ai' ? (
                      // Framer Motion variant propagates from card → banner for reliable grayscale
                      <motion.div
                        className="w-full h-full origin-center"
                        variants={{
                          rest: { filter: 'grayscale(100%)', scale: 1 },
                          hover: { filter: 'grayscale(0%)', scale: 1.03 },
                        }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      >
                        <NutrifyBanner variant="card" />
                      </motion.div>
                    ) : (
                      <Image
                        src={project.images.banner}
                        alt={project.images.bannerAlt || `${project.title} banner`}
                        fill
                        className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-[1.03]"
                        sizes="400px"
                      />
                    )}

                    {/* Bottom fade for image cards */}
                    {project.id !== 'nutrify-ai' && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    )}

                    {/* Top scrim — keeps pills legible */}
                    <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/70 via-black/30 to-transparent z-10" />

                    {/* Category badge */}
                    <div className="absolute top-3 left-3 z-20">
                      <span
                        className="px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-xl border"
                        style={{
                          backgroundColor: `${categoryColor}30`,
                          borderColor: `${categoryColor}55`,
                          color: categoryColor,
                        }}
                      >
                        {project.category}
                      </span>
                    </div>

                    {/* Top-right badges */}
                    <div className="absolute top-3 right-3 flex flex-col gap-1.5 items-end z-20">
                      {project.githubUrl && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-xl border border-white/25 bg-black/60 text-white/85">
                          Open Source
                        </span>
                      )}
                      {project.platforms?.includes('iOS') &&
                        !project.platforms?.includes('Android') && (
                          <span
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-xl border"
                            style={{
                              backgroundColor: `${categoryColor}30`,
                              borderColor: `${categoryColor}55`,
                              color: categoryColor,
                            }}
                          >
                            <Smartphone size={9} />
                            iOS First
                          </span>
                        )}
                      {project.currentNote && (
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-xl border border-amber-400/40 bg-amber-400/20 text-amber-300">
                          {project.currentNote.includes('App Store')
                            ? '🍎 Coming to App Store'
                            : project.currentNote}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ── Card content ─────────────────────────── */}
                  <div className="flex flex-col flex-1 p-5">
                    <h3 className="heading-component text-white leading-tight mb-2">
                      {project.title}
                    </h3>

                    <p
                      className={`text-zinc-400 text-sm leading-relaxed mb-3 ${project.highlights?.length ? 'line-clamp-2' : 'line-clamp-2 flex-1'}`}
                    >
                      {project.shortDescription}
                    </p>

                    {project.highlights?.length ? (
                      <ul className="flex flex-col gap-1.5 mb-4 flex-1">
                        {project.highlights.slice(0, 3).map((h) => (
                          <li
                            key={h}
                            className="flex items-start gap-2 text-[12px] text-zinc-400 leading-snug"
                          >
                            <Check
                              size={11}
                              className="mt-0.5 flex-shrink-0"
                              style={{ color: categoryColor }}
                            />
                            {h}
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[11px] rounded-md bg-white/5 border border-white/10 text-zinc-400"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-0.5 text-[11px] rounded-md bg-white/5 border border-white/10 text-zinc-500">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/8">
                      <div>
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            aria-label={`${project.title} GitHub repository`}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20
                              text-zinc-400 hover:text-white transition-all duration-200"
                          >
                            <Github size={15} />
                          </a>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {project.appStoreUrl && !project.visitUrl && (
                          <a
                            href={project.appStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg
                              bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/25
                              text-zinc-300 hover:text-white text-xs font-semibold transition-all duration-200 whitespace-nowrap"
                          >
                            <Smartphone size={12} aria-hidden="true" />
                            App Store
                          </a>
                        )}
                        {project.visitUrl && (
                          <a
                            href={project.visitUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg
                              bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/25
                              text-zinc-300 hover:text-white text-xs font-semibold transition-all duration-200 whitespace-nowrap"
                          >
                            <ExternalLink size={12} aria-hidden="true" />
                            Website
                          </a>
                        )}
                        <Link
                          href={`/portfolio/${project.id}`}
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`View details for ${project.title}`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg
                            bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/25
                            text-zinc-300 hover:text-white text-xs font-semibold transition-all duration-200 whitespace-nowrap"
                        >
                          Details
                          <ArrowRight size={12} aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* View all link */}
        <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
            className="flex justify-center mt-12 sm:mt-14"
          >
            <Link
              href="/portfolio"
              className="group inline-flex items-center gap-2 px-7 py-3 rounded-xl
                border border-white/15 hover:border-white/30
                bg-white/5 hover:bg-white/10
                text-white font-semibold text-sm
                transition-all duration-300"
            >
              View All Projects
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
