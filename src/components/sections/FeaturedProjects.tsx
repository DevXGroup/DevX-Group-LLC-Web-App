'use client'

import { motion, useAnimationFrame, useInView, useMotionValue } from 'framer-motion'
import Link from 'next/link'
import { useRef, useState, useCallback } from 'react'
import { ArrowRight, Check, ExternalLink, Github, Smartphone, Star } from 'lucide-react'
import { categoryColors, portfolioProjects, type ProjectData } from '@/data/portfolioProjects'
import BlurText from '@animations/BlurText'
import DeviceMockup from '@/components/portfolio/DeviceMockup'

const featured = portfolioProjects.filter((p) => p.isFeatured)

// carousel constants
const CARD_W = 400
const CARD_GAP = 28
const STRIDE = CARD_W + CARD_GAP
const SPEED = 0.036 // px per ms → ~36 px/s
const HOVER_SPEED_FACTOR = 0.25 // hover keeps the loop alive at a quarter speed
const LOOP_WIDTH = featured.length * STRIDE

const MOBILE_PLATFORMS = ['iOS', 'Android', 'Mobile App']
const NATIVE_DESKTOP_PLATFORMS = ['macOS', 'Windows', 'Linux']
const WEB_PLATFORMS = ['Web', 'Website', 'PWA', 'PWA-ready', 'Admin Dashboard', 'API']

function pickMockup(platforms: string[]): 'phone' | 'monitor' | 'desktop' {
  const isMobile = platforms.some((p) => MOBILE_PLATFORMS.includes(p))
  const isNative = platforms.some((p) => NATIVE_DESKTOP_PLATFORMS.includes(p))
  const isWeb = platforms.some((p) => WEB_PLATFORMS.includes(p))
  // Native desktop apps (Transcribr, etc.) get the iMac-style standalone screen
  if (isNative && !isMobile) return 'desktop'
  // Pure mobile gets the phone
  if (isMobile && !isWeb && !isNative) return 'phone'
  // Mixed: phone wins (more visually distinct)
  if (isMobile) return 'phone'
  // Web-only gets the browser-window monitor frame
  return 'monitor'
}

function buildScreens(project: ProjectData) {
  const { screenshots, screenshotAlts, banner, bannerAlt } = project.images
  if (screenshots?.length) {
    return screenshots.map((src, idx) => ({
      src,
      alt: screenshotAlts?.[idx] || bannerAlt || project.title,
    }))
  }
  return [{ src: banner, alt: bannerAlt || project.title }]
}

// 4 copies: with x wrapped into (-2·LW, -LW], the track's right edge is at
// least 2·LW (≈3400px) past the viewport origin, covering any reasonable screen.
// Copies are identical, so shifting x by LW is visually a no-op.
const loopCards = [...featured, ...featured, ...featured, ...featured]

// Map any x into the canonical (-2·LOOP_WIDTH, -LOOP_WIDTH] range.
// Safe because all 4 copies are pixel-identical.
const wrapX = (v: number) => {
  let n = v
  while (n > -LOOP_WIDTH) n -= LOOP_WIDTH
  while (n <= -2 * LOOP_WIDTH) n += LOOP_WIDTH
  return n
}

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const [hovered, setHovered] = useState(false)
  const isDragging = useRef(false)
  const dragStart = useRef<{ clientX: number; originX: number } | null>(null)
  // Start in the middle copy so there's a full copy-width of content in both directions
  const x = useMotionValue(-LOOP_WIDTH)

  useAnimationFrame((_, delta) => {
    if (isDragging.current || !isInView) return
    const d = Math.min(delta, 80)
    const speed = hovered ? SPEED * HOVER_SPEED_FACTOR : SPEED
    x.set(wrapX(x.get() - d * speed))
  })

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      // Don't hijack pointer events that originate on a link/button — pointer
      // capture would otherwise prevent the click from reaching the target.
      const target = e.target as HTMLElement | null
      if (target?.closest('a, button')) return
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
      // Wrap every frame — copies are identical, so the snap is invisible and
      // keeps the 4-copy buffer anchored around the viewport however far you pull.
      x.set(wrapX(dragStart.current.originX + delta))
    },
    [x]
  )

  const onPointerUp = useCallback(() => {
    isDragging.current = false
    dragStart.current = null
    x.set(wrapX(x.get()))
  }, [x])

  return (
    <section ref={sectionRef} className="relative w-full py-20 sm:py-28 overflow-hidden">
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
              text="Our latest projects"
              className="justify-center text-center text-white mb-4 section-title-hero font-editorial"
              delay={50}
              startDelay={150}
              stepDuration={0.4}
              once={true}
            />
            <p className="subtitle text-white/60 max-w-xl mx-auto">
              Real apps we built and shipped. Web, mobile, and AI products that are live or close to
              it.
            </p>
          </motion.div>
        </div>

        {/* ── Scroll track ─────────────────────────────────────────── */}
        <div
          className="relative cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            setHovered(false)
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

                  {/* ── Device mockup stage ─────────────────────── */}
                  <div
                    className="relative h-[260px] overflow-hidden"
                    style={{
                      background: `radial-gradient(120% 90% at 50% 100%, ${categoryColor}10 0%, transparent 60%), #0a0c10`,
                    }}
                  >
                    {/* Slideshow keeps rotating regardless of carousel hover state — the light
                        show is the point of the card, so don't freeze it when the user inspects */}
                    <DeviceMockup
                      variant={pickMockup(project.platforms || [])}
                      screens={buildScreens(project)}
                      accent={categoryColor}
                    />
                  </div>

                  {/* ── Card content ─────────────────────────── */}
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex items-center gap-2 mb-2 text-[11px] font-semibold uppercase tracking-[0.12em]">
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: categoryColor }}
                      />
                      <span style={{ color: categoryColor }}>{project.category}</span>
                      {project.githubUrl && (
                        <>
                          <span className="text-white/20">•</span>
                          <span className="text-white/60">Open Source</span>
                        </>
                      )}
                    </div>
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
