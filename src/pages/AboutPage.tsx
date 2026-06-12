import { CheckCircle2, Award, Users, Clock } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import { Link } from 'react-router-dom'

const stats = [
  { icon: Users, value: '12K+', label: 'Happy Travelers' },
  { icon: Award, value: '150+', label: 'Destinations Covered' },
  { icon: Clock, value: '20+', label: 'Years of Experience' },
  { icon: CheckCircle2, value: '4.9★', label: 'Average Rating' },
]

const team = [
  { name: 'Rohit Mehta', role: 'Founder & CEO', img: '/images/dest-maldives.png' },
  { name: 'Priya Nair', role: 'Head of Operations', img: '/images/dest-bali.png' },
  { name: 'Arjun Sharma', role: 'Lead Travel Consultant', img: '/images/dest-switzerland.png' },
]

export default function AboutPage() {
  return (
    <main>
      <PageHero crumb="About" title="20 Years of Crafting Dream Journeys" subtitle="Book My Dream Travels was born from a passion for exploration and a commitment to making every trip truly unforgettable." image="/images/dest-rajasthan.png" />

      {/* Our Story */}
      <section className="section">
        <div className="container" style={{ display: 'grid', gap: '3rem', alignItems: 'center', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))' }}>
          <div>
            <SectionHeading eyebrow="Our Story" title="From a Small Agency to a Trusted Travel Partner" align="left" />
            <p style={{ marginTop: '1rem', color: 'var(--muted-fg)', lineHeight: 1.75 }}>
              Founded in 2004 in the heart of Bengaluru, Book My Dream Travels started with a single mission: to make world-class travel accessible, personalized, and seamless for every Indian traveler. Over two decades, we have grown into one of India's most trusted travel agencies.
            </p>
            <p style={{ marginTop: '1rem', color: 'var(--muted-fg)', lineHeight: 1.75 }}>
              From curating once-in-a-lifetime honeymoons to organizing large group tours, our team of passionate travel experts brings warmth, expertise, and attention to detail to every booking.
            </p>
            <Link to="/packages" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>Explore Our Packages</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <img src="/images/dest-kerala.png" alt="Kerala" style={{ borderRadius: 12, objectFit: 'cover', aspectRatio: '4/5', width: '100%' }} />
            <img src="/images/dest-goa.png" alt="Goa" style={{ borderRadius: 12, objectFit: 'cover', aspectRatio: '4/5', width: '100%', marginTop: '2rem' }} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: '1.5rem', textAlign: 'center' }}>
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} style={{ padding: '2rem 1rem', borderRadius: 16, background: 'var(--card)', border: '1px solid var(--border)' }}>
                <Icon size={32} style={{ color: 'var(--accent)', marginInline: 'auto' }} />
                <p style={{ marginTop: '1rem', fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>{value}</p>
                <p style={{ fontSize: '.875rem', color: 'var(--muted-fg)' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Our Values" title="What Drives Us Every Day" />
          <div className="grid-3" style={{ marginTop: '2.5rem' }}>
            {[
              { title: 'Customer First', desc: 'Every decision we make starts and ends with your satisfaction and safety.' },
              { title: 'Transparency', desc: 'No hidden charges, no surprises. What you see is exactly what you get.' },
              { title: 'Passion for Travel', desc: 'We don\'t just sell trips — we live and breathe travel, every single day.' },
            ].map(v => (
              <div key={v.title} style={{ padding: '2rem', borderRadius: 16, border: '1px solid var(--border)', background: 'var(--card)' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.125rem', fontWeight: 600 }}>{v.title}</h3>
                <p style={{ marginTop: '.5rem', fontSize: '.875rem', color: 'var(--muted-fg)', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
