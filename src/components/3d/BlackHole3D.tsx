'use client'

import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, invalidate } from '@react-three/fiber'
import * as THREE from 'three'
import { usePerformanceOptimizedAnimation } from '@/hooks/use-performance-optimized-animation'

type BlackHole3DProps = {
  enabled?: boolean
}

function AccretionDisk({
  isVisible,
  scrollRotation,
}: {
  isVisible: boolean
  scrollRotation: React.MutableRefObject<number>
}) {
  const pointsRef = useRef<THREE.Points>(null)

  const particles = useMemo(() => {
    const count = 1800
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const colorInside = new THREE.Color('#ffffff')
    const colorMiddle = new THREE.Color('#c0c0cb')
    const colorOutside = new THREE.Color('#4a4a55')

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      const r = 1.5 + Math.random() * 3.5 + Math.random() * 1.5
      const angle = Math.random() * Math.PI * 2

      // Tighter disk — less vertical spread for a cleaner, flatter orbit
      positions[i3] = Math.cos(angle) * r
      positions[i3 + 1] = (Math.random() - 0.5) * 0.1 * (r * 0.35)
      positions[i3 + 2] = Math.sin(angle) * r

      const mixedColor = new THREE.Color()
      if (r < 2.5) {
        mixedColor.lerpColors(colorInside, colorMiddle, r - 1.5)
      } else {
        mixedColor.lerpColors(colorMiddle, colorOutside, (r - 2.5) / 2.5)
      }

      colors[i3] = mixedColor.r
      colors[i3 + 1] = mixedColor.g
      colors[i3 + 2] = mixedColor.b
    }

    return { positions, colors }
  }, [])

  useFrame((state) => {
    if (!pointsRef.current || !isVisible) return
    const time = state.clock.getElapsedTime()
    // Very slow ambient drift + scroll-driven rotation
    // Ambient: ~0.86°/s so barely perceptible when still
    // Scroll: one full rotation per 70% of viewport height scrolled
    pointsRef.current.rotation.y = time * 0.015 + scrollRotation.current
    invalidate()
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.056}
        vertexColors
        transparent
        opacity={0.64}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// Static scene — no position bobbing or rotation wobble
function Scene({
  isVisible,
  scrollRotation,
}: {
  isVisible: boolean
  scrollRotation: React.MutableRefObject<number>
}) {
  return (
    <group position={[0, -0.5, 0]} rotation={[0.42, 0, 0]}>
      <AccretionDisk isVisible={isVisible} scrollRotation={scrollRotation} />
    </group>
  )
}

export default function BlackHole3D({ enabled = true }: BlackHole3DProps) {
  const { shouldSkip3dEffects, isSlowCpu, isLowPower } = usePerformanceOptimizedAnimation()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  // Ref-based scroll rotation avoids re-renders while still driving Three.js
  const scrollRotation = useRef(0)
  const scrollTarget = useRef(0)
  const visibilityExitPosition = useRef<number | null>(null)
  const scrollEffectDisabled = useRef(false)
  const lerpRafId = useRef<number | null>(null)

  // Smoothly interpolate scroll rotation toward target each frame
  useEffect(() => {
    const lerpFactor = 0.06 // Lower = smoother/slower easing

    const tick = () => {
      const diff = scrollTarget.current - scrollRotation.current
      if (Math.abs(diff) > 0.0001) {
        scrollRotation.current += diff * lerpFactor
        invalidate()
      }
      lerpRafId.current = requestAnimationFrame(tick)
    }
    lerpRafId.current = requestAnimationFrame(tick)

    return () => {
      if (lerpRafId.current !== null) cancelAnimationFrame(lerpRafId.current)
    }
  }, [])

  // Connect scroll position to target rotation
  useEffect(() => {
    const handleScroll = () => {
      // Disable scroll effect 500px past the hero exits view for performance
      if (scrollEffectDisabled.current) return

      const vh = window.innerHeight || 800
      // Full rotation every ~70% of viewport height scrolled
      scrollTarget.current = (window.scrollY / (vh * 0.7)) * Math.PI * 2
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Pause rendering when off-screen and disable scroll effect after 500px past exit
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        const isCurrentlyInView = !!entry?.isIntersecting

        setIsVisible(isCurrentlyInView)

        // Track when section exits view
        if (!isCurrentlyInView && visibilityExitPosition.current === null) {
          visibilityExitPosition.current = window.scrollY
        }

        // Re-enable tracking if scrolling back up into view
        if (isCurrentlyInView) {
          visibilityExitPosition.current = null
          scrollEffectDisabled.current = false
        }

        // Disable scroll effect 500px past exit point
        if (
          !isCurrentlyInView &&
          visibilityExitPosition.current !== null &&
          window.scrollY > visibilityExitPosition.current + 500
        ) {
          scrollEffectDisabled.current = true
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  if (!enabled || shouldSkip3dEffects) {
    return (
      <div className="w-full h-full relative pointer-events-none" style={{ minHeight: '240px' }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.12),_transparent_60%)]" />
        <div className="absolute inset-[18%] rounded-full bg-gradient-to-br from-amber-200/25 via-emerald-200/15 to-purple-300/20 blur-3xl" />
        <div className="absolute inset-[32%] rounded-full bg-[radial-gradient(circle_at_center,_rgba(134,239,172,0.35),_transparent_60%)] blur-2xl" />
      </div>
    )
  }

  const dpr: [number, number] = isSlowCpu || isLowPower ? [1, 1] : [1, 1.2]

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative pointer-events-none"
      style={{ minHeight: '400px' }}
    >
      <Canvas
        camera={{ position: [0, 2, 6], fov: 45 }}
        dpr={dpr}
        frameloop="demand"
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 3, 3]} intensity={1.4} color="#fef3c7" />
        <Scene isVisible={isVisible} scrollRotation={scrollRotation} />
      </Canvas>
    </div>
  )
}
