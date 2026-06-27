import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../config'

type BlogPost = {
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
  author: string
}

const folderColors = [
  '#ffffff', // White
  '#f8fafc', // Slate 50
  '#f0fdf4', // Green 50
  '#eff6ff', // Blue 50
  '#fffbeb', // Amber 50
  '#f5f3ff', // Violet 50
]

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    fetch(`${API_URL}/api/blogs`)
      .then(r => r.json())
      .then(setBlogPosts)
  }, [])

  return (
    <main style={{ background: '#f8fafc', minHeight: '100vh', color: 'var(--fg)', overflowX: 'hidden' }}>
      
      {/* Cinematic Hero Section (Dark overlay applied here to keep the cinematic look) */}
      <section className="cinematic-hero" style={{
        position: 'relative',
        height: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#0B1528'
      }}>
        {/* Parallax Background */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/images/tips3.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed', // Parallax effect
          filter: 'brightness(0.6) contrast(1.1)'
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,21,40,1) 0%, transparent 60%)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: '4rem' }}>
          <span style={{ 
            display: 'inline-block', 
            color: 'var(--accent)', 
            fontWeight: 800, 
            letterSpacing: '3px', 
            textTransform: 'uppercase', 
            marginBottom: '1rem',
            animation: 'fadeInUp 1s ease forwards'
          }}>
            Explore The World
          </span>
          <h1 style={{ 
            fontFamily: 'var(--font-marker)', 
            fontSize: 'clamp(3rem, 8vw, 6rem)', 
            lineHeight: 1.1,
            color: '#fff',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textShadow: '0 10px 30px rgba(0,0,0,0.8)',
            margin: '0 auto',
            opacity: 0,
            animation: 'fadeInUp 1s ease 0.2s forwards'
          }}>
            Travel Stories & Inspiration
          </h1>
        </div>
      </section>

      {/* Interactive Folders Section */}
      <section style={{ position: 'relative', paddingTop: '2rem', paddingBottom: '15vh' }}>
        
        {/* Animated Light Background */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
          <div className="light-blob blob-1" />
          <div className="light-blob blob-2" />
          <div className="light-blob blob-3" />
        </div>

        <div className="container folders-container" style={{ position: 'relative', zIndex: 1 }}>
          {blogPosts.map((post, index) => {
            const color = folderColors[index % folderColors.length]
            // Cycle the tabs so they stagger nicely across the top
            const tabPosition = index % 4 
            
            return (
              <article 
                key={post.slug}
                className="folder-card"
                style={{ 
                  '--index': index,
                  '--tab-pos': tabPosition,
                  backgroundColor: color 
                } as any}
              >
                {/* The Folder Tab */}
                <div className="folder-tab">
                  {post.category}
                </div>

                {/* The Folder Content */}
                <div className="folder-inner">
                  <div className="folder-img-wrapper">
                    <img src={post.image} alt={post.title} />
                  </div>
                  <div className="folder-text">
                    <div className="folder-meta">
                      {post.date} &nbsp;·&nbsp; {post.readTime} &nbsp;·&nbsp; {post.author}
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <Link to={`/blog/${post.slug}`} className="folder-btn">
                      Open Story <span>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <style>{`
        /* Cinematic Animations */
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* --- Animated Light Background --- */
        .light-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.7;
          animation: floatBlob 15s infinite alternate ease-in-out;
        }
        .blob-1 { top: 0; left: 10%; width: 400px; height: 400px; background: rgba(255, 107, 53, 0.15); animation-delay: 0s; }
        .blob-2 { top: 40%; right: 5%; width: 500px; height: 500px; background: rgba(59, 130, 246, 0.12); animation-delay: -5s; }
        .blob-3 { bottom: 0; left: 30%; width: 600px; height: 600px; background: rgba(16, 185, 129, 0.12); animation-delay: -10s; }

        @keyframes floatBlob {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(100px, 50px) scale(1.1); }
          100% { transform: translate(-50px, 100px) scale(0.9); }
        }

        /* --- Interactive Folder Styles --- */
        .folders-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 4rem 2rem;
          padding-top: 50px; /* Make room for the first tab */
          max-width: 1200px;
          margin: -10rem auto 0; /* Negative top margin pulls cards over the hero */
          position: relative;
          z-index: 10;
        }

        .folder-card {
          position: relative;
          border-radius: 0 20px 20px 20px; 
          box-shadow: 0 10px 30px rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.04);
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          color: var(--fg);
        }
        
        .folder-card:hover {
          transform: translateY(-8px);
        }

        /* The File Tab */
        .folder-tab {
          position: absolute;
          top: -35px;
          left: 0;
          height: 35px;
          min-width: 120px;
          padding: 0 16px;
          background-color: inherit;
          border-radius: 12px 12px 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 0.7rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          border-top: 1px solid rgba(0,0,0,0.04);
          border-left: 1px solid rgba(0,0,0,0.04);
          border-right: 1px solid rgba(0,0,0,0.04);
          box-shadow: 0 -6px 15px rgba(0,0,0,0.03);
          transition: background-color 0.3s;
          color: var(--primary);
        }

        /* Folder Layout */
        .folder-inner {
          display: flex;
          flex-direction: column;
          padding: 1.5rem;
          gap: 1.5rem;
        }

        .folder-img-wrapper {
          width: 100%;
          aspect-ratio: 16/9;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 6px 15px rgba(0,0,0,0.06);
        }

        .folder-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s ease;
        }
        .folder-card:hover .folder-img-wrapper img {
          transform: scale(1.05);
        }

        .folder-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .folder-meta {
          font-size: 0.75rem;
          color: var(--accent);
          font-weight: 800;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
        }

        .folder-text h2 {
          font-family: var(--font-serif);
          font-size: 1.5rem;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 0.5rem;
          color: var(--primary);
        }

        .folder-text p {
          font-size: 0.9rem;
          color: var(--muted-fg);
          line-height: 1.6;
          margin-bottom: 1.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .folder-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--accent);
          color: #fff;
          padding: 0.6rem 1.25rem;
          border-radius: 9999px;
          font-size: 0.8rem;
          font-weight: 700;
          text-decoration: none;
          text-transform: uppercase;
          letter-spacing: 1px;
          align-self: flex-start;
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(255,107,53,0.3);
        }
        .folder-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(255,107,53,0.4);
        }
        .folder-btn span {
          transition: transform 0.3s ease;
        }
        .folder-btn:hover span {
          transform: translateX(4px);
        }

        /* Mobile Tab adjustment */
        @media (max-width: 767px) {
          .folder-tab {
            font-size: 0.6rem;
            padding: 0 10px;
          }
        }
      `}</style>
    </main>
  )
}
