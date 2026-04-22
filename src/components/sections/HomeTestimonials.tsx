'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef, useState } from 'react'
import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    quote:
      'DevX Group has been assisting our company for the past three years in developing and implementing new and customized solutions utilizing cutting-edge technologies. Their dedication to precision and discipline ensures that great solutions are delivered with minimal redesign.',
    fullQuote:
      'DevX Group has been assisting our company for the past three years in developing and implementing new and customized solutions utilizing cutting-edge technologies. Their dedication to precision and discipline ensures that great solutions are delivered with minimal redesign. We strongly recommend them to knowledgeable clients seeking a highly productive and solution-focused team.',
    author: 'Chamrosh Inc',
    role: 'Founder & CEO',
    monogram: 'CH',
    highlight: '3 years & counting',
  },
  {
    quote:
      "The DevX Group team showed high professionalism — very responsive, punctual, and on time. They always provided feedback and recommendations from a professional point of view. I'm very pleased and satisfied with our collaboration.",
    fullQuote:
      "The DevX Group team showed high professionalism handling our project, starting with collecting all the required data to precisely understand our operations' needs, to providing a clear approach and an accurate timeline. Very transparent payables. Very responsive, punctual, and on time. I'm very pleased and satisfied with our collaboration; I see it will last many years. I would HIGHLY RECOMMEND them for anyone seeking a professional partner!",
    author: 'Lawazm Inc',
    role: 'CEO',
    monogram: 'LW',
    highlight: '75,000+ users launched',
  },
  {
    quote:
      'Our partnership with DevX Group has driven our company to be a leader in online channels. We recommend them for any business looking to have an active online presence creatively.',
    fullQuote:
      'Our partnership with DevX Group has driven our company to be a leader in online channels. We recommend them for any business looking to have an active online presence creatively.',
    author: 'Lazurd Inc',
    role: 'CEO',
    monogram: 'LZ',
    highlight: '#1 in Kuwait App Store',
  },
]

export default function HomeTestimonials() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [expanded, setExpanded] = useState<number | null>(null)
  const reducedMotion = useReducedMotion()

  return (
    <section
      ref={ref}
      data-testid="testimonials-section"
      className="relative py-20 sm:py-28 overflow-hidden"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-[#9d4edd]/5 blur-[100px]" />
      </div>

      <div className="relative z-10 container mx-auto px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Header */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 20 }}
          animate={reducedMotion ? { opacity: 1 } : isInView ? { opacity: 1, y: 0 } : {}}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#9d4edd]/30 bg-[#9d4edd]/5 text-[#9d4edd] text-xs font-medium tracking-wider uppercase mb-6">
            <Star size={11} className="fill-[#9d4edd]" />
            Client Stories
          </div>
          <h2 className="heading-subsection text-white mb-4">What our clients say</h2>
          <p className="subtitle-sm text-zinc-500 max-w-md mx-auto">
            Long-term partnerships with businesses who trust us to build and grow their digital
            products.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              animate={reducedMotion ? { opacity: 1 } : isInView ? { opacity: 1, y: 0 } : {}}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
              }
              className="group relative flex flex-col rounded-2xl bg-white/[0.03] border border-white/[0.08]
                hover:bg-white/[0.05] hover:border-white/[0.14] transition-all duration-300 p-6"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={12} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote icon */}
              <Quote size={18} className="text-white/10 mb-3 flex-shrink-0" />

              {/* Quote text */}
              <p className="text-zinc-400 text-sm leading-relaxed flex-1 mb-5">
                {expanded === i ? t.fullQuote : t.quote}
                {t.quote !== t.fullQuote && (
                  <button
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    className="ml-1.5 text-zinc-500 hover:text-zinc-300 text-xs underline underline-offset-2 transition-colors"
                  >
                    {expanded === i ? 'show less' : 'read more'}
                  </button>
                )}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.07]">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0
                    bg-gradient-to-br from-white/10 to-white/5 border border-white/10
                    text-white text-[11px] font-bold"
                >
                  {t.monogram}
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm font-semibold leading-tight">{t.author}</p>
                  <p className="text-zinc-500 text-xs mt-0.5">{t.role}</p>
                </div>
                <div className="ml-auto flex-shrink-0">
                  <span className="text-[10px] text-zinc-600 bg-white/[0.04] border border-white/[0.08] px-2 py-1 rounded-full whitespace-nowrap">
                    {t.highlight}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
