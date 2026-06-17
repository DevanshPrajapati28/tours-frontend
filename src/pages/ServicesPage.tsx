'use client'

import { useEffect, useRef, useState } from 'react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import { services } from '../data'
import {
  MapPin, Globe, Sparkles, Hotel, TrainFront, Ship, FileCheck, BookUser, Users, Briefcase, Plane, Heart
} from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  MapPin, Globe, Sparkles, Hotel, Plane, TrainFront, Ship, FileCheck, BookUser, Heart, Users, Briefcase,
}

/* ─── Tilt + glow card ─────────────────────────────────────── */
function ServiceCard({ svc, index }: { svc: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)

  const Icon = iconMap[svc.icon] ?? Sparkles
  const num  = String(index + 1).padStart(2, '0')

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), index * 75)
    return () => clearTimeout(t)
  }, [index])

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width  / 2
    const cy = rect.height / 2
    const rotX = ((y - cy) / cy) * -9
    const rotY = ((x - cx) / cx) *  9
    card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.035)`
    glow.style.left    = `${x}px`
    glow.style.top     = `${y}px`
    glow.style.opacity = '1'
  }

  function onMouseLeave() {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow) return
    card.style.transform   = 'perspective(900px) rotateX(0) rotateY(0) scale(1)'
    glow.style.opacity     = '0'
  }

  return (
    <div
      ref={cardRef}
      className={`svc-card${entered ? ' svc-card--in' : ''}`}
      style={{ '--i': index } as React.CSSProperties}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Cursor-tracked radial glow */}
      <div ref={glowRef} className="svc-glow" />

      {/* Expanding circle in top-right corner */}
      <div className="svc-blob" />

      {/* Editorial ghost number */}
      <span className="svc-ghost" aria-hidden="true">{num}</span>

      {/* Top row: icon + pill */}
      <div className="svc-top">
        <span className="svc-icon">
          <Icon size={20} />
        </span>
        <span className="svc-pill">{num}</span>
      </div>

      <h3 className="svc-title">{svc.title}</h3>
      <p  className="svc-desc">{svc.description}</p>

      {/* Animated "Explore →" that slides up on hover */}
      <div className="svc-cta">
        <span>Explore</span>
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
          <path d="M1.5 6.5h10M8 2.5l4 4-4 4"
            stroke="currentColor" strokeWidth="1.6"
            strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}

/* ─── Page ──────────────────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <main>
      <style>{`
        /* ── entrance ── */
        .svc-card {
          opacity: 0;
          transform: translateY(36px) scale(.97);
        }
        .svc-card--in {
          opacity: 1;
          transform: translateY(0) scale(1);
          transition:
            opacity   .55s cubic-bezier(.22,1,.36,1) calc(var(--i,0) * 75ms),
            transform .55s cubic-bezier(.22,1,.36,1) calc(var(--i,0) * 75ms);
        }

        /* ── grid ── */
        .svc-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.125rem;
          margin-top: 3rem;
        }
        /* tall first card */
        .svc-card:nth-child(1) { grid-row: span 2; }
        /* wide fourth card */
        .svc-card:nth-child(4) { grid-column: span 2; }

        @media (max-width: 860px) {
          .svc-grid { grid-template-columns: repeat(2, 1fr); }
          .svc-card:nth-child(1),
          .svc-card:nth-child(4) { grid-row: auto; grid-column: auto; }
        }
        @media (max-width: 500px) {
          .svc-grid { grid-template-columns: 1fr; }
        }

        /* ── card shell ── */
        .svc-card {
          position: relative;
          overflow: hidden;
          padding: 1.75rem;
          border-radius: 20px;
          background: var(--card, #fff);
          border: 1px solid var(--border, #e5e7eb);
          cursor: default;
          will-change: transform;
        }
        /* smooth return after tilt */
        .svc-card--in {
          transition:
            opacity   .55s cubic-bezier(.22,1,.36,1) calc(var(--i,0) * 75ms),
            transform .15s ease,
            box-shadow .15s ease,
            border-color .2s ease;
        }
        .svc-card:hover {
          border-color: color-mix(in srgb, var(--primary) 45%, transparent);
          box-shadow:
            0 0 0 1px color-mix(in srgb, var(--primary) 18%, transparent),
            0 24px 64px -16px color-mix(in srgb, var(--primary) 30%, transparent);
          z-index: 2;
        }

        /* ── cursor glow ── */
        .svc-glow {
          position: absolute;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            color-mix(in srgb, var(--primary) 16%, transparent) 0%,
            transparent 70%
          );
          transform: translate(-50%, -50%);
          pointer-events: none;
          opacity: 0;
          transition: opacity .35s ease;
        }

        /* ── expanding blob (top-right) ── */
        .svc-blob {
          position: absolute;
          top: -40px;
          right: -40px;
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: color-mix(in srgb, var(--secondary) 90%, transparent);
          pointer-events: none;
          transition: transform .5s cubic-bezier(.22,1,.36,1);
        }
        .svc-card:hover .svc-blob {
          transform: scale(2.8);
        }

        /* ── ghost number ── */
        .svc-ghost {
          position: absolute;
          bottom: -1.6rem;
          right: .4rem;
          font-size: 8.5rem;
          font-weight: 900;
          line-height: 1;
          font-family: var(--font-serif, Georgia, serif);
          color: transparent;
          -webkit-text-stroke: 1.5px color-mix(in srgb, var(--primary) 9%, transparent);
          user-select: none;
          pointer-events: none;
          transition:
            -webkit-text-stroke-color .3s,
            transform .4s cubic-bezier(.22,1,.36,1);
        }
        .svc-card:hover .svc-ghost {
          -webkit-text-stroke-color: color-mix(in srgb, var(--primary) 20%, transparent);
          transform: scale(1.07) translateY(-6px);
        }

        /* ── top row ── */
        .svc-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1.25rem;
          position: relative;
          z-index: 1;
        }

        .svc-icon {
          display: flex;
          width: 46px;
          height: 46px;
          align-items: center;
          justify-content: center;
          border-radius: 13px;
          background: var(--secondary);
          color: var(--primary);
          transition:
            background .25s,
            color .25s,
            transform .4s cubic-bezier(.22,1,.36,1);
        }
        .svc-card:hover .svc-icon {
          background: var(--primary);
          color: #fff;
          transform: rotate(-10deg) scale(1.14);
        }

        .svc-pill {
          font-size: .6875rem;
          font-weight: 700;
          letter-spacing: .1em;
          color: var(--primary);
          background: color-mix(in srgb, var(--primary) 10%, transparent);
          padding: .2rem .6rem;
          border-radius: 999px;
          font-variant-numeric: tabular-nums;
          transition: background .25s;
        }
        .svc-card:hover .svc-pill {
          background: color-mix(in srgb, var(--primary) 18%, transparent);
        }

        /* ── text ── */
        .svc-title {
          font-family: var(--font-serif, Georgia, serif);
          font-size: 1.0625rem;
          font-weight: 600;
          line-height: 1.3;
          margin: 0 0 .5rem;
          position: relative;
          z-index: 1;
        }
        .svc-card:nth-child(1) .svc-title { font-size: 1.35rem; }
        .svc-card:nth-child(4) .svc-title { font-size: 1.2rem; }

        .svc-desc {
          font-size: .875rem;
          color: var(--muted-fg, #6b7280);
          line-height: 1.65;
          margin: 0 0 1.5rem;
          position: relative;
          z-index: 1;
        }

        /* ── animated CTA ── */
        .svc-cta {
          display: flex;
          align-items: center;
          gap: .35rem;
          font-size: .8125rem;
          font-weight: 600;
          letter-spacing: .02em;
          color: var(--primary);
          opacity: 0;
          transform: translateY(8px);
          transition: opacity .25s ease, transform .25s ease;
          position: relative;
          z-index: 1;
        }
        .svc-card:hover .svc-cta {
          opacity: 1;
          transform: translateY(0);
        }
        .svc-cta svg {
          transition: transform .25s ease;
        }
        .svc-card:hover .svc-cta svg {
          transform: translateX(4px);
        }

        /* ── reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .svc-card, .svc-card--in {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
          .svc-glow, .svc-blob { display: none; }
        }
      `}</style>

      <PageHero
        crumb="Services"
        title="Everything You Need for the Perfect Trip"
        subtitle="A complete suite of travel services under one trusted roof."
        image="/images/nyc8.jpg"
      />

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Our Services"
            title="What We Offer"
            description="From flights to luxury cruises, we handle every detail so you can simply relax and enjoy."
          />

          <div className="svc-grid">
            {services.map((svc, i) => (
              <ServiceCard key={svc.title} svc={svc} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}