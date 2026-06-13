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
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.destination.toLowerCase().includes(q) || p.country.toLowerCase().includes(q)
      return matchType && matchQ
    })
    list = [...list].sort((a, b) => {
      if (sort === 'price-low') return a.discountPrice - b.discountPrice
      if (sort === 'price-high') return b.discountPrice - a.discountPrice
      if (sort === 'rating') return b.rating - a.rating
      return b.reviews - a.reviews
    })
    return list
  }, [query, type, sort, packages])

  return (
    <main>
      <PageHero crumb="Packages" title="Find Your Perfect Getaway" subtitle="Handpicked itineraries across the globe, crafted by travel experts." image="/images/dest-switzerland.png" />
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
    </main>
  )
}
