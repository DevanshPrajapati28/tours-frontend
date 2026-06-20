import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import { COMPANY } from '../data'
import logoImg from '../assets/new_logo.png'

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
  {
    title: 'Explore',
    links: [
      { href: '/destinations', label: 'Destinations' },
      { href: '/packages', label: 'Holiday Packages' },
      { href: '/gallery', label: 'Gallery' },
      { href: '/blog', label: 'Blog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About Us' },
      { href: '/contact', label: 'Contact Us' },
    ],
  },
  {
    title: 'Support',
    links: [
      { href: '/contact', label: 'Plan a Custom Tour' },
      { href: '/contact', label: 'Visa Assistance' },
    ],
  },
]

const socials = [
  { Icon: Facebook, label: 'Facebook' },
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Youtube, label: 'YouTube' },
]

export default function SiteFooter() {
  return (
    <footer style={{ background: 'var(--primary)', color: 'var(--primary-fg)' }}>
      <div className="container footer-container" style={{ paddingBlock: '3.5rem' }}>

        {/* ── Main grid ── */}
        <div className="footer-grid">

          {/* Brand column */}
          <div className="footer-brand">
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '.75rem', textDecoration: 'none', color: '#fff' }}>
              <img
                src={logoImg}
                alt="Book My Dream Logo"
                style={{ width: 50, height: 50, borderRadius: 12, objectFit: 'cover', flexShrink: 0 }}
              />
              <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  Book My Dream
                </span>
                <span style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--accent)' }}>
                  Ek Safar Hamare Sath
                </span>
              </span>
            </Link>

            <p style={{ marginTop: '1rem', fontSize: '.875rem', lineHeight: 1.7, color: 'rgba(255,255,255,.7)' }}>
              Crafting unforgettable journeys across the globe. From dreamy honeymoons to family adventures, we turn your travel dreams into reality.
            </p>

            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '.5rem', fontSize: '.875rem', color: 'rgba(255,255,255,.8)' }}>
              <p style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem', margin: 0 }}>
                <MapPin size={16} style={{ flexShrink: 0, marginTop: 2, color: 'var(--accent)' }} />
                {COMPANY.address}
              </p>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem' }}>
                <Phone size={16} style={{ flexShrink: 0, marginTop: 2, color: 'var(--accent)' }} />
                <div>{COMPANY.phone.map((p: string, i: number) => <span key={i} style={{ display: 'block' }}>{p}</span>)}</div>
              </div>
              <p style={{ display: 'flex', alignItems: 'center', gap: '.5rem', margin: 0 }}>
                <Mail size={16} style={{ flexShrink: 0, color: 'var(--accent)' }} />
                {COMPANY.email}
              </p>
            </div>
          </div>

          {/* Nav columns */}
          <div className="footer-nav-cols">
            {footerNav.map(col => (
              <div key={col.title} className="footer-nav-col">
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 600, margin: 0 }}>
                  {col.title}
                </h3>
                <ul style={{ marginTop: '1rem', listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '.625rem' }}>
                  {col.links.map(l => (
                    <li key={l.label}>
                      <Link
                        to={l.href}
                        style={{ fontSize: '.875rem', color: 'rgba(255,255,255,.7)', textDecoration: 'none', transition: 'color .2s' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.7)')}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="footer-bottom">
          <p style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.6)', margin: 0 }}>
            &copy; {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '.75rem' }}>
            {socials.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                style={{
                  width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 9999, background: 'rgba(255,255,255,.1)', color: 'rgba(255,255,255,.8)',
                  transition: 'all .2s', textDecoration: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.1)'; e.currentTarget.style.color = 'rgba(255,255,255,.8)' }}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* ── Desktop layout ── */
        .footer-container {
          padding-left: 1.5rem;
          padding-right: 1.5rem;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1.8fr;
          gap: 2.5rem;
          align-items: start;
        }

        .footer-brand {
          max-width: 28rem;
        }

        /* Nav columns sit side-by-side inside the right cell */
        .footer-nav-cols {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        .footer-bottom {
          margin-top: 3rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,.15);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        /* ── Mobile layout (≤ 767px) ── */
        @media (max-width: 767px) {

          .footer-container {
            padding-block: 2.25rem !important;
            padding-left: 1.1rem !important;
            padding-right: 1.1rem !important;
          }

          /* Stack brand above nav */
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }

          .footer-brand {
            max-width: 100%;
          }

          /* Nav: 3 columns in a compact row */
          .footer-nav-cols {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 1rem !important;
          }

          .footer-nav-col h3 {
            font-size: .9375rem !important;
          }

          .footer-nav-col li a {
            font-size: .8125rem !important;
          }

          .footer-bottom {
            margin-top: 2rem !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: .75rem !important;
          }
        }

        /* ── Very small phones (≤ 380px) ── */
        @media (max-width: 380px) {
          /* 2-col nav if 3 is too tight */
          .footer-nav-cols {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </footer>
  )
}