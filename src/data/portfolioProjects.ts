export interface ProjectData {
  id: string
  title: string
  shortDescription: string
  detailedDescription: string
  category: string
  services: string[]
  technologies: string[]
  platforms: string[]
  keyFeatures: string[]
  images: {
    banner: string
    preview: string
    screenshots?: string[]
    bannerAlt?: string
    previewAlt?: string
    screenshotAlts?: string[]
  }
  videoUrl?: string
  videoPoster?: string
  currentNote?: string
  metrics?: {
    users?: string
    performance?: string
    marketPosition?: string
  }
  businessImpact?: string
  clientTestimonial?: string
  completionYear?: string
  projectDuration?: string
  teamSize?: string
  visitUrl?: string
  isCurrentProject?: boolean
  appStoreUrl?: string
  playStoreUrl?: string
  demoUrl?: string
  caseStudyUrl?: string
  awards?: string[]
  highlights?: string[]
  githubUrl?: string
  isFeatured?: boolean
}

export const portfolioProjects: ProjectData[] = [
  {
    id: 'nutrify-ai',
    title: 'Nutrify.AI — The Health App Built on Real Science',
    shortDescription:
      'Not another calorie counter. Nutrify.AI reads your actual lab results, tracks biomarkers, and synthesizes everything into a daily AI-driven health plan tailored to your biology.',
    detailedDescription:
      "Most health apps give you macros and step counts. Nutrify.AI goes deeper — it starts with your actual biology.\n\nUpload a blood test PDF and the app instantly parses your biomarkers, flags anything outside optimal ranges, and builds those findings directly into your daily health plan. Every morning you get a personalized AI brief — not generic tips, but actionable guidance based on what your data says about you right now: your sleep from last night, your labs from last month, your nutrition from yesterday.\n\nThe AI remembers everything. It knows your medications, allergies, dietary restrictions, and long-term goals — and factors all of it into every response, every recommendation, every plan. Log a meal by photographing it or saying it out loud, and the AI immediately sees it in context of your full health picture.\n\nNutrify.AI also tackles what most apps ignore: supplements. It recommends what you're likely deficient in based on your lab data, then cross-checks every suggestion against your medications for interaction risks — a level of safety usually reserved for clinical dietitians.\n\nAll AI runs server-side via Supabase Edge Functions calling Gemini 2.5 Flash — no API keys on device, no privacy tradeoffs, and full context-awareness across every interaction. Built on Flutter with an emerald/obsidian design language that feels as premium as the science behind it.",
    category: 'Health/Fitness (iOS)',
    services: [
      'Mobile App Development',
      'AI & Machine Learning',
      'Custom Software Development',
      'Cloud Solutions',
    ],
    technologies: [
      'Flutter',
      'Dart',
      'Supabase',
      'Gemini 2.5 Flash',
      'Riverpod',
      'GoRouter',
      'fl_chart',
      'PostgreSQL',
      'Deno Edge Functions',
    ],
    platforms: ['iOS'],
    keyFeatures: [
      'Real lab data integration — upload blood test PDFs, get instant biomarker analysis',
      'Daily AI health brief — personalized morning plan built from your actual data',
      'AI memory — knows your medications, allergies, goals, and health history',
      'Photo & voice meal logging — describe or photograph food for instant AI analysis',
      'Biomarker trend tracking with clinical reference ranges and AI interpretation',
      'AI supplement recommendations with drug interaction safety checks',
      'Sleep quality analysis — correlates rest with caffeine, alcohol, and exercise patterns',
      '7-day AI meal plans tailored to TDEE, biomarkers, and dietary restrictions',
      'AI nutrition assistant — ask anything, get answers grounded in your own health data',
      'Secure server-side AI — no API keys on device, full context privacy',
    ],
    images: {
      banner: '/images/portfolio/screenshots/nutrify-ai/today.webp',
      preview: '/images/portfolio/screenshots/nutrify-ai/splash.webp',
      bannerAlt: 'Nutrify.AI today activity dashboard with AI health brief and daily action items',
      previewAlt: 'Nutrify.AI splash screen with emerald obsidian branding',
      screenshots: [
        '/images/portfolio/screenshots/nutrify-ai/splash.webp',
        '/images/portfolio/screenshots/nutrify-ai/onboarding.webp',
        '/images/portfolio/screenshots/nutrify-ai/today.webp',
        '/images/portfolio/screenshots/nutrify-ai/chat.webp',
        '/images/portfolio/screenshots/nutrify-ai/labs.webp',
        '/images/portfolio/screenshots/nutrify-ai/settings.webp',
        '/images/portfolio/screenshots/nutrify-ai/auth.webp',
        '/images/portfolio/screenshots/nutrify-ai/components.webp',
      ],
      screenshotAlts: [
        'Nutrify.AI splash screen with brand logo on dark emerald theme',
        'Onboarding goal selection — lose weight, gain muscle, improve sleep and more',
        'Today activity dashboard with AI morning brief and daily action items',
        'AI nutrition assistant chat with Gemini-powered health coaching',
        'Biomarker labs and trends with AI-analyzed blood test results',
        'Settings and profile management with health preferences',
        'Authentication and login screen with Supabase Auth',
        'Component kit and UI elements in the emerald design system',
      ],
    },
    currentNote: 'Coming to App Store — pending Apple Developer account approval',
    metrics: {
      users: 'App Store launch pending',
      performance: 'Gemini 2.5 Flash AI — server-side only',
      marketPosition: 'iOS-first, Android coming',
    },
    businessImpact:
      "Built a clinical-grade AI health platform in 3 months — from biomarker parsing and lab PDF analysis to daily personalized coaching — at a fraction of what a dedicated medtech team would cost. Demonstrates DevX Group's ability to ship production Flutter apps with sophisticated, safety-aware AI backends.",
    completionYear: '2025',
    projectDuration: '3 months',
    teamSize: '2 specialists',
    appStoreUrl: 'https://apps.apple.com/app/nutrify-ai/id0000000000',
    isCurrentProject: true,
    isFeatured: true,
    highlights: [
      'Reads real labs — parses blood test PDFs into live biomarker data',
      'Daily AI brief built from your sleep, nutrition & lab results',
      'Knows your meds, allergies & goals — remembers everything',
    ],
  },
  {
    id: 'nutrify-web',
    title: 'Nutrilogical.co — Nutrify.AI Marketing Site',
    shortDescription:
      'Editorial dark-theme landing page for Nutrify.AI with a live phone slideshow, GSAP scroll cinematics, and Lenis-smooth scrolling. Built to convert iOS waitlist signups.',
    detailedDescription:
      'Nutrilogical.co is the launch site for the Nutrify.AI iOS app. The brief was simple: tell the story without screaming. We went editorial. A serif display face (Cormorant) carries the headlines, a tight sans handles body, and the whole page sits on a near-black background that lets the green brand accent do the heavy lifting.\n\nThe centerpiece is an interactive iPhone mock with real iOS screens cycling on auto-rotate, with manual swipe and arrow controls. GSAP runs the scroll cinematics: feature cards parallax in, the phone tilts on enter, the data cards (lab values, macros, sleep trends) reveal in a staggered cascade. Lenis makes the whole journey feel like one motion instead of jumping between sections.\n\nUnder the hood it is fast and boring on purpose: vanilla HTML/CSS/JS, no framework, no build step, no SPA router. Pre-decoded hero images, lazy decode for below-the-fold screens, and a single inlined critical CSS payload mean the hero paints in under a second on a cold load. Auto-deploy from GitHub to Hostinger ships changes in about ten seconds.\n\nThe site doubles as a waitlist funnel: an "email me on launch day" form captures pre-launch interest, the App Store and Play Store buttons stay disabled with a "Coming soon" treatment until the apps ship, and a QR code lets desktop visitors hand the site to their phone in one scan.',
    category: 'Marketing Site',
    services: [
      'Web Design',
      'Web Development',
      'Brand Experience',
      'Performance Engineering',
      'SEO',
    ],
    technologies: [
      'HTML5',
      'CSS3',
      'Vanilla JavaScript',
      'GSAP',
      'ScrollTrigger',
      'Lenis',
      'Schema.org JSON-LD',
      'Open Graph',
      'Hostinger',
      'GitHub Webhooks',
    ],
    platforms: ['Web', 'PWA-ready'],
    keyFeatures: [
      'Editorial dark UI with Cormorant serif headlines and emerald accent',
      'Interactive iPhone mock with auto-rotating real iOS screens, swipe + arrow nav',
      'GSAP-driven scroll cinematics: parallax, staggered reveals, phone tilt on enter',
      'Lenis smooth-scroll bridged into ScrollTrigger for one continuous motion feel',
      'Sub-1s hero paint via critical CSS inline + pre-decoded hero images',
      'Pre-launch waitlist form with launch-day email capture',
      'Disabled App Store / Play Store buttons until apps ship',
      'QR code for desktop-to-phone handoff',
      'Schema.org + Open Graph metadata for social sharing and SEO',
      'Vanilla stack, no build step, GitHub auto-deploy to Hostinger in 10s',
    ],
    images: {
      banner: '/images/portfolio/screenshots/nutrify-web/01-hero.webp',
      preview: '/images/portfolio/screenshots/nutrify-web/01-hero.webp',
      bannerAlt:
        'Nutrilogical.co hero with Eat better, Sleep deeper, Train smarter editorial headline next to a live iPhone mock',
      previewAlt: 'Nutrify.AI marketing site hero with iOS phone mockup',
      screenshots: [
        '/images/portfolio/screenshots/nutrify-web/01-hero.webp',
        '/images/portfolio/screenshots/nutrify-web/02-features.webp',
        '/images/portfolio/screenshots/nutrify-web/03-howitworks.webp',
        '/images/portfolio/screenshots/nutrify-web/04-faq.webp',
      ],
      screenshotAlts: [
        'Hero section with editorial headline and live iPhone slideshow on the right',
        'Headline stats and Personalized insight section with feature cards',
        'How it works section showing meal plan, grocery list, and workout cards',
        'Closing CTA with launch-day waitlist signup and disabled store buttons',
      ],
    },
    metrics: {
      performance: 'Sub-1s hero paint (LCP)',
      marketPosition: 'Pre-launch waitlist funnel',
    },
    businessImpact:
      'Built the Nutrify.AI marketing surface in under a week. Editorial dark aesthetic, live phone slideshow, GSAP scroll cinematics, and a waitlist that collects launch-day intent before the app ships.',
    completionYear: '2025',
    projectDuration: 'Under a week',
    teamSize: '1',
    visitUrl: 'https://nutrilogical.co/',
    isCurrentProject: true,
    isFeatured: true,
    highlights: [
      'Editorial dark UI with serif display + emerald brand accent',
      'Live iPhone slideshow with real iOS screens, swipe + arrows',
      'GSAP scroll cinematics smoothed with Lenis',
      'Sub-1s hero paint, vanilla stack, no build step',
    ],
  },
  {
    id: 'transcribr',
    title: 'Transcribr Flow — Private Mac Transcription and Dictation',
    shortDescription:
      'Drop a file, paste a media URL, or hold a shortcut to dictate into any app. Whisper runs on-device so audio never leaves your Mac. Submitted to the App Store; direct download lives at transcribr.devxgroup.io.',
    detailedDescription:
      'Transcribr Flow is a native macOS app that turns audio into clean, timestamped text without ever touching the cloud. Whisper runs locally through WhisperKit on Apple Silicon, the cleanup pass runs through a local Ollama model, and the global hold-to-talk dictation works across any app on the system.\n\nThree input paths cover almost every use case. Drop an MP4, MOV, MP3, WAV, M4A, FLAC, or WebM file straight onto the window. Paste a media URL and the app downloads, normalizes, and transcribes it. Or hold ⌃⌥Space anywhere on the system to record dictation that pastes into the focused app the moment you let go.\n\nA picker covers Whisper Tiny through optimized Large v3 Turbo so the user trades speed for accuracy on their own terms. Auto language detection covers 16 languages out of the box. The optional Ollama cleanup pass strips filler words and fixes grammar, still fully offline. Output exports as plain text, SRT, or VTT, with or without word-level timestamps.\n\nThe codebase ships as two SKUs from one source. The App Store SKU runs sandboxed and supports direct media URLs only. The direct-download SKU at transcribr.devxgroup.io bundles broader URL support via yt-dlp for users who need it. Same engine, different distribution paths.',
    category: 'macOS App',
    services: ['Custom Software Development', 'AI & Machine Learning', 'Mobile App Development'],
    technologies: [
      'Swift',
      'SwiftUI',
      'WhisperKit',
      'Core ML',
      'Ollama',
      'Core Audio',
      'AVFoundation',
      'CGEventTap',
      'yt-dlp',
    ],
    platforms: ['macOS'],
    keyFeatures: [
      'Fully offline — Whisper and the cleanup LLM both run on-device',
      'Drag-and-drop transcription for MP4, MOV, MP3, WAV, M4A, FLAC, WebM',
      'Live recording with real-time transcript and waveform visualization',
      'Media URL ingest with yt-dlp on the direct-download build',
      'Whisper model picker from Tiny (77 MB) through optimized Large v3 Turbo',
      'Auto language detection across 16 languages',
      'Local Ollama cleanup for grammar and filler-word removal',
      'Word-level timestamped export to TXT, SRT, or VTT',
      'Global hold-to-talk dictation (⌃⌥Space) that pastes into any app',
      'Sandboxed App Store SKU and notarized direct DMG from a single codebase',
    ],
    images: {
      banner: '/images/portfolio/screenshots/transcribr/screen-01.webp',
      preview: '/images/portfolio/screenshots/transcribr/screen-03.webp',
      bannerAlt:
        'Transcribr macOS app main interface showing drag-and-drop audio transcription with model selection panel',
      previewAlt: 'Transcribr transcript view with timestamped segments and export options',
      screenshots: [
        '/images/portfolio/screenshots/transcribr/screen-01.webp',
        '/images/portfolio/screenshots/transcribr/screen-02.webp',
        '/images/portfolio/screenshots/transcribr/screen-03.webp',
        '/images/portfolio/screenshots/transcribr/screen-04.webp',
      ],
      screenshotAlts: [
        'Transcribr main UI with drag-and-drop zone, file picker, record button, and URL paste field',
        'Transcribr live recording mode with real-time transcript segments and waveform visualization',
        'Transcribr completed transcript with timestamps, Copy, Export, and Remix controls',
        'Transcribr language picker and Ollama LLM cleanup settings panel',
      ],
    },
    currentNote: 'In review on the Mac App Store. Direct download at transcribr.devxgroup.io.',
    metrics: {
      users: 'On-device. Zero cloud dependency.',
      performance: 'WhisperKit + Ollama on Apple Silicon',
      marketPosition: 'Privacy-first transcription and dictation for macOS',
    },
    businessImpact:
      "Transcribr Flow shows DevX Group's ability to ship a polished native macOS app with on-device AI on two distribution channels at once. Same codebase serves the Mac App Store under sandbox constraints and a notarized direct DMG with broader URL support. Demonstrates the engineering judgment to design around App Store guidelines without compromising the product the team actually wanted to build.",
    completionYear: '2026',
    projectDuration: '2 months',
    teamSize: '2 specialists',
    isCurrentProject: true,
    isFeatured: true,
    visitUrl: 'https://transcribr.devxgroup.io',
    highlights: [
      'On-device Whisper, no audio leaves the Mac',
      'Global ⌃⌥Space dictation that pastes into any app',
      'Sandboxed App Store SKU plus direct DMG from one codebase',
      'Ollama cleanup for grammar and filler-word removal',
    ],
  },
  {
    id: 'miremadi',
    title: 'Miremadi Dermatology Medical Clinic',
    shortDescription:
      'Transformed a neglected clinic website with missing services and poor SEO into a premium, e-commerce-ready digital presence — delivered in under 4 weeks.',
    detailedDescription:
      "Dr. Miremadi's practice had an outdated website that misrepresented their services, omitted key treatments entirely, and ranked poorly in search results — actively costing them patients. They reached out to DevX, and in under 4 weeks we rebuilt their entire digital presence from the ground up.\n\nThe result is a premium web application built on Vite + React 19 with an Attio-inspired design system — featuring glassmorphism UI, dark/light mode, micro-interactions powered by Framer Motion, and full PWA support so patients can install it on mobile. Every service the clinic offers is now accurately showcased with structured, SEO-optimized content.\n\nBeyond the patient-facing site, we built a complete e-commerce infrastructure: Stripe-integrated checkout via Supabase Edge Functions, a secure admin dashboard for order management and fulfillment, a wishlist system, a blog engine for dermatology insights, and internationalization via i18next. The shop and payment flow are fully implemented with Row Level Security and Role-Based Access Control — ready to activate once regulatory clearance is obtained.",
    category: 'Healthcare',
    services: ['Web Design', 'Web Development', 'Brand Experience', 'SEO'],
    technologies: [
      'Vite',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'Supabase',
      'Stripe',
      'Framer Motion',
      'React Three Fiber',
      'PWA',
      'i18next',
      'Google Analytics 4',
      'Zustand',
      'React Router',
    ],
    platforms: ['Website', 'PWA'],
    keyFeatures: [
      'Full website rebuilt in under 4 weeks',
      'All clinic services accurately showcased (previously missing or misrepresented)',
      'SEO-optimized structure with structured data and service pages',
      'Attio-inspired glassmorphism UI with dark/light mode',
      'PWA support — installable on mobile with offline capabilities',
      'E-commerce shop with Stripe checkout (built, pending activation)',
      'Secure admin dashboard for order management and fulfillment',
      'Blog engine for dermatology content marketing',
      'Internationalization (i18next) for multilingual support',
      'Real-time backend via Supabase with RLS and RBAC',
      'Google Analytics 4 with core event tracking',
      'Physician credibility and trust signal design',
    ],
    images: {
      banner: '/images/portfolio/screenshots/miremadi/01-hero.webp',
      preview: '/images/portfolio/screenshots/miremadi/01-hero.webp',
      bannerAlt:
        'Miremadi Dermatology homepage hero with editorial headline Meticulous Care for Your Skin',
      previewAlt: 'Miremadi Dermatology homepage preview with Reclaim Your Confidence callout',
      screenshots: [
        '/images/portfolio/screenshots/miremadi/01-hero.webp',
        '/images/portfolio/screenshots/miremadi/02-services.webp',
        '/images/portfolio/screenshots/miremadi/03-services-page.webp',
        '/images/portfolio/screenshots/miremadi/04-about.webp',
      ],
      screenshotAlts: [
        'Hero with Meticulous Care for Your Skin headline and Reclaim Your Confidence card',
        'Patient-First Care, Holistic Approach, and Cutting-Edge Tech feature trio',
        'Services page with Advanced Aesthetic Solutions: Venus Bliss, Viva MD, Freeze, and Botox & Fillers',
        'About page with Dr. Arjang K. Miremadi MD FAAD biography and 5-star rating card',
      ],
    },
    currentNote: 'E-commerce coming soon',
    metrics: {
      users: 'All services now correctly represented',
      performance: 'SEO-optimized, PWA-ready',
      marketPosition: 'Premium clinic digital presence',
    },
    businessImpact:
      'Replaced an outdated, service-misrepresenting website with a premium digital presence that fully showcases the clinic — built in under 4 weeks with a complete e-commerce infrastructure ready to activate.',
    completionYear: '2025',
    projectDuration: '4 weeks',
    teamSize: '3 specialists',
    visitUrl: 'https://drmiremadi.com',
    isCurrentProject: true,
    githubUrl: 'https://github.com/DevXGroup/Miremadi-Dermatology-Web',
    isFeatured: true,
    highlights: [
      'Full rebuild delivered in under 4 weeks',
      'Fixed missing and misrepresented services',
      'SEO-optimized to surface all treatments',
      'E-commerce infrastructure built and ready to activate',
    ],
  },
  {
    id: 'lawazm',
    title: 'Lawazm - Enterprise E-commerce Platform',
    shortDescription:
      'Complete online store with 5,000+ household products, trusted by families across Kuwait and the Middle East.',
    detailedDescription:
      'Lawazm is a comprehensive e-commerce platform established as a distinguished electronic marketplace in Kuwait and the Middle East, specializing in household products, baby & children needs, and family supplies. With over 25 years of trading experience, the platform features more than 5,000 unique, high-quality household products from prominent global manufacturers.',
    category: 'E-commerce/Household',
    services: [
      'Web Development',
      'Mobile App Development',
      'Database Solutions',
      'Cloud Solutions',
      'DevOps',
    ],
    technologies: [
      'Next.js',
      'React Native',
      'PostgreSQL',
      'Redis',
      'AWS',
      'Stripe',
      'Elasticsearch',
      'Docker',
      'Flutter',
      '.NET',
    ],
    platforms: ['iOS', 'Android', 'Website', 'Admin Dashboard'],
    keyFeatures: [
      'Advanced Product Catalog (5,000+ items)',
      'Multi-vendor Marketplace',
      'Same-day Delivery System',
      'International Payment Gateway',
      'Real-time Inventory Management',
      'AI-Powered Advanced Search & Filtering',
      'Multi-language Support (Arabic/English)',
    ],
    images: {
      banner: '/images/portfolio/banners/lawazm-banner.webp',
      preview: '/images/portfolio/previews/lawazm-preview.webp',
      bannerAlt:
        'Lawazm e-commerce platform showing product catalog with household items across mobile and desktop',
      previewAlt: 'Lawazm app preview displaying the product browsing experience on mobile',
      screenshots: [
        '/images/portfolio/screenshots/lawazm-all-in-one.webp',
        '/images/portfolio/screenshots/lawazm-1.webp',
        '/images/portfolio/screenshots/lawazm-2.webp',
        '/images/portfolio/screenshots/lawazm-3.webp',
        '/images/portfolio/screenshots/lawazm-4.webp',
        '/images/portfolio/screenshots/lawazm-5.webp',
        '/images/portfolio/screenshots/lawazm-6.webp',
        '/images/portfolio/screenshots/lawazm-7.webp',
      ],
      screenshotAlts: [
        'Lawazm all-in-one overview showing multiple app screens',
        'Lawazm product catalog with category filtering',
        'Lawazm shopping cart and checkout flow',
        'Lawazm product detail page with reviews',
        'Lawazm order tracking and delivery status',
        'Lawazm user account and order history',
        'Lawazm search results with filters',
        'Lawazm home screen with featured products',
      ],
    },
    metrics: {
      users: '75,000+ Registered Users',
      performance: 'Expanded to 6 Middle Eastern countries',
      marketPosition: '#1 household e-commerce platform in Kuwait',
    },
    businessImpact:
      'Digitized 25+ years of offline trading into a platform with 75,000+ users, tripling revenue and expanding the business from Kuwait to 6 Middle Eastern countries within 18 months of launch.',
    completionYear: '2023',
    projectDuration: '8 months',
    teamSize: '8 developers',
    visitUrl: 'https://lawazm.com/',
    appStoreUrl: 'https://apps.apple.com/us/app/lawazm-%D9%84%D9%88%D8%A7%D8%B2%D9%85/id1562072722',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.lawazm&hl=en_US',
    highlights: [
      '75,000+ registered users at launch',
      'Expanded to 6 countries in the Middle East',
      '25+ years of trading experience digitized',
      'Same-day delivery across Kuwait',
    ],
  },
  {
    id: 'joyful',
    title: 'Joyful - Smart Confectionery Platform',
    shortDescription:
      'Smart cake ordering app where customers design their perfect custom cakes with AI help.',
    detailedDescription:
      'Joyful is a comprehensive e-commerce platform for a Qatari confectionery store specializing in flowers, snacks, chocolates, and cakes. The project involved creating a sophisticated mobile application with advanced product customization features. The platform includes AI-powered customization recommendations, real-time cake design previews, and integrated delivery logistics for same-day service across Qatar.',
    category: 'E-commerce/Confectionery',
    services: [
      'Mobile App Development',
      'AI & Machine Learning',
      'Web Development',
      'Custom Software Development',
    ],
    technologies: [
      'React Native',
      'AR/VR SDKs',
      'AI/ML Models',
      'Real-time Rendering',
      'Payment Gateways',
      'GPS Tracking',
      'Elasticsearch',
      'PHP',
      'Flutter',
      'Magento',
    ],
    platforms: ['iOS', 'Android', 'Website', 'Admin Panel'],
    keyFeatures: [
      'AI-Powered Product Customization',
      'Same-day Delivery Tracking',
      'Multi-payment Gateway Integration',
      'Inventory Management System',
      'Customer Order History & Reordering',
    ],
    images: {
      banner: '/images/portfolio/banners/joyful-banner.webp',
      preview: '/images/portfolio/previews/joyful-preview.webp',
      bannerAlt:
        'Joyful confectionery platform showing custom cake ordering interface on mobile devices',
      previewAlt: 'Joyful app preview with cake customization and delivery options',
      screenshots: [
        '/images/portfolio/screenshots/joyful-all-in-one.webp',
        '/images/portfolio/screenshots/joyful-1.webp',
        '/images/portfolio/screenshots/joyful-2.webp',
        '/images/portfolio/screenshots/joyful-3.webp',
        '/images/portfolio/screenshots/joyful-4.webp',
        '/images/portfolio/screenshots/joyful-5.webp',
      ],
      screenshotAlts: [
        'Joyful all-in-one overview showing multiple app screens',
        'Joyful cake customization interface with design options',
        'Joyful product catalog with chocolates and confectionery items',
        'Joyful delivery tracking and order status screen',
        'Joyful checkout and payment flow',
        'Joyful home screen with featured confectionery products',
      ],
    },
    metrics: {
      users: '30,000+ Active Users',
      performance: '200% Increase in Custom Orders',
      marketPosition: 'Popular Qatar Confectionery Platform',
    },
    businessImpact:
      'Turned a traditional bakery into a modern digital business, increasing revenue by 200% in just one year',
    completionYear: '2022',
    projectDuration: '6 months',
    teamSize: '7 developers',
    appStoreUrl: 'https://apps.apple.com/us/app/joyful-boxes/id1579508169',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.joyful&hl=en_US',
    highlights: ['Advanced product customization engine', 'Same-day delivery across Qatar'],
  },
  {
    id: 'lazurd',
    title: 'Lazurd - Luxury Brand Digital Experience',
    shortDescription:
      'Luxury food app for premium home-cooked meals and chocolates that became #1 in Kuwait.',
    detailedDescription:
      'Lazurd is a luxury brand inspired by the semi-precious stone "Lapis Lazuli", specializing in premium home-cooked meals, cakes, and chocolates for special occasions. The platform focuses on creating an eye-catching UI that reflects sophistication and premium quality, successfully reaching top charts in Kuwait through exceptional design and user experience.',
    category: 'Luxury/Food',
    services: [
      'Mobile App Development',
      'Web Development',
      'UI/UX Design',
      'Digital Transformation',
    ],
    technologies: [
      'hadisto',
      'PHP',
      'Flutter',
      'High-quality Image Processing',
      'Luxury Payment Systems',
    ],
    platforms: ['iOS', 'Android', 'Website', 'Social Media Integration'],
    keyFeatures: [
      'Luxury-focused UI Design',
      'Exclusive Member Benefits System',
      'High-end Food Ordering Experience',
      'Multi-currency Premium Payment & Delivery Options',
    ],
    images: {
      banner: '/images/portfolio/banners/lazurd-banner.webp',
      preview: '/images/portfolio/previews/lazurd-preview.webp',
      bannerAlt:
        'Lazurd luxury food delivery app featuring premium home-cooked meals and chocolates',
      previewAlt: 'Lazurd app preview showcasing luxury brand design and premium food ordering',
      screenshots: [
        '/images/portfolio/screenshots/lazurd-all-in-one.webp',
        '/images/portfolio/screenshots/lazurd-1.webp',
        '/images/portfolio/screenshots/lazurd-2.webp',
        '/images/portfolio/screenshots/lazurd-3.webp',
        '/images/portfolio/screenshots/lazurd-4.webp',
        '/images/portfolio/screenshots/lazurd-5.webp',
      ],
      screenshotAlts: [
        'Lazurd all-in-one overview showing luxury app interface across screens',
        'Lazurd premium product catalog with luxury food items',
        'Lazurd order placement with specialty meal options',
        'Lazurd delivery scheduling and tracking interface',
        'Lazurd member benefits and loyalty rewards screen',
        'Lazurd home screen with featured luxury products',
      ],
    },
    metrics: {
      users: '8,000+ Premium Users',
      performance: '4x brand value increase, 2.5x luxury sales',
      marketPosition: '#1 luxury food app in Kuwait App Store charts',
    },
    businessImpact:
      'Took a luxury home-cooking brand from zero online presence to #1 in Kuwait App Store charts, increasing brand value 4x and luxury product sales 2.5x within the first year of launch.',
    completionYear: '2022',
    projectDuration: '5 months',
    teamSize: '5 developers',
    appStoreUrl: 'https://apps.apple.com/us/app/lazurd-app/id1436477492',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=approots.ca.lazurd&hl=en_US',
    highlights: [
      '#1 ranking in Kuwait App Store charts',
      '4x brand value increase post-launch',
      '2.5x luxury product sales growth',
      'Premium glassmorphism UI design',
    ],
  },
  {
    id: 'i-love-food-ilf',
    title: 'WellBox - Food Package Delivery Platform',
    shortDescription:
      'Smart nutrition app that creates personal meal plans and helps you reach your health goals with AI.',
    detailedDescription:
      'WellBox is a comprehensive daily food delivery mobile application designed as the simplest yet most effective solution for healthy eating and weight loss. The app leverages nutritional analysis and intelligent food recommendations based on user preferences, dietary restrictions, and health goals.',
    category: 'Health/Fitness',
    services: ['Mobile App Development', 'Database Solutions', 'API Development'],
    technologies: [
      'Flutter',
      '.Net',
      'Angular',
      'Computer Vision',
      'Health Data APIs',
      'Cloud Analytics',
    ],
    platforms: ['iOS', 'Android', 'Admin Dashboard'],
    keyFeatures: [
      'Computer Vision Food Recognition',
      'Personalized Nutrition Recommendations',
      'Dietary Restriction Management',
      'Nutritional Analysis & Insights',
    ],
    images: {
      banner: '/images/portfolio/banners/i-love-food-ilf-banner.webp',
      preview: '/images/portfolio/previews/i-love-food-ilf-preview.webp',
      bannerAlt:
        'WellBox food delivery platform showing personalized meal plans and nutrition tracking',
      previewAlt: 'WellBox app preview displaying healthy meal planning interface',
      screenshots: [
        '/images/portfolio/screenshots/wellbox-all-in-one.webp',
        '/images/portfolio/screenshots/wellbox-1.webp',
        '/images/portfolio/screenshots/wellbox-2.webp',
        '/images/portfolio/screenshots/wellbox-3.webp',
        '/images/portfolio/screenshots/wellbox-4.webp',
      ],
      screenshotAlts: [
        'WellBox all-in-one overview showing health and nutrition app screens',
        'WellBox personalized meal plan with dietary recommendations',
        'WellBox food recognition and calorie tracking interface',
        'WellBox nutrition analytics dashboard with health goals',
        'WellBox meal ordering and delivery scheduling screen',
      ],
    },
    metrics: {
      users: '1,000+ Health Enthusiasts',
      performance: '600% increase in customer orders post-launch',
      marketPosition: 'Top-rated health food delivery platform',
    },
    businessImpact:
      'Drove a 600% increase in customer orders after launch, with 73% of users reporting they achieved their health goals within 90 days — turning a struggling delivery service into a market leader.',
    completionYear: '2024',
    projectDuration: '5 months',
    teamSize: '5 developers',
    appStoreUrl: 'https://apps.apple.com/us/app/wellbox-diet/id6477454104',
    playStoreUrl: 'https://play.google.com/store/apps/details?id=com.wellbox.app&hl=en_US',
    highlights: [
      '600% increase in customer orders after launch',
      '73% of users achieved health goals within 90 days',
      'AI computer vision food recognition',
      'Personalized nutrition plans from first open',
    ],
  },
  {
    id: 'chatfly',
    title: 'ChatFly - AI Communication Platform',
    shortDescription:
      'Smart AI chatbot that helps businesses talk to customers better, powered by advanced AI technology.',
    detailedDescription:
      'ChatFly is a comprehensive AI-powered communication platform that combines advanced artificial intelligence with user-friendly design. The application serves as both a mobile app and a no-code AI platform, offering multiple functionalities including AI chatbot capabilities, automatic grammar corrections, text summaries at various reading levels, and AI-generated art creation.',
    category: 'AI/Communication',
    services: [
      'AI & Machine Learning',
      'Mobile App Development',
      'Web Development',
      'API Development',
    ],
    technologies: [
      'GPT Integration',
      'DALL-E API',
      'Node.js',
      'Python',
      'REST APIs',
      'WebSocket',
      'Cloud Services',
    ],
    platforms: [
      'iOS',
      'Android',
      'Web Platform',
      'API',
      'Telegram',
      'Slack',
      'Microsoft Teams',
      'WordPress',
      'WooCommerce',
    ],
    keyFeatures: [
      'Multi-Platform AI Chatbot Integration',
      'Advanced Grammar Correction Engine',
      'Intelligent Text Summarization',
      'AI-Generated Art & Content Creation',
      'Real-time Auto-Response System',
      'Custom Branding & White-label Solutions',
      'Enterprise-grade API Access',
      'Multi-language Support',
    ],
    images: {
      banner: '/images/portfolio/banners/chatfly-banner.webp',
      preview: '/images/portfolio/previews/chatfly-preview.webp',
      bannerAlt:
        'ChatFly AI communication platform with multi-platform chatbot integration dashboard',
      previewAlt: 'ChatFly app preview showing AI-powered chatbot conversation interface',
    },
    metrics: {
      users: '6 Platform Integrations',
      performance: 'Sub-second AI Response Time',
      marketPosition: 'Multi-platform AI Solution',
    },
    completionYear: '2023',
    projectDuration: '4 months',
    teamSize: '6 developers',
    highlights: ['Built for multiple platforms', 'Multi-language support'],
  },
  {
    id: 'joyjoy',
    title: 'JoyJoy - AI-Powered Wellness App',
    shortDescription:
      'Daily inspiration app with your personal AI buddy, helping thousands feel better every day.',
    detailedDescription:
      'JoyJoy is a comprehensive daily motivation and affirmation mobile application designed to help users cultivate a positive mindset and improve their overall well-being. The app provides users with inspirational quotes, positive affirmations, and uplifting messages powered by AI personalization. Key features include AI-driven content curation, social sharing capabilities, progress tracking, and an interactive AI companion for personalized growth conversations.',
    category: 'Mobile App/Wellness',
    services: [
      'Mobile App Development',
      'AI & Machine Learning',
      'UI/UX Design',
      'Push Notifications',
    ],
    technologies: [
      'Flutter',
      'AI/ML Models',
      'Firebase',
      'Push Notification Services',
      'Analytics SDKs',
      'Social Media APIs',
    ],
    platforms: ['iOS'],
    keyFeatures: [
      'AI-Personalized Daily Affirmations',
      'Intelligent Content Curation',
      'Interactive AI Wellness Companion',
      'Social Media Integration',
      'Offline Content Access',
      'Customizable Reminder Systems',
      'Multi-language Affirmations',
    ],
    images: {
      banner: '/images/portfolio/banners/joyjoy-banner.webp',
      preview: '/images/portfolio/previews/joyjoy-preview.webp',
      bannerAlt:
        'JoyJoy AI wellness app displaying daily affirmations and positive mindset features',
      previewAlt: 'JoyJoy app preview showing AI companion and wellness tracking interface',
    },
    metrics: {
      users: '25,000+ Downloads',
      performance: '4.5★ App Store Rating',
      marketPosition: 'High-rated Wellness App',
    },
    businessImpact:
      'Users feel 40% happier daily and build 60% more positive habits with our AI companion',
    completionYear: '2023',
    projectDuration: '4 months',
    teamSize: '4 developers',
    highlights: ['High user retention rate', 'AI companion with strong user satisfaction'],
  },
  {
    id: 'letspass',
    title: 'LetsPass - Advanced EdTech Platform',
    shortDescription:
      'Complete online learning platform that creates personalized study plans with AI and fun interactive tests.',
    detailedDescription:
      'LetsPass is a comprehensive online education platform designed to facilitate digital learning experiences. The platform provides interactive learning modules, advanced progress tracking, assessment tools, and certification systems. It serves educational institutions, corporate training programs, and individual learners with personalized learning experiences.',
    category: 'Education/E-learning',
    services: [
      'Web Development',
      'Mobile App Development',
      'Database Solutions',
      'Cloud Solutions',
    ],
    technologies: [
      'Flutter',
      'Angular',
      'Node.js',
      'AI/ML Algorithms',
      'Video Streaming',
      'Real-time Communications',
      'Learning Analytics',
    ],
    platforms: ['Mobile App', 'Admin Dashboard', 'Teacher Dashboard'],
    keyFeatures: [
      'Interactive Video Learning Modules',
      'Real-time Progress Analytics',
      'Advanced Assessment & Testing Tools',
      'Digital Certification System',
      'Collaborative Learning Spaces',
      'Multi-format Content Support',
      'Gamified Learning Experience',
      'Institution Management Tools',
    ],
    images: {
      banner: '/images/portfolio/banners/letspass-banner.webp',
      preview: '/images/portfolio/previews/letspass-preview.webp',
      bannerAlt:
        'LetsPass online education platform with interactive learning modules and progress tracking',
      previewAlt: 'LetsPass app preview showing course catalog and student dashboard',
    },
    metrics: {
      users: '10+ Content Formats Supported',
      performance: '45% Improvement in Learning Outcomes',
      marketPosition: 'Educational Technology Solution',
    },
    businessImpact: 'Students learn 45% better while companies save 60% on training costs',
    completionYear: '2021',
    projectDuration: '5 months',
    teamSize: '6 developers',
    highlights: [
      'Support for 10+ content formats',
      'Integrated certification system',
      'Real-time collaboration tools',
    ],
  },
  {
    id: 'zahra-farm',
    title: 'Zahra Farm - AgriTech Innovation Platform',
    shortDescription:
      'Smart farming app that combines organic produce sales, farm visits, and high-tech crop monitoring.',
    detailedDescription:
      'Zahra Farm is an innovative agricultural and eco-tourism platform that combines organic product sales with experiential farming services. The platform integrates IoT sensors for smart farming, offers plot rental for personal farming, greenhouse monitoring systems, and eco-tourism booking capabilities, promoting sustainable agriculture and environmental consciousness.',
    category: 'Agriculture/IoT',
    services: [
      'IoT Hardware & Edge Computing',
      'Mobile App Development',
      'Web Development',
      'Custom Software Development',
    ],
    technologies: [
      'IoT Sensors',
      'Edge Computing',
      'Flutter',
      'Angular',
      'Strapi',
      'Agricultural Management Systems',
      'Weather APIs',
    ],
    platforms: ['Mobile App', 'Website', 'Admin Dashboard', 'Field Management System'],
    keyFeatures: [
      'Organic Product E-commerce',
      'Plot Rental Booking System',
      'Greenhouse Tour Reservations',
      'Eco-Tourism Hut Bookings',
      'Automated Irrigation Control',
      'Crop Health Monitoring',
      'Sustainable Farming Analytics',
      'Environmental Impact Tracking',
    ],
    images: {
      banner: '/images/portfolio/banners/zahra-farm-banner.webp',
      preview: '/images/portfolio/previews/zahra-farm-preview.webp',
      bannerAlt:
        'Zahra Farm smart agriculture platform showing IoT crop monitoring and organic produce marketplace',
      previewAlt: 'Zahra Farm app preview with farm management dashboard and eco-tourism booking',
    },
    metrics: {
      users: '3,000+ Farm Visitors',
      performance: '40% Increase in Crop Yields',
      marketPosition: 'Smart Farming Solution',
    },
    completionYear: '2020',
    projectDuration: '7 months',
    teamSize: '8 developers + IoT specialists',
    highlights: [
      'Smart farming platform',
      'Sustainable tourism model',
      'Environmental innovation focus',
    ],
  },
  {
    id: 'chayyel',
    title: 'Chayyel - Global Gaming Platform',
    shortDescription:
      'Global gaming platform built for worldwide expansion with strong community features.',
    detailedDescription:
      'Chayyel is an ambitious gaming startup platform designed for global expansion. The project encompasses gaming ecosystem development, community management features, multi-platform gaming support, and scalable infrastructure to accommodate international markets with diverse gaming communities and multiple language support.',
    category: 'Gaming/Entertainment',
    services: [
      'Custom Software Development',
      'Cloud Solutions',
      'Mobile App Development',
      'Digital Transformation',
    ],
    technologies: [
      'Cloud Gaming Infrastructure',
      'Cross-platform Development',
      'Magento',
      'PHP',
      'Flutter',
      'Android',
    ],
    platforms: ['iOS', 'Web', 'Community Dashboard'],
    keyFeatures: [
      'Cross-platform Gaming Support',
      'Community Management Tools',
      'In-game Economy System',
      'Real-time Chat & Communication',
      'User-Generated Content Tools',
      'Multi-language Gaming Support',
      'Social Gaming Features',
    ],
    images: {
      banner: '/images/portfolio/banners/chayyel-banner.webp',
      preview: '/images/portfolio/previews/chayyel-preview.webp',
      bannerAlt:
        'Chayyel global gaming platform showcasing cross-platform gaming ecosystem and community features',
      previewAlt: 'Chayyel app preview displaying gaming dashboard and social features',
    },
    metrics: {
      users: '100,000+ Concurrent Players Supported',
      performance: 'Low-latency Global Infrastructure',
      marketPosition: 'Global Gaming Infrastructure',
    },
    businessImpact:
      'Created gaming technology that supports 100,000+ players at once across 15 countries',
    completionYear: '2025',
    projectDuration: '14 months',
    teamSize: '10 developers + game designers',
    highlights: [
      'Global expansion ready infrastructure',
      'Multi-platform gaming ecosystem',
      'Community-driven development approach',
    ],
  },
  {
    id: 'cortexflow',
    title: 'CortexFlow - AI Content Repurposing Platform',
    shortDescription:
      'AI-powered SaaS that turns any content into scroll-stopping short-form videos and long-form articles, then publishes everywhere in one click.',
    detailedDescription:
      'CortexFlow is an AI-powered content repurposing platform built for creators and marketers. Upload a video, article, or any text and CortexFlow generates scroll-stopping short-form videos and long-form articles using Google Gemini AI, then publishes them across all major social platforms in one click.\n\nThe platform features a freemium credit-based model with four pricing tiers (Free, Starter, Pro, Max), Google OAuth and email authentication, HD and 4K video export, premium voice library, custom branding, white-label options, and API access for enterprise users. Trusted by 2,000+ creators and marketers.',
    category: 'AI/SaaS',
    services: [
      'AI & Machine Learning',
      'Web Development',
      'Custom Software Development',
      'Cloud Solutions',
    ],
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Google Gemini AI',
      'Supabase',
      'Stripe',
      'FFmpeg',
      'Vercel',
    ],
    platforms: ['Web', 'API'],
    keyFeatures: [
      'AI-powered video generation from any content',
      'Long-form article generation with Gemini AI',
      'One-click multi-platform publishing',
      'HD and 4K video export',
      'Premium voice library and custom branding',
      'Credit-based freemium pricing model',
      'Google OAuth and email authentication',
      'White-label options and API access for enterprise',
    ],
    images: {
      banner: '/images/portfolio/banners/cortexflow-banner.webp',
      preview: '/images/portfolio/banners/cortexflow-banner.webp',
      bannerAlt:
        'CortexFlow AI content repurposing platform homepage showing headline Turn Any Content Into Viral Social Media',
      previewAlt:
        'CortexFlow dashboard preview with AI-powered video and article generation interface',
      screenshots: [
        '/images/portfolio/screenshots/cortexflow/screen-1.webp',
        '/images/portfolio/screenshots/cortexflow/screen-2.webp',
        '/images/portfolio/screenshots/cortexflow/screen-3.webp',
      ],
      screenshotAlts: [
        'CortexFlow homepage with hero section and social proof from 2,000+ creators',
        'CortexFlow pricing page with Free, Starter, Pro, and Max tiers',
        'CortexFlow account creation page with Google OAuth and email signup',
      ],
    },
    metrics: {
      users: '2,000+ Creators & Marketers',
      performance: 'Gemini AI-Powered Generation',
      marketPosition: 'AI Content Repurposing SaaS',
    },
    businessImpact:
      'Enables creators and marketers to repurpose content across platforms in minutes instead of hours, with AI-generated videos and articles published in one click.',
    completionYear: '2025',
    projectDuration: '3 months',
    teamSize: '3 specialists',
    visitUrl: 'https://cortexflow.devxgroup.io',
    isCurrentProject: true,
    highlights: [
      'Google Gemini AI integration',
      '2,000+ active creators and marketers',
      'One-click multi-platform publishing',
      'Freemium SaaS with 4 pricing tiers',
    ],
  },
  {
    id: 'interview-prep',
    title: 'Engineering Manager Interview Prep',
    shortDescription:
      'Free, open-source interview prep platform for FAANG/MAANG engineering manager and senior engineer roles.',
    detailedDescription:
      'A comprehensive, open-source platform covering behavioral interviews (STAR format), system design patterns, algorithm visualizations, and company-specific guides for Meta, Amazon, Apple, Netflix, Google, and Microsoft. Features an 8-week study roadmap, interactive quizzes, progress tracking, and AI-assisted preparation modules.',
    category: 'AI/Education',
    services: ['Web Development', 'AI & Machine Learning', 'Custom Software Development'],
    technologies: [
      'Next.js 14',
      'TypeScript',
      'Tailwind CSS',
      'Framer Motion',
      'Zustand',
      'D3.js',
      'Recharts',
      'Radix UI',
      'Prism.js',
    ],
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
      banner: '/images/portfolio/screenshots/interview-prep/01-hero.webp',
      preview: '/images/portfolio/screenshots/interview-prep/01-hero.webp',
      bannerAlt:
        'EM Interview Mastery hero with Engineering Manager Interview Mastery script headline and pill stats',
      previewAlt: 'Interview Prep dashboard with behavioral, system design, and coding sections',
      screenshots: [
        '/images/portfolio/screenshots/interview-prep/01-hero.webp',
        '/images/portfolio/screenshots/interview-prep/02-system-design.webp',
        '/images/portfolio/screenshots/interview-prep/03-behavioral.webp',
        '/images/portfolio/screenshots/interview-prep/04-coding.webp',
      ],
      screenshotAlts: [
        'Hero: Engineering Manager Interview Mastery with company stats and Start Preparing CTA',
        'System Design page with URL Shortener scenario, requirements, and scale estimates',
        'Behavioral Interview Mastery with Amazon Leadership Principles list',
        'Coding Interview Mastery with interactive Bubble Sort algorithm visualizer',
      ],
    },
    metrics: {
      marketPosition: 'Open Source',
      performance: 'Next.js 14 App Router',
    },
    businessImpact:
      'Helps software engineers and engineering managers land roles at top tech companies through structured, comprehensive interview preparation — fully free and open source.',
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
  },
  {
    id: 'flight-tracker',
    title: 'Max Live Flight Tracker',
    shortDescription:
      'Real-time flight tracking with interactive maps, millisecond-accurate delay updates, and live arrival/departure data.',
    detailedDescription:
      'A real-time flight tracking web application featuring an interactive Leaflet map with live flight paths, 30-second position updates, timezone-aware time display, and accurate distance/progress calculations. Integrates OpenSky Network, AviationStack, and Amadeus APIs for comprehensive flight data. Built with a glassmorphism UI and 3D visualizations.',
    category: 'Web App/Travel',
    services: ['Web Development', 'Custom Software Development', 'API Development'],
    technologies: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'Leaflet',
      'React Leaflet',
      'Three.js',
      'Framer Motion',
      'date-fns',
      'OpenSky Network API',
      'AviationStack API',
      'Amadeus API',
    ],
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
      banner: '/images/portfolio/banners/flight-tracker-hero-search.webp',
      preview: '/images/portfolio/banners/flight-tracker-hero-search.webp',
      bannerAlt:
        'Max Live Flight Tracker showing interactive world map with real-time flight paths and glassmorphism UI',
      previewAlt:
        'Flight tracker dashboard with live flight positions on an interactive Leaflet map',
      screenshots: [
        '/images/portfolio/banners/flight-tracker-hero-search.webp',
        '/images/portfolio/banners/flight-tracker-details-panel.webp',
        '/images/portfolio/banners/flight-tracker-interactive-map.webp',
      ],
      screenshotAlts: [
        'Flight Tracker hero interface with search functionality for tracking flights in real-time',
        'Flight detail panel showing real-time arrival/departure times and delay information',
        'Interactive world map with live flight paths and position markers',
      ],
    },
    metrics: {
      performance: 'Real-time, 30s updates',
      marketPosition: 'Open Source',
    },
    businessImpact:
      'Demonstrates real-time data integration, interactive mapping, and multi-API orchestration — showcasing capability for complex, data-intensive web applications.',
    completionYear: '2025',
    teamSize: '1',
    visitUrl: 'https://flight.devxgroup.io',
    githubUrl: 'https://github.com/DevXGroup/Max-Live-Flight-Tracker',
    isCurrentProject: true,
    isFeatured: true,
    highlights: [
      'Real-time live flight positions',
      'Interactive Leaflet map with flight paths',
      '3 aviation API integrations',
      'Millisecond-accurate delay tracking',
    ],
  },
]

