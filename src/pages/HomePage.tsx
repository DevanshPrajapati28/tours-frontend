import { Link } from 'react-router-dom'
import baliImg from '../assets/bali.jpg'
import maldivesImg from '../assets/maldives.jpg'
import switzerlandImg from '../assets/switzerland.jpg'
import dubaiImg from '../assets/dubai.jpg'
import kerelaImg from '../assets/kerela.jpg'
import { Search, Star, ShieldCheck, Award, CheckCircle2, ArrowRight, Headphones, Wallet, Map, Plane, Heart, ChevronLeft, ChevronRight } from 'lucide-react'
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

const iconMap: Record<string, React.ComponentType<{ size?: number; style?: React.CSSProperties }>> = {
  MapPin, Globe, Sparkles, Hotel, Plane, TrainFront, Ship, FileCheck, BookUser, Heart, Users, Briefcase,
}

const whyReasons = [
  { icon: Map, title: 'Tailor-Made Itineraries', desc: 'Every journey is customized to your interests, pace, and budget.' },
  { icon: Wallet, title: 'Best Price Guarantee', desc: 'Premium experiences at the most competitive prices, always.' },
  { icon: Headphones, title: '24/7 Travel Support', desc: 'Our team is always a call away, before and during your trip.' },
  { icon: ShieldCheck, title: 'Safe & Secure Travel', desc: 'Verified partners and full transparency for your peace of mind.' },
  { icon: Plane, title: 'End-to-End Planning', desc: 'Flights, hotels, visas, transfers — we handle every detail.' },
  { icon: Heart, title: 'Memories That Last', desc: 'Thoughtful touches that turn trips into lifelong memories.' },
]

const points = [
  '20+ years of travel expertise',
  'Handpicked hotels & experiences',
  '24/7 on-trip support',
  'Transparent pricing, no hidden costs',
]

// Static stats (no counting animation)
const statsData = [
  { label: 'Happy Travelers', value: '5796+', suffix: '' },
  { label: 'Destinations', value: '150+', suffix: '' },
  { label: 'Years Experience', value: '20+', suffix: '' },
  { label: 'Average Rating', value: '102', suffix: '' },
]

const heroImages = [
  kerelaImg,
  baliImg,
  maldivesImg,
  dubaiImg,
  switzerlandImg,
]

