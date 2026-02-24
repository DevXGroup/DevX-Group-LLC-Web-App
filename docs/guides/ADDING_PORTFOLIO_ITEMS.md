# Adding Portfolio Items — Complete Guide

> For Claude Code agents and developers working on `devx-web`.
> Follow this guide exactly to add a new project with the best possible result and minimum rework.

---

## Overview of the System

Each portfolio project is a single entry in `src/data/portfolioProjects.ts`.
From that one data object, the following are automatically generated:

| What | Where |
|------|-------|
| Project card on `/portfolio` | `EnhancedProjectCard.tsx` |
| Full detail page at `/portfolio/[project-id]` | `[project-id]/ProjectPage.tsx` |
| SEO metadata + JSON-LD | `[project-id]/page.tsx` (server) |
| Featured card on `/` home page | `FeaturedProjects.tsx` (if `isFeatured: true`) |
| Static route generation | `generateStaticParams()` — automatic |

**You only touch one file for data: `src/data/portfolioProjects.ts`**

---

## Developer Checklist — What to Provide

### Tier 1 — Minimum (card works, detail page works, no broken images)

| Item | Details |
|------|---------|
| **Banner image** | `1440×900px` or similar wide crop. WebP preferred, PNG/JPG accepted. Place at `public/images/portfolio/banners/[project-id]-banner.webp` |
| **Project name** | Full display title |
| **Short description** | 1 sentence, ≤120 chars. Shown on card. |
| **Detailed description** | 2–4 sentences. Shown on detail page "Project Overview". |
| **Category** | Must match or extend `categoryColors` (see list below) |
| **Services** | Array of services from the standard list (see below) |
| **Technologies** | Array of tech stack strings (free-form) |
| **Platforms** | e.g. `['iOS', 'Android', 'Web', 'Admin Dashboard']` |
| **Key features** | 4–8 bullet strings — concrete, not generic |

### Tier 2 — Recommended (best card + detail page quality)

| Item | Details |
|------|---------|
| **Preview image** | Same as banner or cropped/portrait version. Place at `public/images/portfolio/previews/[project-id]-preview.webp` |
| **3–5 screenshots** | See screenshot spec below. Place at `public/images/portfolio/screenshots/[project-id]/screen-1.png` etc. |
| **Metrics** | `users`, `performance`, `marketPosition` — concrete numbers, not vague claims |
| **Business impact** | 1 sentence with a result: "Increased revenue by X" or "Helped users do Y" |
| **Completion year** | 4-digit string e.g. `'2024'` |
| **Project duration** | e.g. `'6 months'` |
| **Team size** | e.g. `'5 developers'` |
| **Highlights** | 2–3 short strings shown on card hover |

### Tier 3 — Optional (enables extra UI elements)

| Item | Enables |
|------|---------|
| `visitUrl` | "View Live Site" button on detail page + globe icon on card |
| `githubUrl` | "GitHub Repo" button on detail page + GitHub icon on card. Use only for open-source / publicly available repos |
| `demoUrl` | "Live Demo" button on detail page |
| `appStoreUrl` | Renders iOS badge on card platform section |
| `playStoreUrl` | Renders Android badge on card platform section |
| `videoUrl` + `videoPoster` | Replaces banner image with autoplay video on card and detail hero |
| `currentNote` | Small badge below title (e.g. `'E-commerce coming soon'`) |
| `isFeatured: true` | Shows in Featured Work section on home page. **Limit to 3 total featured projects at a time.** |
| `isCurrentProject: true` | Shows in "Current Project" section at top of `/portfolio` |
| `awards` | Award icon shown on card |
| `clientTestimonial` | Available for future testimonial section |

---

## Screenshot Spec

Screenshots power the `ImageCarousel` on the detail page.

