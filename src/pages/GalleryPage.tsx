import { useState } from 'react'
import { galleryImages } from '../data'
import PageHero from '../components/PageHero'

const cats = ['All', 'Domestic Tours', 'International Tours', 'Honeymoon Tours', 'Family Tours'] as const
type Cat = typeof cats[number]

export default function GalleryPage() {
  const [active, setActive] = useState<Cat>('All')
  const filtered = active === 'All' ? galleryImages : galleryImages.filter(img => img.category === active)
  return (
    <main>
      <PageHero crumb="Gallery" title="Moments From Our Travelers" subtitle="A collection of magical memories from across the world, captured by our happy travelers." image="/images/trekking2.jpg" />

      <div className="container" style={{ paddingBlock: '3rem' }}>
        {/* Filters */}
        <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2rem' }}>
          {cats.map(c => (
            <button key={c} onClick={() => setActive(c)} style={{
              padding: '.5rem 1.25rem', borderRadius: 9999, fontSize: '.875rem', fontWeight: 500, border: 'none', cursor: 'pointer', transition: 'all .2s',
              background: active === c ? 'var(--primary)' : 'var(--secondary)',
              color: active === c ? '#fff' : 'var(--fg)',
            }}>{c}</button>
          ))}
        </div>
        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '1rem' }}>
          {filtered.map((img, i) => (
            <div key={i} style={{ position: 'relative', borderRadius: 12, overflow: 'hidden', aspectRatio: '1/1' }}>
              <img src={img.src} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div style={{
                position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.65), transparent)',
                display: 'flex', alignItems: 'flex-end', padding: '.75rem', opacity: 0, transition: 'opacity .3s',
              }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
              >
                <span style={{ fontSize: '.8125rem', fontWeight: 600, color: '#fff' }}>{img.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