export default function HomePage() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [email, setEmail] = useState('')
  const [subDone, setSubDone] = useState(false)

  const [featured, setFeatured] = useState<Package[]>([])
  const [popularDest, setPopularDest] = useState<Destination[]>([])

  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef<number | null>(null)

  // Refs for Intro section animations
  const introSectionRef = useRef<HTMLElement>(null)
  const leftImageRef = useRef<HTMLImageElement>(null)
  const rightImageRef = useRef<HTMLImageElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const listItemsRef = useRef<(HTMLLIElement | null)[]>([])
  const statsRefs = useRef<(HTMLDivElement | null)[]>([])
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const imagesContainerRef = useRef<HTMLDivElement>(null)

  // Ref for Popular Destinations section
  const popularSectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    fetch('/api/packages/featured').then(r => r.json()).then(setFeatured)
    fetch('/api/destinations').then(r => r.json()).then(data => setPopularDest(Array.isArray(data) ? data.slice(0, 4) : []))
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroImages.length)
      }, 5000)
    }
  }

  const nextSlide = () => goToSlide((currentSlide + 1) % heroImages.length)
  const prevSlide = () => goToSlide((currentSlide - 1 + heroImages.length) % heroImages.length)

  const latestBlogs = blogPosts.slice(0, 3)
  const galleryPreview = galleryImages.slice(0, 6)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
    setSubDone(true)
  }

  // GSAP animations for Intro section + Popular Destinations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax images (Intro)
      if (leftImageRef.current && rightImageRef.current) {
        gsap.to(leftImageRef.current, {
          y: 80,
          ease: 'none',
          scrollTrigger: {
            trigger: introSectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
        gsap.to(rightImageRef.current, {
          y: -80,
          ease: 'none',
          scrollTrigger: {
            trigger: introSectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }

      // Floating images container (Intro)
      if (imagesContainerRef.current) {
        gsap.to(imagesContainerRef.current, {
          y: -15,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      }

      // Mouse-following glow (Intro)
      const handleMouseMove = (e: MouseEvent) => {
        if (!glowRef.current || !introSectionRef.current) return
        const rect = introSectionRef.current.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        gsap.to(glowRef.current, {
          x: x - 150,
          y: y - 150,
          duration: 0.4,
          ease: 'power2.out',
        })
      }
      window.addEventListener('mousemove', handleMouseMove)

      // Entrance timeline for Intro
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: introSectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })

      tl.from([leftImageRef.current, rightImageRef.current], {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1.2)',
      })

      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.word')
        tl.from(words, {
          opacity: 0,
          y: 30,
          rotationX: -90,
          stagger: 0.03,
          duration: 0.6,
          ease: 'back.out',
        }, '-=0.4')
      }

      tl.from(listItemsRef.current, {
        opacity: 0,
        x: -30,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.2')

      tl.from(statsRefs.current, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.6,
        ease: 'back.out',
      }, '-=0.3')

      tl.from(buttonRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.5,
        ease: 'elastic.out(1, 0.5)',
      }, '-=0.2')

      // --- Popular Destinations card animation (graceful enhancement) ---
      const popCards = document.querySelectorAll('.pop-destination-card')
      if (popCards.length) {
        // Set initial state for animation (cards are already visible, this creates a smooth fade-in from slightly below)
        gsap.set(popCards, { opacity: 0, y: 30 })
        gsap.to(popCards, {
          scrollTrigger: {
            trigger: popularSectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
        })
      }

      return () => window.removeEventListener('mousemove', handleMouseMove)
    }, introSectionRef)

    return () => ctx.revert()
  }, [popularDest]) // re-run when destinations load

  return (
    <main>
      {/* ===== HERO SECTION ===== */}
      <section style={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {heroImages.map((img, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                transition: 'opacity 1s ease-in-out',
                opacity: idx === currentSlide ? 1 : 0,
                zIndex: idx === currentSlide ? 1 : 0,
              }}
            >
              <img src={img} alt={`Hero background ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>

        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,.6), rgba(0,0,0,.4), rgba(0,0,0,.7))', zIndex: 2 }} />

        <button
          onClick={prevSlide}
          style={{
            position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', zIndex: 10,
            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', border: 'none', borderRadius: '9999px',
            width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'white', transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.7)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.4)')}
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          style={{
            position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', zIndex: 10,
            background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)', border: 'none', borderRadius: '9999px',
            width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'white', transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.7)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.4)')}
        >
          <ChevronRight size={24} />
        </button>

        <div style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '0.75rem' }}>
          {heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              style={{
                width: idx === currentSlide ? '2rem' : '0.5rem',
                height: '0.5rem',
                borderRadius: '9999px',
                background: idx === currentSlide ? 'var(--accent)' : 'rgba(255,255,255,0.6)',
                border: 'none', cursor: 'pointer', transition: 'all 0.2s', padding: 0,
              }}
            />
          ))}
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 5, paddingTop: '6rem', textAlign: 'center', color: '#fff' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, borderRadius: 9999, border: '1px solid rgba(255,255,255,.3)', background: 'rgba(255,255,255,.1)', padding: '.375rem 1rem', fontSize: '.875rem', fontWeight: 500, backdropFilter: 'blur(8px)' }}>
            <Star size={16} className="star-fill" /> Rated 4.9/5 by 12,000+ happy travelers
          </span>
          <h1 style={{ marginTop: '1.5rem', fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.25rem, 6vw, 3.75rem)', fontWeight: 700, lineHeight: 1.15 }}>
            Your Dream Journey <span style={{ color: 'var(--accent)' }}>Begins Here</span>
          </h1>
          <p style={{ marginTop: '1.25rem', maxWidth: '40rem', marginInline: 'auto', fontSize: '1.0625rem', lineHeight: 1.75, color: 'rgba(255,255,255,.85)' }}>
            Handcrafted domestic and international holiday packages, customized tours, and luxury getaways designed around you.
          </p>
          <form onSubmit={e => { e.preventDefault(); navigate(`/packages?q=${q}`) }}
            style={{ marginTop: '2rem', maxWidth: '36rem', marginInline: 'auto', display: 'flex', gap: '.75rem', borderRadius: 16, border: '1px solid rgba(255,255,255,.2)', background: 'rgba(255,255,255,.1)', padding: '.75rem', backdropFilter: 'blur(16px)', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flex: 1, alignItems: 'center', gap: 8, borderRadius: 10, background: '#fff', padding: '.75rem 1rem', minWidth: 180 }}>
              <Search size={18} style={{ color: 'var(--muted-fg)', flexShrink: 0 }} />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Where do you want to go?" style={{ flex: 1, border: 'none', outline: 'none', fontSize: '.875rem', color: 'var(--fg)', background: 'transparent', fontFamily: 'var(--font-sans)' }} />
            </div>
            <button type="submit" className="btn btn-accent">Search Tours</button>
          </form>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer"
               style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', transition: 'all 0.2s', color: '#fff' }}
               onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')}
               onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}>
              <Facebook size={20} />
            </a>
            <a href="https://www.instagram.com/book.my_dream?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer"
               style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', transition: 'all 0.2s', color: '#fff' }}
               onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')}
               onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}>
              <Instagram size={20} />
            </a>
            <a href="https://twitter.com/yourpage" target="_blank" rel="noopener noreferrer"
               style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', transition: 'all 0.2s', color: '#fff' }}
               onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')}
               onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}>
              <Twitter size={20} />
            </a>
            <a href="https://youtube.com/yourpage" target="_blank" rel="noopener noreferrer"
               style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', transition: 'all 0.2s', color: '#fff' }}
               onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')}
               onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}>
              <Youtube size={20} />
            </a>
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '2rem', fontSize: '.875rem', color: 'rgba(255,255,255,.85)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><ShieldCheck size={20} style={{ color: 'var(--accent)' }} /> 100% Trusted & Secure</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Award size={20} style={{ color: 'var(--accent)' }} /> Best Price Guarantee</span>
            <Link to="/contact" style={{ fontWeight: 600, color: 'var(--accent)', textDecoration: 'none' }}>Plan a Custom Tour →</Link>
          </div>
        </div>
      </section>

      {/* ===== INTRO SECTION ===== */}
      <section
        ref={introSectionRef}
        className="section"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'transparent',
          padding: '5rem 0',
        }}
      >
        <div className="intro-blobs" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <div
            style={{
              position: 'absolute',
              top: '-20%',
              left: '-10%',
              width: '60%',
              paddingBottom: '60%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(102,126,234,0.3) 0%, rgba(118,75,162,0) 70%)',
              filter: 'blur(60px)',
              animation: 'floatBlob 18s infinite alternate',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-30%',
              right: '-15%',
              width: '70%',
              paddingBottom: '70%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(245,87,108,0.3) 0%, rgba(79,172,254,0) 70%)',
              filter: 'blur(80px)',
              animation: 'floatBlob 24s infinite alternate-reverse',
            }}
          />
        </div>

        <div
          ref={glowRef}
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
            pointerEvents: 'none',
            zIndex: 1,
            willChange: 'transform',
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '3rem', alignItems: 'center' }}>
          <div
            ref={imagesContainerRef}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const x = (e.clientX - rect.left) / rect.width - 0.5
              const y = (e.clientY - rect.top) / rect.height - 0.5
              gsap.to(e.currentTarget, {
                rotateY: x * 8,
                rotateX: y * -8,
                duration: 0.3,
                ease: 'power2.out',
              })
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                rotateY: 0,
                rotateX: 0,
                duration: 0.5,
                ease: 'elastic.out',
              })
            }}
          >
            <img
              ref={leftImageRef}
              src="/images/dest-bali.png"
              alt="Bali rice terraces"
              style={{
                borderRadius: 24,
                objectFit: 'cover',
                aspectRatio: '4/5',
                width: '100%',
                boxShadow: '0 25px 40px -12px rgba(0,0,0,0.3)',
                transformStyle: 'preserve-3d',
              }}
            />
            <img
              ref={rightImageRef}
              src="/images/dest-switzerland.png"
              alt="Swiss Alps"
              style={{
                borderRadius: 24,
                objectFit: 'cover',
                aspectRatio: '4/5',
                width: '100%',
                marginTop: '15%',
                boxShadow: '0 25px 40px -12px rgba(0,0,0,0.3)',
                transformStyle: 'preserve-3d',
              }}
            />
          </div>

          <div>
            <div ref={headingRef}>
              <SectionHeading
                eyebrow="Welcome to Book My Dream Travels"
                title="We Turn Travel Dreams Into Lifelong Memories"
                description="From your first inquiry to your safe return home, our travel consultants handle every detail so you can simply relax and enjoy."
                align="left"
              />
            </div>

            <ul style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '.75rem', listStyle: 'none' }}>
              {points.map((p, idx) => (
                <li
                  key={p}
                  ref={(el) => (listItemsRef.current[idx] = el)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 8,
                    fontSize: '.875rem',
                    background: 'rgba(255,255,255,0.05)',
                    padding: '6px 12px',
                    borderRadius: 40,
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  <CheckCircle2 size={18} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }} />
                  {p}
                </li>
              ))}
            </ul>

            <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1.5rem' }}>
              {statsData.map((stat, idx) => (
                <div key={stat.label} ref={(el) => (statsRefs.current[idx] = el)} style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 700, color: 'var(--primary)', lineHeight: 1.2 }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: '.75rem', color: 'var(--muted-fg)', letterSpacing: '0.5px' }}>{stat.label}</p>
                </div>
              ))}
            </div>

            <Link
              ref={buttonRef}
              to="/about"
              className="btn btn-primary"
              style={{
                marginTop: '2rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 28px',
                borderRadius: 40,
                background: 'linear-gradient(135deg, #0f4c81 0%, #2b6a9f 100%)',
                boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
              }}
            >
              Learn More About Us <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <style>{`
          @keyframes floatBlob {
            0% { transform: translate(0, 0) scale(1); }
            100% { transform: translate(5%, 5%) scale(1.2); }
          }
          .intro-blobs div {
            animation-timing-function: ease-in-out;
          }
        `}</style>
      </section>

      {/* ===== FEATURED PACKAGES ===== */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <SectionHeading eyebrow="Featured Packages" title="Trending Holiday Packages" description="Our most-loved journeys, curated for unforgettable experiences." align="left" />
            <Link to="/packages" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '.875rem', fontWeight: 600, color: 'var(--primary)', textDecoration: 'none', flexShrink: 0 }}>
              View All Packages <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid-4" style={{ marginTop: '2.5rem' }}>
            {featured.map(pkg => <PackageCard key={pkg.slug} pkg={pkg} />)}
          </div>
        </div>
      </section>

      {/* ===== POPULAR DESTINATIONS (FIXED: always visible + smooth animation) ===== */}
      <section ref={popularSectionRef} className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Popular Destinations"
            title="Explore the World's Most Stunning Places"
            description="From tropical beaches to alpine peaks, discover destinations that inspire."
          />
          <div className="grid-4" style={{ marginTop: '3rem' }}>
            {popularDest.map((dest) => (
              <div
                key={dest.slug}
                className="pop-destination-card"
                style={{
                  // Cards are visible by default (no opacity:0)
                  opacity: 1,
                  transform: 'translateY(0)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <DestinationCard dest={dest} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
            <Link to="/destinations" className="btn btn-primary">
              View All Destinations <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <style>{`
          .pop-destination-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          .pop-destination-card:hover {
            transform: translateY(-6px) !important;
          }
          @media (max-width: 1024px) {
            .grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 640px) {
            .grid-4 { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="section section-alt">
        <div className="container">
          <SectionHeading eyebrow="Why Choose Us" title="Travel With Confidence, Every Step of the Way" description="We go beyond bookings. From the moment you reach out to the day you return home, we make sure your journey is seamless." />
          <div className="grid-3" style={{ marginTop: '3rem' }}>
            {whyReasons.map(r => (
              <div key={r.title} className="card" style={{ display: 'flex', gap: '1rem', padding: '1.5rem', border: 'none' }}>
                <span style={{ display: 'flex', width: 48, height: 48, flexShrink: 0, alignItems: 'center', justifyContent: 'center', borderRadius: 12, background: 'rgba(15,76,129,.1)', color: 'var(--primary)' }}>
                  <r.icon size={24} />
                </span>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.0625rem', fontWeight: 600 }}>{r.title}</h3>
                  <p style={{ marginTop: '.25rem', fontSize: '.875rem', lineHeight: 1.6, color: 'var(--muted-fg)' }}>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== GALLERY PREVIEW ===== */}
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

      {/* ===== TESTIMONIALS ===== */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Testimonials" title="What Our Travelers Say" description="Real stories from real travelers who trusted us with their dream trips." />
          <TestimonialCarousel />
        </div>
      </section>

      {/* ===== BLOG PREVIEW ===== */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <SectionHeading eyebrow="Travel Blog" title="Tips, Guides & Inspiration" align="left" />
            <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '.875rem', fontWeight: 600, color: 'var(--primary)', textDecoration: 'none', flexShrink: 0 }}>
              Read All Articles <ArrowRight size={16} />
            </Link>
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

      {/* ===== NEWSLETTER CTA ===== */}
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
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address"
                    style={{ flex: 1, borderRadius: 9999, border: 'none', padding: '.75rem 1.25rem', fontSize: '.875rem', outline: 'none', fontFamily: 'var(--font-sans)', minWidth: 180 }}
                  />
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