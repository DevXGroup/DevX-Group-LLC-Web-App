'use client'

import Image from 'next/image'

interface NutrifyBannerProps {
  variant?: 'card' | 'hero'
}

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
        style={{ left: isHero ? 48 : 18, top: '50%', transform: 'translateY(-50%)' }}
      >
        {/* Logo + name */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: isHero ? 10 : 7,
            marginBottom: isHero ? 8 : 5,
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
            color: 'rgba(255,255,255,0.27)',
            fontSize: isHero ? 9 : 7,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: isHero ? 22 : 13,
          }}
        >
          Premium Health Assistant
        </p>

        {/* Score ring */}
        <div style={{ marginBottom: isHero ? 18 : 12 }}>
          <div style={{ position: 'relative', width: isHero ? 62 : 44, height: isHero ? 62 : 44 }}>
            <svg
              viewBox="0 0 64 64"
              style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}
            >
              <circle
                cx="32"
                cy="32"
                r="26"
                fill="none"
                stroke="rgba(52,211,153,0.12)"
                strokeWidth="5.5"
              />
              <circle
                cx="32"
                cy="32"
                r="26"
                fill="none"
                stroke="#34D399"
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeDasharray="163.4"
                strokeDashoffset="41"
              />
            </svg>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span
                style={{
                  color: '#34D399',
                  fontSize: isHero ? 15 : 11,
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                75
              </span>
              <span
                style={{
                  color: 'rgba(255,255,255,0.35)',
                  fontSize: isHero ? 7 : 5.5,
                  lineHeight: 1,
                  marginTop: 2,
                  letterSpacing: '0.1em',
                }}
              >
                SCORE
              </span>
            </div>
          </div>
        </div>

        {/* Metric chips */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: isHero ? 7 : 5 }}>
          {[
            { icon: '🔥', val: '1,200', unit: 'KCAL' },
            { icon: '💧', val: '1.5L', unit: 'WATER' },
          ].map(({ icon, val, unit }) => (
            <div
              key={unit}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: isHero ? 8 : 5,
                padding: isHero ? '5px 10px' : '3px 7px',
                borderRadius: 8,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                width: 'fit-content',
              }}
            >
              <span style={{ fontSize: isHero ? 12 : 9 }}>{icon}</span>
              <div>
                <div
                  style={{
                    color: 'rgba(255,255,255,0.85)',
                    fontSize: isHero ? 11 : 8,
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  {val}
                </div>
                <div
                  style={{
                    color: 'rgba(255,255,255,0.3)',
                    fontSize: isHero ? 7 : 6,
                    lineHeight: 1,
                    marginTop: 1.5,
                    letterSpacing: '0.1em',
                  }}
                >
                  {unit}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phone mockups */}
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
        {/* Back phone — labs screen */}
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
            src="/images/portfolio/screenshots/nutrify-ai/labs.webp"
            alt="Nutrify.AI biomarker labs screen"
            fill
            className="object-cover object-top"
            sizes={isHero ? '112px' : '78px'}
          />
        </div>

        {/* Front phone — today screen */}
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
            src="/images/portfolio/screenshots/nutrify-ai/today.webp"
            alt="Nutrify.AI today dashboard"
            fill
            className="object-cover object-top"
            sizes={isHero ? '126px' : '89px'}
          />
        </div>

        {/* Third phone — hero only (onboarding) */}
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
              src="/images/portfolio/screenshots/nutrify-ai/onboarding.webp"
              alt="Nutrify.AI onboarding goal selection"
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