// Service mapping for portfolio filtering
export const serviceMapping = {
  'Custom Software Development': [
    'chatfly',
    'joyful',
    'zahra-farm',
    'chayyel',
    'cortexflow',
    'nutrify-ai',
    'transcribr',
  ],
  'AI & Machine Learning': [
    'chatfly',
    'joyjoy',
    'joyful',
    'letspass',
    'i-love-food-ilf',
    'cortexflow',
    'nutrify-ai',
    'transcribr',
  ],
  'Mobile App Development': [
    'chatfly',
    'joyjoy',
    'joyful',
    'lazurd',
    'letspass',
    'zahra-farm',
    'i-love-food-ilf',
    'chayyel',
    'nutrify-ai',
    'transcribr',
  ],
  'Web Development': [
    'chatfly',
    'lawazm',
    'joyful',
    'lazurd',
    'letspass',
    'zahra-farm',
    'cortexflow',
  ],
  'Cloud Solutions': ['lawazm', 'letspass', 'chayyel', 'cortexflow', 'nutrify-ai'],
  'Database Solutions': ['lawazm', 'letspass', 'i-love-food-ilf'],
  'IoT Hardware & Edge Computing': ['zahra-farm'],
  DevOps: ['lawazm'],
  'UI/UX Design': ['joyjoy', 'lazurd'],
  'Digital Transformation': ['lazurd', 'chayyel'],
  'API Development': ['chatfly', 'i-love-food-ilf'],
}

export const categoryColors = {
  'AI/Communication': '#9d4edd',
  'Mobile App/Wellness': '#4CD787',
  'E-commerce/Household': '#4834D4',
  'E-commerce/Confectionery': '#FFD700',
  'Luxury/Food': '#ff6b6b',
  'Education/E-learning': '#00D2FF',
  'Agriculture/IoT': '#4CD787',
  'Health/Fitness': '#9d4edd',
  'Health/Fitness (iOS)': '#34D399',
  'Gaming/Entertainment': '#ff6b6b',
  Healthcare: '#67E8F9',
  'AI/Education': '#00D2FF',
  'Web App/Travel': '#4CD787',
  'AI/SaaS': '#7C3AED',
  'macOS App': '#A8B5C8',
  'Marketing Site': '#34D399',
}
