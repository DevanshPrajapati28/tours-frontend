import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { COMPANY } from '../data'
import PageHero from '../components/PageHero'
import InquiryForm from '../components/InquiryForm'

export default function ContactPage() {
  return (
    <main>
      <PageHero crumb="Contact" title="Let's Plan Your Dream Trip" subtitle="Reach out to our travel experts and we'll craft the perfect itinerary just for you." />
      <div className="container" style={{ paddingBlock: '3rem', display: 'grid', gap: '3rem', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', alignItems: 'start' }}>
        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {[
            { icon: MapPin, label: 'Address', value: COMPANY.address },
            { icon: Phone, label: 'Phone', value: COMPANY.phone.map((p, i) => <span key={i} style={{ display: 'block' }}>{p}</span>) },
            { icon: Mail, label: 'Email', value: COMPANY.email },
            { icon: Clock, label: 'Working Hours', value: 'Mon–Sat: 9 AM – 7 PM IST' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} style={{ display: 'flex', gap: '1rem', padding: '1.25rem', borderRadius: 12, border: '1px solid var(--border)', background: 'var(--card)' }}>
              <span style={{ display: 'flex', width: 44, height: 44, flexShrink: 0, alignItems: 'center', justifyContent: 'center', borderRadius: 10, background: 'rgba(15,76,129,.1)', color: 'var(--primary)' }}>
                <Icon size={20} />
              </span>
              <div>
                <p style={{ fontSize: '.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--muted-fg)' }}>{label}</p>
                <p style={{ marginTop: '.25rem', fontSize: '.9375rem', fontWeight: 500 }}>{value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div style={{ borderRadius: 16, border: '1px solid var(--border)', background: 'var(--card)', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, marginBottom: '1.5rem' }}>Send an Inquiry</h2>
          <InquiryForm />
        </div>
      </div>
    </main>
  )
}
