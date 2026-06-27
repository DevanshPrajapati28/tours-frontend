import { useState, useMemo, useEffect } from 'react'
import { API_URL } from '../config'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal } from 'lucide-react'
import PageHero from '../components/PageHero'
import PackageCard from '../components/PackageCard'
import type { Package } from '../data'

export default function PackagesPage() {
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [type, setType] = useState('All')
  const [sort, setSort] = useState('popular')
  const [packages, setPackages] = useState<Package[]>([])

  useEffect(() => {
    fetch(`${API_URL}/api/packages`).then(r => r.json()).then(setPackages)
  }, [])

  const types = useMemo(() => ['All', ...Array.from(new Set(packages.map(p => p.type)))], [packages])

  const filtered = useMemo(() => {
    let list = packages.filter(p => {
      const matchType = type === 'All' || p.type === type
      const q = query.trim().toLowerCase()
      let matchQ = !q || p.name.toLowerCase().includes(q) || p.destination.toLowerCase().includes(q) || p.country.toLowerCase().includes(q)

      // Support 'rajasthan' queries mapping to Jaipur/Jodhpur/Udaipur packages
      if (q === 'rajasthan') {
        const lowerName = p.name.toLowerCase()
        const lowerDest = p.destination.toLowerCase()
        if (
          lowerName.includes('jaipur') || lowerName.includes('jodhpur') || lowerName.includes('udaipur') || lowerName.includes('rajasthan') ||
          lowerDest.includes('jaipur') || lowerDest.includes('jodhpur') || lowerDest.includes('udaipur') || lowerDest.includes('rajasthan')
        ) {
          matchQ = true
        }
      }

      return matchType && matchQ
    })
    list = [...list].sort((a, b) => {
      // Primary sort: Domestic before International
      if (a.region === 'Domestic' && b.region !== 'Domestic') return -1;
      if (a.region !== 'Domestic' && b.region === 'Domestic') return 1;

      // Secondary sort: by the selected sort option
      if (sort === 'price-low') return a.discountPrice - b.discountPrice
      if (sort === 'price-high') return b.discountPrice - a.discountPrice
      if (sort === 'rating') return b.rating - a.rating
      return b.reviews - a.reviews
    })
    return list
  }, [query, type, sort, packages])

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
        <PageHero crumb="Packages" title="Find Your Perfect Getaway" subtitle="Handpicked itineraries across the globe, crafted by travel experts." image="/images/goa.jpg" />
      <div className="container" style={{ paddingBlock: '3rem' }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--card)', padding: '1rem', alignItems: 'center', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', flex: 1, alignItems: 'center', gap: 8, borderRadius: 10, background: 'var(--secondary)', padding: '.625rem 1rem', minWidth: 200 }}>
            <Search size={18} style={{ color: 'var(--muted-fg)', flexShrink: 0 }} />
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by destination or package..." style={{ flex: 1, border: 'none', outline: 'none', fontSize: '.875rem', background: 'transparent', fontFamily: 'var(--font-sans)' }} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', overflowX: 'auto', flexShrink: 0 }}>
            <SlidersHorizontal size={18} style={{ color: 'var(--muted-fg)', flexShrink: 0 }} />
            {types.map(t => (
              <button key={t} onClick={() => setType(t)} style={{
                flexShrink: 0, padding: '.5rem 1rem', borderRadius: 9999, fontSize: '.875rem', fontWeight: 500, border: 'none', cursor: 'pointer', transition: 'all .2s',
                background: type === t ? 'var(--primary)' : 'var(--secondary)',
                color: type === t ? '#fff' : 'var(--fg)',
              }}>{t}</button>
            ))}
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} style={{ borderRadius: 10, border: '1px solid var(--border)', background: 'var(--card)', padding: '.625rem 1rem', fontSize: '.875rem', fontWeight: 500, outline: 'none', cursor: 'pointer', flexShrink: 0 }}>
            <option value="popular">Most Popular</option>
            <option value="rating">Top Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        <p style={{ marginTop: '1.5rem', fontSize: '.875rem', color: 'var(--muted-fg)' }}>
          Showing <strong style={{ color: 'var(--fg)' }}>{filtered.length}</strong> packages
        </p>

        {filtered.length > 0 ? (
          <div className="grid-3" style={{ marginTop: '1rem' }}>
            {filtered.map(pkg => <PackageCard key={pkg.slug} pkg={pkg} />)}
          </div>
        ) : (
          <div style={{ marginTop: '3rem', borderRadius: 16, border: '2px dashed var(--border)', padding: '4rem 2rem', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>No packages found</p>
            <p style={{ marginTop: '.5rem', fontSize: '.875rem', color: 'var(--muted-fg)' }}>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
      </div>
    </main>
  )
}
