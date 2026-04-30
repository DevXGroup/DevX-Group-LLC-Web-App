'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'

const Hero = dynamic(() => import('@sections/Hero'), {
  ssr: false,
  loading: () => <div className="min-h-screen min-h-[100vh] bg-black" />,
})

const FeaturedProjects = dynamic(() => import('@sections/FeaturedProjects'), {
  ssr: false,
  loading: () => <div className="h-96" />,
})

const FeaturesSection = dynamic(() => import('@sections/Features'), {
  ssr: false,
  loading: () => <div className="h-96" />,
})

const ProcessSection = dynamic(() => import('@sections/Process'), {
  ssr: false,
  loading: () => <div className="h-96" />,
})

const DevelopmentToolsSection = dynamic(() => import('@sections/DevelopmentTools'), {
  ssr: false,
  loading: () => <div className="h-96" />,
})

const TrustedBySection = dynamic(() => import('@sections/TrustedBy'), {
  ssr: false,
  loading: () => <div className="h-24" />,
})

const HomeTestimonialsSection = dynamic(() => import('@sections/HomeTestimonials'), {
  ssr: false,
  loading: () => <div className="h-96" />,
})

const NewsletterSignupSection = dynamic(() => import('@sections/NewsletterSignup'), {
  ssr: false,
  loading: () => <div className="h-48" />,
})

export default function HomePageClient() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    // Hand off from the static SSR hero to the interactive Hero on the next paint.
    requestAnimationFrame(() => {
      const fallback = document.getElementById('hero-static-fallback')
      if (fallback) fallback.remove()
    })
  }, [])

  return (
    <main
      data-page="home"
      className="relative flex min-h-screen min-h-[100vh] flex-col items-center w-full bg-black overflow-x-hidden"
    >
      <Hero />
      <TrustedBySection />
      <FeaturedProjects />
      <HomeTestimonialsSection />
      <FeaturesSection />
      <ProcessSection />
      <DevelopmentToolsSection />
      <NewsletterSignupSection />
    </main>
  )
}
