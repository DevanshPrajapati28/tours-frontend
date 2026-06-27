import { useState, useEffect } from 'react'
import { API_URL } from '../config'
import type { Destination } from '../data'
import PageHero from '../components/PageHero'
import DestinationCard from '../components/DestinationCard'
import { MapPin, Globe, Heart } from 'lucide-react'
import heroImage from '../assets/image5.jpg'

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([])

  useEffect(() => {
    fetch(`${API_URL}/api/destinations`).then(r => r.json()).then(setDestinations)
  }, [])

  const domestic = destinations.filter(d => d.region === 'Domestic')
  const international = destinations.filter(d => d.region === 'International')
  const honeymoon = destinations.filter(d => d.region === 'Honeymoon')

  return (
    <main style={{ background: '#e8f2fb', color: 'var(--fg)', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

      {/* Fine dot texture — blue toned */}
      <svg style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0, opacity: 0.18 }} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dots-blue" x="0" y="0" width="36" height="36" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#4a90d9" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots-blue)" />
      </svg>

      {/* Hot air balloon 1 — large, top-right, blue & teal */}
      <svg style={{ position: 'fixed', top: '4%', right: '4%', width: '130px', opacity: 0.22, pointerEvents: 'none', zIndex: 0 }} viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="48" rx="36" ry="44" fill="#3a8fd4" />
        <path d="M22 60 Q30 90 38 95 L62 95 Q70 90 78 60" fill="#2ec4c4" />
        <path d="M14 48 Q18 20 50 8 Q82 20 86 48" fill="#1a6bb5" opacity="0.7" />
        <line x1="38" y1="95" x2="35" y2="108" stroke="#1a5a9a" strokeWidth="1.5" />
        <line x1="62" y1="95" x2="65" y2="108" stroke="#1a5a9a" strokeWidth="1.5" />
        <line x1="50" y1="95" x2="50" y2="108" stroke="#1a5a9a" strokeWidth="1.5" />
        <rect x="33" y="108" width="34" height="14" rx="3" fill="#1a6bb5" />
        <line x1="50" y1="8" x2="50" y2="95" stroke="#1a5a9a" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.5" />
        <line x1="14" y1="48" x2="86" y2="48" stroke="#1a5a9a" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.5" />
      </svg>

      {/* Hot air balloon 2 — medium, left side, sky blue & cyan */}
      <svg style={{ position: 'fixed', top: '28%', left: '2%', width: '90px', opacity: 0.18, pointerEvents: 'none', zIndex: 0 }} viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="48" rx="36" ry="44" fill="#60aee8" />
        <path d="M22 60 Q30 90 38 95 L62 95 Q70 90 78 60" fill="#30c8e0" />
        <path d="M14 48 Q18 20 50 8 Q82 20 86 48" fill="#2080c0" opacity="0.7" />
        <line x1="38" y1="95" x2="35" y2="108" stroke="#1a6090" strokeWidth="1.5" />
        <line x1="62" y1="95" x2="65" y2="108" stroke="#1a6090" strokeWidth="1.5" />
        <line x1="50" y1="95" x2="50" y2="108" stroke="#1a6090" strokeWidth="1.5" />
        <rect x="33" y="108" width="34" height="14" rx="3" fill="#1a6090" />
        <line x1="50" y1="8" x2="50" y2="95" stroke="#1a6090" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.5" />
        <line x1="14" y1="48" x2="86" y2="48" stroke="#1a6090" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.5" />
      </svg>

      {/* Hot air balloon 3 — small, bottom-right, navy & light blue */}
      <svg style={{ position: 'fixed', bottom: '12%', right: '8%', width: '70px', opacity: 0.16, pointerEvents: 'none', zIndex: 0 }} viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="48" rx="36" ry="44" fill="#88c4f0" />
        <path d="M22 60 Q30 90 38 95 L62 95 Q70 90 78 60" fill="#4ab0d8" />
        <path d="M14 48 Q18 20 50 8 Q82 20 86 48" fill="#2470b0" opacity="0.7" />
        <line x1="38" y1="95" x2="35" y2="108" stroke="#1a5080" strokeWidth="1.5" />
        <line x1="62" y1="95" x2="65" y2="108" stroke="#1a5080" strokeWidth="1.5" />
        <line x1="50" y1="95" x2="50" y2="108" stroke="#1a5080" strokeWidth="1.5" />
        <rect x="33" y="108" width="34" height="14" rx="3" fill="#1a5080" />
        <line x1="50" y1="8" x2="50" y2="95" stroke="#1a5080" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.5" />
        <line x1="14" y1="48" x2="86" y2="48" stroke="#1a5080" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.5" />
      </svg>

      {/* Hot air balloon 4 — tiny, mid-right, steel blue & aqua */}
      <svg style={{ position: 'fixed', top: '55%', right: '1%', width: '55px', opacity: 0.14, pointerEvents: 'none', zIndex: 0 }} viewBox="0 0 100 130" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="48" rx="36" ry="44" fill="#50a0e0" />
        <path d="M22 60 Q30 90 38 95 L62 95 Q70 90 78 60" fill="#20d0d8" />
        <path d="M14 48 Q18 20 50 8 Q82 20 86 48" fill="#1860a8" opacity="0.7" />
        <line x1="38" y1="95" x2="35" y2="108" stroke="#184878" strokeWidth="1.5" />
        <line x1="62" y1="95" x2="65" y2="108" stroke="#184878" strokeWidth="1.5" />
        <line x1="50" y1="95" x2="50" y2="108" stroke="#184878" strokeWidth="1.5" />
        <rect x="33" y="108" width="34" height="14" rx="3" fill="#184878" />
      </svg>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <PageHero crumb="Destinations" title="Where Will You Go Next?" subtitle="From iconic landmarks to hidden gems, explore detailed guides for the world's most loved destinations." image={heroImage} imagePos="center 70%" />

        <div className="container" style={{ paddingTop: '5rem', paddingBottom: '6rem' }}>

          {domestic.length > 0 && (
            <section style={{ marginBottom: '5rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,107,53,0.1)', color: 'var(--accent)', padding: '0.4rem 1rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                  <MapPin size={16} /> Incredible India
                </div>
                <h2 style={{ fontFamily: 'var(--font-marker)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, color: 'var(--fg)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Domestic
                </h2>
              </div>
              <div className="grid-3" style={{ gap: '2rem' }}>
                {domestic.map(d => <DestinationCard key={d.slug} dest={d} />)}
              </div>
            </section>
          )}

          {international.length > 0 && (
            <section style={{ marginBottom: '5rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '0.4rem 1rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                  <Globe size={16} /> Beyond Borders
                </div>
                <h2 style={{ fontFamily: 'var(--font-marker)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, color: 'var(--fg)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  International
                </h2>
              </div>
              <div className="grid-3" style={{ gap: '2rem' }}>
                {international.map(d => <DestinationCard key={d.slug} dest={d} />)}
              </div>
            </section>
          )}

          {honeymoon.length > 0 && (
            <section>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(236,72,153,0.1)', color: '#ec4899', padding: '0.4rem 1rem', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                  <Heart size={16} /> Romantic Escapes
                </div>
                <h2 style={{ fontFamily: 'var(--font-marker)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400, color: 'var(--fg)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Honeymoon
                </h2>
              </div>
              <div className="grid-3" style={{ gap: '2rem' }}>
                {honeymoon.map(d => <DestinationCard key={d.slug} dest={d} />)}
              </div>
            </section>
          )}

        </div>
      </div>
    </main>
  )
}