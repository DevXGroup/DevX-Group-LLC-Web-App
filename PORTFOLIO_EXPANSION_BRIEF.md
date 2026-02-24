# Portfolio Expansion — Implementation Brief

> **For Claude Code agents**: Read this file at the start of a new session to fully understand and execute the portfolio expansion task. All decisions have been made — implement exactly as described.

---

## What We're Building

1. **Individual project pages** at `/portfolio/[project-id]` — replaces modal popups, gives each project an SEO-indexed URL
2. **Featured Projects section** on the home page — show 3 pinned projects to attract customers
3. **Add 3 new projects** — Interview Prep, Flight Tracker (new), and update Miremadi Web
4. **GitHub + Live Demo links** on project cards and detail pages
5. **Screenshot-based media strategy** — no more video requirements for new projects

---

## Current Codebase State

### Portfolio data — `src/data/portfolioProjects.ts`
- 12 projects in a `portfolioProjects` array
- `ProjectData` interface drives everything
- **Modal-only** — "View Details" opens `ProjectDetailModal`, no individual URLs

### Portfolio page — `src/app/portfolio/`
- `page.tsx` (server) → `PortfolioPage.tsx` (client)
- Grid of `EnhancedProjectCard` components
- `ProjectDetailModal` renders in a portal overlay
- Two sections: "Current Project" (isCurrentProject: true) and "Review Selected Projects"

### Home page — `src/app/home/HomePageClient.tsx`
- 4 sections: Hero → FeaturesSection → ProcessSection → DevelopmentToolsSection
- **No portfolio section exists yet**

### Portfolio components — `src/components/portfolio/`
- `EnhancedProjectCard.tsx` — card with hover effects, category badge, metrics
- `ProjectDetailModal.tsx` — full-screen overlay modal (to be retired)
- `ImageCarousel.tsx` — multi-screenshot carousel (REUSE in new pages)
- `SingleImageDisplay.tsx` — single screenshot display (REUSE in new pages)

---

## Step 1 — Extend `ProjectData` Interface

In `src/data/portfolioProjects.ts`, add to the `ProjectData` interface:

```ts
githubUrl?: string      // GitHub repo URL
isFeatured?: boolean    // show in home page Featured Work section
```

Also add to `categoryColors` object:
```ts
'AI/Education': '#00D2FF',
'Web App/Travel': '#4CD787',
```

---

## Step 2 — Add/Update Projects in `portfolioProjects.ts`

### UPDATE: Miremadi (`id: 'miremadi'` — existing entry)

Add to existing entry:
```ts
githubUrl: 'https://github.com/DevXGroup/Miremadi-Dermatology-Web',
isFeatured: true,
```

Update `technologies` array to:
```ts
['Vite', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Supabase', 'Stripe', 'Framer Motion', 'React Three Fiber', 'PWA', 'i18next', 'Google Analytics 4', 'Zustand', 'React Router']
```

Update `platforms` to include `'PWA'`.

Update `keyFeatures` to include:
- PWA support (installable on mobile)
- E-commerce shop with Stripe checkout
- Admin dashboard (product management)
- Blog engine
- Internationalization (i18next)
- Dark/light mode
- Glassmorphism UI design
- Real-time data with Supabase

Update `detailedDescription` to reflect the full feature set above.

Add screenshots once user provides them (see Image Assets section below).

---

### NEW: Interview Prep (`id: 'interview-prep'`)

