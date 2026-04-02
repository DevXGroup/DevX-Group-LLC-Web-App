'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const clients = [
  { name: 'Lawazm', monogram: 'LW', country: 'Kuwait' },
  { name: 'Lazurd', monogram: 'LZ', country: 'Kuwait' },
  { name: 'Joyful', monogram: 'JY', country: 'Qatar' },
  { name: 'Chamrosh', monogram: 'CH', country: 'USA' },
  { name: 'Miremadi', monogram: 'MD', country: 'San Diego' },
  { name: 'WellBox', monogram: 'WB', country: 'USA' },
  { name: 'Chayyel', monogram: 'CY', country: 'Global' },
  { name: 'Zahra Farm', monogram: 'ZF', country: 'Middle East' },
]

export default function TrustedBy() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div
      ref={ref}
      className="relative w-full py-10 sm:py-12 border-y border-white/[0.06] overflow-hidden"
    >
      {/* Subtle gradient edges to fade the scroll */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-black to-transparent" />

      <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center text-zinc-600 text-xs font-medium uppercase tracking-widest mb-8"
        >
          Trusted by teams across 3 continents
        </motion.p>

        {/* Client logo strip — responsive wrap */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center items-center gap-3 sm:gap-4"
        >
          {clients.map((client, i) => (
            <motion.div
              key={client.name}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl
                bg-white/[0.03] border border-white/[0.07]
                hover:bg-white/[0.06] hover:border-white/[0.14]
                transition-all duration-300 cursor-default"
            >
              {/* Monogram avatar */}
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0
                  bg-gradient-to-br from-white/10 to-white/5 border border-white/10
                  text-white text-[10px] font-bold tracking-wider"
              >
                {client.monogram}
              </div>
              <div className="leading-none">
                <p className="text-zinc-300 text-sm font-semibold group-hover:text-white transition-colors">
                  {client.name}
                </p>
                <p className="text-zinc-600 text-[10px] mt-0.5">{client.country}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
