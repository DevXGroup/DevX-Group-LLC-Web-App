'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import { Github, ExternalLink, ArrowRight, Star } from 'lucide-react'
import { portfolioProjects, categoryColors } from '@/data/portfolioProjects'

const featured = portfolioProjects.filter((p) => p.isFeatured)

const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1]

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: easeOutExpo,
      delay: i * 0.1,
    },
  }),
}

export default function FeaturedProjects() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 })

  return (
    <section ref={sectionRef} className="relative py-20 sm:py-28 overflow-hidden">
      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#4CD787]/5 blur-[120px]" />
        <div className="absolute right-1/4 top-1/3 w-[400px] h-[400px] rounded-full bg-[#9d4edd]/5 blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Section header */}
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
          <h2 className="heading-section text-white mb-4">Open-source &amp; client projects</h2>
          <p className="subtitle text-white/60 max-w-xl mx-auto">
            Built by DevX Group — shipped products demonstrating our depth across AI, web, mobile,
            and real-time systems.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featured.map((project, i) => {
            const categoryColor =
              categoryColors[project.category as keyof typeof categoryColors] || '#4CD787'

            return (
              <motion.div
                key={project.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? 'visible' : 'hidden'}
                className="group relative flex flex-col rounded-2xl bg-white/[0.03] border border-white/10
                  hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300
                  overflow-hidden"
                style={{
                  boxShadow: '0 0 0 0 transparent',
                }}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.25, ease: 'easeOut' },
                }}
              >
                {/* Colored glow on hover */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: `radial-gradient(500px circle at 50% 0%, ${categoryColor}08, transparent 70%)`,
                  }}
                />

                {/* Banner image */}
                <div className="relative aspect-video overflow-hidden bg-zinc-900">
                  <Image
                    src={project.images.banner}
                    alt={project.images.bannerAlt || `${project.title} banner`}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className="px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md border"
                      style={{
                        backgroundColor: `${categoryColor}25`,
                        borderColor: `${categoryColor}50`,
                        color: categoryColor,
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  {/* Open source badge */}
                  {project.githubUrl && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md border border-white/20 bg-black/40 text-white/80">
                        Open Source
                      </span>
                    </div>
                  )}
                </div>

                {/* Card content */}
                <div className="flex flex-col flex-1 p-5 sm:p-6">
                  {/* Title */}
                  <h3
                    className="font-bold text-white text-lg leading-tight mb-2 group-hover:text-opacity-90 transition-colors"
                    style={{ fontFamily: 'var(--font-playfair-display)' }}
                  >
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-4 flex-1">
                    {project.shortDescription}
                  </p>

                  {/* Tech pills */}
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

                  {/* Bottom row: icon links + CTA */}
                  <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/8">
                    <div className="flex items-center gap-2">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`${project.title} GitHub repository`}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20
                            text-zinc-400 hover:text-white transition-all duration-200"
                        >
                          <Github size={15} />
                        </a>
                      )}
                      {project.visitUrl && (
                        <a
                          href={project.visitUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Visit ${project.title} live site`}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20
                            text-zinc-400 hover:text-white transition-all duration-200"
                        >
                          <ExternalLink size={15} />
                        </a>
                      )}
                    </div>

                    <Link
                      href={`/portfolio/${project.id}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all duration-200"
                      style={{ color: categoryColor }}
                    >
                      View Project
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* View all link */}
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
    </section>
  )
}