```ts
{
  id: 'interview-prep',
  title: 'Engineering Manager Interview Prep',
  shortDescription: 'Free, open-source interview prep platform for FAANG/MAANG engineering manager and senior engineer roles.',
  detailedDescription: 'A comprehensive, open-source platform covering behavioral interviews (STAR format), system design patterns, algorithm visualizations, and company-specific guides for Meta, Amazon, Apple, Netflix, Google, and Microsoft. Features an 8-week study roadmap, interactive quizzes, progress tracking, and AI-assisted preparation modules.',
  category: 'AI/Education',
  services: ['Web Development', 'AI & Machine Learning', 'Custom Software Development'],
  technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Zustand', 'D3.js', 'Recharts', 'Radix UI', 'Prism.js'],
  platforms: ['Web'],
  keyFeatures: [
    'STAR format behavioral examples for 50+ scenarios',
    'System design patterns with interactive diagrams',
    'Algorithm visualizations with D3.js',
    'Company-specific guides (FAANG/MAANG)',
    '8-week structured study roadmap',
    'Interactive quizzes with progress tracking',
    'AI interview prep modules',
    'Dark mode, fully accessible (Radix UI)',
  ],
  images: {
    banner: '/images/portfolio/banners/interview-prep-banner.png',
    preview: '/images/portfolio/previews/interview-prep-preview.png',
    bannerAlt: 'Engineering Manager Interview Prep platform hero screen showing study roadmap and category navigation',
    previewAlt: 'Interview Prep dashboard with behavioral, system design, and coding sections',
    screenshots: [
      '/images/portfolio/screenshots/interview-prep/screen-1.png',
      '/images/portfolio/screenshots/interview-prep/screen-2.png',
      '/images/portfolio/screenshots/interview-prep/screen-3.png',
    ],
    screenshotAlts: [
      'Study roadmap overview with 8-week timeline and topic categories',
      'System design interview patterns with interactive architecture diagrams',
      'Behavioral interview STAR format examples and scoring rubrics',
    ],
  },
  metrics: {
    marketPosition: 'Open Source',
    performance: 'Next.js 14 App Router',
  },
  businessImpact: 'Helps software engineers and engineering managers land roles at top tech companies through structured, comprehensive interview preparation — fully free and open source.',
  completionYear: '2025',
  teamSize: '1',
  visitUrl: 'https://interviewprep.devxgroup.io/',
  githubUrl: 'https://github.com/DevXGroup/Software-Engineer-Manager-Interviw-Prep',
  isCurrentProject: true,
  isFeatured: true,
  highlights: [
    'FAANG/MAANG company-specific guides',
    'Open source & free forever',
    'Interactive algorithm visualizations',
    'AI-assisted prep modules',
  ],
}
```

---

### NEW: Flight Tracker (`id: 'flight-tracker'`)

```ts
{
  id: 'flight-tracker',
  title: 'Max Live Flight Tracker',
  shortDescription: 'Real-time flight tracking with interactive maps, millisecond-accurate delay updates, and live arrival/departure data.',
  detailedDescription: 'A real-time flight tracking web application featuring an interactive Leaflet map with live flight paths, 30-second position updates, timezone-aware time display, and accurate distance/progress calculations. Integrates OpenSky Network, AviationStack, and Amadeus APIs for comprehensive flight data. Built with a glassmorphism UI and 3D visualizations.',
  category: 'Web App/Travel',
  services: ['Web Development', 'Custom Software Development', 'API Development'],
  technologies: ['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS v4', 'Leaflet', 'React Leaflet', 'Three.js', 'Framer Motion', 'date-fns', 'OpenSky Network API', 'AviationStack API', 'Amadeus API'],
  platforms: ['Web'],
  keyFeatures: [
    'Interactive real-time map with live flight paths',
    'Live position updates every 30 seconds',
    'Millisecond-accurate arrival/departure times with delays',
    'Timezone-aware time display',
    'Accurate distance and progress calculations',
    'Glassmorphism UI design',
    '3D data visualizations with Three.js',
    'Multiple aviation data API integrations',
  ],
  images: {
    banner: '/images/portfolio/banners/flight-tracker-banner.png',
    preview: '/images/portfolio/previews/flight-tracker-preview.png',
    bannerAlt: 'Max Live Flight Tracker showing interactive world map with real-time flight paths and glassmorphism UI',
    previewAlt: 'Flight tracker dashboard with live flight positions on an interactive Leaflet map',
    screenshots: [
      '/images/portfolio/screenshots/flight-tracker/screen-1.png',
      '/images/portfolio/screenshots/flight-tracker/screen-2.png',
      '/images/portfolio/screenshots/flight-tracker/screen-3.png',
    ],
    screenshotAlts: [
      'Interactive world map with live flight paths and position markers',
      'Flight detail panel showing real-time arrival/departure times and delay information',
      'Search and filter interface for tracking specific flights or routes',
    ],
  },
  metrics: {
    performance: 'Real-time, 30s updates',
    marketPosition: 'Open Source',
  },
  businessImpact: 'Demonstrates real-time data integration, interactive mapping, and multi-API orchestration — showcasing capability for complex, data-intensive web applications.',
  completionYear: '2025',
  teamSize: '1',
  githubUrl: 'https://github.com/DevXGroup/Max-Live-Flight-Tracker',
  isCurrentProject: true,
  isFeatured: true,
  highlights: [
    'Real-time live flight positions',
    'Interactive Leaflet map with flight paths',
    '3 aviation API integrations',
    'Millisecond-accurate delay tracking',
  ],
}
```

