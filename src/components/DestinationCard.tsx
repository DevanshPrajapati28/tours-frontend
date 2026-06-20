import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Destination } from '../data'

export default function DestinationCard({ dest }: { dest: Destination }) {
  return (
    <Link
      to={`/destinations/${dest.slug}`}
      className="dest-card"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        borderRadius: 16,
        overflow: 'hidden',
        textDecoration: 'none',
        color: '#fff',
        aspectRatio: '3/4',          /* ← desktop: original ratio kept */
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        transition: 'box-shadow .3s ease, transform .3s ease',
        background: '#1a1a2e',
      }}
    >
      {/* Background image */}
      <img
        src={dest.image}
        alt={dest.name}
        className="dest-card-img"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          transition: 'transform .5s ease',
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,.85) 0%, rgba(0,0,0,.15) 55%, transparent 100%)',
      }} />

      {/* Content block */}
      <div style={{ position: 'relative', padding: '1rem' }}>

        {/* Best-time badge */}
        {dest.bestTime && (
          <span style={{
            display: 'inline-block',
            padding: '.18rem .5rem',
            borderRadius: 9999,
            background: 'rgba(255,255,255,.2)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
            fontSize: '.62rem',
            fontWeight: 600,
            color: '#fff',
            letterSpacing: '.02em',
            lineHeight: 1.6,
            maxWidth: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}>
            📅 {dest.bestTime}
          </span>
        )}

        {/* Name */}
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.1rem',
          fontWeight: 700,
          lineHeight: 1.2,
          margin: '.35rem 0 0',
        }}>
          {dest.name}
        </h3>

        {/* Country */}
        <p style={{
          fontSize: '.78rem',
          color: 'rgba(255,255,255,.75)',
          margin: '.18rem 0 0',
        }}>
          {dest.country}
        </p>

        {/* Explore CTA */}
        <span style={{
          marginTop: '.55rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 3,
          fontSize: '.8rem',
          fontWeight: 700,
          color: 'var(--accent)',
        }}>
          Explore <ArrowRight size={13} />
        </span>
      </div>

      <style>{`
        /* Hover: lift + zoom — desktop only */
        @media (min-width: 768px) {
          .dest-card:hover {
            transform: translateY(-5px) !important;
            box-shadow: 0 18px 38px rgba(0,0,0,0.24) !important;
          }
          .dest-card:hover .dest-card-img {
            transform: scale(1.07);
          }
        }

        /* ── Mobile only ── */
        @media (max-width: 767px) {
          .dest-card {
            aspect-ratio: unset !important;   /* remove ratio */
            height: 230px !important;         /* fixed tall height */
            width: 100% !important;
            border-radius: 12px !important;
          }
        }
      `}</style>
    </Link>
  )
}