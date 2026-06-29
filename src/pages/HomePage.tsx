import { Link } from 'react-router-dom'
import { API_URL } from '../config'
import baliImg from '../assets/image2.jpg'
import maldivesImg from '../assets/image3.jpg'
import switzerlandImg from '../assets/image5.jpg'
import dubaiImg from '../assets/image4.jpg'
import kerelaImg from '../assets/image1.jpg'
import {
  Search, Star, ShieldCheck, Award, CheckCircle2, ArrowRight, Headphones,
  Wallet, Map, Plane, Heart, ChevronLeft, ChevronRight, Compass, Building2,
  Car, BadgePercent, LayoutGrid, Calendar, Clock, Users2, Utensils, Hotel as HotelIcon,
  Bus, UserCheck, Tag, Quote
} from 'lucide-react'
import { useState, useEffect, useRef, useCallback } from 'react'
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

// ─── Performance: throttle helper ────────────────────────────────────────────
function throttle<T extends (...args: any[]) => void>(fn: T, ms: number): T {
  let last = 0
  return ((...args: any[]) => {
    const now = performance.now()
    if (now - last < ms) return
    last = now
    fn(...args)
  }) as T
}

const iconMap: Record<string, React.ElementType> = {
  MapPin, Globe, Sparkles, Hotel, Plane, TrainFront, Ship, FileCheck, BookUser, Heart, Users, Briefcase,
}

const quickCategories = [
  { icon: Compass, label: 'Holiday Packages', to: '/packages', bg: 'rgba(255,107,53,0.85)', border: 'rgba(255,140,80,0.6)' },
  { icon: Plane, label: 'Destinations', to: '/destinations', bg: 'rgba(16,185,129,0.85)', border: 'rgba(52,211,153,0.6)' },
  // { icon: BadgePercent, label: 'Offers', to: '/offers', bg: 'rgba(236,72,153,0.85)', border: 'rgba(244,114,182,0.6)' },
  { icon: LayoutGrid, label: 'All', to: '/packages', bg: 'rgba(14,165,233,0.85)', border: 'rgba(56,189,248,0.6)' },
]

const trustStats = [
  { value: '1000+', label: 'Happy Guests' },
  { value: '500+', label: 'Tours Completed' },
  { value: '150+', label: 'Destinations' },
]

const heroImages = [kerelaImg, baliImg, maldivesImg, dubaiImg, switzerlandImg]

