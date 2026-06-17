import { useState, useEffect } from 'react'
import { API_URL } from '../config'
import type { Destination } from '../data'
import PageHero from '../components/PageHero'
import DestinationCard from '../components/DestinationCard'

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([])

  useEffect(() => {
    fetch(`${API_URL}/api/destinations`).then(r => r.json()).then(setDestinations)
  }, [])

  const domestic = destinations.filter(d => d.region === 'Domestic')
  const international = destinations.filter(d => d.region === 'International')
  return (
    <main>
      <PageHero crumb="Destinations" title="Where Will You Go Next?" subtitle="From iconic landmarks to hidden gems, explore detailed guides for the world's most loved destinations." image="/images/dubai.jpg" />
      <div className="container" style={{ paddingBlock: '3rem' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600 }}>Domestic Destinations</h2>
        <div className="grid-3" style={{ marginTop: '1.5rem' }}>
          {domestic.map(d => <DestinationCard key={d.slug} dest={d} />)}
        </div>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, marginTop: '3rem' }}>International Destinations</h2>
        <div className="grid-3" style={{ marginTop: '1.5rem' }}>
          {international.map(d => <DestinationCard key={d.slug} dest={d} />)}
        </div>
      </div>
    </main>
  )
}
