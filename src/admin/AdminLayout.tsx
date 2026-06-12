import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Package, MapPin, MessageSquare, Mail,
  LogOut, Plane, Menu, X, ChevronRight,
} from 'lucide-react'
import { useAuth } from './AuthContext'

const navItems = [
  { to: '/admin/dashboard',    icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/admin/packages',     icon: Package,         label: 'Packages' },
  { to: '/admin/destinations', icon: MapPin,           label: 'Destinations' },
  { to: '/admin/inquiries',    icon: MessageSquare,    label: 'Inquiries' },
  { to: '/admin/subscribers',  icon: Mail,             label: 'Subscribers' },
]

export default function AdminLayout() {
  const { auth, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const handleLogout = () => { logout(); navigate('/admin') }

  const sidebarW = sidebarOpen ? 240 : 72

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f4f8', fontFamily: 'var(--font-sans)' }}>
      {/* ── Sidebar ── */}
      <aside style={{
        width: sidebarW, flexShrink: 0, transition: 'width .25s ease',
        background: '#0f4c81', color: '#fff', display: 'flex', flexDirection: 'column',
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 40,
        boxShadow: '4px 0 20px rgba(0,0,0,.15)',
      }}>
        {/* Logo */}
        <div style={{ padding: '1.25rem 1rem', borderBottom: '1px solid rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', gap: '.75rem', overflow: 'hidden' }}>
          <span style={{ display: 'flex', width: 40, height: 40, flexShrink: 0, alignItems: 'center', justifyContent: 'center', borderRadius: 10, background: 'var(--accent)' }}>
            <Plane size={20} />
          </span>
          {sidebarOpen && (
            <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 700, lineHeight: 1 }}>Book My Dream</p>
              <p style={{ fontSize: '.65rem', fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--accent)', marginTop: 2 }}>Admin</p>
            </div>
          )}
        </div>

        {/* Toggle */}
        <button onClick={() => setSidebarOpen(v => !v)} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 28, height: 28, borderRadius: 8, background: 'rgba(255,255,255,.15)',
          border: 'none', color: '#fff', cursor: 'pointer',
          position: 'absolute', top: '1.4rem', right: -14, zIndex: 10,
        }}>
          {sidebarOpen ? <X size={14} /> : <ChevronRight size={14} />}
        </button>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: '1rem .75rem', display: 'flex', flexDirection: 'column', gap: .25 }}>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '.875rem',
              padding: '.75rem .875rem', borderRadius: 10, textDecoration: 'none',
              color: isActive ? '#fff' : 'rgba(255,255,255,.65)',
              background: isActive ? 'rgba(255,255,255,.15)' : 'transparent',
              fontWeight: isActive ? 600 : 400, fontSize: '.9rem',
              transition: 'all .15s', whiteSpace: 'nowrap', overflow: 'hidden',
              marginBottom: 2,
            })}>
              <Icon size={20} style={{ flexShrink: 0 }} />
              {sidebarOpen && label}
            </NavLink>
          ))}
        </nav>

        {/* User + Logout */}
        <div style={{ padding: '1rem .75rem', borderTop: '1px solid rgba(255,255,255,.1)' }}>
          {sidebarOpen && (
            <div style={{ padding: '.75rem', borderRadius: 10, background: 'rgba(255,255,255,.08)', marginBottom: '.75rem' }}>
              <p style={{ fontSize: '.8125rem', fontWeight: 600, color: '#fff' }}>{auth?.username}</p>
              <p style={{ fontSize: '.75rem', color: 'rgba(255,255,255,.5)' }}>Administrator</p>
            </div>
          )}
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: '.875rem',
            width: '100%', padding: '.75rem .875rem', borderRadius: 10,
            background: 'rgba(239,68,68,.15)', color: '#fca5a5',
            border: '1px solid rgba(239,68,68,.25)', cursor: 'pointer',
            fontSize: '.9rem', fontWeight: 500, transition: 'all .15s',
            fontFamily: 'var(--font-sans)', whiteSpace: 'nowrap', overflow: 'hidden',
          }}>
            <LogOut size={18} style={{ flexShrink: 0 }} />
            {sidebarOpen && 'Logout'}
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main style={{ flex: 1, marginLeft: sidebarW, transition: 'margin-left .25s ease', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <header style={{
          padding: '1rem 1.5rem', background: '#fff',
          borderBottom: '1px solid #e2e8f0', display: 'flex',
          alignItems: 'center', justifyContent: 'space-between',
          boxShadow: '0 1px 4px rgba(0,0,0,.06)', position: 'sticky', top: 0, zIndex: 30,
        }}>
          <button onClick={() => setSidebarOpen(v => !v)} style={{
            width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer',
          }}>
            <Menu size={18} style={{ color: '#64748b' }} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
            <span style={{ fontSize: '.875rem', color: '#64748b' }}>Welcome back,</span>
            <span style={{ fontSize: '.875rem', fontWeight: 600, color: '#0f4c81' }}>{auth?.username}</span>
            <div style={{ width: 36, height: 36, borderRadius: 9999, background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '.875rem' }}>
              {auth?.username?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page content */}
        <div style={{ flex: 1, padding: '1.5rem' }}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}