const introStats = [
  { icon: Users2, value: '1000+', label: 'Happy Guests' },
  { icon: Award, value: '500+', label: 'Tours Completed' },
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

const flightMapSvg = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 600' preserveAspectRatio='xMidYMid slice'>
  <style>
    .path { fill: none; stroke: rgba(255,255,255,0.6); stroke-width: 2.5; stroke-dasharray: 10 12; stroke-linecap: round; }
    .text { fill: rgba(255,255,255,0.95); font-family: 'Brush Script MT', 'Comic Sans MS', cursive, sans-serif; font-size: 32px; font-style: italic; }
    .pin { fill: rgba(255,255,255,0.35); }
    .cross { stroke: rgba(255,255,255,0.5); stroke-width: 2; stroke-linecap: round; }
  </style>

  <!-- Playful paths -->
  <path class="path" d="M -100 150 Q 250 20 450 180 T 850 80 T 1500 300" />
  <path class="path" d="M 0 500 Q 300 350 600 500 T 1100 250 T 1500 100" />
  <path class="path" d="M 150 650 Q 350 400 700 550 T 1300 500 T 1500 700" />

  <!-- Map pins -->
  <g transform="translate(280, 220) scale(1.8)"><path class="pin" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></g>
  <g transform="translate(850, 100) scale(1.8)"><path class="pin" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></g>
  <g transform="translate(1080, 260) scale(1.8)"><path class="pin" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></g>
  <g transform="translate(600, 480) scale(1.8)"><path class="pin" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></g>
  <g transform="translate(180, 420) scale(1.8)"><path class="pin" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></g>

  <!-- Crosses (stars) -->
  <path class="cross" d="M 400 100 L 410 100 M 405 95 L 405 105" />
  <path class="cross" d="M 900 250 L 910 250 M 905 245 L 905 255" />
  <path class="cross" d="M 150 280 L 160 280 M 155 275 L 155 285" />
  <path class="cross" d="M 1250 450 L 1260 450 M 1255 445 L 1255 455" />
  <path class="cross" d="M 750 400 L 760 400 M 755 395 L 755 405" />

  <!-- Texts -->
  <text x="320" y="210" class="text" transform="rotate(-5 320 210)">Majorca</text>
  <text x="890" y="90" class="text" transform="rotate(5 890 90)">Taiwan</text>
  <text x="1110" y="250" class="text" transform="rotate(-3 1110 250)">Japan</text>
  <text x="630" y="470" class="text" transform="rotate(2 630 470)">Hamburg</text>
  <text x="210" y="410" class="text" transform="rotate(-4 210 410)">Stockholm</text>

  <!-- Mini Paper Planes -->
  <g transform="translate(450, 180) rotate(20) scale(0.6)">
    <path fill="rgba(255,255,255,0.75)" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </g>
  <g transform="translate(1100, 250) rotate(-15) scale(0.6)">
    <path fill="rgba(255,255,255,0.75)" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </g>
  <g transform="translate(700, 550) rotate(-10) scale(0.6)">
    <path fill="rgba(255,255,255,0.75)" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </g>
</svg>
`)}`;

const lightFlightMapSvg = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 600' preserveAspectRatio='xMidYMid slice'>
  <style>
    .grid { stroke: rgba(15,76,129,0.08); stroke-width: 1; }
    .circle { fill: none; stroke: rgba(15,76,129,0.15); stroke-width: 1.5; stroke-dasharray: 6 8; }
    .plane { fill: rgba(15,76,129,0.25); }
  </style>

  <!-- Abstract grid -->
  <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
    <path d="M 60 0 L 0 0 0 60" fill="none" class="grid"/>
  </pattern>
  <rect width="100%" height="100%" fill="url(#grid)" />

  <!-- Departure Hub 1 -->
  <g transform="translate(200, 200)">
    <circle r="80" class="circle" />
    <circle r="180" class="circle" />
    <circle r="280" class="circle" />
    <circle r="380" class="circle" />
    
    <g transform="rotate(-30) translate(180, 0)"><g transform="translate(-12, -12) scale(0.8)"><path class="plane" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></g></g>
    <g transform="rotate(45) translate(280, 0)"><g transform="translate(-12, -12) scale(0.6)"><path class="plane" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></g></g>
    <g transform="rotate(160) translate(380, 0)"><g transform="translate(-12, -12) scale(0.9)"><path class="plane" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></g></g>
  </g>

  <!-- Departure Hub 2 -->
  <g transform="translate(1200, 450)">
    <circle r="100" class="circle" />
    <circle r="220" class="circle" />
    <circle r="340" class="circle" />
    <circle r="460" class="circle" />
    
    <g transform="rotate(-140) translate(220, 0)"><g transform="translate(-12, -12) scale(0.8)"><path class="plane" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></g></g>
    <g transform="rotate(-60) translate(340, 0)"><g transform="translate(-12, -12) scale(0.7)"><path class="plane" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></g></g>
    <g transform="rotate(20) translate(460, 0)"><g transform="translate(-12, -12) scale(0.9)"><path class="plane" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></g></g>
  </g>

  <!-- Departure Hub 3 (small) -->
  <g transform="translate(750, 50)">
    <circle r="90" class="circle" />
    <circle r="190" class="circle" />
    
    <g transform="rotate(110) translate(190, 0)"><g transform="translate(-12, -12) scale(0.6)"><path class="plane" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></g></g>
  </g>
</svg>
`)}`;

export default function HomePage() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [email, setEmail] = useState('')
  const [subDone, setSubDone] = useState(false)
  const [featured, setFeatured] = useState<Package[]>([])
  const [trending, setTrending] = useState<Package[]>([])
  const [popularDest, setPopularDest] = useState<Destination[]>([])
  const [galleryImgs, setGalleryImgs] = useState<{ src: string, title: string, category: string }[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const introSectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const statsRefs = useRef<(HTMLDivElement | null)[]>([])
  const buttonRef = useRef<HTMLAnchorElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const popularSectionRef = useRef<HTMLElement>(null)
  const dataLoadedRef = useRef(false)
  // Track if user prefers reduced motion
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

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
    fetch(`${API_URL}/api/gallery`).then(r => r.json()).then(data => {
      if (Array.isArray(data)) setGalleryImgs(data)
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
  const galleryPreview = [
    { src: '/images/dest-kerala.png', title: 'Kerala Backwaters' },
    { src: '/images/dest-switzerland.png', title: 'Swiss Alps' },
    { src: '/images/dubai.jpg', title: 'Dubai Adventures' },
    { src: '/images/baku.jpg', title: 'Explore Baku' },
    { src: '/images/goa.jpg', title: 'Goa Beaches' },
    { src: '/images/nyc8.jpg', title: 'City Tours' }
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch(`${API_URL}/api/newsletter/subscribe`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
    setSubDone(true)
  }

  // ── Mouse glow: throttled to 60fps max, RAF-batched ──────────────────────
  useEffect(() => {
    if (!introSectionRef.current || !glowRef.current) return
    if (prefersReducedMotion.current) return

    const section = introSectionRef.current
    const glow = glowRef.current
    let rafId: number

    const onMove = throttle((e: MouseEvent) => {
      const rect = section.getBoundingClientRect()
      // Only animate when section is visible
      if (rect.bottom < 0 || rect.top > window.innerHeight) return
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        gsap.to(glow, {
          x: e.clientX - rect.left - 150,
          y: e.clientY - rect.top - 150,
          duration: 0.8,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      })
    }, 16) // ~60fps cap

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // ── Scroll animations ─────────────────────────────────────────────────────
  useEffect(() => {
    if (prefersReducedMotion.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: introSectionRef.current,
          start: 'top 75%',
          // Use 'play none none none' to avoid reverse re-animation overhead
          toggleActions: 'play none none none',
        },
      })

      const validStats = statsRefs.current.filter(Boolean)
      if (validStats.length) {
        tl.from(validStats, { opacity: 0, y: 30, stagger: 0.1, duration: 0.5, ease: 'back.out(1.4)' })
      }

      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll('.word')
        if (words.length) {
          tl.from(words, { opacity: 0, y: 20, stagger: 0.03, duration: 0.4, ease: 'back.out' }, '-=0.3')
        }
      }

      if (buttonRef.current) {
        tl.from(buttonRef.current, { opacity: 0, scale: 0.8, duration: 0.35, ease: 'back.out' }, '-=0.2')
      }

      // Dense cards: use IntersectionObserver instead of ScrollTrigger for performance
      const denseCards = document.querySelectorAll('.dense-card')
      if (denseCards.length) {
        gsap.set(denseCards, { opacity: 0, y: 20 })
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const card = entry.target as HTMLElement
                const idx = Array.from(denseCards).indexOf(card)
                gsap.to(card, { opacity: 1, y: 0, duration: 0.5, delay: idx * 0.06, ease: 'power2.out' })
                observer.unobserve(card)
              }
            })
          },
          { threshold: 0.15 }
        )
        denseCards.forEach(card => observer.observe(card))
        return () => observer.disconnect()
      }
    }, introSectionRef)

    return () => ctx.revert()
  }, [])

  // ── Destination card animations via IntersectionObserver ─────────────────
  useEffect(() => {
    if (!popularDest.length || dataLoadedRef.current) return
    if (prefersReducedMotion.current) { dataLoadedRef.current = true; return }
    dataLoadedRef.current = true

    // Small delay to let React render the cards first
    const timer = setTimeout(() => {
      const popCards = document.querySelectorAll('.pop-destination-card')
      if (!popCards.length) return

      gsap.set(popCards, { opacity: 0, y: 24 })

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const card = entry.target as HTMLElement
              const idx = Array.from(popCards).indexOf(card)
              gsap.to(card, { opacity: 1, y: 0, duration: 0.6, delay: idx * 0.08, ease: 'power2.out' })
              observer.unobserve(card)
            }
          })
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      )
      popCards.forEach(card => observer.observe(card))
      return () => observer.disconnect()
    }, 50)

    return () => clearTimeout(timer)
  }, [popularDest])

  return (
    <main>
      {/*
        ─────────────────────────────────────────────────────────────────
        GLOBAL PERF STYLES
        Key fixes:
        1. Hero slides use opacity only (GPU composite, no repaint)
        2. Hover effects use transform+opacity only (no box-shadow on hover)
        3. backdrop-filter removed from hero nav — solid bg instead
        4. Decorative blobs use CSS animation, not JS, and are isolated
           with contain:strict + will-change:transform
        5. All transition shorthand replaced with explicit
           transition-property to avoid animating layout props
        ─────────────────────────────────────────────────────────────────
      */}
      <style>{`
        /* ── Reduced motion override ── */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* ── Hero slide fade: GPU-only opacity transition ── */
        .hero-slide {
          position: absolute;
          inset: 0;
          opacity: 0;
          /* Use only opacity + transform — both are compositor-only */
          transition: opacity 1s ease-in-out;
          will-change: opacity;
          /* Force compositing layer */
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        .hero-slide.active { opacity: 1; }

        /* ── Quick category icon hover: CSS only, no JS ── */
        .quick-cat-icon {
          transition-property: transform, box-shadow;
          transition-duration: 0.2s;
          transition-timing-function: ease;
          will-change: transform;
          transform: translateZ(0);
        }
        .quick-cat-link:hover .quick-cat-icon {
          transform: translateY(-4px) scale(1.1) translateZ(0);
        }

        /* ── Hero social button hover ── */
        .hero-social-btn {
          transition-property: background-color, border-color, transform;
          transition-duration: 0.2s;
        }
        .hero-social-btn:hover {
          background: var(--accent) !important;
          border-color: var(--accent) !important;
          transform: translateY(-2px);
        }

        /* ── Offer banners: transform only, no layout shift ── */
        .offer-banner, .offer-promo {
          transition-property: transform, opacity;
          transition-duration: 0.22s;
          transition-timing-function: ease;
          will-change: transform;
          transform: translateZ(0);
        }
        .offer-banner:hover, .offer-promo:hover { transform: translateY(-3px) translateZ(0); }

        /* ── Trending / dense cards ── */
        .dense-card {
          transition-property: transform, opacity;
          transition-duration: 0.22s;
          transition-timing-function: ease;
          will-change: transform;
          transform: translateZ(0);
        }
        .dense-card:hover { transform: translateY(-4px) translateZ(0); }

        /* ── City departure cards ── */
        .city-depart-card {
          transition-property: transform;
          transition-duration: 0.18s;
          transition-timing-function: ease;
          will-change: transform;
          transform: translateZ(0);
        }
        .city-depart-card:hover { transform: translateY(-3px) translateZ(0); }
        .city-depart-btn {
          transition-property: background-color, color;
          transition-duration: 0.16s;
        }
        .city-depart-btn:hover { background: #1e3a6e !important; color: #fff !important; }

        /* ── Gallery thumb: scale img only (not container) ── */
        .gallery-thumb {
          overflow: hidden;
        }
        .gallery-thumb img {
          transition-property: transform;
          transition-duration: 0.55s;
          transition-timing-function: ease;
          will-change: transform;
          transform: translateZ(0);
        }
        .gallery-thumb:hover img { transform: scale(1.05) translateZ(0); }

        /* ── Decorative blobs: isolated layers, no JS interaction ── */
        .ambient-blob {
          will-change: transform;
          transform: translateZ(0);
          contain: strict;
          pointer-events: none;
        }

        /* ── Responsive ── */
        @media(max-width:900px){
          .offers-row{ grid-template-columns:1fr 1fr !important; }
          .offers-row .offer-promo{ grid-column:span 2; height:140px !important; }
          .inclusions-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .intro-stats-grid{ grid-template-columns:repeat(2,1fr) !important; }
          .city-cards-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media(max-width:768px){
          .city-cards-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media(max-width:767px){
          .container { padding-left: 1rem !important; padding-right: 1rem !important; }
          .offers-row { grid-template-columns: 1fr !important; }
          .offers-row .offer-banner { height: 150px !important; }
          .offers-row .offer-promo { grid-column: span 1 !important; height: 120px !important; }
          .dense-card-row { grid-template-columns: 1fr !important; gap: .875rem !important; }
          .dense-card { flex-direction: row !important; height: 116px !important; }
          .dense-card > div:first-child { width: 116px !important; min-width: 116px !important; height: 100% !important; flex-shrink: 0 !important; }
          .dense-card > div:last-child { padding: .7rem .8rem !important; }
          .dense-card h3 { font-size: .875rem !important; }
          .pop-destination-card { flex: 0 0 200px !important; height: 280px !important; }
          .pop-dest-line { display: none !important; }
          .dest-scroll { padding-bottom: 0.5rem !important; }
          .dest-scroll::-webkit-scrollbar { display: none; }
          .pop-dest-btn-wrapper { margin-top: 0.5rem !important; }
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
        @media(max-width:600px){
          .offers-row{ grid-template-columns:1fr !important; }
          .offers-row .offer-promo{ grid-column:span 1; }
          .intro-reviews-grid { grid-template-columns: 1fr !important; }
          .masonry-gallery > div { grid-column: span 12 !important; height: 240px !important; }
        }
        @media(max-width:480px){
          .city-cards-grid { grid-template-columns: 1fr !important; }
          .dense-card > div:first-child { width: 100px !important; min-width: 100px !important; }
          .pop-destination-card { flex: 0 0 180px !important; }
        }
        @media (max-width: 900px) {
          .masonry-gallery > div { grid-column: span 6 !important; }
        }

        /* ── Destination scroll ── */
        .dest-scroll::-webkit-scrollbar { height: 6px; }
        .dest-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.3); border-radius: 9999px; }
        .dest-scroll::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); border-radius: 9999px; }
      `}</style>

      {/* ═══════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════ */}
      <section style={{ position: 'relative', minHeight: '55vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {/*
          Slides: each is absolutely positioned, opacity toggled via class.
          No inline style mutations per frame — CSS handles the transition.
          Images are preloaded by being in the DOM but invisible.
        */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {heroImages.map((img, idx) => (
            <div key={idx} className={`hero-slide${idx === currentSlide ? ' active' : ''}`}>
              <img
                src={img}
                alt={`Hero ${idx + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                // Preload adjacent slides
                loading={idx === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>

        {/* Overlay: static, no animation needed */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,.55), rgba(0,0,0,.35), rgba(0,0,0,.65))', zIndex: 2, pointerEvents: 'none' }} />

        {/* Nav buttons: solid bg, no backdrop-filter */}
        {[{ fn: prevSlide, side: 'left', Icon: ChevronLeft }, { fn: nextSlide, side: 'right', Icon: ChevronRight }].map(({ fn, side, Icon }) => (
          <button key={side} onClick={fn} style={{
            position: 'absolute', [side]: '1rem', top: '50%', transform: 'translateY(-50%)',
            zIndex: 10, background: 'rgba(0,0,0,0.5)', border: 'none', borderRadius: '9999px',
            width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#fff',
            // Only transition background-color (no transform/layout)
            transition: 'background-color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.72)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.5)')}
          >
            <Icon size={24} />
          </button>
        ))}

        {/* Dots */}
        <div style={{ position: 'absolute', bottom: '1.25rem', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', gap: '.75rem' }}>
          {heroImages.map((_, idx) => (
            <button key={idx} onClick={() => goToSlide(idx)} style={{
              width: idx === currentSlide ? '2rem' : '.5rem', height: '.5rem',
              borderRadius: 9999,
              background: idx === currentSlide ? 'var(--accent)' : 'rgba(255,255,255,0.6)',
              border: 'none', cursor: 'pointer',
              // width transition is layout-triggering but acceptable for dots (tiny element)
              transition: 'width 0.2s ease, background-color 0.2s ease',
              padding: 0,
            }} />
          ))}
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 5, paddingTop: '4rem', paddingBottom: '2rem', textAlign: 'center', color: '#fff' }}>
          <div style={{ fontFamily: 'var(--font-script)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: '#84cc16', marginBottom: '-1rem', transform: 'rotate(-2deg)' }}>
            don't just dream it,
          </div>
          <h1 style={{ fontFamily: 'var(--font-marker)', fontSize: 'clamp(2.5rem, 9vw, 5.5rem)', fontWeight: 400, lineHeight: 1.1, textTransform: 'uppercase', textShadow: '0 4px 15px rgba(0,0,0,0.5)', letterSpacing: '2px' }}>
            BOOK YOUR <span style={{ color: 'var(--accent)' }}>DREAM</span>
          </h1>
          <p style={{ marginTop: '1rem', maxWidth: '34rem', marginInline: 'auto', fontSize: '1.05rem', lineHeight: 1.6, color: 'rgba(255,255,255,.9)', fontFamily: 'var(--font-sans)' }}>
            From local escapes to far-flung journeys, find what makes you happy — anytime, anywhere.
          </p>

          {/* Search */}
          <form onSubmit={e => { e.preventDefault(); navigate(`/packages?q=${q}`) }}
            style={{ marginTop: '1.75rem', maxWidth: '38rem', marginInline: 'auto', display: 'flex', gap: '.5rem', borderRadius: 9999, background: '#fff', padding: '.5rem .5rem .5rem 1.25rem', boxShadow: '0 10px 30px rgba(0,0,0,.2)', flexWrap: 'wrap', alignItems: 'center' }}>
            <Search size={18} style={{ color: 'var(--muted-fg)', flexShrink: 0 }} />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search destinations or activities" style={{ flex: 1, border: 'none', outline: 'none', fontSize: '.9rem', color: 'var(--fg)', background: 'transparent', fontFamily: 'var(--font-sans)', minWidth: 120 }} />
            <button type="submit" className="btn btn-accent" style={{ borderRadius: 9999 }}>Search</button>
          </form>

          {/* Social Media Buttons */}
          <div style={{ marginTop: '1.25rem', display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
            {[
              { icon: Facebook, label: 'Facebook', url: 'https://www.facebook.com/share/18tCiPVjBn/' },
              { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/bookmy.dream?igsh=MXZweTJ6MXoyeWMwZA==' },
              { icon: Youtube, label: 'YouTube', url: 'https://youtube.com/@book.mydream?si=Bxoq1RmPq28VZ5xi' }
            ].map((social, idx) => {
              const Icon = social.icon;
              return (
                <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" className="hero-social-btn" aria-label={social.label} style={{
                  display: 'inline-flex', width: 36, height: 36, alignItems: 'center', justifyContent: 'center',
                  borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
                  color: '#fff', textDecoration: 'none',
                }}>
                  <Icon size={16} />
                </a>
              );
            })}
          </div>

          {/* Quick category icons */}
          <div style={{ marginTop: '1.75rem', display: 'flex', justifyContent: 'center', gap: 'clamp(1rem, 4vw, 2.5rem)', flexWrap: 'wrap' }}>
            {quickCategories.map(({ icon: Icon, label, to, bg, border }) => (
              <Link key={label} to={to} className="quick-cat-link" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, color: '#fff', textDecoration: 'none', width: '100px' }}>
                <span className="quick-cat-icon" style={{
                  display: 'flex', width: 'clamp(48px, 15vw, 58px)', height: 'clamp(48px, 15vw, 58px)', alignItems: 'center', justifyContent: 'center',
                  borderRadius: '50%', background: bg, border: `1.5px solid ${border}`,
                  boxShadow: `0 4px 16px rgba(0,0,0,0.2)`,
                  flexShrink: 0
                }}>
                  <Icon size={22} strokeWidth={1.8} color="#fff" />
                </span>
                <span style={{ fontSize: 'clamp(0.6rem, 2.5vw, 0.72rem)', fontWeight: 600, textAlign: 'center', lineHeight: 1.2, textShadow: '0 1px 4px rgba(0,0,0,0.5)', letterSpacing: '0.01em' }}>
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
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
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
      <section className="section" style={{ position: 'relative', overflow: 'hidden', paddingTop: '3.5rem', paddingBottom: '3.5rem' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${dubaiImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(12px)',
          transform: 'scale(1.1)',
          zIndex: 0,
          opacity: 0.8
        }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255, 255, 255, 0.6)', zIndex: 0 }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--fg)' }}>Offers for you</h2>
          <div className="offers-row" style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1.3fr 1.3fr 1fr', gap: '1rem', alignItems: 'stretch' }}>

            {[
              { to: '/packages', img: dubaiImg, eyebrow: 'Limited-Time Offer', title: 'Best Domestic Deals', sub: 'Unlock savings on tours, transport & more.' },
              { to: '/destinations', img: switzerlandImg, eyebrow: "Editor's Pick", title: 'Best International Deals', sub: 'Curated alpine getaways, ready to book.' },
            ].map(b => (
              <Link key={b.title} to={b.to} className="offer-banner" style={{ position: 'relative', display: 'block', borderRadius: 16, overflow: 'hidden', height: 190, textDecoration: 'none', boxShadow: '0 8px 20px -8px rgba(0,0,0,.25)' }}>
                <img src={b.img} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(110deg, rgba(15,30,48,.75) 0%, rgba(15,30,48,.25) 55%, transparent 80%)', pointerEvents: 'none' }} />
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
              <BadgePercent size={70} style={{ position: 'absolute', right: '-1rem', bottom: '-1rem', color: 'var(--accent)', opacity: .15, transform: 'rotate(-10deg)', pointerEvents: 'none' }} />
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
      </section>

      {/* ═══════════════════════════════════════════════
          TRENDING PACKAGES
      ═══════════════════════════════════════════════ */}
      <section className="section section-alt" style={{ backgroundColor: '#0f4c81' }}>
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
              light={true}
            />
            <Link to="/packages" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '.875rem', fontWeight: 600, color: '#fff', textDecoration: 'none', flexShrink: 0 }}>View All Packages <ArrowRight size={16} /></Link>
          </div>
          <div className="dense-card-row" style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {trending.map(pkg => {
              const discount = pkg.price > 0 ? Math.round(((pkg.price - pkg.discountPrice) / pkg.price) * 100) : 0;
              const tag = discount > 0 ? `${discount}% OFF` : (pkg.featured ? 'Featured' : undefined);
              return (
                <Link key={pkg.slug} to={`/packages/${pkg.slug}`} className="dense-card" style={{ display: 'flex', flexDirection: 'column', borderRadius: 16, overflow: 'hidden', background: 'var(--card-bg,#fff)', border: '1px solid var(--border)', textDecoration: 'none', color: 'inherit', boxShadow: '0 4px 14px -6px rgba(0,0,0,.1)' }}>
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
      </section>

      {/* ═══════════════════════════════════════════════
          POPULAR DESTINATIONS
      ═══════════════════════════════════════════════ */}
      <section ref={popularSectionRef} className="section" style={{
        position: 'relative',
        background: `url(${switzerlandImg}) center/cover no-repeat`,
        marginTop: 0,
        paddingTop: '5rem',
        paddingBottom: '5rem',
      }}>
        {/* Overlay as a separate layer so the bg image doesn't repaint */}
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(21, 52, 79, 0.85)', zIndex: 1, pointerEvents: 'none' }}></div>

        <div style={{
          position: 'absolute', top: -1, left: 0, right: 0, height: '24px', zIndex: 2, pointerEvents: 'none',
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20' preserveAspectRatio='none'%3E%3Cpath d='M0,0 L0,20 Q2,12 5,18 T12,10 T18,18 T25,8 T32,18 T38,12 T45,20 T52,10 T58,18 T65,8 T72,18 T78,12 T85,20 T92,10 T98,18 L100,12 L100,0 Z' fill='%230f4c81'/%3E%3C/svg%3E") repeat-x top / 150px 100%`
        }}></div>

        <div style={{
          position: 'absolute', bottom: -1, left: 0, right: 0, height: '24px', zIndex: 2, pointerEvents: 'none',
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20' preserveAspectRatio='none'%3E%3Cpath d='M0,20 L0,0 Q2,8 5,2 T12,10 T18,2 T25,12 T32,2 T38,8 T45,0 T52,10 T58,2 T65,12 T72,2 T78,8 T85,0 T92,10 T98,2 L100,8 L100,20 Z' fill='%23e6f0fa'/%3E%3C/svg%3E") repeat-x bottom / 150px 100%`
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 800, color: '#a3e635', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
              Explore India
            </div>
            <h2 style={{ fontFamily: 'var(--font-marker)', fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: 400, color: '#fff', margin: 0, letterSpacing: '1px', textShadow: '0 2px 4px rgba(0,0,0,0.3)', textAlign: 'center', textTransform: 'uppercase' }}>
              DOMESTIC PACKAGES
            </h2>
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
                // will-change only on transform — not opacity (handled by GSAP after mount)
                willChange: 'transform',
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
      </section>

      {/* ═══════════════════════════════════════════════
          DEPARTURE CITIES
      ═══════════════════════════════════════════════ */}
      <section className="section" style={{
        backgroundColor: '#e6f0fa',
        backgroundImage: `url("${lightFlightMapSvg}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        padding: '5rem 0'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
              From Your Doorstep
            </div>
            <h2 style={{ fontFamily: 'var(--font-marker)', fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 400, color: '#1a1a1a', margin: '0 0 .25rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
              DEPARTURE CITIES
            </h2>
            <div style={{ fontFamily: 'var(--font-script)', fontSize: '1.75rem', color: '#65a30d', marginBottom: '1rem', transform: 'rotate(-2deg)' }}>
              all-inclusive packages!
            </div>
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
              <div key={i} className="city-depart-card" style={{ borderRadius: 12, border: '1px solid #e5e9f0', background: '#fff', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
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
                  <Link to={`/packages?from=${c.city.toLowerCase()}`} className="city-depart-btn" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '.55rem 1.1rem', borderRadius: 8, border: '1.5px solid #1e3a6e', background: '#fff', color: '#1e3a6e', fontSize: '.8125rem', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                    View Tours
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FEATURED PACKAGES
      ═══════════════════════════════════════════════ */}
      <section className="section" style={{
        backgroundColor: 'var(--primary)',
        backgroundImage: `url("${flightMapSvg}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        paddingTop: '5rem',
        paddingBottom: '5rem',
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <SectionHeading
              eyebrow="Featured Packages"
              title="Trending Holiday Packages"
              description="Our most-loved journeys, curated for unforgettable experiences."
              align="left"
              light={true}
              eyebrowStyle={{
                background: 'rgba(255,255,255,0.2)',
                color: '#fff',
                padding: '0.4rem 1rem',
                borderRadius: '999px',
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                display: 'inline-block',
                marginBottom: '0.5rem'
              }}
            />
            <Link to="/packages" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '.875rem', fontWeight: 600, color: '#fff', textDecoration: 'none', flexShrink: 0, padding: '0.5rem 1.25rem', background: 'rgba(255,255,255,0.15)', borderRadius: '999px', border: '1px solid rgba(255,255,255,0.3)' }}>View All Packages <ArrowRight size={16} /></Link>
          </div>
          <div className="grid-4" style={{ marginTop: '2.5rem' }}>
            {featured.map(pkg => <PackageCard key={pkg.slug} pkg={pkg} />)}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          ABOUT / INTRO (dark card with review cards)
      ═══════════════════════════════════════════════ */}
      <section ref={introSectionRef} className="section" style={{ background: '#81c0d6', padding: '4rem 0', position: 'relative' }}>
        {/*
          Glow orb: isolated compositing layer via contain:strict + will-change.
          Stays GPU-only, never triggers main-thread paint.
        */}
        <div
          ref={glowRef}
          className="ambient-blob"
          style={{
            position: 'absolute',
            width: 300, height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
            zIndex: 0,
            top: 0, left: 0,
          }}
        />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ borderRadius: 24, background: 'rgba(255, 255, 255, 0.7)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255, 255, 255, 0.5)', padding: '3rem 2.5rem', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>

            {/*
              Ambient blobs: static, no JS movement, filter:blur isolated via
              contain:strict so blur doesn't invalidate ancestor layers.
            */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
              <div className="ambient-blob" style={{
                position: 'absolute', top: '-20%', left: '-10%', width: '40%', paddingBottom: '40%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(99,130,255,0.12) 0%, transparent 70%)',
                // Use CSS filter but contain it — no dynamic updates
                filter: 'blur(40px)',
              }} />
              <div className="ambient-blob" style={{
                position: 'absolute', bottom: '-20%', right: '-10%', width: '45%', paddingBottom: '45%',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,107,53,0.09) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }} />
            </div>

            <div ref={headingRef} style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: '2.5rem' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 700, color: '#0d1b2e', margin: 0 }}>
                Trusted by our guests across the World
              </h2>
            </div>

            <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
              {introStats.map(({ icon: Icon, value, label }, idx) => (
                <div key={label} ref={el => (statsRefs.current[idx] = el)} style={{ textAlign: 'center' }}>
                  <div style={{ display: 'inline-flex', width: 56, height: 56, alignItems: 'center', justifyContent: 'center', borderRadius: '50%', border: '1px solid rgba(15,76,129,0.15)', marginBottom: '.8rem' }}>
                    <Icon size={24} style={{ color: '#0f4c81' }} strokeWidth={1.5} />
                  </div>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '2rem', fontWeight: 800, color: '#0d1b2e', margin: 0, lineHeight: 1 }}>{value}</p>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: '#666', marginTop: '.35rem', fontWeight: 600 }}>{label}</p>
                </div>
              ))}
            </div>

            <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {reviewCards.map((r, i) => (
                <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.03)', borderRadius: 16, padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
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
      </section>

      {/* ═══════════════════════════════════════════════
          WHAT'S INCLUDED
      ═══════════════════════════════════════════════ */}
      <section className="section" style={{
        backgroundColor: '#2596be',
        backgroundImage: `linear-gradient(rgba(37, 150, 190, 0.88), rgba(37, 150, 190, 0.92)), url(${baliImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: '6rem 0',
        position: 'relative'
      }}>
        {/* Background Elements: Blobs & Travel Icons */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 1, pointerEvents: 'none' }}>
          {/* Fluid Blobs */}
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', right: '-10%', top: '-20%', width: '600px', height: '600px', transform: 'rotate(45deg)', opacity: 0.12 }}>
            <path fill="#ffffff" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.3,-46.3C90.8,-33.5,96.8,-18,97.7,-2.1C98.6,13.8,94.5,30,85.1,43.2C75.7,56.4,61.1,66.6,45.8,74.5C30.5,82.4,14.5,88,-1.7,90.8C-17.9,93.6,-34.3,93.6,-48.5,86.2C-62.7,78.8,-74.7,64.1,-82.2,47.9C-89.7,31.7,-92.7,14,-90.4,-2.7C-88.1,-19.4,-80.5,-35.1,-70.2,-48.1C-59.9,-61.1,-46.9,-71.4,-32.8,-78.6C-18.7,-85.8,-3.5,-89.9,11.5,-88.4C26.5,-86.9,41.2,-79.8,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '-10%', bottom: '-10%', width: '500px', height: '500px', transform: 'rotate(-25deg)', opacity: 0.08 }}>
            <path fill="#ffffff" d="M39.9,-65.7C54.1,-60.5,69.5,-53.4,80,-41.2C90.5,-29,96.1,-11.7,93.8,4.5C91.5,20.7,81.3,35.8,69.3,47.8C57.3,59.8,43.5,68.7,28.4,74.3C13.3,79.9,-3.1,82.2,-19.6,79.7C-36.1,77.2,-52.7,69.9,-64.7,58.2C-76.7,46.5,-84.1,30.4,-86.8,13.6C-89.5,-3.2,-87.5,-20.7,-79.5,-34.5C-71.5,-48.3,-57.5,-58.4,-42.8,-63.4C-28.1,-68.4,-12.7,-68.3,1.3,-70C15.3,-71.7,30.6,-75.2,39.9,-65.7Z" transform="translate(100 100)" />
          </svg>

          {/* Floating Travel Icons */}
          <Plane size={140} strokeWidth={1} style={{ position: 'absolute', top: '15%', left: '8%', color: 'rgba(255,255,255,0.15)', transform: 'rotate(-15deg)' }} />
          <Compass size={220} strokeWidth={0.5} style={{ position: 'absolute', bottom: '10%', right: '5%', color: 'rgba(255,255,255,0.12)', transform: 'rotate(25deg)' }} />
          <MapPin size={90} strokeWidth={1} style={{ position: 'absolute', top: '12%', right: '20%', color: 'rgba(255,255,255,0.12)', transform: 'rotate(10deg)' }} />
          <Star size={70} strokeWidth={1.5} style={{ position: 'absolute', bottom: '25%', left: '12%', color: 'rgba(255,255,255,0.15)', transform: 'rotate(-10deg)' }} />
          <Heart size={50} strokeWidth={1.5} style={{ position: 'absolute', top: '45%', right: '8%', color: 'rgba(255,255,255,0.1)', transform: 'rotate(15deg)' }} />
        </div>
        {/* Wavy top divider (matches the ABOUT section above) */}
        <div style={{
          position: 'absolute', top: -1, left: 0, right: 0, height: '48px', zIndex: 2, pointerEvents: 'none',
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320' preserveAspectRatio='none'%3E%3Cpath fill='%2381c0d6' d='M0,160L48,170.7C96,181,192,203,288,208C384,213,480,203,576,170.7C672,139,768,85,864,80C960,75,1056,117,1152,144C1248,171,1344,181,1392,186.7L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'%3E%3C/path%3E%3C/svg%3E") repeat-x top / 100% 100%`
        }}></div>
        {/* Wavy bottom divider (matches Gallery below) */}
        <div style={{
          position: 'absolute', bottom: -1, left: 0, right: 0, height: '48px', zIndex: 2, pointerEvents: 'none',
          background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320' preserveAspectRatio='none'%3E%3Cpath fill='%23FAF9F6' d='M0,160L48,149.3C96,139,192,117,288,112C384,107,480,117,576,149.3C672,181,768,235,864,240C960,245,1056,203,1152,176C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E") repeat-x bottom / 100% 100%`
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 3 }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.85rem', fontWeight: 800, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
              No Hidden Costs
            </div>
            <h2 style={{ fontFamily: 'var(--font-marker)', fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: 400, color: '#ffffff', margin: '0 0 .25rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
              ALL-INCLUSIVE TOURS
            </h2>
            <div style={{ fontFamily: 'var(--font-script)', fontSize: '1.75rem', color: '#FFCE00', marginBottom: '1rem', transform: 'rotate(-2deg)' }}>
              everything you need!
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem 2rem' }} className="inclusions-grid">
            {[
              {
                title: 'Premium Handpicked Accommodation', desc: 'Comfortable & convenient hotels cherry picked by our expert hotel management team.',
                tag: 'sleep well!', Icon: HotelIcon, color: '#f97316'
              },
              {
                title: 'All-Inclusive Dining Experiences', desc: "Eat to your heart's content. Breakfast, lunch, and dinner are thoughtfully included.",
                tag: 'yummy!', Icon: Utensils, color: '#eab308'
              },
              {
                title: 'Expert Tour Managers On-Site', desc: 'We have an exclusive team of 350 tour managers specialising in India and World tours.',
                tag: 'local experts!', Icon: UserCheck, color: '#3b82f6'
              },
              {
                title: 'Seamless On-Tour Transportation', desc: 'Our itineraries include all rail, sea and road transport as part of the package.',
                tag: 'enjoy the ride!', Icon: Bus, color: '#22c55e'
              },
              {
                title: 'Best Value Assured Itineraries', desc: 'Our dedicated research team spends hours curating the best value packages for you.',
                tag: 'best price!', Icon: Award, color: '#a855f7'
              },
              {
                title: 'Convenient To & Fro Airfares', desc: 'Tours are inclusive of airfare from many hubs within India for a seamless start.',
                tag: 'fly high!', Icon: Plane, color: '#ec4899'
              },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
                <div className="inclusion-card" style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '2.5rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  position: 'relative',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                  width: '100%',
                  height: '100%',
                  marginBottom: '2rem'
                }}>
                  <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: '1.15rem', fontWeight: 800, color: '#111', margin: '0 0 1rem', lineHeight: 1.3, letterSpacing: '-0.01em' }}>{item.title}</h3>
                  <p style={{ fontSize: '.9rem', color: '#555', lineHeight: 1.6, margin: '0 0 1.5rem', fontFamily: 'var(--font-sans)' }}>{item.desc}</p>

                  <div style={{ fontFamily: 'var(--font-script)', fontSize: '1.5rem', color: '#65a30d', transform: 'rotate(-2deg)', marginTop: 'auto', paddingBottom: '1rem' }}>
                    {item.tag}
                  </div>

                  {/* Avatar Circle overflowing bottom */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-24px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: '#fff',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    border: '4px solid #2596be'
                  }}>
                    <item.Icon size={24} color={item.color} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
                <div key={i} className="gallery-thumb" style={{ position: 'relative', height: '280px', gridColumn: `span ${spans[i]}` }}>
                  <img src={img.src} alt={img.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
      </section>

      {/* ═══════════════════════════════════════════════
          TESTIMONIALS
      ═══════════════════════════════════════════════ */}
      <section className="section" style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #c5d8eb 0%, #e6f0fa 100%)' }}>

        {/* Wavy Top Edge to blend with Gallery */}
        <div style={{ position: 'absolute', top: '-1px', left: 0, width: '100%', overflow: 'hidden', lineHeight: 0, zIndex: 2 }}>
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '50px' }}>
            <path fill="#FAF9F6" d="M0,0 L1440,0 L1440,20 C1200,60 960,10 720,30 C480,50 240,0 0,20 Z"></path>
          </svg>
        </div>

        {/* Full-bleed decorative background elements */}
        <div className="ambient-blob" style={{ pointerEvents: 'none', position: 'absolute', left: '-5%', top: '-10%', width: '40vw', height: '40vw', borderRadius: 9999, background: 'rgba(255,107,53,0.1)', filter: 'blur(80px)', zIndex: 0 }} />
        <div className="ambient-blob" style={{ pointerEvents: 'none', position: 'absolute', right: '-5%', bottom: '-10%', width: '40vw', height: '40vw', borderRadius: 9999, background: 'rgba(15,76,129,0.08)', filter: 'blur(80px)', zIndex: 0 }} />

        <div style={{ position: 'absolute', top: '10%', left: '5%', color: 'var(--primary)', opacity: 0.04, pointerEvents: 'none', zIndex: 0 }}>
          <Quote size={200} />
        </div>
        <div style={{ position: 'absolute', bottom: '10%', right: '2%', color: 'var(--primary)', opacity: 0.04, pointerEvents: 'none', transform: 'rotate(180deg)', zIndex: 0 }}>
          <Quote size={240} />
        </div>

        {/* Small floating accents */}
        <div style={{ position: 'absolute', top: '20%', right: '15%', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--accent)', opacity: 0.5, pointerEvents: 'none', boxShadow: '0 0 10px rgba(255,107,53,0.4)' }} />
        <div style={{ position: 'absolute', bottom: '30%', left: '10%', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', opacity: 0.3, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '4%', width: '16px', height: '16px', borderRadius: '50%', border: '2px solid var(--accent)', opacity: 0.2, pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <SectionHeading eyebrow="Testimonials" title="What Our Travelers Say" description="Real stories from real travelers who trusted us with their dream trips." />
          <TestimonialCarousel />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          NEWSLETTER
      ═══════════════════════════════════════════════ */}
      {/* <section className="section">
        <div className="container">
          <div style={{ position: 'relative', borderRadius: 24, background: 'var(--primary)', padding: '3rem 2rem', textAlign: 'center', color: '#fff', overflow: 'hidden' }}> */}
      {/* Static ambient blobs — no JS movement, GPU isolated */}
      {/* <div className="ambient-blob" style={{ pointerEvents: 'none', position: 'absolute', right: '-4rem', top: '-4rem', width: 256, height: 256, borderRadius: 9999, background: 'rgba(255,107,53,.2)', filter: 'blur(48px)' }} />
            <div className="ambient-blob" style={{ pointerEvents: 'none', position: 'absolute', left: '-4rem', bottom: '-4rem', width: 256, height: 256, borderRadius: 9999, background: 'rgba(255,255,255,.1)', filter: 'blur(48px)' }} />
            <div style={{ position: 'relative', maxWidth: '36rem', marginInline: 'auto' }}>
              <h2 style={{ fontFamily: 'var(--font-marker)', fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '1px' }}>NEWSLETTER</h2>
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
      </section> */}

      <PromoPopup />
    </main>
  )
}