import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import { COMPANY } from '../data'

// Import your logo (adjust the path to where your logo file is stored)
import logoImg from '../assets/new_logo.png' // or '../admin/assets/logo.jpeg' or '/images/logo.png'

function Facebook() {
  return <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.87h2.78l-.44 2.9h-2.34V22c4.78-.79 8.43-4.94 8.43-9.94Z" /></svg>
}
function Instagram() {
  return <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 8.41a3.31 3.31 0 1 1 0 6.62 3.31 3.31 0 0 1 0-6.62Zm6.5-8.63a1.19 1.19 0 1 1-2.38 0 1.19 1.19 0 0 1 2.38 0Z" /></svg>
}
function Youtube() {
  return <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor"><path d="M23.5 6.51a3.02 3.02 0 0 0-2.12-2.14C19.5 3.86 12 3.86 12 3.86s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.51 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.49 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.49ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" /></svg>
}

const footerNav = [
  { title: 'Explore', links: [{ href: '/destinations', label: 'Destinations' }, { href: '/packages', label: 'Holiday Packages' }, { href: '/gallery', label: 'Gallery' }, { href: '/blog', label: 'Blog' }] },
  { title: 'Company', links: [{ href: '/about', label: 'About Us' }, { href: '/contact', label: 'Contact Us' }] },
  { title: 'Support', links: [{ href: '/contact', label: 'Plan a Custom Tour' }, { href: '/contact', label: 'Visa Assistance' }] },
]

const socials = [
  { Icon: Facebook, label: 'Facebook' },
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Youtube, label: 'YouTube' },
]

export default function SiteFooter() {
  return (
    <footer style={{ background: 'var(--primary)', color: 'var(--primary-fg)' }}>
      <div className="container" style={{ paddingBlock: '3.5rem' }}>
        <div style={{ display: 'grid', gap: '2.5rem', gridTemplateColumns: '1.4fr 1fr 1fr 1fr' }}>
          <div style={{ gridColumn: '1 / -1' }} className="mobile-only" />
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '.75rem', textDecoration: 'none', color: '#fff' }}>
              {/* Logo image - replace the Plane icon with your logo */}
              <img 
                src={logoImg} 
                alt="Book My Dream Logo" 
                style={{ width: 50, height: 50, borderRadius: 12, objectFit: 'cover' }}
              />
              <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.25rem' }}>Book My Dream</span>
                <span style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--accent)' }}>Ek Safar Hamare Sath</span>
              </span>
            </Link>
            <p style={{ marginTop: '1rem', fontSize: '.875rem', lineHeight: 1.7, color: 'rgba(255,255,255,.7)', maxWidth: '24rem' }}>
              Crafting unforgettable journeys across the globe. From dreamy honeymoons to family adventures, we turn your travel dreams into reality.
            </p>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '.5rem', fontSize: '.875rem', color: 'rgba(255,255,255,.8)' }}>
              <p style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem' }}><MapPin size={16} style={{ flexShrink: 0, marginTop: 2, color: 'var(--accent)' }} />{COMPANY.address}</p>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem' }}>
                <Phone size={16} style={{ flexShrink: 0, marginTop: 2, color: 'var(--accent)' }} />
                <div>{COMPANY.phone.map((p, i) => <span key={i} style={{ display: 'block' }}>{p}</span>)}</div>
              </div>
              <p style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}><Mail size={16} style={{ flexShrink: 0, color: 'var(--accent)' }} />{COMPANY.email}</p>
            </div>
          </div>

          {/* Nav columns (unchanged) */}
          {footerNav.map(col => (
            <div key={col.title}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 600 }}>{col.title}</h3>
              <ul style={{ marginTop: '1rem', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '.625rem' }}>
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link to={l.href} style={{ fontSize: '.875rem', color: 'rgba(255,255,255,.7)', textDecoration: 'none', transition: 'color .2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.7)')}
                    >{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar (unchanged) */}
        <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.6)' }}>
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '.75rem' }}>
            {socials.map(({ Icon, label }) => (
              <a key={label} href="#" aria-label={label} style={{
                width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 9999, background: 'rgba(255,255,255,.1)', color: 'rgba(255,255,255,.8)',
                transition: 'all .2s', textDecoration: 'none',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.1)'; e.currentTarget.style.color = 'rgba(255,255,255,.8)' }}
              ><Icon /></a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}