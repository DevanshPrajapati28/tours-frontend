import { Link } from 'react-router-dom'
import { blogPosts } from '../data'
import PageHero from '../components/PageHero'

export default function BlogPage() {
  return (
    <main>
      <PageHero crumb="Blog" title="Tips, Guides & Travel Inspiration" subtitle="Expert advice, destination guides, and travel stories to fuel your wanderlust." image="/images/tips6.jpg" />

      <div className="container" style={{ paddingBlock: '3rem' }}>
        <div className="grid-3">
          {blogPosts.map(post => (
            <article key={post.slug} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', overflow: 'hidden' }} className="aspect-16-9">
                <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s' }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                />
                <span style={{
                  position: 'absolute', top: 12, left: 12, padding: '.25rem .625rem', borderRadius: 9999,
                  background: 'var(--accent)', color: '#fff', fontSize: '.75rem', fontWeight: 600,
                }}>{post.category}</span>
              </div>
              <div style={{ display: 'flex', flex: 1, flexDirection: 'column', padding: '1.25rem' }}>
                <p style={{ fontSize: '.75rem', color: 'var(--muted-fg)' }}>{post.date} · {post.readTime} · {post.author}</p>
                <h2 style={{ marginTop: '.5rem', fontFamily: 'var(--font-serif)', fontSize: '1.0625rem', fontWeight: 600, lineHeight: 1.4 }}>{post.title}</h2>
                <p style={{ marginTop: '.5rem', fontSize: '.875rem', color: 'var(--muted-fg)', lineHeight: 1.65, flex: 1 }}>{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} style={{ marginTop: '1rem', fontSize: '.875rem', fontWeight: 600, color: 'var(--primary)', textDecoration: 'none' }}>Read More →</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
