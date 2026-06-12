import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

type Props = { title: string; subtitle?: string; crumb: string; image?: string }

export default function PageHero({ title, subtitle, crumb, image }: Props) {
  return (
    <section style={{
      position: 'relative', overflow: 'hidden',
      background: image ? undefined : 'var(--primary)',
      paddingTop: '8rem', paddingBottom: '4rem', color: '#fff',
    }}>
      {image && (
        <>
          <img src={image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,76,129,.85), rgba(15,76,129,.6))' }} />
        </>
      )}
      {/* Decorative blobs */}
      <div style={{ pointerEvents: 'none', position: 'absolute', right: '-5rem', top: '-6rem', width: 288, height: 288, borderRadius: 9999, background: 'rgba(255,107,53,.2)', filter: 'blur(48px)' }} />
      <div style={{ pointerEvents: 'none', position: 'absolute', left: '-5rem', bottom: '-6rem', width: 288, height: 288, borderRadius: 9999, background: 'rgba(255,255,255,.1)', filter: 'blur(48px)' }} />
      <div className="container" style={{ position: 'relative' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '.875rem', color: 'rgba(255,255,255,.7)' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none', transition: 'color .2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.7)')}
          >Home</Link>
          <ChevronRight size={16} />
          <span style={{ color: 'var(--accent)' }}>{crumb}</span>
        </nav>
        <h1 style={{ marginTop: '.75rem', fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 700, maxWidth: '36rem', lineHeight: 1.2 }}>{title}</h1>
        {subtitle && <p style={{ marginTop: '.75rem', maxWidth: '38rem', fontSize: '1rem', lineHeight: 1.75, color: 'rgba(255,255,255,.8)' }}>{subtitle}</p>}
      </div>
    </section>
  )
}
