import { Link } from 'react-router-dom'
import { Star, Clock, MapPin } from 'lucide-react'
import { inr, type Package } from '../data'

export default function PackageCard({ pkg }: { pkg: Package }) {
  const discount = Math.round(((pkg.price - pkg.discountPrice) / pkg.price) * 100)
  return (
    <Link to={`/packages/${pkg.slug}`} className="card" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit' }}>
      <div style={{ position: 'relative', overflow: 'hidden' }} className="aspect-4-3">
        <img src={pkg.image} alt={pkg.name} className="img-cover" style={{ transition: 'transform .5s', width: '100%', height: '100%' }}
          onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.4), transparent)' }} />
        {discount > 0 && (
          <span className="badge badge-accent" style={{ position: 'absolute', top: 12, left: 12 }}>{discount}% OFF</span>
        )}
        <span style={{
          position: 'absolute', top: 12, right: 12, padding: '.25rem .75rem', borderRadius: 9999,
          background: 'rgba(255,255,255,.9)', fontSize: '.75rem', fontWeight: 600, color: 'var(--primary)',
        }}>{pkg.type}</span>
        <span style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', alignItems: 'center', gap: 4, fontSize: '.875rem', fontWeight: 500, color: '#fff' }}>
          <MapPin size={14} />{pkg.destination}, {pkg.country}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontSize: '.875rem', color: 'var(--muted-fg)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600, color: 'var(--fg)' }}>
            <Star size={15} className="star-fill" />{pkg.rating}
          </span>
          <span>({pkg.reviews} reviews)</span>
        </div>
        <h3 style={{ marginTop: '.5rem', fontFamily: 'var(--font-serif)', fontSize: '1.125rem', fontWeight: 600, lineHeight: 1.3 }}>{pkg.name}</h3>
        <p style={{ marginTop: '.25rem', display: 'flex', alignItems: 'center', gap: 6, fontSize: '.875rem', color: 'var(--muted-fg)' }}>
          <Clock size={15} />{pkg.duration}
        </p>
        <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '.75rem', color: 'var(--muted-fg)', textDecoration: 'line-through' }}>{inr(pkg.price)}</span>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>{inr(pkg.discountPrice)}</p>
            <span style={{ fontSize: '.75rem', color: 'var(--muted-fg)' }}>per person</span>
          </div>
          <span style={{
            padding: '.5rem 1rem', borderRadius: 9999, fontSize: '.875rem', fontWeight: 600,
            background: 'var(--secondary)', color: 'var(--primary)', transition: 'all .2s',
          }}>View Details</span>
        </div>
      </div>
    </Link>
  )
}
