'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Play,
  CheckCircle,
  Calendar,
  Clock,
  Users,
  BarChart3,
  Zap,
  TrendingUp,
} from 'lucide-react'
import { ProjectData, categoryColors } from '@/data/portfolioProjects'
import ImageCarousel from '@/components/portfolio/ImageCarousel'
import SingleImageDisplay from '@/components/portfolio/SingleImageDisplay'

const T_STD = { duration: 0.35, ease: 'easeOut' } as const
const T_SMOOTH = { duration: 0.45, ease: 'easeOut' } as const

export default function ProjectPage({ project }: { project: ProjectData }) {
  const categoryColor = categoryColors[project.category as keyof typeof categoryColors] || '#4CD787'

  const screenshots = project.images.screenshots ?? []
  const hasMultiple = screenshots.length > 1
  const hasSingle = screenshots.length === 1

  // Render detailedDescription as paragraphs, respecting \n\n line breaks
  const descriptionParagraphs = project.detailedDescription
    .split('\n\n')
    .filter((p) => p.trim() !== '')

  return (
    <div className="min-h-screen bg-black text-white pt-16 sm:pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Portfolio
        </Link>
      </div>

      {/* Hero — animates on mount, not on scroll */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={T_SMOOTH}
        className="relative w-full"
      >
        {project.videoUrl ? (
          <div className="relative w-full aspect-video max-h-[70vh]">
            <video
              src={project.videoUrl}
              poster={project.videoPoster ?? project.images.banner}
              controls
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="relative w-full aspect-[4/3] sm:aspect-video lg:aspect-[21/9] max-h-[70vh]">
            <Image
              src={project.images.banner}
              alt={project.images.bannerAlt ?? `${project.title} banner`}
              fill
              className="object-cover object-top"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          </div>
        )}
      </motion.section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-16 relative z-10">
        {/* Category + Title + Description — animates on mount */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...T_STD, delay: 0.1 }}
          className="space-y-4 mb-8"
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: `${categoryColor}20`, color: categoryColor }}
          >
            {project.category}
          </span>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {project.title}
          </h1>

          <p className="text-lg text-white/70 max-w-3xl">{project.shortDescription}</p>
        </motion.div>

        {/* Action Buttons — animates on mount */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...T_STD, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {project.visitUrl && (
            <a
              href={project.visitUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-black transition-opacity hover:opacity-90"
              style={{ backgroundColor: categoryColor }}
            >
              <ExternalLink size={16} />
              View Live Site
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 text-sm font-medium text-white hover:bg-white/20 transition-colors border border-white/10"
            >
              <Github size={16} />
              GitHub Repo
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 text-sm font-medium text-white hover:bg-white/20 transition-colors border border-white/10"
            >
              <Play size={16} />
              Live Demo
            </a>
          )}
        </motion.div>

        {/* Screenshots — no scroll animation, renders immediately */}
        <section className="mb-16">
          {hasMultiple && (
            <ImageCarousel
              screenshots={screenshots}
              title={project.title}
              categoryColor={categoryColor}
              screenshotAlts={project.images.screenshotAlts}
            />
          )}
          {hasSingle && (
            <SingleImageDisplay
              image={screenshots[0] as string}
              title={project.title}
              categoryColor={categoryColor}
              imageAlt={project.images.screenshotAlts?.[0]}
            />
          )}
          {screenshots.length === 0 && (
            <SingleImageDisplay
              image={project.images.banner}
              title={project.title}
              categoryColor={categoryColor}
              imageAlt={project.images.bannerAlt}
            />
          )}
        </section>

        {/* Project Overview */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-4">Project Overview</h2>
          <div className="space-y-4">
            {descriptionParagraphs.map((para, i) => (
              <p key={i} className="text-white/70 leading-relaxed text-lg">
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Key Features</h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {project.keyFeatures.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-white/80">
                <CheckCircle
                  size={18}
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: categoryColor }}
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Tech Stack */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-full text-sm font-medium bg-white/5 text-white/80 border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Platforms */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Platforms</h2>
          <div className="flex flex-wrap gap-2">
            {project.platforms.map((platform) => (
              <span
                key={platform}
                className="px-4 py-2 rounded-lg text-sm font-medium border"
                style={{
                  borderColor: `${categoryColor}40`,
                  backgroundColor: `${categoryColor}10`,
                  color: categoryColor,
                }}
              >
                {platform}
              </span>
            ))}
          </div>
        </section>

        {/* Project Details Grid */}
        {(project.completionYear ?? project.projectDuration ?? project.teamSize) && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Project Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.completionYear && (
                <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-white/50 mb-2">
                    <Calendar size={16} />
                    <span className="text-xs uppercase tracking-wider">Year</span>
                  </div>
                  <p className="text-lg font-semibold">{project.completionYear}</p>
                </div>
              )}
              {project.projectDuration && (
                <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-white/50 mb-2">
                    <Clock size={16} />
                    <span className="text-xs uppercase tracking-wider">Duration</span>
                  </div>
                  <p className="text-lg font-semibold">{project.projectDuration}</p>
                </div>
              )}
              {project.teamSize && (
                <div className="p-5 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 text-white/50 mb-2">
                    <Users size={16} />
                    <span className="text-xs uppercase tracking-wider">Team Size</span>
                  </div>
                  <p className="text-lg font-semibold">{project.teamSize}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Metrics */}
        {project.metrics && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Metrics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.metrics.users && (
                <div
                  className="p-5 rounded-xl border"
                  style={{
                    borderColor: `${categoryColor}30`,
                    backgroundColor: `${categoryColor}08`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2" style={{ color: categoryColor }}>
                    <BarChart3 size={18} />
                    <span className="text-xs uppercase tracking-wider font-medium">Users</span>
                  </div>
                  <p className="text-lg font-semibold text-white">{project.metrics.users}</p>
                </div>
              )}
              {project.metrics.performance && (
                <div
                  className="p-5 rounded-xl border"
                  style={{
                    borderColor: `${categoryColor}30`,
                    backgroundColor: `${categoryColor}08`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2" style={{ color: categoryColor }}>
                    <Zap size={18} />
                    <span className="text-xs uppercase tracking-wider font-medium">
                      Performance
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-white">{project.metrics.performance}</p>
                </div>
              )}
              {project.metrics.marketPosition && (
                <div
                  className="p-5 rounded-xl border"
                  style={{
                    borderColor: `${categoryColor}30`,
                    backgroundColor: `${categoryColor}08`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2" style={{ color: categoryColor }}>
                    <TrendingUp size={18} />
                    <span className="text-xs uppercase tracking-wider font-medium">
                      Market Position
                    </span>
                  </div>
                  <p className="text-lg font-semibold text-white">
                    {project.metrics.marketPosition}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Business Impact */}
        {project.businessImpact && (
          <section className="mb-16">
            <div
              className="p-6 sm:p-8 rounded-2xl border"
              style={{
                borderColor: `${categoryColor}30`,
                background: `linear-gradient(135deg, ${categoryColor}10 0%, ${categoryColor}05 100%)`,
              }}
            >
              <h2 className="text-xl font-bold mb-3" style={{ color: categoryColor }}>
                Business Impact
              </h2>
              <p className="text-white/80 text-lg leading-relaxed">{project.businessImpact}</p>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="pb-20 text-center">
          <div className="p-8 sm:p-12 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Interested in a Similar Project?
            </h2>
            <p className="text-white/60 mb-8 max-w-lg mx-auto">
              Let&apos;s discuss how we can build something great for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://calendly.com/a-sheikhizadeh/devx-group-llc-representative"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-black transition-opacity hover:opacity-90"
                style={{ backgroundColor: categoryColor }}
              >
                Schedule a Free Consultation
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-sm font-medium text-white bg-white/10 hover:bg-white/20 transition-colors border border-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
