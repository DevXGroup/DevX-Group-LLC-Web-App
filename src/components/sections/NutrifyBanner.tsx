'use client'

import Image from 'next/image'

interface NutrifyBannerProps {
  variant?: 'card' | 'hero'
}

const TAGS = ['Labs', 'Chat', 'Nutrition', 'Sleep', 'Exercise']

const SCREENS = {
  back: {
    src: '/images/portfolio/screenshots/nutrify-ai/labs.webp',
    alt: 'Nutrify.AI Labs & Biomarkers screen with biomarker reference ranges',
  },
  front: {
    src: '/images/portfolio/screenshots/nutrify-ai/myday.webp',
    alt: 'Nutrify.AI My Day dashboard with daily progress ring and Nightly Actions',
  },
  third: {
    src: '/images/portfolio/screenshots/nutrify-ai/chat.webp',
    alt: 'Nutrify.AI in-app chat with the Gemini-powered health coach',
  },
} as const

export default function NutrifyBanner({ variant = 'card' }: NutrifyBannerProps) {
  const isHero = variant === 'hero'

  return (
    <div
      className="relative w-full h-full overflow-hidden isolate"
      style={{ background: 'linear-gradient(145deg, #050C07 0%, #07110A 45%, #060A08 100%)' }}
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div
          style={{
            position: 'absolute',
            width: '65%',
            height: '180%',
            left: '-5%',
            top: '-40%',
            background: 'radial-gradient(ellipse, rgba(52,211,153,0.07) 0%, transparent 65%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '50%',
            height: '120%',
            right: '10%',
            top: '-10%',
            background: 'radial-gradient(ellipse, rgba(76,215,135,0.04) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(52,211,153,0.5) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          opacity: 0.045,
        }}
      />

      {/* Brand identity */}
      <div
        className="absolute z-10"
        style={{
          left: isHero ? 48 : 18,
          top: '50%',
          transform: 'translateY(-50%)',
          maxWidth: isHero ? 280 : 160,
        }}
      >
        {/* Logo + name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: isHero ? 10 : 7,
            marginBottom: isHero ? 12 : 7,
          }}
        >
          <div
            style={{
              width: isHero ? 30 : 21,
              height: isHero ? 30 : 21,
              borderRadius: '50%',
              background: 'rgba(52,211,153,0.13)',
              border: '1px solid rgba(52,211,153,0.32)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <svg width={isHero ? 13 : 9} height={isHero ? 13 : 9} viewBox="0 0 12 12" fill="none">
              <line
                x1="6"
                y1="1"
                x2="6"
                y2="11"
                stroke="#34D399"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <line
                x1="1"
                y1="6"
                x2="11"
                y2="6"
                stroke="#34D399"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span
            style={{
              color: '#34D399',
              fontSize: isHero ? 17 : 12,
              fontWeight: 700,
              letterSpacing: '0.04em',
            }}
          >
            Nutrify.AI
          </span>
        </div>

        <p
          style={{
            color: 'rgba(255,255,255,0.32)',
            fontSize: isHero ? 9 : 7,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: isHero ? 18 : 10,
          }}
        >
          AI Health Coach · iOS
        </p>

        {/* Headline (hero only) */}
        {isHero && (
          <h2
            style={{
              color: 'rgba(255,255,255,0.92)',
              fontSize: 22,
              fontWeight: 600,
              lineHeight: 1.18,
              letterSpacing: '-0.01em',
              marginBottom: 16,
            }}
          >
            Built on real labs, sleep and nutrition.
          </h2>
        )}

        {/* Module tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: isHero ? 6 : 4,
            maxWidth: isHero ? 240 : 130,
          }}
        >
          {TAGS.slice(0, isHero ? TAGS.length : 4).map((tag) => (
            <span
              key={tag}
              style={{
                padding: isHero ? '4px 9px' : '2.5px 6px',
                borderRadius: 999,
                background: 'rgba(52,211,153,0.08)',
                border: '1px solid rgba(52,211,153,0.18)',
                color: 'rgba(229,255,239,0.78)',
                fontSize: isHero ? 10 : 7.5,
                fontWeight: 600,
                letterSpacing: '0.02em',
                whiteSpace: 'nowrap',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Phone mockups — real screenshots */}
      <div
        className="absolute z-10"
        style={{
          right: isHero ? 56 : 10,
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'flex-end',
          gap: isHero ? 14 : 7,
        }}
      >
        {/* Back phone — Labs */}
        <div
          style={{
            position: 'relative',
            width: isHero ? 102 : 68,
            height: isHero ? 221 : 148,
            borderRadius: isHero ? 18 : 13,
            border: '1.5px solid rgba(255,255,255,0.07)',
            boxShadow: '0 10px 36px rgba(0,0,0,0.72)',
            transform: `translateY(${isHero ? 16 : 11}px) rotate(-4.5deg)`,
            background: '#0D1A0F',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <Image
            src={SCREENS.back.src}
            alt={SCREENS.back.alt}
            fill
            className="object-cover object-top"
            sizes={isHero ? '112px' : '78px'}
          />
        </div>

        {/* Front phone — My Day */}
        <div
          style={{
            position: 'relative',
            width: isHero ? 116 : 79,
            height: isHero ? 251 : 171,
            borderRadius: isHero ? 20 : 15,
            border: '1.5px solid rgba(52,211,153,0.2)',
            boxShadow: '0 18px 52px rgba(0,0,0,0.82), 0 0 28px rgba(52,211,153,0.07)',
            background: '#0D1A0F',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <Image
            src={SCREENS.front.src}
            alt={SCREENS.front.alt}
            fill
            className="object-cover object-top"
            sizes={isHero ? '126px' : '89px'}
          />
        </div>

        {/* Third phone — Chat (hero only) */}
        {isHero && (
          <div
            style={{
              position: 'relative',
              width: 96,
              height: 208,
              borderRadius: 17,
              border: '1.5px solid rgba(255,255,255,0.06)',
              boxShadow: '0 10px 36px rgba(0,0,0,0.72)',
              transform: 'translateY(20px) rotate(4.5deg)',
              background: '#0D1A0F',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <Image
              src={SCREENS.third.src}
              alt={SCREENS.third.alt}
              fill
              className="object-cover object-top"
              sizes="106px"
            />
          </div>
        )}
      </div>

      {/* Bottom fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0"
        style={{ height: '28%', background: 'linear-gradient(to top, #060A08, transparent)' }}
      />
    </div>
  )
}
