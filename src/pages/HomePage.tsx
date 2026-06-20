import { Link } from 'react-router-dom'
import { API_URL } from '../config'
import baliImg from '../assets/new1.jpg'
import maldivesImg from '../assets/nyc8.jpg'
import switzerlandImg from '../assets/switzerland.jpg'
import dubaiImg from '../assets/trekking2.jpg'
import kerelaImg from '../assets/dubai1.jpg'
import {
  Search, Star, ShieldCheck, Award, CheckCircle2, ArrowRight, Headphones,
  Wallet, Map, Plane, Heart, ChevronLeft, ChevronRight, Compass, Building2,
  Car, BadgePercent, LayoutGrid, Calendar, Clock, Users2, Utensils, Hotel as HotelIcon,
  Bus, UserCheck, Tag
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { blogPosts, galleryImages, testimonials, services } from '../data'
import type { Package, Destination } from '../data'
import SectionHeading from '../components/SectionHeading'
import PackageCard from '../components/PackageCard'
import DestinationCard from '../components/DestinationCard'
import TestimonialCarousel from '../components/TestimonialCarousel'
import { Send } from 'lucide-react'
import {
  MapPin, Globe, Sparkles, Hotel, TrainFront, Ship, FileCheck, BookUser, Users, Briefcase
} from 'lucide-react'
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const iconMap: Record<string, React.ElementType> = {
  MapPin, Globe, Sparkles, Hotel, Plane, TrainFront, Ship, FileCheck, BookUser, Heart, Users, Briefcase,
}

const quickCategories = [
  { icon: Compass, label: 'Tours & Experiences', to: '/packages', bg: 'rgba(255,107,53,0.85)', border: 'rgba(255,140,80,0.6)' },
  // { icon: Building2, label: 'Hotels', to: '/hotels', bg: 'rgba(99,102,241,0.85)', border: 'rgba(129,140,248,0.6)' },
  { icon: Plane, label: 'Destinations', to: '/destinations', bg: 'rgba(16,185,129,0.85)', border: 'rgba(52,211,153,0.6)' },
  // { icon: Car, label: 'Car Rentals', to: '/car-rentals', bg: 'rgba(245,158,11,0.85)', border: 'rgba(251,191,36,0.6)' },
  { icon: BadgePercent, label: 'Offers', to: '/offers', bg: 'rgba(236,72,153,0.85)', border: 'rgba(244,114,182,0.6)' },
  { icon: LayoutGrid, label: 'All', to: '/packages', bg: 'rgba(14,165,233,0.85)', border: 'rgba(56,189,248,0.6)' },
]

const inclusionIcons = [
  { icon: HotelIcon, title: 'Handpicked Stays', desc: 'Comfortable & convenient hotels, cherry-picked by our team.' },
  { icon: Utensils, title: 'All Meals Included', desc: "Breakfast, lunch & dinner — eat to your heart's content." },
  { icon: Bus, title: 'On-Tour Transport', desc: 'All road, rail & transfers included so you travel tension-free.' },
  { icon: UserCheck, title: 'Expert Tour Managers', desc: 'A dedicated team specializing in India & World tours.' },
  { icon: Tag, title: 'Best Value Itineraries', desc: 'Carefully researched plans that maximize every rupee.' },
  { icon: Plane, title: 'To & Fro Airfare', desc: 'Most tours include airfare from major hubs across India.' },
]

const trustStats = [
  { value: '1.2L+', label: 'Happy Guests' },
  { value: '8.5K+', label: 'Tours Completed' },
  { value: '150+', label: 'Destinations' },
]

const departureCities = [
  { city: 'Mumbai', count: '64 Departures', price: '24,000' },
  { city: 'Delhi', count: '52 Departures', price: '29,000' },
  { city: 'Bengaluru', count: '30 Departures', price: '34,000' },
  { city: 'Pune', count: '16 Departures', price: '24,000' },
  { city: 'Hyderabad', count: '28 Departures', price: '29,000' },
  { city: 'Ahmedabad', count: '22 Departures', price: '26,000' },
]

const heroImages = [kerelaImg, baliImg, maldivesImg, dubaiImg, switzerlandImg]

type DenseCard = {
  slug: string; title: string; image: string; duration: string
  price: string; departure: string; rating: number; travellers: string; tag?: string
}

const samplePackages: DenseCard[] = [
  { slug: 'kerala-backwaters', title: 'Highlights of Kerala', image: kerelaImg, duration: '6 Days', price: '25,000', departure: '15 Jun, 22 Jun +10 more', rating: 4.7, travellers: '10.7k+ Happy Travellers', tag: 'Bestseller' },
  { slug: 'bali-explorer', title: 'Best of Bali', image: baliImg, duration: '7 Days', price: '1,32,000', departure: '19 Jun, 21 Jun +13 more', rating: 4.8, travellers: '3.3k+ Happy Travellers', tag: 'Filling Fast' },
  { slug: 'swiss-escape', title: 'Switzerland Highlights', image: switzerlandImg, duration: '8 Days', price: '1,89,000', departure: '11 Aug, 16 Aug', rating: 4.9, travellers: '6.6k+ Happy Travellers', tag: 'Filling Fast' },
  { slug: 'dubai-delight', title: 'Dubai & Abu Dhabi', image: dubaiImg, duration: '5 Days', price: '64,000', departure: '18 Jul, 25 Jul', rating: 4.6, travellers: '8.8k+ Happy Travellers' },
  { slug: 'maldives-escape', title: 'Maldives Romance', image: maldivesImg, duration: '4 Days', price: '78,000', departure: '20 Jun, 27 Jun', rating: 4.8, travellers: '5.1k+ Happy Travellers', tag: 'Honeymoon Special' },
]

const introStats = [
  { icon: Users2, value: '5796+', label: 'Happy Guests' },
  { icon: Award, value: '8.5K+', label: 'Tours Completed' },
  { icon: ShieldCheck, value: '150+', label: 'Tour Experts' },
  { icon: Map, value: '150+', label: 'Tour Destinations' },
]

const reviewCards = [
  {
    tour: 'Best of Bali', type: 'Family', rating: 5,
    review: '"The tour was amazing and organised very well. It was a perfect combination of relaxation, adventure and sightseeing. The food served du..."',
    reviewer: 'Suruchee', date: 'May, 2026', guide: 'Swapnil Deshmukh', image: null,
  },
  {
    tour: 'Switzerland Highlights', type: 'Family', rating: 5,
    review: '"Excellent service right from the beginning of the tour. Every detail was taken care of beautifully by the team..."',
    reviewer: 'Dhananjay', date: 'May, 2026', guide: 'Amit Kene', image: switzerlandImg,
  },
  {
    tour: 'Kerala Backwaters', type: 'Family', rating: 5,
    review: '"A heartfelt thank you to our tour manager. The experience was beyond expectations — truly memorable for our family..."',
    reviewer: 'Kanta', date: 'May, 2026', guide: 'Rajan Nair', image: kerelaImg,
  },
]

export default function HomePage() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [email, setEmail] = useState('')
  const [subDone, setSubDone] = useState(false)
  const [featured, setFeatured] = useState<Package[]>([])
  const [popularDest, setPopularDest] = useState<Destination[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // ── Refs (kept even if not all used, so nothing breaks) ──
  const introSectionRef = useRef<HTMLElement>(null)
  const leftImageRef = useRef<HTMLImageElement>(null)
  const rightImageRef = useRef<HTMLImageElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const listItemsRef = useRef<(HTMLLIElement | null)[]>([])
  const statsRefs = useRef<(HTMLDivElement | null)[]>([])
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const imagesContainerRef = useRef<HTMLDivElement>(null)
  const popularSectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    fetch(`${API_URL}/api/packages/featured`).then(r => r.json()).then(data => {
      const sorted = Array.isArray(data)
        ? data.sort((a, b) => (a.region === 'Domestic' && b.region !== 'Domestic' ? -1 : a.region !== 'Domestic' && b.region === 'Domestic' ? 1 : 0))
        : []
      setFeatured(sorted)
    })
    fetch(`${API_URL}/api/destinations`).then(r => r.json()).then(data => {
      const sorted = Array.isArray(data)
        ? data.sort((a, b) => (a.region === 'Domestic' && b.region !== 'Domestic' ? -1 : a.region !== 'Domestic' && b.region === 'Domestic' ? 1 : 0))
        : []
      setPopularDest(sorted.slice(0, 8))
    })
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(() => setCurrentSlide(p => (p + 1) % heroImages.length), 5000)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => setCurrentSlide(p => (p + 1) % heroImages.length), 5000)
  }
  const nextSlide = () => goToSlide((currentSlide + 1) % heroImages.length)
  const prevSlide = () => goToSlide((currentSlide - 1 + heroImages.length) % heroImages.length)

  const latestBlogs = blogPosts.slice(0, 3)
  const galleryPreview = galleryImages.slice(0, 6)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch(`${API_URL}/api/newsletter/subscribe`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setSubDone(true)
  }

  // ── GSAP (all refs guarded against null) ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Mouse glow (only if glowRef exists)
      const handleMouseMove = (e: MouseEvent) => {
        if (!glowRef.current || !introSectionRef.current) return
        const rect = introSectionRef.current.getBoundingClientRect()
        gsap.to(glowRef.current, {
          x: e.clientX - rect.left - 150,
          y: e.clientY - rect.top - 150,
          duration: 0.4, ease: 'power2.out',
        })
      }
      window.addEventListener('mousemove', handleMouseMove)

      // Entrance timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: introSectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      // Stats (cards inside dark box)
      const validStats = statsRefs.current.filter(Boolean)
      if (validStats.length) {
        tl.from(validStats, { opacity: 0, y: 30, stagger: 0.1, duration: 0.6, ease: 'back.out' })
      }

      // Heading
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.word')
        if (words.length) {
          tl.from(words, { opacity: 0, y: 20, stagger: 0.03, duration: 0.5, ease: 'back.out' }, '-=0.3')
        }
      }

      // Button
      if (buttonRef.current) {
        tl.from(buttonRef.current, { opacity: 0, scale: 0.8, duration: 0.4, ease: 'back.out' }, '-=0.2')
      }

      // Popular destination cards
      const popCards = document.querySelectorAll('.pop-destination-card')
      if (popCards.length) {
        gsap.set(popCards, { opacity: 0, y: 30 })
        gsap.to(popCards, {
          scrollTrigger: { trigger: popularSectionRef.current, start: 'top 85%', toggleActions: 'play none none reverse' },
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
        })
      }

      // Dense package cards
      const denseCards = document.querySelectorAll('.dense-card')
      if (denseCards.length) {
        gsap.set(denseCards, { opacity: 0, y: 24 })
        gsap.to(denseCards, {
          scrollTrigger: { trigger: '.dense-card-row', start: 'top 85%', toggleActions: 'play none none reverse' },
          opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
        })
      }

      return () => window.removeEventListener('mousemove', handleMouseMove)
    }, introSectionRef)

    return () => ctx.revert()
  }, [popularDest])

  return (
    <main>

      {/* ═══════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '55vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          {heroImages.map((img, idx) => (
            <div key={idx} style={{ position: 'absolute', inset: 0, transition: 'opacity 1s ease-in-out', opacity: idx === currentSlide ? 1 : 0, zIndex: idx === currentSlide ? 1 : 0 }}>
              <img src={img} alt={`Hero ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>

        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,.55), rgba(0,0,0,.35), rgba(0,0,0,.65))', zIndex: 2 }} />

        {/* Prev / Next */}
        {[{ fn: prevSlide, side: 'left', Icon: ChevronLeft }, { fn: nextSlide, side: 'right', Icon: ChevronRight }].map(({ fn, side, Icon }) => (
          <button key={side} onClick={fn} style={{ position: 'absolute', [side]: '1rem', top: '50%', transform: 'translateY(-50%)', zIndex: 10, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', border: 'none', borderRadius: '9999px', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff', transition: 'background .2s' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.7)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.4)')}
          >
            <Icon size={24} />
          </button>
        ))}

        {/* Dots */}
        <div style={{ position: 'absolute', bottom: '1.25rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '.75rem' }}>
          {heroImages.map((_, idx) => (
            <button key={idx} onClick={() => goToSlide(idx)} style={{ width: idx === currentSlide ? '2rem' : '.5rem', height: '.5rem', borderRadius: 9999, background: idx === currentSlide ? 'var(--accent)' : 'rgba(255,255,255,0.6)', border: 'none', cursor: 'pointer', transition: 'all .2s', padding: 0 }} />
          ))}
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 5, paddingTop: '4rem', paddingBottom: '2rem', textAlign: 'center', color: '#fff' }}>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3.25rem)', fontWeight: 700, lineHeight: 1.15 }}>
            Your World of <span style={{ color: 'var(--accent)' }}>Joy</span>
          </h1>
          <p style={{ marginTop: '.75rem', maxWidth: '34rem', marginInline: 'auto', fontSize: '1rem', lineHeight: 1.6, color: 'rgba(255,255,255,.85)' }}>
            From local escapes to far-flung adventures, find what makes you happy — anytime, anywhere.
          </p>

          {/* Search */}
          <form onSubmit={e => { e.preventDefault(); navigate(`/packages?q=${q}`) }}
            style={{ marginTop: '1.75rem', maxWidth: '38rem', marginInline: 'auto', display: 'flex', gap: '.5rem', borderRadius: 9999, background: '#fff', padding: '.5rem .5rem .5rem 1.25rem', boxShadow: '0 10px 30px rgba(0,0,0,.2)', flexWrap: 'wrap', alignItems: 'center' }}>
            <Search size={18} style={{ color: 'var(--muted-fg)', flexShrink: 0 }} />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search destinations or activities" style={{ flex: 1, border: 'none', outline: 'none', fontSize: '.9rem', color: 'var(--fg)', background: 'transparent', fontFamily: 'var(--font-sans)', minWidth: 120 }} />
            <button type="submit" className="btn btn-accent" style={{ borderRadius: 9999 }}>Search</button>
          </form>

          {/* Quick category icons — colorful */}
          <div style={{
            marginTop: '1.75rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '1.25rem',
            flexWrap: 'wrap',
          }}>
            {quickCategories.map(({ icon: Icon, label, to, bg, border }) => (
              <Link
                key={label}
                to={to}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                  color: '#fff',
                  textDecoration: 'none',
                  width: 84,
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    width: 58,
                    height: 58,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                    background: bg,
                    backdropFilter: 'blur(10px)',
                    border: `1.5px solid ${border}`,
                    boxShadow: `0 4px 16px rgba(0,0,0,0.2), 0 0 0 0 ${border}`,
                    transition: 'transform .2s, box-shadow .2s',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translateY(-4px) scale(1.1)'
                    el.style.boxShadow = `0 8px 24px rgba(0,0,0,0.25), 0 0 0 4px ${border}`
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.transform = 'translateY(0) scale(1)'
                    el.style.boxShadow = `0 4px 16px rgba(0,0,0,0.2), 0 0 0 0 ${border}`
                  }}
                >
                  <Icon size={24} strokeWidth={1.8} color="#fff" />
                </span>
                <span style={{
                  fontSize: '.72rem',
                  fontWeight: 600,
                  textAlign: 'center',
                  lineHeight: 1.3,
                  textShadow: '0 1px 4px rgba(0,0,0,0.5)',
                  letterSpacing: '0.01em',
                }}>
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TRUST STRIP
      ═══════════════════════════════════════════════ */}
      <section style={{ background: 'var(--primary)', padding: '1.5rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1rem' }}>
          {trustStats.map(s => (
            <div key={s.label} style={{ textAlign: 'center', color: '#fff' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.625rem', fontWeight: 800, lineHeight: 1.1 }}>{s.value}</p>
              <p style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.8)', marginTop: '.2rem', letterSpacing: '.3px' }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          OFFERS
      ═══════════════════════════════════════════════ */}
      <section className="section" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--fg)' }}>Offers for you</h2>
          <div className="offers-row" style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1.3fr 1.3fr 1fr', gap: '1rem', alignItems: 'stretch' }}>

            {[
              { to: '/packages', img: dubaiImg, eyebrow: 'Limited-Time Offer', title: 'Travel Deals', sub: 'Unlock savings on tours, transport & more.' },
              { to: '/destinations', img: switzerlandImg, eyebrow: "Editor's Pick", title: 'Swiss Escape', sub: 'Curated alpine getaways, ready to book.' },
            ].map(b => (
              <Link key={b.title} to={b.to} className="offer-banner" style={{ position: 'relative', display: 'block', borderRadius: 16, overflow: 'hidden', height: 190, textDecoration: 'none', boxShadow: '0 8px 20px -8px rgba(0,0,0,.25)' }}>
                <img src={b.img} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(110deg, rgba(15,30,48,.75) 0%, rgba(15,30,48,.25) 55%, transparent 80%)' }} />
                <div style={{ position: 'absolute', inset: 0, padding: '1.1rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontSize: '.6875rem', fontWeight: 700, letterSpacing: '1px', color: 'var(--accent)', textTransform: 'uppercase' }}>{b.eyebrow}</span>
                    <h3 style={{ marginTop: '.25rem', fontFamily: 'var(--font-serif)', fontSize: '1.375rem', fontWeight: 800, color: '#fff', lineHeight: 1.15, textTransform: 'uppercase' }}>{b.title}</h3>
                    <p style={{ marginTop: '.3rem', fontSize: '.75rem', color: 'rgba(255,255,255,.85)', maxWidth: '14rem' }}>{b.sub}</p>
                  </div>
                  <span style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 6, borderRadius: 9999, background: 'var(--accent)', color: '#fff', fontSize: '.75rem', fontWeight: 700, padding: '.4rem .9rem' }}>Learn more</span>
                </div>
              </Link>
            ))}

            <Link to="/packages" className="offer-promo" style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 190, borderRadius: 16, overflow: 'hidden', padding: '1.1rem', background: 'linear-gradient(135deg, rgba(15,76,129,.08) 0%, rgba(255,107,53,.1) 100%)', border: '1px solid var(--border)', textDecoration: 'none', color: 'inherit' }}>
              <BadgePercent size={70} style={{ position: 'absolute', right: '-1rem', bottom: '-1rem', color: 'var(--accent)', opacity: .15, transform: 'rotate(-10deg)' }} />
              <span style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 6, borderRadius: 9999, background: 'var(--accent)', color: '#fff', fontSize: '.6875rem', fontWeight: 700, padding: '.3rem .7rem' }}>
                <Star size={12} style={{ fill: '#fff' }} /> Exclusive
              </span>
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.0625rem', fontWeight: 700, color: 'var(--fg)' }}>Top Travel Deals</h3>
                <p style={{ marginTop: '.3rem', fontSize: '.8125rem', color: 'var(--muted-fg)' }}>Experiences, transport & more</p>
                <span style={{ marginTop: '.5rem', display: 'inline-flex', borderRadius: 9999, background: 'rgba(255,107,53,.12)', color: 'var(--accent)', fontSize: '.75rem', fontWeight: 700, padding: '.25rem .6rem' }}>At least 10% off</span>
              </div>
            </Link>
          </div>
        </div>
        <style>{`
          .offer-banner,.offer-promo { transition: transform .25s ease, box-shadow .25s ease; }
          .offer-banner:hover,.offer-promo:hover { transform: translateY(-3px); }
          @media(max-width:900px){ .offers-row{ grid-template-columns:1fr 1fr !important; } .offers-row .offer-promo{ grid-column:span 2; height:140px !important; } }
          @media(max-width:600px){ .offers-row{ grid-template-columns:1fr !important; } .offers-row .offer-promo{ grid-column:span 1; } }
        `}</style>
      </section>

      {/* ═══════════════════════════════════════════════
          TRENDING PACKAGES
      ═══════════════════════════════════════════════ */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <SectionHeading eyebrow="Trending Now" title="Tours Filling Up Fast" description="Real prices, real departure dates — book before seats run out." align="left" />
            <Link to="/packages" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '.875rem', fontWeight: 600, color: 'var(--primary)', textDecoration: 'none', flexShrink: 0 }}>View All Packages <ArrowRight size={16} /></Link>
          </div>
          <div className="dense-card-row" style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {samplePackages.map(pkg => (
              <Link key={pkg.slug} to={`/packages/${pkg.slug}`} className="dense-card" style={{ display: 'flex', flexDirection: 'column', borderRadius: 16, overflow: 'hidden', background: 'var(--card-bg,#fff)', border: '1px solid var(--border)', textDecoration: 'none', color: 'inherit', boxShadow: '0 4px 14px -6px rgba(0,0,0,.1)', transition: 'transform .25s ease, box-shadow .25s ease' }}>
                <div style={{ position: 'relative', height: 170, overflow: 'hidden' }}>
                  <img src={pkg.image} alt={pkg.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {pkg.tag && <span style={{ position: 'absolute', top: 10, left: 10, borderRadius: 9999, background: 'var(--accent)', color: '#fff', fontSize: '.6875rem', fontWeight: 700, padding: '.25rem .6rem' }}>{pkg.tag}</span>}
                  <span style={{ position: 'absolute', top: 10, right: 10, display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 9999, background: 'rgba(0,0,0,.55)', color: '#fff', fontSize: '.6875rem', fontWeight: 700, padding: '.25rem .55rem' }}>
                    <Clock size={11} /> {pkg.duration}
                  </span>
                </div>
                <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.0625rem', fontWeight: 700 }}>{pkg.title}</h3>
                  <div style={{ marginTop: '.4rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Star size={14} style={{ color: 'var(--accent)', fill: 'var(--accent)' }} />
                    <span style={{ fontSize: '.8125rem', fontWeight: 600 }}>{pkg.rating}</span>
                    <span style={{ fontSize: '.75rem', color: 'var(--muted-fg)' }}>· {pkg.travellers}</span>
                  </div>
                  <div style={{ marginTop: '.6rem', display: 'flex', alignItems: 'center', gap: 6, fontSize: '.75rem', color: 'var(--muted-fg)' }}>
                    <Calendar size={13} /><span>{pkg.departure}</span>
                  </div>
                  <div style={{ marginTop: 'auto', paddingTop: '.85rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '.6875rem', color: 'var(--muted-fg)' }}>Starts from</span>
                      <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.2 }}>₹{pkg.price}</p>
                    </div>
                    <span style={{ fontSize: '.75rem', fontWeight: 700, color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>View Details <ArrowRight size={14} /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <style>{`.dense-card:hover { transform: translateY(-5px); box-shadow: 0 14px 28px -10px rgba(15,76,129,.25); }`}</style>
      </section>

      {/* ═══════════════════════════════════════════════
          POPULAR DESTINATIONS
      ═══════════════════════════════════════════════ */}
      <section ref={popularSectionRef} className="section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <SectionHeading eyebrow="Popular Destinations" title="Where to Next?" description="From tropical beaches to alpine peaks, discover destinations that inspire." align="left" />
            <Link to="/destinations" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '.875rem', fontWeight: 600, color: 'var(--primary)', textDecoration: 'none', flexShrink: 0 }}>See more <ArrowRight size={16} /></Link>
          </div>
          <div className="dest-scroll" style={{ 
  marginTop: '2rem', 
  display: 'flex', 
  gap: '1rem', 
  overflowX: 'auto', 
  paddingBottom: '.75rem', 
  scrollSnapType: 'x mandatory', 
  WebkitOverflowScrolling: 'touch',
  alignItems: 'stretch',
}}>
  {popularDest.map(dest => (
    <div key={dest.slug} className="pop-destination-card" style={{ 
      flex: '0 0 200px',       // ← width
      scrollSnapAlign: 'start',
      height: '280px',         // ← taller
    }}>
      <DestinationCard dest={dest} />
    </div>
  ))}
</div>
        </div>
        <style>{`
          .pop-destination-card:hover { transform: translateY(-6px) !important; }
          .dest-scroll::-webkit-scrollbar { height: 6px; }
          .dest-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 9999px; }
        `}</style>
      </section>

      {/* ═══════════════════════════════════════════════
          DEPARTURE CITIES
      ═══════════════════════════════════════════════ */}
      {/* ═══════════════════════════════════════════════
    DEPARTURE CITIES
═══════════════════════════════════════════════ */}
      <section className="section" style={{ background: '#fff', padding: '4rem 0' }}>
        <div className="container">

          {/* Heading */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: 700,
              color: '#1a1a1a',
              margin: '0 0 .75rem',
            }}>
              All-Inclusive Tour Packages,{' '}
              <span style={{ color: '#2563eb' }}>Starting From Your City</span>
            </h2>
            <p style={{
              fontSize: '.9375rem',
              color: '#555',
              lineHeight: 1.7,
              maxWidth: '38rem',
              marginInline: 'auto',
              margin: '0 auto',        // ← was missing 'auto' on left/right
              textAlign: 'center',     // ← add this
            }}>
              From flights and stays to sightseeing and meals — every tour begins conveniently
              from your doorstep. Pick your departure city below.
            </p>
          </div>

          {/* City cards grid */}
          <div
            className="city-cards-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '1rem',
            }}
          >
            {[
              {
                city: 'Mumbai', count: '670 Departures', price: '24,000', color: '#3b82f6',
                svg: <svg width="64" height="48" viewBox="0 0 64 48" fill="none"><rect x="4" y="28" width="56" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" /><rect x="10" y="18" width="12" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" /><rect x="26" y="12" width="12" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" /><rect x="42" y="20" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" /><path d="M2 28 L62 28" stroke="currentColor" strokeWidth="1.5" /><path d="M26 12 L32 6 L38 12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><rect x="29" y="20" width="6" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" /></svg>
              },
              {
                city: 'Pune', count: '16 Departures', price: '44,000', color: '#f59e0b',
                svg: <svg width="64" height="48" viewBox="0 0 64 48" fill="none"><rect x="8" y="24" width="48" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M8 24 L32 8 L56 24" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><rect x="20" y="32" width="8" height="12" rx="1" stroke="currentColor" strokeWidth="1.2" /><rect x="36" y="32" width="8" height="12" rx="1" stroke="currentColor" strokeWidth="1.2" /><path d="M28 8 L32 4 L36 8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><line x1="32" y1="4" x2="32" y2="2" stroke="currentColor" strokeWidth="1.5" /></svg>
              },
              {
                city: 'Ahmedabad', count: '258 Departures', price: '49,000', color: '#ec4899',
                svg: <svg width="64" height="48" viewBox="0 0 64 48" fill="none"><rect x="6" y="26" width="52" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M6 26 C6 26 18 14 32 14 C46 14 58 26 58 26" stroke="currentColor" strokeWidth="1.5" /><path d="M18 14 C18 14 20 8 24 8 C28 8 28 14 28 14" stroke="currentColor" strokeWidth="1.2" /><path d="M36 14 C36 14 36 8 40 8 C44 8 46 14 46 14" stroke="currentColor" strokeWidth="1.2" /><rect x="26" y="32" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.2" /><line x1="6" y1="44" x2="58" y2="44" stroke="currentColor" strokeWidth="1.5" /></svg>
              },
              {
                city: 'Hyderabad', count: '267 Departures', price: '49,000', color: '#10b981',
                svg: <svg width="64" height="48" viewBox="0 0 64 48" fill="none"><path d="M16 44 L16 22 C16 18 20 14 24 14 L40 14 C44 14 48 18 48 22 L48 44" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M10 44 L54 44" stroke="currentColor" strokeWidth="1.5" /><path d="M16 22 C16 22 24 16 32 16 C40 16 48 22 48 22" stroke="currentColor" strokeWidth="1.2" /><path d="M24 14 L28 8 L32 6 L36 8 L40 14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><circle cx="32" cy="28" r="5" stroke="currentColor" strokeWidth="1.5" /><rect x="28" y="34" width="8" height="10" rx="1" stroke="currentColor" strokeWidth="1.2" /></svg>
              },
              {
                city: 'Bangalore', count: '31 Departures', price: '84,000', color: '#8b5cf6',
                svg: <svg width="64" height="48" viewBox="0 0 64 48" fill="none"><rect x="10" y="20" width="44" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M10 20 L32 6 L54 20" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><rect x="18" y="30" width="8" height="14" rx="1" stroke="currentColor" strokeWidth="1.2" /><rect x="38" y="30" width="8" height="14" rx="1" stroke="currentColor" strokeWidth="1.2" /><rect x="28" y="26" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" /><path d="M26 6 L32 2 L38 6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
              },
              {
                city: 'Kolkata', count: '255 Departures', price: '49,000', color: '#f43f5e',
                svg: <svg width="64" height="48" viewBox="0 0 64 48" fill="none"><rect x="4" y="28" width="56" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" /><rect x="10" y="16" width="10" height="12" stroke="currentColor" strokeWidth="1.5" /><rect x="22" y="10" width="10" height="18" stroke="currentColor" strokeWidth="1.5" /><rect x="34" y="16" width="10" height="12" stroke="currentColor" strokeWidth="1.5" /><rect x="46" y="20" width="8" height="8" stroke="currentColor" strokeWidth="1.5" /><path d="M4 28 L60 28" stroke="currentColor" strokeWidth="1.5" /><path d="M22 10 L27 4 L32 10" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>
              },
              {
                city: 'Delhi', count: '267 Departures', price: '49,000', color: '#0ea5e9',
                svg: <svg width="64" height="48" viewBox="0 0 64 48" fill="none"><path d="M32 6 C32 6 20 20 20 30 C20 37 25 42 32 42 C39 42 44 37 44 30 C44 20 32 6 32 6Z" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M20 30 L44 30" stroke="currentColor" strokeWidth="1.5" /><path d="M24 38 L40 38" stroke="currentColor" strokeWidth="1.2" /><line x1="32" y1="6" x2="32" y2="42" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" /><path d="M14 44 L50 44" stroke="currentColor" strokeWidth="1.5" /></svg>
              },
              {
                city: 'Indore', count: '264 Departures', price: '49,000', color: '#84cc16',
                svg: <svg width="64" height="48" viewBox="0 0 64 48" fill="none"><rect x="12" y="22" width="40" height="22" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M12 22 L32 8 L52 22" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><rect x="20" y="32" width="8" height="12" rx="1" stroke="currentColor" strokeWidth="1.2" /><rect x="36" y="32" width="8" height="12" rx="1" stroke="currentColor" strokeWidth="1.2" /><path d="M28 8 L32 4 L36 8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><rect x="28" y="26" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" /></svg>
              },
            ].map((c, i) => (
              <div
                key={i}
                className="city-depart-card"
                style={{
                  borderRadius: 12,
                  border: '1px solid #e5e9f0',
                  background: '#fff',
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'box-shadow .2s, transform .2s',
                }}
              >
                {/* Top: label + city illustration */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: '.75rem', color: '#888', margin: '0 0 .2rem', fontWeight: 400 }}>
                      Tours packages from
                    </p>
                    <h3 style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#1e3a6e',
                      margin: '0 0 .2rem',
                    }}>
                      {c.city}
                    </h3>
                    <p style={{ fontSize: '.8125rem', color: '#555', margin: 0 }}>{c.count}</p>
                  </div>
                  <div style={{ flexShrink: 0, opacity: 0.85, color: c.color }}>{c.svg}</div>
                </div>

                {/* Divider */}
                <div style={{ borderTop: '1px solid #eef0f4', margin: '.9rem 0' }} />

                {/* Bottom: price + button */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.5rem' }}>
                  <div>
                    <p style={{ fontSize: '.6875rem', color: '#888', margin: '0 0 .1rem' }}>Starting from</p>
                    <p style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.375rem',
                      fontWeight: 700,
                      color: '#1a1a1a',
                      margin: 0,
                    }}>
                      ₹{c.price}
                    </p>
                  </div>
                  <Link
                    to={`/packages?from=${c.city.toLowerCase()}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '.55rem 1.1rem',
                      borderRadius: 8,
                      border: '1.5px solid #1e3a6e',
                      background: '#fff',
                      color: '#1e3a6e',
                      fontSize: '.8125rem',
                      fontWeight: 600,
                      textDecoration: 'none',
                      whiteSpace: 'nowrap',
                      transition: 'background .18s, color .18s',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = '#1e3a6e'
                      el.style.color = '#fff'
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.background = '#fff'
                      el.style.color = '#1e3a6e'
                    }}
                  >
                    View Tours
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
    .city-depart-card:hover {
      box-shadow: 0 8px 24px rgba(30,58,110,0.12);
      transform: translateY(-3px);
    }
    @media (max-width: 1024px) {
      .city-cards-grid { grid-template-columns: repeat(3, 1fr) !important; }
    }
    @media (max-width: 768px) {
      .city-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
    }
    @media (max-width: 480px) {
      .city-cards-grid { grid-template-columns: 1fr !important; }
    }
  `}</style>
      </section>

      {/* ═══════════════════════════════════════════════
          FEATURED PACKAGES
      ═══════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <SectionHeading eyebrow="Featured Packages" title="Trending Holiday Packages" description="Our most-loved journeys, curated for unforgettable experiences." align="left" />
            <Link to="/packages" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '.875rem', fontWeight: 600, color: 'var(--primary)', textDecoration: 'none', flexShrink: 0 }}>View All Packages <ArrowRight size={16} /></Link>
          </div>
          <div className="grid-4" style={{ marginTop: '2.5rem' }}>
            {featured.map(pkg => <PackageCard key={pkg.slug} pkg={pkg} />)}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          ABOUT / INTRO — Dark navy card (Veena World style)
      ═══════════════════════════════════════════════ */}
      <section
        ref={introSectionRef}
        className="section section-alt"
        style={{ padding: '4rem 0', position: 'relative' }}
      >
        {/* invisible glow follower */}
        <div ref={glowRef} style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0, willChange: 'transform', top: 0, left: 0 }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ borderRadius: 24, background: '#0d1b2e', padding: '3rem 2.5rem', position: 'relative', overflow: 'hidden' }}>

            {/* Ambient blobs inside the dark card */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
              <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '40%', paddingBottom: '40%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,130,255,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} />
              <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '45%', paddingBottom: '45%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)', filter: 'blur(60px)' }} />
            </div>

            {/* ── Heading ── */}
            <div ref={headingRef} style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 700, color: '#fff', margin: 0 }}>
                Trusted by our guests across the World
              </h2>
            </div>

            {/* ── Stats row ── */}
            <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
              {introStats.map(({ icon: Icon, value, label }, idx) => (
                <div key={label} ref={el => (statsRefs.current[idx] = el)} style={{ textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', width: 52, height: 52, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1.5px solid rgba(245,200,66,0.45)', marginBottom: '.6rem' }}>
                    <Icon size={24} style={{ color: '#f5c842' }} strokeWidth={1.4} />
                  </div>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.1 }}>{value}</p>
                  <p style={{ fontSize: '.75rem', color: 'rgba(255,255,255,0.5)', marginTop: '.25rem' }}>{label}</p>
                </div>
              ))}
            </div>

            {/* ── Review cards ── */}
            <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {reviewCards.map((r, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 16, padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>

                  {/* Stars + badge + link */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <Star key={j} size={13} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                      ))}
                    </div>
                    <span style={{ fontSize: '.6875rem', color: '#fff', background: '#e05c97', borderRadius: 6, padding: '2px 8px', fontWeight: 600 }}>{r.type}</span>
                    <Link to="/packages" style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--primary)', textDecoration: 'underline' }}>Upcoming Tour Dates</Link>
                  </div>

                  {/* Tour name */}
                  <p style={{ fontWeight: 700, fontSize: '.9375rem', color: '#0d1b2e', margin: 0 }}>{r.tour}</p>

                  {/* Review text + optional thumbnail */}
                  <div style={{ display: 'flex', gap: '.75rem', alignItems: 'flex-start', flex: 1 }}>
                    <p style={{ fontSize: '.8125rem', color: '#555', lineHeight: 1.6, margin: 0, flex: 1 }}>{r.review}</p>
                    {r.image && (
                      <img src={r.image} alt={r.tour} style={{ width: 72, height: 72, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                    )}
                  </div>

                  {/* Reviewer + guide */}
                  <div style={{ borderTop: '1px solid #eee', paddingTop: '.75rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '.875rem', color: '#0d1b2e', margin: 0 }}>{r.reviewer}</p>
                      <p style={{ fontSize: '.75rem', color: '#888', margin: 0 }}>{r.date}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ display: 'inline-flex', width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: 'rgba(15,76,129,0.08)', color: 'var(--primary)' }}>
                        <UserCheck size={15} />
                      </span>
                      <span style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--primary)', textDecoration: 'underline' }}>{r.guide}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── CTA button ── */}
            {/* <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
              <Link
                ref={buttonRef}
                to="/testimonials"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#f5c842', color: '#0d1b2e', fontWeight: 700, fontSize: '.9375rem', padding: '.875rem 2.5rem', borderRadius: 9999, textDecoration: 'none', boxShadow: '0 4px 16px rgba(245,200,66,0.3)', transition: 'transform .2s, box-shadow .2s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(-2px)'; el.style.boxShadow = '0 8px 24px rgba(245,200,66,0.5)' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = '0 4px 16px rgba(245,200,66,0.3)' }}
              >
                Read 15K+ Reviews <ArrowRight size={16} />
              </Link>
            </div> */}
          </div>
        </div>

        <style>{`
          @media(max-width:900px){ .intro-stats-grid{ grid-template-columns:repeat(2,1fr) !important; } }
          @media(max-width:600px){ .intro-reviews-grid{ grid-template-columns:1fr !important; } }
        `}</style>
      </section>

      {/* ═══════════════════════════════════════════════
          WHAT'S INCLUDED
      ═══════════════════════════════════════════════ */}
      {/* ═══════════════════════════════════════════════
    WHAT'S INCLUDED
═══════════════════════════════════════════════ */}
      <section className="section" style={{ background: '#fff', padding: '4rem 0' }}>
        <div className="container">

          {/* Heading + blue underline brush stroke */}
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: 600,
              color: '#1a1a1a',
              margin: '0 0 .75rem',
            }}>
              All inclusive tours, Chalo Bag Bharo Nikal Pado!
            </h2>
            {/* Navy brush-stroke underline */}
            <svg width="120" height="10" viewBox="0 0 120 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 7 C20 2, 50 9, 80 4 C95 1, 110 6, 118 4" stroke="#1a3a6b" strokeWidth="4" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          {/* 3-column × 2-row grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            rowGap: '2.5rem',
            columnGap: '2rem',
          }}
            className="inclusions-grid"
          >
            {[
              {
                svg: (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <rect x="4" y="16" width="40" height="26" rx="3" stroke="#c8a84b" strokeWidth="2" />
                    <rect x="10" y="10" width="28" height="10" rx="2" stroke="#c8a84b" strokeWidth="2" />
                    <line x1="4" y1="26" x2="44" y2="26" stroke="#c8a84b" strokeWidth="2" />
                    <rect x="14" y="30" width="8" height="12" rx="1" stroke="#c8a84b" strokeWidth="1.5" />
                    <rect x="26" y="30" width="8" height="8" rx="1" stroke="#c8a84b" strokeWidth="1.5" />
                  </svg>
                ),
                title: 'Accommodation',
                desc: 'Comfortable & convenient hotels cherry picked by our hotel management team',
              },
              {
                svg: (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M24 8 C24 8 12 14 12 24 C12 30 17 35 24 36 C31 35 36 30 36 24 C36 14 24 8 24 8Z" stroke="#c8a84b" strokeWidth="2" fill="none" />
                    <line x1="20" y1="6" x2="20" y2="2" stroke="#c8a84b" strokeWidth="2" strokeLinecap="round" />
                    <line x1="28" y1="6" x2="28" y2="2" stroke="#c8a84b" strokeWidth="2" strokeLinecap="round" />
                    <path d="M18 26 L22 30 L30 20" stroke="#c8a84b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: 'All meals',
                desc: "Eat to your heart's content Breakfast. Lunch. Dinner.",
              },
              {
                svg: (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <rect x="4" y="18" width="36" height="16" rx="4" stroke="#c8a84b" strokeWidth="2" />
                    <circle cx="12" cy="38" r="4" stroke="#c8a84b" strokeWidth="2" />
                    <circle cx="32" cy="38" r="4" stroke="#c8a84b" strokeWidth="2" />
                    <path d="M40 22 L44 22 L44 30 L40 30" stroke="#c8a84b" strokeWidth="2" strokeLinecap="round" />
                    <line x1="4" y1="24" x2="40" y2="24" stroke="#c8a84b" strokeWidth="1.5" />
                    <rect x="10" y="20" width="6" height="4" rx="1" stroke="#c8a84b" strokeWidth="1.5" />
                    <rect x="22" y="20" width="6" height="4" rx="1" stroke="#c8a84b" strokeWidth="1.5" />
                  </svg>
                ),
                title: 'On-tour transport',
                desc: 'Our itineraries include all rail, sea and road transport as part of the itinerary so you can enjoy tension free',
              },
              {
                svg: (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="18" cy="20" r="8" stroke="#c8a84b" strokeWidth="2" />
                    <path d="M4 40 C4 32 10 28 18 28 C22 28 26 29.5 29 32" stroke="#c8a84b" strokeWidth="2" strokeLinecap="round" />
                    <path d="M32 28 L44 20" stroke="#c8a84b" strokeWidth="2" strokeLinecap="round" />
                    <path d="M38 14 L44 20 L38 26" stroke="#c8a84b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: 'Tour managers',
                desc: 'We have an exclusive team of 350 tour managers specialising in India and World tours',
              },
              {
                svg: (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <circle cx="20" cy="20" r="10" stroke="#c8a84b" strokeWidth="2" />
                    <path d="M28 28 L42 42" stroke="#c8a84b" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M16 20 L19 23 L25 16" stroke="#c8a84b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="36" cy="12" r="5" stroke="#c8a84b" strokeWidth="1.5" />
                    <path d="M34 12 L35.5 13.5 L38 10.5" stroke="#c8a84b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: 'Best value itinerary',
                desc: 'Our dedicated product & destination research team spends hours curating the best value for money itineraries',
              },
              {
                svg: (
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M6 28 C6 28 10 20 20 20 L36 20 C40 20 42 22 42 24 L42 28 C42 30 40 32 36 32 L20 32 C16 32 6 28 6 28Z" stroke="#c8a84b" strokeWidth="2" fill="none" />
                    <path d="M20 20 L24 12 L28 20" stroke="#c8a84b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="14" cy="36" r="3" stroke="#c8a84b" strokeWidth="1.5" />
                    <circle cx="34" cy="36" r="3" stroke="#c8a84b" strokeWidth="1.5" />
                    <line x1="6" y1="32" x2="42" y2="32" stroke="#c8a84b" strokeWidth="1.5" />
                  </svg>
                ),
                title: 'To and fro airfare',
                desc: 'Tours are inclusive of airfare from many hubs within India unless you pick the joining-leaving option',
              },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '1.1rem', alignItems: 'flex-start' }}>
                {/* Icon bubble */}
                <div style={{
                  flexShrink: 0,
                  width: 72,
                  height: 72,
                  borderRadius: '50%',
                  background: '#f5f5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {item.svg}
                </div>
                {/* Text */}
                <div style={{ paddingTop: '.25rem' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    color: '#1a1a1a',
                    margin: '0 0 .4rem',
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: '.875rem',
                    color: '#666',
                    lineHeight: 1.6,
                    margin: 0,
                    maxWidth: '22rem',
                  }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
    @media (max-width: 900px) {
      .inclusions-grid { grid-template-columns: repeat(2, 1fr) !important; }
    }
    // @media (max-width: 580px) {
    //   .inclusions-grid { grid-template-columns: 1fr !important; }
    // }
    @media (max-width: 767px) {

          /* ── Container padding ── */
          .container { padding-left: 1rem !important; padding-right: 1rem !important; }

          /* ── Hero ── */
          .hero-content { padding-top: 3rem !important; padding-bottom: 1.5rem !important; }

          /* Search bar: stack vertically */
          .hero-search-form {
            flex-direction: column !important;
            border-radius: 16px !important;
            padding: .75rem !important;
            align-items: stretch !important;
          }
          .hero-search-form button { width: 100% !important; justify-content: center !important; border-radius: 12px !important; }

          /* Quick category icons: tighter wrap */
          .hero-categories { gap: .6rem !important; }
          .hero-categories a { width: 70px !important; }
          .hero-categories span[style] { width: 50px !important; height: 50px !important; }

          /* ── Trust strip ── */
          .section.trust-strip { padding: 1rem 0 !important; }

          /* ── Offers ── */
          .offers-row { grid-template-columns: 1fr !important; }
          .offers-row .offer-banner { height: 150px !important; }
          .offers-row .offer-promo { grid-column: span 1 !important; height: 120px !important; }

          /* ── Dense (trending) cards: horizontal pill layout ── */
          .dense-card-row { grid-template-columns: 1fr !important; gap: .875rem !important; }
          .dense-card { flex-direction: row !important; height: 116px !important; }
          .dense-card > div:first-child { width: 116px !important; min-width: 116px !important; height: 100% !important; flex-shrink: 0 !important; }
          .dense-card > div:last-child { padding: .7rem .8rem !important; }
          .dense-card h3 { font-size: .875rem !important; }
          .dense-card > div:last-child > div:last-child { padding-top: .5rem !important; }

          /* ── Popular destinations ── */
          // .pop-destination-card { flex: 0 0 148px !important; }
          /* change to: */
.pop-destination-card { flex: 0 0 175px !important; height: 250px !important; }
/* and in 480px breakpoint: */
.pop-destination-card { flex: 0 0 155px !important; height: 220px !important; }

          /* ── Departure cities ── */
          .city-cards-grid { grid-template-columns: 1fr 1fr !important; }
          .city-depart-card { padding: .875rem !important; }
          .city-depart-card h3 { font-size: 1.0625rem !important; }
          .city-depart-card svg { width: 48px !important; height: 36px !important; }

          /* ── Dark about card ── */
          .dark-intro-card { padding: 1.75rem 1.1rem !important; border-radius: 18px !important; }
          .intro-stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: .75rem !important; }
          .intro-reviews-grid { grid-template-columns: 1fr !important; }

          /* ── Inclusions ── */
          .inclusions-grid { grid-template-columns: 1fr !important; row-gap: 1.5rem !important; }

          /* ── Gallery ── */
          .gallery-grid { grid-template-columns: repeat(3, 1fr) !important; gap: .4rem !important; }

          /* ── Blog / Featured grids ── */
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-4 { grid-template-columns: 1fr !important; }

          /* ── Newsletter ── */
          .newsletter-inner { padding: 2rem 1.1rem !important; border-radius: 18px !important; }
          .newsletter-form { flex-direction: column !important; }
          .newsletter-form input,
          .newsletter-form button { width: 100% !important; }

          /* ── Section spacing ── */
          .section { padding-top: 2.25rem !important; padding-bottom: 2.25rem !important; }
          .section-alt { padding-top: 2.25rem !important; padding-bottom: 2.25rem !important; }
        }

        /* Extra small: city cards single column */
        @media (max-width: 480px) {
          .city-cards-grid { grid-template-columns: 1fr !important; }
          .dense-card > div:first-child { width: 100px !important; min-width: 100px !important; }
          .pop-destination-card { flex: 0 0 130px !important; }
        }
      
  `}</style>
      </section>
      {/* ═══════════════════════════════════════════════
          GALLERY
      ═══════════════════════════════════════════════ */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeading eyebrow="Travel Gallery" title="Moments From Our Travelers" description="A glimpse of the magical memories created on our tours." />
          <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '.75rem' }}>
            {galleryPreview.map((img, i) => (
              <div key={i} style={{ position: 'relative', aspectRatio: '1/1', borderRadius: 12, overflow: 'hidden' }}>
                <img src={img.src} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.6), transparent)', opacity: 0, transition: 'opacity .3s', display: 'flex', alignItems: 'flex-end', padding: '.75rem' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                >
                  <span style={{ fontSize: '.75rem', fontWeight: 600, color: '#fff' }}>{img.title}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <Link to="/gallery" className="btn btn-outline">View Full Gallery <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Testimonials" title="What Our Travelers Say" description="Real stories from real travelers who trusted us with their dream trips." />
          <TestimonialCarousel />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BLOG
      ═══════════════════════════════════════════════ */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <SectionHeading eyebrow="Travel Blog" title="Tips, Guides & Inspiration" align="left" />
            <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '.875rem', fontWeight: 600, color: 'var(--primary)', textDecoration: 'none', flexShrink: 0 }}>Read All Articles <ArrowRight size={16} /></Link>
          </div>
          <div className="grid-3" style={{ marginTop: '2.5rem' }}>
            {latestBlogs.map(post => (
              <Link key={post.slug} to={`/blog/${post.slug}`} className="card" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ position: 'relative', overflow: 'hidden' }} className="aspect-16-9">
                  <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s' }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                  />
                  <span className="badge badge-accent" style={{ position: 'absolute', top: 12, left: 12 }}>{post.category}</span>
                </div>
                <div style={{ display: 'flex', flex: 1, flexDirection: 'column', padding: '1.25rem' }}>
                  <p style={{ fontSize: '.75rem', color: 'var(--muted-fg)' }}>{post.date} · {post.readTime}</p>
                  <h3 style={{ marginTop: '.5rem', fontFamily: 'var(--font-serif)', fontSize: '1.0625rem', fontWeight: 600, lineHeight: 1.4 }}>{post.title}</h3>
                  <p style={{ marginTop: '.5rem', fontSize: '.875rem', color: 'var(--muted-fg)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
                  <span style={{ marginTop: 'auto', paddingTop: '1rem', fontSize: '.875rem', fontWeight: 600, color: 'var(--primary)' }}>Read More →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          NEWSLETTER
      ═══════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div style={{ position: 'relative', borderRadius: 24, background: 'var(--primary)', padding: '3rem 2rem', textAlign: 'center', color: '#fff', overflow: 'hidden' }}>
            <div style={{ pointerEvents: 'none', position: 'absolute', right: '-4rem', top: '-4rem', width: 256, height: 256, borderRadius: 9999, background: 'rgba(255,107,53,.2)', filter: 'blur(48px)' }} />
            <div style={{ pointerEvents: 'none', position: 'absolute', left: '-4rem', bottom: '-4rem', width: 256, height: 256, borderRadius: 9999, background: 'rgba(255,255,255,.1)', filter: 'blur(48px)' }} />
            <div style={{ position: 'relative', maxWidth: '36rem', marginInline: 'auto' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 700 }}>Get Exclusive Travel Deals in Your Inbox</h2>
              <p style={{ marginTop: '.75rem', color: 'rgba(255,255,255,.8)' }}>Subscribe for handpicked offers, new destinations, and insider travel tips. No spam.</p>
              {subDone ? (
                <p style={{ marginTop: '2rem', display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 9999, background: 'rgba(255,255,255,.15)', padding: '.75rem 1.5rem', fontWeight: 600 }}>
                  <CheckCircle2 size={20} style={{ color: 'var(--accent)' }} /> Thank you! You're subscribed.
                </p>
              ) : (
                <form onSubmit={handleSubscribe} style={{ marginTop: '2rem', display: 'flex', maxWidth: '28rem', marginInline: 'auto', gap: '.75rem', flexWrap: 'wrap' }}>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" style={{ flex: 1, borderRadius: 9999, border: 'none', padding: '.75rem 1.25rem', fontSize: '.875rem', outline: 'none', fontFamily: 'var(--font-sans)', minWidth: 180 }} />
                  <button type="submit" className="btn btn-accent"><Send size={16} /> Subscribe</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}