| Property | Value |
|----------|-------|
| **Format** | PNG or WebP |
| **Aspect ratio** | Portrait (9:16 or 3:4) for mobile apps, Landscape (16:9) for web apps |
| **Resolution** | Mobile: `390×844px` minimum. Web: `1440×900px` minimum |
| **Count** | 3–5 is ideal. Fewer than 1 → falls back to banner image. Exactly 1 → `SingleImageDisplay`. 2+ → `ImageCarousel` |
| **File naming** | `screen-1.png`, `screen-2.png`, … (sequential) |
| **Path** | `public/images/portfolio/screenshots/[project-id]/screen-N.png` |

**How to capture (Chrome):**
Open site → DevTools → ⌘⇧P → "Capture full size screenshot" (web) or use device emulation at 390px width for mobile apps.

**All-in-one screenshot** (optional, e.g. `lawazm-all-in-one.webp`):
A composite mockup showing multiple screens. Can be listed first in the `screenshots` array for maximum visual impact.

---

## Category & Color Reference

When adding a new project, pick an existing category or add a new one to `categoryColors`:

```ts
// Existing categories
'AI/Communication':       '#9d4edd'  // purple
'Mobile App/Wellness':    '#4CD787'  // green
'E-commerce/Household':   '#4834D4'  // indigo
'E-commerce/Confectionery':'#FFD700' // gold
'Luxury/Food':            '#ff6b6b'  // coral
'Education/E-learning':   '#00D2FF'  // cyan
'Agriculture/IoT':        '#4CD787'  // green
'Health/Fitness':         '#9d4edd'  // purple
'Gaming/Entertainment':   '#ff6b6b'  // coral
'Healthcare':             '#67E8F9'  // light cyan
'AI/Education':           '#00D2FF'  // cyan
'Web App/Travel':         '#4CD787'  // green
```

To add a new category, append to the `categoryColors` object at the bottom of `portfolioProjects.ts`.

---

## Standard Services List

Use only these values in the `services` array (controls `serviceMapping`):

- `'Custom Software Development'`
- `'AI & Machine Learning'`
- `'Mobile App Development'`
- `'Web Development'`
- `'Cloud Solutions'`
- `'Database Solutions'`
- `'IoT Hardware & Edge Computing'`
- `'DevOps'`
- `'UI/UX Design'`
- `'Digital Transformation'`
- `'API Development'`

---

## Step-by-Step: Adding a New Project (Claude Code)

### 1. Receive assets from developer

Confirm developer has provided at minimum:
- [ ] Banner image at correct path
- [ ] Project name, short description, detailed description
- [ ] Category, services, technologies, platforms, key features

### 2. Determine project position in the array

- `isCurrentProject: true` → insert near the **top** of the array (after existing current projects)
- Completed client project → insert **before** the closing `]`, after existing non-current projects
- Open source / side project → same as completed client project

### 3. Add the entry to `portfolioProjects.ts`

Copy the template below and fill in all fields:

```ts
{
  id: 'kebab-case-project-name',          // URL slug — must be unique, kebab-case
  title: 'Full Display Title',
  shortDescription: 'One sentence, ≤120 chars.',
  detailedDescription:
    'Two to four sentences describing what was built, why, and for whom.',
  category: 'Category/Subcategory',       // must exist in categoryColors
  services: ['Web Development', '...'],   // from standard list above
  technologies: ['Next.js', 'TypeScript', '...'],
  platforms: ['Web', 'iOS', '...'],
  keyFeatures: [
    'Feature one — concrete, specific',
    'Feature two',
    // 4–8 items
  ],
  images: {
    banner: '/images/portfolio/banners/[id]-banner.webp',
    preview: '/images/portfolio/previews/[id]-preview.webp',
    bannerAlt: 'Describe what is visible in the banner image — for SEO + a11y',
    previewAlt: 'Describe the preview image',
    // Include screenshots array only if images are confirmed to exist:
    screenshots: [
      '/images/portfolio/screenshots/[id]/screen-1.png',
      '/images/portfolio/screenshots/[id]/screen-2.png',
      '/images/portfolio/screenshots/[id]/screen-3.png',
    ],
    screenshotAlts: [
      'Describe screen 1',
      'Describe screen 2',
      'Describe screen 3',
    ],
  },
  metrics: {
    users: '10,000+ Active Users',         // concrete number preferred
    performance: 'Sub-100ms response',
    marketPosition: 'Leading X in Region',
  },
  businessImpact: 'One sentence with a measurable outcome.',
  completionYear: '2024',
  projectDuration: '4 months',
  teamSize: '5 developers',
  // Add only if applicable:
  visitUrl: 'https://example.com',
  githubUrl: 'https://github.com/DevXGroup/...',   // open source only
  appStoreUrl: 'https://apps.apple.com/...',
  playStoreUrl: 'https://play.google.com/...',
  demoUrl: 'https://demo.example.com',
  isCurrentProject: true,                          // omit if completed
  isFeatured: true,                                // max 3 featured total
  currentNote: 'Beta launching soon',              // omit if not needed
  highlights: [
    'Two to three short memorable facts',
    'Shown on card hover',
  ],
}
```

