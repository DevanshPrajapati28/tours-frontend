import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays } from 'lucide-react'
import type { Destination } from '../data'

export default function DestinationCard({ dest }: { dest: Destination }) {
  return (
    <Link to={`/destinations/${dest.slug}`} style={{
      position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      borderRadius: 'var(--radius)', overflow: 'hidden', textDecoration: 'none', color: '#fff',
      aspectRatio: '3/4', boxShadow: 'var(--shadow-sm)', transition: 'box-shadow .3s, transform .3s',
    }}
      onMouseEnter={e => { (e.currentTarget.style.transform = 'translateY(-3px)'); (e.currentTarget.style.boxShadow = 'var(--shadow-lg)') }}
      onMouseLeave={e => { (e.currentTarget.style.transform = 'translateY(0)'); (e.currentTarget.style.boxShadow = 'var(--shadow-sm)') }}
    >
      <img src={dest.image} alt={dest.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.8), rgba(0,0,0,.1), transparent)' }} />
      <div style={{ position: 'relative', padding: '1.25rem' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '.25rem .625rem', borderRadius: 9999, background: 'rgba(255,255,255,.2)', fontSize: '.75rem', fontWeight: 500, backdropFilter: 'blur(4px)' }}>
          <CalendarDays size={12} />{dest.bestTime}
        </span>
        <h3 style={{ marginTop: '.5rem', fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700 }}>{dest.name}</h3>
        <p style={{ fontSize: '.875rem', color: 'rgba(255,255,255,.8)' }}>{dest.country}</p>
        <span style={{ marginTop: '.75rem', display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '.875rem', fontWeight: 600, color: 'var(--accent)' }}>
          Explore <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  )
}
