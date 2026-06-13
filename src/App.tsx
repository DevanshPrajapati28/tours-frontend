import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import PackagesPage from './pages/PackagesPage'
import PackageDetailPage from './pages/PackageDetailPage'
import DestinationsPage from './pages/DestinationsPage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import GalleryPage from './pages/GalleryPage'
import BlogPage from './pages/BlogPage'
import ServicesPage from './pages/ServicesPage'
import NotFoundPage from './pages/NotFoundPage'

// Admin
import { AuthProvider, useAuth } from './admin/AuthContext'
import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import AdminDashboard from './admin/pages/AdminDashboard'
import AdminPackages from './admin/pages/AdminPackages'
import AdminDestinations from './admin/pages/AdminDestinations'
import AdminInquiries from './admin/pages/AdminInquiries'
import AdminSubscribers from './admin/pages/AdminSubscribers'

function ProtectedAdminRoute({ children }: { children: JSX.Element }) {
  const { auth } = useAuth()
  if (!auth) return <Navigate to="/admin" replace />
  return children
}

function AdminLoginRoute() {
  const { auth } = useAuth()
  if (auth) return <Navigate to="/admin/dashboard" replace />
  return <AdminLogin />
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ── Public Frontend ── */}
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/packages/:slug" element={<PackageDetailPage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/blog" element={<BlogPage />} />
            {/* Catch-all */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          {/* ── Admin Auth ── */}
          <Route path="/admin" element={<AdminLoginRoute />} />

          {/* ── Admin Protected ── */}
          <Route path="/admin" element={<ProtectedAdminRoute><AdminLayout /></ProtectedAdminRoute>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="packages" element={<AdminPackages />} />
            <Route path="destinations" element={<AdminDestinations />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="subscribers" element={<AdminSubscribers />} />
          </Route>


        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
