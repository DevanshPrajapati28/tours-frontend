import { useParams, Link, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Clock, MapPin, Star, CheckCircle2, X, ArrowRight } from 'lucide-react'
import { inr } from '../data'
import type { Package } from '../data'
import InquiryForm from '../components/InquiryForm'
import PackageCard from '../components/PackageCard'

export default function PackageDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const [pkg, setPkg] = useState<Package | null>(null)
  const [related, setRelated] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`/api/packages/${slug}`)
      .then(r => {
        if (!r.ok) throw new Error('Not found')
        return r.json()
      })
      .then(data => {
        setPkg(data)
        return fetch(`/api/packages?region=${data.region}`)
      })
      .then(r => r.json())
      .then(data => {
        setRelated(Array.isArray(data) ? data.filter((p: Package) => p.slug !== slug).slice(0, 3) : [])
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) return <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading package details...</div>
  if (notFound || !pkg) return <Navigate to="/packages" replace />

  const discount = Math.round(((pkg.price - pkg.discountPrice) / pkg.price) * 100)

  return (
    <main>
      {/* Hero */}
      <section style={{ position: 'relative', height: '60vh', minHeight: 420 }}>
        <img src={pkg.image} alt={pkg.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(26,35,50,.8), rgba(26,35,50,.3), transparent)' }} />
        <div style={{ position: 'absolute', inset: '0 0 0 0', display: 'flex', alignItems: 'flex-end' }}>
          <div className="container" style={{ paddingBottom: '2.5rem', color: '#fff' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.5rem' }}>
              <span style={{ padding: '.25rem .75rem', borderRadius: 9999, background: 'var(--secondary)', fontSize: '.75rem', fontWeight: 600, color: 'var(--secondary-fg)' }}>{pkg.type}</span>
              <span style={{ padding: '.25rem .75rem', borderRadius: 9999, background: 'rgba(249,250,251,.9)', fontSize: '.75rem', fontWeight: 500, color: 'var(--fg)' }}>{pkg.region}</span>
              {discount > 0 && <span style={{ padding: '.25rem .75rem', borderRadius: 9999, background: 'var(--accent)', fontSize: '.75rem', fontWeight: 700, color: '#fff' }}>{discount}% OFF</span>}
            </div>
            <h1 style={{ marginTop: '.75rem', fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 4vw, 3rem)', fontWeight: 700 }}>{pkg.name}</h1>
            <div style={{ marginTop: '.75rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '.875rem', color: 'rgba(255,255,255,.9)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={16} />{pkg.destination}, {pkg.country}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Clock size={16} />{pkg.duration}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Star size={16} className="star-fill" />{pkg.rating} ({pkg.reviews} reviews)</span>
            </div>
          </div>
        </div>
      </section>

      <div className="container" style={{ display: 'grid', gap: '2.5rem', paddingBlock: '3rem', gridTemplateColumns: '1fr' }}>
        <div style={{ display: 'grid', gap: '2.5rem', gridTemplateColumns: 'minmax(0,2fr) minmax(280px,1fr)', alignItems: 'start' }}>
          {/* Main content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {/* Highlights */}
            <section>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600 }}>Tour Highlights</h2>
              <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '.75rem' }}>
                {pkg.highlights.map(h => (
                  <div key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, borderRadius: 10, border: '1px solid var(--border)', background: 'var(--card)', padding: '.75rem' }}>
                    <CheckCircle2 size={18} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: '.875rem' }}>{h}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Itinerary */}
            <section>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600 }}>Day-by-Day Itinerary</h2>
              <ol style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', listStyle: 'none' }}>
                {pkg.itinerary.map(item => (
                  <li key={item.day} style={{ display: 'flex', gap: '1rem', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--card)', padding: '1rem' }}>
                    <div style={{ display: 'flex', width: 40, height: 40, flexShrink: 0, alignItems: 'center', justifyContent: 'center', borderRadius: 9999, background: 'var(--primary)', color: '#fff', fontWeight: 700, fontSize: '.875rem' }}>{item.day}</div>
                    <div>
                      <h3 style={{ fontWeight: 600 }}>{item.title}</h3>
                      <p style={{ marginTop: '.25rem', fontSize: '.875rem', color: 'var(--muted-fg)', lineHeight: 1.6 }}>{item.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            {/* Inclusions / Exclusions */}
            <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>Inclusions</h3>
                <ul style={{ marginTop: '.75rem', display: 'flex', flexDirection: 'column', gap: '.5rem', listStyle: 'none' }}>
                  {pkg.inclusions.map(i => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '.875rem', color: 'var(--muted-fg)' }}>
                      <CheckCircle2 size={16} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }} />{i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600 }}>Exclusions</h3>
                <ul style={{ marginTop: '.75rem', display: 'flex', flexDirection: 'column', gap: '.5rem', listStyle: 'none' }}>
                  {pkg.exclusions.map(i => (
                    <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '.875rem', color: 'var(--muted-fg)' }}>
                      <X size={16} style={{ color: 'var(--destructive)', flexShrink: 0, marginTop: 2 }} />{i}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* FAQs */}
            <section>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600 }}>Frequently Asked Questions</h2>
              <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                {pkg.faqs.map(f => (
                  <details key={f.q} style={{ borderRadius: 12, border: '1px solid var(--border)', background: 'var(--card)', padding: '1rem' }}>
                    <summary style={{ cursor: 'pointer', fontWeight: 500, listStyle: 'none' }}>{f.q}</summary>
                    <p style={{ marginTop: '.5rem', fontSize: '.875rem', lineHeight: 1.6, color: 'var(--muted-fg)' }}>{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside>
            <div style={{ position: 'sticky', top: 88, borderRadius: 16, border: '1px solid var(--border)', background: 'var(--card)', padding: '1.5rem', boxShadow: 'var(--shadow-md)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <p style={{ fontSize: '.875rem', color: 'var(--muted-fg)' }}>Starting from</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.875rem', fontWeight: 700, color: 'var(--primary)' }}>{inr(pkg.discountPrice)}</span>
                  <span style={{ fontSize: '.875rem', color: 'var(--muted-fg)', textDecoration: 'line-through' }}>{inr(pkg.price)}</span>
                </div>
                <p style={{ fontSize: '.75rem', color: 'var(--muted-fg)' }}>per person on twin sharing</p>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--border)' }} />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', fontWeight: 600 }}>Enquire About This Trip</h3>
              <InquiryForm defaultSubject={pkg.name} compact />
            </div>
          </aside>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section style={{ borderTop: '1px solid var(--border)', background: 'var(--muted)', paddingBlock: '3rem' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600 }}>You May Also Like</h2>
              <Link to="/packages" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '.875rem', fontWeight: 500, color: 'var(--primary)', textDecoration: 'none' }}>
                View all <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid-3" style={{ marginTop: '1.5rem' }}>
              {related.map(p => <PackageCard key={p.slug} pkg={p} />)}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