---

## Step 3 — Individual Project Pages (biggest SEO win)

### Create `src/app/portfolio/[project-id]/page.tsx` (server component)

```tsx
import { notFound } from 'next/navigation'
import { portfolioProjects } from '@/data/portfolioProjects'
import ProjectPage from './ProjectPage'

export async function generateStaticParams() {
  return portfolioProjects.map((p) => ({ 'project-id': p.id }))
}

export async function generateMetadata({ params }) {
  const project = portfolioProjects.find((p) => p.id === params['project-id'])
  if (!project) return {}
  return {
    title: `${project.title} | DevX Group Portfolio`,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: [{ url: project.images.banner }],
      url: `/portfolio/${project.id}`,
    },
  }
}

export default function Page({ params }) {
  const project = portfolioProjects.find((p) => p.id === params['project-id'])
  if (!project) notFound()

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: project.title,
    description: project.detailedDescription,
    url: project.visitUrl ?? project.githubUrl,
    applicationCategory: project.category,
    operatingSystem: project.platforms.join(', '),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProjectPage project={project} />
    </>
  )
}
```

### Create `src/app/portfolio/[project-id]/ProjectPage.tsx` (client component)

Full-page layout mirroring the existing `ProjectDetailModal` content but as a routed page:

- **Back button**: `<Link href="/portfolio">← Back to Portfolio</Link>` (top-left, sticky on scroll)
- **Hero section**: Full-width banner image or video (if videoUrl exists)
- **Header**: Category badge + title + short description
- **Action buttons** (prominent, below title):
  - "View Live Site" → `project.visitUrl` (if exists), `target="_blank"`
  - "GitHub Repo" → `project.githubUrl` (if exists), `target="_blank"`, GitHub icon
  - "Live Demo" → `project.demoUrl` (if exists), `target="_blank"`
- **Screenshots**: Use existing `ImageCarousel` (multiple) or `SingleImageDisplay` (one)
- **Project Overview**: `project.detailedDescription`
- **Key Features**: bulleted list with icons
- **Tech Stack**: pill badges for each technology
- **Platforms**: iOS/Android/Web/Desktop badges
- **Project Details**: Year, duration, team size grid
- **Metrics**: Users, performance, market position cards
- **Business Impact**: highlighted box
- **CTA**: "Schedule a Free Consultation" → opens Calendly or links to `/contact`

Use Framer Motion fade-in animations. Reuse `OPTIMIZED_TRANSITIONS` from `src/lib/motion.ts`.

---

## Step 4 — Update Portfolio Card to Use Links

### Modify `src/components/portfolio/EnhancedProjectCard.tsx`

- Remove `onViewDetails?: (project: ProjectData) => void` prop
- Change "View Details" button to: `<Link href={/portfolio/${project.id}}>View Details</Link>`
- Add icon buttons below the card for quick access:
  - GitHub icon (if `project.githubUrl`) — `target="_blank"`, small icon button
  - Live Demo icon (if `project.visitUrl || project.demoUrl`) — `target="_blank"`, small icon button
- Keep all existing hover effects, animations, and styling

---

## Step 5 — Clean Up Portfolio Page

### Modify `src/app/portfolio/PortfolioPage.tsx`

Remove:
- `const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)` state
- `const handleViewDetails = useCallback(...)` handler
- `<ProjectDetailModal ... />` at the bottom of JSX
- `onViewDetails={handleViewDetails}` prop on `EnhancedProjectCard`
- Import of `ProjectDetailModal`

The cards are now self-contained links — no modal state needed.

---

## Step 6 — Featured Projects on Home Page

### Create `src/components/sections/FeaturedProjects.tsx` (client component, `'use client'`)