### 4. Update `serviceMapping` (if using new services)

If the project uses a service combination not yet in `serviceMapping`, add the project id to the relevant service key:

```ts
export const serviceMapping = {
  'Web Development': ['chatfly', 'lawazm', ..., 'your-new-id'],
  ...
}
```

### 5. Update `categoryColors` (if using a new category)

```ts
export const categoryColors = {
  ...
  'Your/NewCategory': '#hexcolor',
}
```

### 6. Verify image paths exist

Before finishing, confirm that referenced image files actually exist in `public/`:

```bash
ls public/images/portfolio/banners/[id]-banner.*
ls public/images/portfolio/screenshots/[id]/
```

If images are placeholder paths (not yet provided by developer), note them as `# TODO: awaiting assets` in a comment next to the screenshots array, or omit the `screenshots` key entirely until assets arrive.

### 7. Run quality checks

```bash
pnpm tsc --noEmit    # zero new errors
pnpm lint            # zero Prettier / ESLint errors
pnpm dev             # visually verify at /portfolio and /portfolio/[id]
```

---

## Featured Projects Policy

The home page shows `isFeatured: true` projects in `FeaturedProjects.tsx`.

**Rules:**
- Keep **exactly 3** featured projects at a time for the best grid layout
- Featured projects should represent diversity: ideally one open-source, one enterprise client, one mobile/AI
- To rotate featured projects: set `isFeatured: false` on one entry and `isFeatured: true` on another
- Current featured: `miremadi`, `interview-prep`, `flight-tracker`

---

## Image Asset Quick Reference

```
public/
└── images/
    └── portfolio/
        ├── banners/
        │   └── [project-id]-banner.webp       ← wide, 1440×900+, used on card + detail hero
        ├── previews/
        │   └── [project-id]-preview.webp      ← square or portrait crop, used for OG image fallback
        └── screenshots/
            └── [project-id]/
                ├── screen-1.png               ← primary / most impressive screen
                ├── screen-2.png
                └── screen-3.png
```

---

## What Makes a 10/10 Project Entry

| Signal | Why it matters |
|--------|----------------|
| Specific metrics (`75,000+ users`, `200% revenue increase`) | Builds client trust — vague claims hurt credibility |
| 3+ screenshots with good alt text | Powers the carousel; alt text is an SEO signal |
| Clear `businessImpact` sentence | The most-read line in the modal / detail page |
| `highlights` array (2–3 items) | Shown on card hover — first thing a visitor reads on interaction |
| `githubUrl` for open-source projects | Signals technical transparency |
| `visitUrl` for live projects | Enables the "View Live Site" CTA — biggest conversion driver |
| Accurate `services` array | Feeds the service filter / mapping system |

---

## What NOT to Do

- ❌ Do not add `screenshots` paths that don't exist yet — broken images hurt UX
- ❌ Do not set `isFeatured: true` on more than 3 projects simultaneously
- ❌ Do not use `githubUrl` for private / client repos
- ❌ Do not create new service strings outside the standard list without also adding them to `serviceMapping`
- ❌ Do not use a new category without adding it to `categoryColors`
- ❌ Do not commit until the developer has manually tested at `pnpm dev`
