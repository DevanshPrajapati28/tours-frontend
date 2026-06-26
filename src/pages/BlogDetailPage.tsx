import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
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

export default function BlogDetailPage() {
  const { slug } = useParams()
  const [blog, setBlog] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch(`${API_URL}/api/blogs/${slug}`)
      .then(r => {
        if (!r.ok) throw new Error('Blog not found')
        return r.json()
      })
      .then(data => {
        setBlog(data)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontSize: '1.2rem', color: 'var(--muted-fg)' }}>Loading blog post...</p>
      </main>
    )
  }

  if (error || !blog) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)' }}>Post Not Found</h2>
        <p style={{ color: 'var(--muted-fg)', marginBottom: '2rem' }}>We couldn't find the blog post you're looking for.</p>
        <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
      </main>
    )
  }

  return (
    <main style={{ background: '#f9fafb' }}>
      <PageHero 
        crumb={blog.title} 
        title={blog.title} 
        subtitle={`${blog.date} · ${blog.readTime} · By ${blog.author}`} 
        image={blog.image} 
      />

      <style>{`
        .blog-article-content {
          background: white;
          border-radius: 24px;
          padding: 4rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.04);
          margin-top: -60px;
          position: relative;
          z-index: 10;
        }

        .blog-category-badge {
          display: inline-block;
          padding: 0.5rem 1.25rem;
          border-radius: 9999px;
          background: rgba(255, 107, 53, 0.1);
          color: var(--accent);
          font-size: 0.875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 2rem;
        }

        .blog-excerpt {
          font-size: 1.5rem;
          color: var(--primary);
          line-height: 1.6;
          font-weight: 500;
          font-family: var(--font-serif);
          margin-bottom: 3rem;
          border-left: 4px solid var(--accent);
          padding-left: 1.5rem;
        }

        .blog-body-text {
          font-size: 1.125rem;
          color: #4b5563;
          line-height: 1.8;
        }

        .blog-body-text p {
          margin-bottom: 1.5rem;
        }

        .blog-body-text h3 {
          font-size: 1.75rem;
          color: var(--primary);
          margin: 3rem 0 1.5rem;
          font-family: var(--font-serif);
          font-weight: 700;
        }

        .blog-quote {
          margin: 3rem 0;
          padding: 2.5rem;
          background: #f8fafc;
          border-radius: 16px;
          font-style: italic;
          font-size: 1.25rem;
          color: var(--primary);
          text-align: center;
          position: relative;
        }

        .blog-quote::before {
          content: '"';
          position: absolute;
          top: 10px;
          left: 20px;
          font-size: 4rem;
          color: rgba(255,107,53,0.2);
          font-family: serif;
        }

        .blog-image {
          width: 100%;
          border-radius: 16px;
          margin: 3rem 0;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .blog-footer {
          margin-top: 4rem;
          padding-top: 3rem;
          border-top: 1px solid #e5e7eb;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .blog-author-card {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .blog-author-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
        }

        @media (max-width: 768px) {
          .blog-article-content {
            padding: 2rem;
            margin-top: -30px;
          }
          .blog-excerpt { font-size: 1.25rem; }
          .blog-footer { flex-direction: column; gap: 2rem; align-items: flex-start; }
        }
      `}</style>

      <div className="container" style={{ paddingBottom: '5rem', maxWidth: '900px', margin: '0 auto' }}>
        <article className="blog-article-content">
          <span className="blog-category-badge">{blog.category}</span>
          
          <div className="blog-excerpt">
            {blog.excerpt}
          </div>

          <div className="blog-body-text">
            <p>
              <span style={{ float: 'left', fontSize: '3.5rem', lineHeight: '0.8', paddingRight: '0.5rem', fontFamily: 'var(--font-serif)', color: 'var(--accent)', fontWeight: 700 }}>T</span>
              raveling is more than just visiting new places; it's about immersing yourself in the culture, tasting the local cuisine, and creating memories that will last a lifetime. In this guide, we dive deep into everything you need to know to make your next trip absolutely perfect.
            </p>
            
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>

            <h3>Why This Matters</h3>
            
            <p>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>

            <div className="blog-quote">
              "Travel makes one modest. You see what a tiny place you occupy in the world." 
              <span style={{ display: 'block', fontSize: '1rem', marginTop: '1rem', color: '#64748b', fontStyle: 'normal' }}>— Gustave Flaubert</span>
            </div>

            <img src={blog.image} alt={blog.title} className="blog-image" />
            
            <h3>Top Recommendations</h3>

            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
            </p>
          </div>

          <div className="blog-footer">
            <div className="blog-author-card">
              <div className="blog-author-avatar">
                {blog.author.charAt(0)}
              </div>
              <div>
                <p style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--primary)', margin: 0 }}>{blog.author}</p>
                <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0.25rem 0 0 0' }}>Travel Expert & Contributor</p>
              </div>
            </div>

            <Link to="/blog" className="btn" style={{ border: '2px solid var(--primary)', background: 'transparent', color: 'var(--primary)' }}>
              ← Back to All Articles
            </Link>
          </div>
        </article>
      </div>
    </main>
  )
}
