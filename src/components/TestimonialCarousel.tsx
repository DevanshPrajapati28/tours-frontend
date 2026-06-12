import { useState } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { testimonials } from '../data'

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0)
  const total = testimonials.length
  const active = testimonials[index]
  const prev = () => setIndex(i => (i - 1 + total) % total)
  const next = () => setIndex(i => (i + 1) % total)

  return (
    <div style={{ maxWidth: '48rem', marginInline: 'auto', marginTop: '2.5rem' }}>
      <div style={{ position: 'relative', borderRadius: 24, border: '1px solid var(--border)', background: 'var(--card)', padding: '2rem 2.5rem', boxShadow: 'var(--shadow-sm)' }}>
        <Quote size={64} style={{ position: 'absolute', top: '2rem', right: '2rem', color: 'var(--secondary)' }} />
        <div style={{ display: 'flex', gap: 4 }}>
          {Array.from({ length: active.rating }).map((_, i) => (
            <Star key={i} size={20} className="star-fill" />
          ))}
        </div>
        <blockquote style={{ marginTop: '1rem', fontSize: '1.0625rem', lineHeight: 1.75, color: 'var(--fg)', position: 'relative' }}>
          &ldquo;{active.review}&rdquo;
        </blockquote>
        <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
            <span style={{
              display: 'flex', width: 48, height: 48, alignItems: 'center', justifyContent: 'center',
              borderRadius: 9999, background: 'var(--primary)', color: '#fff',
              fontFamily: 'var(--font-serif)', fontSize: '1.125rem', fontWeight: 700,
            }}>{active.name.charAt(0)}</span>
            <div>
              <p style={{ fontWeight: 600, color: 'var(--fg)' }}>{active.name}</p>
              <p style={{ fontSize: '.875rem', color: 'var(--muted-fg)' }}>{active.location} · {active.trip}</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '.5rem' }}>
            <button onClick={prev} aria-label="Previous" style={{
              width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 9999, border: '1px solid var(--border)', background: 'transparent', cursor: 'pointer', transition: 'all .2s',
            }}><ChevronLeft size={20} /></button>
            <button onClick={next} aria-label="Next" style={{
              width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: 9999, border: 'none', background: 'var(--primary)', color: '#fff', cursor: 'pointer', transition: 'all .2s',
            }}><ChevronRight size={20} /></button>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'center', gap: '.5rem' }}>
        {testimonials.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} aria-label={`Testimonial ${i + 1}`} style={{
            height: 8, borderRadius: 9999, border: 'none', cursor: 'pointer', transition: 'all .3s',
            width: i === index ? 24 : 8,
            background: i === index ? 'var(--accent)' : 'var(--border)',
          }} />
        ))}
      </div>
    </div>
  )
}