```tsx
// Filter isFeatured projects from portfolioProjects
// Layout:
// - Section heading: "Featured Work"
// - Subtitle: "Open-source & client projects built by DevX Group"
// - 3-column grid (lg:grid-cols-3, md:grid-cols-2, grid-cols-1)
// - Each card: banner image (Next.js Image), category badge, title, short description,
//   first 3 tech pills, GitHub icon link + Live Demo icon link (if available)
//   "View Project →" link to /portfolio/[id]
// - Framer Motion stagger fade-in using useScrollAnimation hook
// - "View All Projects →" link to /portfolio at bottom of section
```

Import pattern from existing sections (e.g., `Features.tsx`) for consistent padding, headings, and animation style.

### Modify `src/app/home/HomePageClient.tsx`

Add dynamic import:
```tsx
const FeaturedProjects = dynamic(() => import('@sections/FeaturedProjects'), {
  ssr: false,
  loading: () => <div className="h-96" />,
})
```

Add `<FeaturedProjects />` between `<Hero />` and `<FeaturesSection />`.

---

## Image Assets Required (user must provide before running)

The project entries use placeholder paths. User needs to capture these screenshots and place them at the correct paths:

```
/public/images/portfolio/banners/
  interview-prep-banner.png       ← screenshot of full hero/landing page (1440×900 or similar)
  flight-tracker-banner.png       ← screenshot of map view with flights visible

/public/images/portfolio/previews/
  interview-prep-preview.png      ← same as banner or cropped version
  flight-tracker-preview.png      ← same as banner or cropped version

/public/images/portfolio/screenshots/
  interview-prep/
    screen-1.png                  ← study roadmap / home page
    screen-2.png                  ← system design section
    screen-3.png                  ← behavioral interview section

  flight-tracker/
    screen-1.png                  ← map with live flights
    screen-2.png                  ← flight detail panel
    screen-3.png                  ← search/filter interface

  miremadi/ (optional, for updated hero)
    screen-1.png                  ← new hero section
    screen-2.png                  ← any other updated section
```

**How to capture**: Open the live site in Chrome at 1440px width → DevTools → Cmd+Shift+P → "Capture full size screenshot" (or "Capture screenshot" for viewport only).

---

## Conventions to Follow

- **No semicolons, single quotes, 2-space indent** (Prettier config)
- **`'use client'`** at top of client components, none for server components
- **Path aliases**: `@/*` → `src/`, `@sections/*` → `src/components/sections/`
- **Component naming**: PascalCase files, kebab-case hooks
- **No `any` types** — use proper TypeScript
- **Reuse existing**: `useScrollAnimation`, `OPTIMIZED_TRANSITIONS`, `ImageCarousel`, `SingleImageDisplay`
- **Typography classes**: use `.heading-section`, `.subtitle` etc. (see `/docs/typography/QUICK_REFERENCE.md`)
- Run `pnpm lint:fix` before finishing

---

## Verification Checklist

```bash
pnpm dev
# ✓ /portfolio — cards are links, no modal opens on "View Details"
# ✓ /portfolio/interview-prep — full page loads with GitHub link
# ✓ /portfolio/flight-tracker — full page loads with GitHub link
# ✓ /portfolio/miremadi — full page loads with live site + GitHub links
# ✓ / (home) — Featured Work section shows 3 project cards
# ✓ Check page source of /portfolio/interview-prep for JSON-LD and meta tags

pnpm build
# ✓ All 15 project routes listed as ○ (Static) in build output
# ✓ No TypeScript errors
# ✓ No build warnings about missing images (use placeholder or real images)

pnpm lint
# ✓ Zero Prettier or ESLint errors
```

---

## Files Changed Summary

| Action | File |
|--------|------|
| Modify | `src/data/portfolioProjects.ts` |
| Create | `src/app/portfolio/[project-id]/page.tsx` |
| Create | `src/app/portfolio/[project-id]/ProjectPage.tsx` |
| Modify | `src/components/portfolio/EnhancedProjectCard.tsx` |
| Modify | `src/app/portfolio/PortfolioPage.tsx` |
| Create | `src/components/sections/FeaturedProjects.tsx` |
| Modify | `src/app/home/HomePageClient.tsx` |

**Reused unchanged:**
- `src/components/portfolio/ImageCarousel.tsx`
- `src/components/portfolio/SingleImageDisplay.tsx`
- `src/hooks/useScrollAnimation.ts`
- `src/lib/motion.ts`
