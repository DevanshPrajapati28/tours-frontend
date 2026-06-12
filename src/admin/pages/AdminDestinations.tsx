import { useEffect, useState, useCallback } from 'react'
import { MapPin, RefreshCw } from 'lucide-react'
import { useApi } from '../AuthContext'

type Destination = {
  slug: string
  name: string
  country: string
  state: string
  region: string
  bestTime: string
  image: string
}

export default function AdminDestinations() {
  const api = useApi()
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(() => {
    setLoading(true)
    api('/api/destinations').then(r => r.json()).then(data => {
      setDestinations(Array.isArray(data) ? data : [])
    }).finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 700, color: '#1a2332' }}>Destinations</h1>
          <p style={{ color: '#64748b', fontSize: '.875rem' }}>View all destinations (Read-only)</p>
        </div>
        <button onClick={load} style={{ display: 'flex', alignItems: 'center', gap: '.5rem', padding: '.625rem 1rem', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontSize: '.875rem', fontFamily: 'var(--font-sans)' }}>
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: '1.25rem' }}>
        {loading ? (
          <div style={{ gridColumn: '1/-1', padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>Loading destinations…</div>
        ) : destinations.length === 0 ? (
          <div style={{ gridColumn: '1/-1', padding: '3rem', textAlign: 'center' }}>
            <MapPin size={40} style={{ color: '#e2e8f0', margin: '0 auto .75rem' }} />
            <p style={{ color: '#94a3b8' }}>No destinations found.</p>
          </div>
        ) : (
          destinations.map(dest => (
            <div key={dest.slug} style={{ borderRadius: 14, background: '#fff', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 4px rgba(0,0,0,.06)' }}>
              <div style={{ position: 'relative', height: 140, overflow: 'hidden' }}>
                <img src={dest.image} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.6), transparent)' }} />
                <span style={{ position: 'absolute', top: 8, left: 8, padding: '.2rem .6rem', borderRadius: 9999, background: 'rgba(255,255,255,.9)', fontSize: '.7rem', fontWeight: 700, color: '#0f4c81' }}>{dest.region}</span>
                <p style={{ position: 'absolute', bottom: 8, left: 10, fontSize: '.9rem', color: '#fff', fontWeight: 600 }}>{dest.name}</p>
              </div>
              <div style={{ padding: '1rem' }}>
                <p style={{ fontSize: '.8125rem', color: '#475569', fontWeight: 500 }}>{dest.state}, {dest.country}</p>
                <p style={{ fontSize: '.75rem', color: '#64748b', marginTop: '.25rem' }}>Best time: {dest.bestTime}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
