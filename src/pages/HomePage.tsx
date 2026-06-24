import { Link } from 'react-router-dom'
import { API_URL } from '../config'
import baliImg from '../assets/new1.jpg'
import maldivesImg from '../assets/nyc8.jpg'
import switzerlandImg from '../assets/switzerland.jpg'
import dubaiImg from '../assets/offer1.jpg'
import kerelaImg from '../assets/dubai1.jpg'
import {
  Search, Star, ShieldCheck, Award, CheckCircle2, ArrowRight, Headphones,
  Wallet, Map, Plane, Heart, ChevronLeft, ChevronRight, Compass, Building2,
  Car, BadgePercent, LayoutGrid, Calendar, Clock, Users2, Utensils, Hotel as HotelIcon,
  Bus, UserCheck, Tag
} from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { blogPosts, galleryImages, testimonials, services, inr } from '../data'
import type { Package, Destination } from '../data'
import SectionHeading from '../components/SectionHeading'
import PackageCard from '../components/PackageCard'
import DestinationCard from '../components/DestinationCard'
import TestimonialCarousel from '../components/TestimonialCarousel'
import PromoPopup from '../components/PromoPopup'
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
  { icon: Compass, label: 'Holiday Packages', to: '/packages', bg: 'rgba(255,107,53,0.85)', border: 'rgba(255,140,80,0.6)' },
  { icon: Plane, label: 'Destinations', to: '/destinations', bg: 'rgba(16,185,129,0.85)', border: 'rgba(52,211,153,0.6)' },
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
  const [trending, setTrending] = useState<Package[]>([])
  const [popularDest, setPopularDest] = useState<Destination[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const introSectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const statsRefs = useRef<(HTMLDivElement | null)[]>([])
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const popularSectionRef = useRef<HTMLElement>(null)
  const dataLoadedRef = useRef(false)

  useEffect(() => {
    fetch(`${API_URL}/api/packages/featured`).then(r => r.json()).then(data => {
      const sorted = Array.isArray(data)
        ? data.sort((a, b) => (a.region === 'Domestic' && b.region !== 'Domestic' ? -1 : a.region !== 'Domestic' && b.region === 'Domestic' ? 1 : 0))
        : []
      setFeatured(sorted)
    })
    fetch(`${API_URL}/api/packages`).then(r => r.json()).then(data => {
      const sorted = Array.isArray(data)
        ? data.sort((a, b) => (a.region === 'Domestic' && b.region !== 'Domestic' ? -1 : a.region !== 'Domestic' && b.region === 'Domestic' ? 1 : 0))
        : []
      setTrending(sorted.slice(0, 5))
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

  // ── FIX 1: Mouse glow runs ONCE, independent of data fetches ──
  useEffect(() => {
    if (!introSectionRef.current || !glowRef.current) return
    const section = introSectionRef.current
    const glow = glowRef.current

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      gsap.to(glow, {
        x: e.clientX - rect.left - 150,
        y: e.clientY - rect.top - 150,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // ── FIX 1 cont.: Scroll animations run ONCE when intro mounts, card anims when data arrives ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: introSectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      const validStats = statsRefs.current.filter(Boolean)
      if (validStats.length) {
        tl.from(validStats, { opacity: 0, y: 30, stagger: 0.1, duration: 0.6, ease: 'back.out' })
      }

      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.word')
        if (words.length) {
          tl.from(words, { opacity: 0, y: 20, stagger: 0.03, duration: 0.5, ease: 'back.out' }, '-=0.3')
        }
      }

      if (buttonRef.current) {
        tl.from(buttonRef.current, { opacity: 0, scale: 0.8, duration: 0.4, ease: 'back.out' }, '-=0.2')
      }

      const denseCards = document.querySelectorAll('.dense-card')
      if (denseCards.length) {
        gsap.set(denseCards, { opacity: 0, y: 24 })
        gsap.to(denseCards, {
          scrollTrigger: { trigger: '.dense-card-row', start: 'top 85%', toggleActions: 'play none none reverse' },
          opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
        })
      }
    }, introSectionRef)

    return () => ctx.revert()
  }, []) // runs once on mount

  // ── FIX 1 cont.: Destination card animations fire only once after data loads ──
  useEffect(() => {
    if (!popularDest.length || dataLoadedRef.current) return
    dataLoadedRef.current = true

    const popCards = document.querySelectorAll('.pop-destination-card')
    if (!popCards.length) return

    gsap.set(popCards, { opacity: 0, y: 30 })
    gsap.to(popCards, {
      scrollTrigger: {
        trigger: popularSectionRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
    })
  }, [popularDest])

  return (
    <main>

      {/* ═══════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '55vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          {heroImages.map((img, idx) => (
            // FIX 4: will-change + translateZ promotes slides to compositor layers
            <div key={idx} style={{
              position: 'absolute', inset: 0,
              transition: 'opacity 1s ease-in-out',
              opacity: idx === currentSlide ? 1 : 0,
              zIndex: idx === currentSlide ? 1 : 0,
              willChange: 'opacity',
              transform: 'translateZ(0)',
            }}>
              <img src={img} alt={`Hero ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>

        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,.55), rgba(0,0,0,.35), rgba(0,0,0,.65))', zIndex: 2 }} />

        {/* FIX 6: Removed backdropFilter blur from hero nav buttons — replaced with solid bg */}
        {[{ fn: prevSlide, side: 'left', Icon: ChevronLeft }, { fn: nextSlide, side: 'right', Icon: ChevronRight }].map(({ fn, side, Icon }) => (
          <button key={side} onClick={fn} style={{
            position: 'absolute', [side]: '1rem', top: '50%', transform: 'translateY(-50%)',
            zIndex: 10, background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '9999px',
            width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#fff', transition: 'background .2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.72)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.5)')}
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

          {/* Quick category icons */}
          <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            {quickCategories.map(({ icon: Icon, label, to, bg, border }) => (
              <Link key={label} to={to} className="quick-cat-link" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: '#fff', textDecoration: 'none', width: 84 }}>
                {/* FIX 3: hover handled by CSS class .quick-cat-icon:hover, no inline JS */}
                <span className="quick-cat-icon" style={{
                  display: 'flex', width: 58, height: 58, alignItems: 'center', justifyContent: 'center',
                  borderRadius: '50%', background: bg, border: `1.5px solid ${border}`,
                  boxShadow: `0 4px 16px rgba(0,0,0,0.2)`,
                  transition: 'transform .2s ease, box-shadow .2s ease',
                  willChange: 'transform',
                }}>
                  <Icon size={24} strokeWidth={1.8} color="#fff" />
                </span>
                <span style={{ fontSize: '.72rem', fontWeight: 600, textAlign: 'center', lineHeight: 1.3, textShadow: '0 1px 4px rgba(0,0,0,0.5)', letterSpacing: '0.01em' }}>
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
              <p style={{ fontFamily: "'Outfit', 'Segoe UI', sans-serif", fontSize: '1.625rem', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{s.value}</p>
              <p style={{ fontFamily: "'Inter', -apple-system, sans-serif", fontSize: '.75rem', fontWeight: 500, color: 'rgba(255,255,255,.8)', marginTop: '.2rem', letterSpacing: '.03em', textTransform: 'uppercase' }}>{s.label}</p>
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
              { to: '/packages', img: dubaiImg, eyebrow: 'Limited-Time Offer', title: 'Best Domestic Deals', sub: 'Unlock savings on tours, transport & more.' },
              { to: '/destinations', img: switzerlandImg, eyebrow: "Editor's Pick", title: 'Swiss Escape', sub: 'Curated alpine getaways, ready to book.' },
            ].map(b => (
              <Link key={b.title} to={b.to} className="offer-banner" style={{ position: 'relative', display: 'block', borderRadius: 16, overflow: 'hidden', height: 190, textDecoration: 'none', boxShadow: '0 8px 20px -8px rgba(0,0,0,.25)', willChange: 'transform' }}>
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

            <Link to="/packages" className="offer-promo" style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: 190, borderRadius: 16, overflow: 'hidden', padding: '1.1rem', background: 'linear-gradient(135deg, rgba(15,76,129,.08) 0%, rgba(255,107,53,.1) 100%)', border: '1px solid var(--border)', textDecoration: 'none', color: 'inherit', willChange: 'transform' }}>
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
          .offer-banner, .offer-promo { transition: transform .25s ease, box-shadow .25s ease; }
          .offer-banner:hover, .offer-promo:hover { transform: translateY(-3px); }
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
            <SectionHeading
              eyebrow={
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'linear-gradient(135deg, #ff0f7b 0%, #f89b29 100%)', color: '#fff', padding: '0.35rem 0.9rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', boxShadow: '0 4px 16px rgba(255, 15, 123, 0.35)' }}>
                  <Sparkles size={14} style={{ fill: '#fff' }} /> Trending Now
                </div>
              }
              eyebrowStyle={{ display: 'inline-block', marginBottom: '0.5rem', padding: 0, background: 'none' }}
              title="Tours Filling Up Fast"
              description="Real prices, real departure dates — book before seats run out."
              align="left"
            />
            <Link to="/packages" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '.875rem', fontWeight: 600, color: 'var(--primary)', textDecoration: 'none', flexShrink: 0 }}>View All Packages <ArrowRight size={16} /></Link>
          </div>
          <div className="dense-card-row" style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {trending.map(pkg => {
              const discount = pkg.price > 0 ? Math.round(((pkg.price - pkg.discountPrice) / pkg.price) * 100) : 0;
              const tag = discount > 0 ? `${discount}% OFF` : (pkg.featured ? 'Featured' : undefined);
              return (
                <Link key={pkg.slug} to={`/packages/${pkg.slug}`} className="dense-card" style={{ display: 'flex', flexDirection: 'column', borderRadius: 16, overflow: 'hidden', background: 'var(--card-bg,#fff)', border: '1px solid var(--border)', textDecoration: 'none', color: 'inherit', boxShadow: '0 4px 14px -6px rgba(0,0,0,.1)', transition: 'transform .25s ease, box-shadow .25s ease', willChange: 'transform' }}>
                  <div style={{ position: 'relative', height: 170, overflow: 'hidden' }}>
                    <img src={pkg.image} alt={pkg.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    {tag && <span style={{ position: 'absolute', top: 10, left: 10, borderRadius: 9999, background: 'var(--accent)', color: '#fff', fontSize: '.6875rem', fontWeight: 700, padding: '.25rem .6rem' }}>{tag}</span>}
                    <span style={{ position: 'absolute', top: 10, right: 10, display: 'inline-flex', alignItems: 'center', gap: 4, borderRadius: 9999, background: 'rgba(0,0,0,.55)', color: '#fff', fontSize: '.6875rem', fontWeight: 700, padding: '.25rem .55rem' }}>
                      <Clock size={11} /> {pkg.duration}
                    </span>
                  </div>
                  <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.0625rem', fontWeight: 700, lineHeight: 1.3 }}>{pkg.name}</h3>
                    <div style={{ marginTop: '.4rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Star size={14} style={{ color: 'var(--accent)', fill: 'var(--accent)' }} />
                      <span style={{ fontSize: '.8125rem', fontWeight: 600 }}>{pkg.rating}</span>
                      <span style={{ fontSize: '.75rem', color: 'var(--muted-fg)' }}>· ({pkg.reviews} reviews)</span>
                    </div>
                    <div style={{ marginTop: '.6rem', display: 'flex', alignItems: 'center', gap: 6, fontSize: '.75rem', color: 'var(--muted-fg)' }}>
                      <MapPin size={13} /><span>{pkg.destination}, {pkg.country}</span>
                    </div>
                    <div style={{ marginTop: 'auto', paddingTop: '.85rem', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                      <div>
                        <span style={{ fontSize: '.6875rem', color: 'var(--muted-fg)' }}>Starts from</span>
                        <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.2 }}>{inr(pkg.discountPrice)}</p>
                      </div>
                      <span style={{ fontSize: '.75rem', fontWeight: 700, color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>View Details <ArrowRight size={14} /></span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        {/* FIX 3: dense-card hover fully in CSS, no JS mutations */}
        <style>{`.dense-card:hover { transform: translateY(-5px); box-shadow: 0 14px 28px -10px rgba(15,76,129,.25); }`}</style>
      </section>

      {/* ═══════════════════════════════════════════════
          POPULAR DESTINATIONS
      ═══════════════════════════════════════════════ */}
      <section ref={popularSectionRef} className="section" style={{
        position: 'relative',
        background: `url(${switzerlandImg}) center/cover no-repeat`,
        marginTop: '2rem',
        marginBottom: '2rem',
        paddingTop: '5rem',
        paddingBottom: '5rem',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(21, 52, 79, 0.85)', zIndex: 1 }}></div>

        <div style={{
          position: 'absolute', top: -1, left: 0, right: 0, height: '24px', zIndex: 2,
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20' preserveAspectRatio='none'%3E%3Cpath d='M0,0 L0,20 Q2,12 5,18 T12,10 T18,18 T25,8 T32,18 T38,12 T45,20 T52,10 T58,18 T65,8 T72,18 T78,12 T85,20 T92,10 T98,18 L100,12 L100,0 Z' fill='%23ffffff'/%3E%3C/svg%3E") repeat-x top / 150px 100%`
        }}></div>

        <div style={{
          position: 'absolute', bottom: -1, left: 0, right: 0, height: '24px', zIndex: 2,
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20' preserveAspectRatio='none'%3E%3Cpath d='M0,20 L0,0 Q2,8 5,2 T12,10 T18,2 T25,12 T32,2 T38,8 T45,0 T52,10 T58,2 T65,12 T72,2 T78,8 T85,0 T92,10 T98,2 L100,8 L100,20 Z' fill='%23ffffff'/%3E%3C/svg%3E") repeat-x bottom / 150px 100%`
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.25rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            <div className="pop-dest-line" style={{ height: '2px', width: '80px', background: '#65a30d', opacity: 0.8 }}></div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.5rem, 6vw, 2.5rem)', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '0.02em', textShadow: '0 2px 4px rgba(0,0,0,0.3)', textAlign: 'center' }}>
              Explore Destinations
            </h2>
            <div className="pop-dest-line" style={{ height: '2px', width: '80px', background: '#65a30d', opacity: 0.8 }}></div>
          </div>

          <div className="dest-scroll" style={{
            display: 'flex',
            gap: '1.25rem',
            overflowX: 'auto',
            paddingBottom: '1.5rem',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            alignItems: 'stretch',
          }}>
            {popularDest.map(dest => (
              <div key={dest.slug} className="pop-destination-card" style={{
                flex: '0 0 240px',
                scrollSnapAlign: 'start',
                height: '340px',
                willChange: 'opacity, transform',
              }}>
                <DestinationCard dest={dest} />
              </div>
            ))}
          </div>

          <div className="pop-dest-btn-wrapper" style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            <Link to="/destinations" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '.9375rem', fontWeight: 600, color: '#fff', textDecoration: 'none', background: 'rgba(255,255,255,0.1)', padding: '0.6rem 1.25rem', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.2)' }}>
              See all destinations <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <style>{`
          .dest-scroll::-webkit-scrollbar { height: 6px; }
          .dest-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 9999px; }
          .dest-scroll::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); border-radius: 9999px; }
          
          @media (max-width: 767px) {
            .pop-dest-line { display: none !important; }
            .dest-scroll { padding-bottom: 0.5rem !important; }
            .dest-scroll::-webkit-scrollbar { display: none; }
            .pop-dest-btn-wrapper { margin-top: 0.5rem !important; }
          }
        `}</style>
      </section>

      {/* ═══════════════════════════════════════════════
          DEPARTURE CITIES
      ═══════════════════════════════════════════════ */}
      <section className="section" style={{ background: '#fff', padding: '4rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, color: '#1a1a1a', margin: '0 0 .75rem' }}>
              All-Inclusive Tour Packages,{' '}
              <span style={{ color: '#ff6b35' }}>Starting From Your City</span>
            </h2>
            <p style={{ fontSize: '.9375rem', color: '#555', lineHeight: 1.7, maxWidth: '38rem', margin: '0 auto', textAlign: 'center' }}>
              From flights and stays to sightseeing and meals — every tour begins conveniently
              from your doorstep. Pick your departure city below.
            </p>
          </div>

          <div className="city-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
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
              <div key={i} className="city-depart-card" style={{ borderRadius: 12, border: '1px solid #e5e9f0', background: '#fff', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', willChange: 'transform' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div>
                    <p style={{ fontSize: '.75rem', color: '#888', margin: '0 0 .2rem', fontWeight: 400 }}>Tours packages from</p>
                    <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 700, color: '#1e3a6e', margin: '0 0 .2rem' }}>{c.city}</h3>
                    <p style={{ fontSize: '.8125rem', color: '#555', margin: 0 }}>{c.count}</p>
                  </div>
                  <div style={{ flexShrink: 0, opacity: 0.85, color: c.color }}>{c.svg}</div>
                </div>
                <div style={{ borderTop: '1px solid #eef0f4', margin: '.9rem 0' }} />
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.5rem' }}>
                  <div>
                    <p style={{ fontSize: '.6875rem', color: '#888', margin: '0 0 .1rem' }}>Starting from</p>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.375rem', fontWeight: 700, color: '#1a1a1a', margin: 0 }}>₹{c.price}</p>
                  </div>
                  {/* FIX 3: hover handled by CSS .city-depart-btn class, no inline JS */}
                  <Link to={`/packages?from=${c.city.toLowerCase()}`} className="city-depart-btn" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '.55rem 1.1rem', borderRadius: 8, border: '1.5px solid #1e3a6e', background: '#fff', color: '#1e3a6e', fontSize: '.8125rem', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap', transition: 'background .18s, color .18s' }}>
                    View Tours
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .city-depart-card { transition: box-shadow .2s ease, transform .2s ease; }
          .city-depart-card:hover { box-shadow: 0 8px 24px rgba(30,58,110,0.12); transform: translateY(-3px); }
          .city-depart-btn:hover { background: #1e3a6e !important; color: #fff !important; }
          .quick-cat-icon:hover { transform: translateY(-4px) scale(1.1) !important; }
          @media (max-width: 1024px) { .city-cards-grid { grid-template-columns: repeat(3, 1fr) !important; } }
          @media (max-width: 768px) { .city-cards-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 480px) { .city-cards-grid { grid-template-columns: 1fr !important; } }
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
          ABOUT / INTRO
      ═══════════════════════════════════════════════ */}
      <section ref={introSectionRef} className="section section-alt" style={{ padding: '4rem 0', position: 'relative' }}>
        {/* FIX 2: will-change + contain + translateZ on glow to isolate it */}
        <div ref={glowRef} style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0, willChange: 'transform', transform: 'translateZ(0)', contain: 'paint', top: 0, left: 0 }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ borderRadius: 24, background: '#0d1b2e', padding: '3rem 2.5rem', position: 'relative', overflow: 'hidden' }}>

            {/* FIX 2: ambient blobs — will-change + contain to stop blur from causing full repaint */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
              <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '40%', paddingBottom: '40%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,130,255,0.1) 0%, transparent 70%)', filter: 'blur(60px)', willChange: 'transform', transform: 'translateZ(0)', contain: 'paint' }} />
              <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '45%', paddingBottom: '45%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)', filter: 'blur(60px)', willChange: 'transform', transform: 'translateZ(0)', contain: 'paint' }} />
            </div>

            <div ref={headingRef} style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 700, color: '#fff', margin: 0 }}>
                Trusted by our guests across the World
              </h2>
            </div>

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

            <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {reviewCards.map((r, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 16, padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {Array.from({ length: r.rating }).map((_, j) => (
                        <Star key={j} size={13} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
                      ))}
                    </div>
                    <span style={{ fontSize: '.6875rem', color: '#fff', background: '#e05c97', borderRadius: 6, padding: '2px 8px', fontWeight: 600 }}>{r.type}</span>
                    <Link to="/packages" style={{ fontSize: '.75rem', fontWeight: 600, color: 'var(--primary)', textDecoration: 'underline' }}>Upcoming Tour Dates</Link>
                  </div>
                  <p style={{ fontWeight: 700, fontSize: '.9375rem', color: '#0d1b2e', margin: 0 }}>{r.tour}</p>
                  <div style={{ display: 'flex', gap: '.75rem', alignItems: 'flex-start', flex: 1 }}>
                    <p style={{ fontSize: '.8125rem', color: '#555', lineHeight: 1.6, margin: 0, flex: 1 }}>{r.review}</p>
                    {r.image && (
                      <img src={r.image} alt={r.tour} style={{ width: 72, height: 72, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                    )}
                  </div>
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
      <section className="section" style={{ background: '#fff', padding: '4rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: '#1a1a1a', margin: '0' }}>
              All-Inclusive Tours
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }} className="inclusions-grid">
            {[
              { 
                cardBg: '#FEF6EE', title: 'Premium Handpicked Accommodation', desc: 'Comfortable & convenient hotels cherry picked by our expert hotel management team.', 
                shape: (
                  <div style={{ position: 'absolute', right: '-10px', top: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', transform: 'rotate(45deg)', opacity: 0.6 }}>
                    <div style={{ width: 60, height: 60, background: 'linear-gradient(135deg, #FFEAD4, #FFD199)', borderRadius: '16px' }} />
                    <div style={{ width: 60, height: 60, background: 'linear-gradient(135deg, #FFEAD4, #FFD199)', borderRadius: '16px' }} />
                    <div style={{ width: 60, height: 60, background: 'linear-gradient(135deg, #FFEAD4, #FFD199)', borderRadius: '16px' }} />
                    <div style={{ width: 60, height: 60, background: 'linear-gradient(135deg, #FFEAD4, #FFD199)', borderRadius: '16px' }} />
                  </div>
                ) 
              },
              { 
                cardBg: '#EDF4FC', title: 'All-Inclusive Dining Experiences', desc: "Eat to your heart's content. Breakfast, lunch, and dinner are thoughtfully included.", 
                shape: (
                  <div style={{ position: 'absolute', right: 0, top: '15%', display: 'flex', flexWrap: 'wrap', width: '140px', opacity: 0.6 }}>
                    <div style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, #D4E5FF, #ABCFFF)', borderTopLeftRadius: '70px' }} />
                    <div style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, #D4E5FF, #ABCFFF)' }} />
                    <div style={{ width: '70px', height: '70px', background: 'linear-gradient(135deg, #D4E5FF, #ABCFFF)', borderBottomRightRadius: '70px' }} />
                  </div>
                ) 
              },
              { 
                cardBg: '#F5EEFF', title: 'Expert Tour Managers On-Site', desc: 'We have an exclusive team of 350 tour managers specialising in India and World tours.', 
                shape: (
                  <div style={{ position: 'absolute', right: '-20px', bottom: '-20px', opacity: 0.6 }}>
                    <div style={{ display: 'flex' }}>
                      <div style={{ width: '80px', height: '160px', background: 'linear-gradient(135deg, #EAD4FF, #CBA3FF)', borderTopLeftRadius: '80px', borderBottomLeftRadius: '80px' }} />
                      <div style={{ width: '80px', height: '160px', background: 'linear-gradient(135deg, #EAD4FF, #CBA3FF)', borderTopRightRadius: '80px', borderBottomRightRadius: '80px', transform: 'translateY(-40px)' }} />
                    </div>
                  </div>
                ) 
              },
              { 
                cardBg: '#EDFAEE', title: 'Seamless On-Tour Transportation', desc: 'Our itineraries include all rail, sea and road transport as part of the package.', 
                shape: (
                  <div style={{ position: 'absolute', right: '10px', bottom: '10px', opacity: 0.6, transform: 'rotate(45deg)' }}>
                    <div style={{ width: '120px', height: '120px', background: 'linear-gradient(135deg, #D4F5D4, #99E699)', borderRadius: '40px 10px 40px 10px' }} />
                  </div>
                ) 
              },
              { 
                cardBg: '#FEF6EE', title: 'Best Value Assured Itineraries', desc: 'Our dedicated research team spends hours curating the best value packages for you.', 
                shape: (
                  <div style={{ position: 'absolute', right: '-30px', bottom: '-30px', opacity: 0.5 }}>
                     <div style={{ width: '180px', height: '180px', background: 'linear-gradient(135deg, #FFEAD4, #FFD199)', borderRadius: '50%' }} />
                  </div>
                ) 
              },
              { 
                cardBg: '#EDF4FC', title: 'Convenient To & Fro Airfares', desc: 'Tours are inclusive of airfare from many hubs within India for a seamless start.', 
                shape: (
                  <div style={{ position: 'absolute', right: '-10px', top: '30px', opacity: 0.5 }}>
                    <div style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, #D4E5FF, #ABCFFF)', borderRadius: '10px', transform: 'rotate(25deg)' }} />
                    <div style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, #D4E5FF, #ABCFFF)', borderRadius: '10px', transform: 'rotate(50deg) translateY(-20px)' }} />
                  </div>
                ) 
              },
            ].map((item, i) => (
              <div key={i} className="inclusion-card" style={{ background: item.cardBg, borderRadius: '24px', padding: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative', overflow: 'hidden', minHeight: '260px' }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
                  {item.shape}
                </div>
                <div style={{ background: 'rgba(255,255,255,0.8)', backdropFilter: 'blur(4px)', borderRadius: '999px', padding: '0.4rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: '#333', marginBottom: '1.5rem', zIndex: 1, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                  Included Feature
                </div>
                <h3 className="inclusion-title" style={{ fontFamily: 'var(--font-sans)', fontSize: '1.5rem', fontWeight: 800, color: '#111', margin: '0 0 0.85rem', zIndex: 1, maxWidth: '85%', lineHeight: 1.25, letterSpacing: '-0.01em' }}>{item.title}</h3>
                <p className="inclusion-desc" style={{ fontSize: '.95rem', color: '#555', lineHeight: 1.6, margin: '0 0 2rem', maxWidth: '80%', zIndex: 1 }}>{item.desc}</p>
                <Link to="/packages" style={{ marginTop: 'auto', fontSize: '.875rem', fontWeight: 700, color: '#111', textDecoration: 'none', borderBottom: '2px solid #111', paddingBottom: '2px', zIndex: 1, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  Explore Details <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) { .inclusions-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 767px) {
            .container { padding-left: 1rem !important; padding-right: 1rem !important; }
            .hero-content { padding-top: 3rem !important; padding-bottom: 1.5rem !important; }
            .offers-row { grid-template-columns: 1fr !important; }
            .offers-row .offer-banner { height: 150px !important; }
            .offers-row .offer-promo { grid-column: span 1 !important; height: 120px !important; }
            .dense-card-row { grid-template-columns: 1fr !important; gap: .875rem !important; }
            .dense-card { flex-direction: row !important; height: 116px !important; }
            .dense-card > div:first-child { width: 116px !important; min-width: 116px !important; height: 100% !important; flex-shrink: 0 !important; }
            .dense-card > div:last-child { padding: .7rem .8rem !important; }
            .dense-card h3 { font-size: .875rem !important; }
            .pop-destination-card { flex: 0 0 200px !important; height: 280px !important; }
            .city-cards-grid { grid-template-columns: 1fr 1fr !important; }
            .dark-intro-card { padding: 1.75rem 1.1rem !important; border-radius: 18px !important; }
            .intro-stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: .75rem !important; }
            .intro-reviews-grid { grid-template-columns: 1fr !important; }
            .inclusions-grid { grid-template-columns: 1fr !important; row-gap: 1.5rem !important; }
            .inclusion-card { padding: 1.75rem !important; min-height: 240px !important; }
            .inclusion-title { font-size: 1.25rem !important; max-width: 100% !important; }
            .inclusion-desc { max-width: 100% !important; }
            .grid-3 { grid-template-columns: 1fr !important; }
            .grid-4 { grid-template-columns: 1fr !important; }
            .section { padding-top: 2.25rem !important; padding-bottom: 2.25rem !important; }
            .section-alt { padding-top: 2.25rem !important; padding-bottom: 2.25rem !important; }
          }
          @media (max-width: 480px) {
            .city-cards-grid { grid-template-columns: 1fr !important; }
            .dense-card > div:first-child { width: 100px !important; min-width: 100px !important; }
            .pop-destination-card { flex: 0 0 180px !important; }
          }
        `}</style>
      </section>

      {/* ═══════════════════════════════════════════════
          GALLERY
      ═══════════════════════════════════════════════ */}
      <section className="section" style={{ background: '#FAF9F6', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
            <div style={{ width: '40px', height: '3px', background: 'var(--accent)' }}></div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, color: '#1a2332', margin: 0 }}>
              Gallery
            </h2>
          </div>

          <div className="masonry-gallery" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '1rem' }}>
            {galleryPreview.map((img, i) => {
              const spans = [3, 5, 4, 5, 4, 3];
              return (
                <div key={i} className="gallery-thumb" style={{ position: 'relative', height: '280px', overflow: 'hidden', gridColumn: `span ${spans[i]}` }}>
                  <img src={img.src} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', willChange: 'transform' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)', pointerEvents: 'none' }}></div>
                  <span style={{ position: 'absolute', bottom: '1.25rem', left: '1.25rem', color: '#fff', fontSize: '.95rem', fontWeight: 400, letterSpacing: '.02em' }}>{img.title}</span>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <Link to="/gallery" style={{ display: 'inline-flex', alignItems: 'center', fontSize: '.9rem', fontWeight: 600, color: '#333', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '.05em', borderBottom: '1px solid #333', paddingBottom: '4px' }}>
              View Full Gallery <ArrowRight size={14} style={{ marginLeft: '6px' }} />
            </Link>
          </div>
        </div>
        <style>{`
          .gallery-thumb:hover img { transform: scale(1.05); }
          @media (max-width: 900px) {
            .masonry-gallery > div { grid-column: span 6 !important; }
          }
          @media (max-width: 600px) {
            .masonry-gallery > div { grid-column: span 12 !important; height: 240px !important; }
          }
        `}</style>
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
          NEWSLETTER
      ═══════════════════════════════════════════════ */}
      <section className="section">
        <div className="container">
          <div style={{ position: 'relative', borderRadius: 24, background: 'var(--primary)', padding: '3rem 2rem', textAlign: 'center', color: '#fff', overflow: 'hidden' }}>
            {/* FIX 2: newsletter blobs also isolated */}
            <div style={{ pointerEvents: 'none', position: 'absolute', right: '-4rem', top: '-4rem', width: 256, height: 256, borderRadius: 9999, background: 'rgba(255,107,53,.2)', filter: 'blur(48px)', willChange: 'transform', transform: 'translateZ(0)', contain: 'paint' }} />
            <div style={{ pointerEvents: 'none', position: 'absolute', left: '-4rem', bottom: '-4rem', width: 256, height: 256, borderRadius: 9999, background: 'rgba(255,255,255,.1)', filter: 'blur(48px)', willChange: 'transform', transform: 'translateZ(0)', contain: 'paint' }} />
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

      <PromoPopup />
    </main>
  )
}