import React, { useState, useEffect } from 'react';
import { X, User, Phone, Users, Map, CheckCircle2, Mail } from 'lucide-react';
import logoImg from '../assets/new_logo.png';
import bgImg from '../assets/new1.jpg'; // Using Bali/Hero image for the left panel
import { API_URL } from '../config';

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // TEMPORARILY DISABLED SO YOU CAN TEST IT:
    // if (sessionStorage.getItem('promo_dismissed') === 'true') {
    //   return;
    // }

    // Show popup after 2 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('promo_dismissed', 'true');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      travelers: Number(formData.get('travelers')),
      subject: formData.get('tourType'),
      message: formData.get('visit_office') ? 'User wants to visit the office.' : 'New Popup Inquiry',
    };

    try {
      await fetch(`${API_URL}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    } catch (err) {
      console.error('Failed to submit inquiry:', err);
    }

    setSubmitted(true);
    setTimeout(() => {
      handleClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.65)',
      backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 99999,
      padding: '1rem',
      animation: 'fadeIn 0.4s ease-out'
    }}>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}</style>

      <div style={{
        background: '#fff',
        borderRadius: 24,
        overflow: 'hidden',
        width: '100%',
        maxWidth: 800,
        minHeight: 450,
        maxHeight: '90vh',
        display: 'flex',
        position: 'relative',
        boxShadow: '0 24px 50px rgba(0,0,0,0.4)',
        animation: 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>

        {/* Close Button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'rgba(0,0,0,0.05)',
            border: 'none',
            borderRadius: '50%',
            width: 36, height: 36,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
        >
          <X size={20} color="#333" />
        </button>

        {/* Left Panel (Image) */}
        <div style={{
          flex: '0 0 40%',
          position: 'relative',
          display: window.innerWidth < 768 ? 'none' : 'block' // hide on small mobile
        }}>
          <img
            src={bgImg}
            alt="Travel Destination"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,76,129,0.9), transparent)' }} />
          <div style={{ position: 'absolute', bottom: 20, left: 20, right: 20, color: '#fff' }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 800, lineHeight: 1.2 }}>
              Your Dream Trip Awaits
            </h3>
            <p style={{ marginTop: '0.4rem', fontSize: '0.85rem', opacity: 0.9 }}>
              Discover the world's most breathtaking destinations with us.
            </p>
          </div>
        </div>

        {/* Right Panel (Form) */}
        <div style={{
          flex: 1,
          padding: window.innerWidth < 768 ? '1.5rem' : '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          minWidth: 0, // Prevents flex child from blowing out parent width
          overflowY: 'auto'
        }}>

          <img src={logoImg} alt="Book My Dream" style={{ height: 45, objectFit: 'contain', marginBottom: '0.5rem' }} />

          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--fg)', marginBottom: '0.25rem' }}>
            Plan Your Perfect Trip
          </h2>
          <p style={{ color: 'var(--muted-fg)', fontSize: '0.85rem', maxWidth: '90%', marginBottom: '1rem' }}>
            Get a <strong style={{ color: 'var(--accent)' }}>FREE</strong> personalized itinerary with the best prices from our travel experts.
          </p>

          {submitted ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 0', color: 'var(--primary)' }}>
              <CheckCircle2 size={64} style={{ color: 'var(--accent)', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Thank you!</h3>
              <p style={{ color: 'var(--muted-fg)', marginTop: '0.5rem' }}>Our travel expert will contact you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ width: '100%', textAlign: 'left' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem', width: '100%' }}>

                {/* Full Name */}
                <div style={{ minWidth: 0 }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '0.4rem' }}>Full Name *</label>
                  <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden', background: '#f9fafb', width: '100%' }}>
                    <div style={{ padding: '0.6rem', background: '#f1f5f9', borderRight: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <User size={16} style={{ color: 'var(--primary)' }} />
                    </div>
                    <input required name="name" type="text" placeholder="Enter Your Name" style={{ flex: 1, minWidth: 0, width: '100%', boxSizing: 'border-box', border: 'none', padding: '0.6rem', background: 'transparent', outline: 'none', fontSize: '0.85rem' }} />
                  </div>
                </div>

                {/* Phone Number */}
                <div style={{ minWidth: 0 }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '0.4rem' }}>Phone Number *</label>
                  <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden', background: '#f9fafb', width: '100%' }}>
                    <div style={{ padding: '0.6rem', background: '#f1f5f9', borderRight: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Phone size={16} style={{ color: 'var(--primary)' }} />
                    </div>
                    <input required name="phone" type="tel" placeholder="Enter Phone Number" style={{ flex: 1, minWidth: 0, width: '100%', boxSizing: 'border-box', border: 'none', padding: '0.6rem', background: 'transparent', outline: 'none', fontSize: '0.85rem' }} />
                  </div>
                </div>

                {/* Email Address */}
                <div style={{ gridColumn: 'span 2', minWidth: 0 }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '0.4rem' }}>Email Address *</label>
                  <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden', background: '#f9fafb', width: '100%' }}>
                    <div style={{ padding: '0.6rem', background: '#f1f5f9', borderRight: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Mail size={16} style={{ color: 'var(--primary)' }} />
                    </div>
                    <input required name="email" type="email" placeholder="Enter Your Email" style={{ flex: 1, minWidth: 0, width: '100%', boxSizing: 'border-box', border: 'none', padding: '0.6rem', background: 'transparent', outline: 'none', fontSize: '0.85rem' }} />
                  </div>
                </div>

                {/* Number of Travellers */}
                <div style={{ minWidth: 0 }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '0.4rem' }}>Number of Travellers *</label>
                  <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden', background: '#f9fafb', width: '100%' }}>
                    <div style={{ padding: '0.6rem', background: '#f1f5f9', borderRight: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Users size={16} style={{ color: 'var(--primary)' }} />
                    </div>
                    <input required name="travelers" type="number" min="1" placeholder="Number of travellers" style={{ flex: 1, minWidth: 0, width: '100%', boxSizing: 'border-box', border: 'none', padding: '0.6rem', background: 'transparent', outline: 'none', fontSize: '0.85rem' }} />
                  </div>
                </div>

                {/* Tour Type */}
                <div style={{ minWidth: 0 }}>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--fg)', marginBottom: '0.4rem' }}>Tour Type *</label>
                  <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden', background: '#f9fafb', width: '100%' }}>
                    <div style={{ padding: '0.6rem', background: '#f1f5f9', borderRight: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Map size={16} style={{ color: 'var(--primary)' }} />
                    </div>
                    <select required name="tourType" style={{ flex: 1, minWidth: 0, width: '100%', boxSizing: 'border-box', border: 'none', padding: '0.6rem', background: 'transparent', outline: 'none', fontSize: '0.85rem', color: 'var(--fg)', appearance: 'none', cursor: 'pointer' }}>
                      <option value="">Select tour type</option>
                      <option value="domestic">Domestic Tour</option>
                      <option value="international">International Tour</option>
                      <option value="honeymoon">Honeymoon</option>
                      <option value="group">Group Tour</option>
                    </select>
                  </div>
                </div>

              </div>

              {/* Office Visit Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', background: '#f8fafc', padding: '0.75rem 1rem', borderRadius: 12 }}>
                <input type="checkbox" name="visit_office" id="visit_office" style={{ width: 18, height: 18, accentColor: 'var(--accent)', cursor: 'pointer' }} />
                <div>
                  <label htmlFor="visit_office" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--fg)', cursor: 'pointer' }}>I would like to visit your office</label>
                  <p style={{ fontSize: '0.75rem', color: 'var(--muted-fg)', margin: 0 }}>Schedule a free consultation at our nearest branch</p>
                </div>
              </div>

              <button type="submit" style={{
                width: '100%',
                padding: '0.85rem',
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                borderRadius: 12,
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(255, 107, 53, 0.3)',
                transition: 'transform 0.2s, boxShadow 0.2s'
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Contact Our Travel Expert
              </button>
            </form>
          )}

          {/* Footer Text */}
          <div style={{ marginTop: '1rem', fontSize: '0.7rem', color: 'var(--muted-fg)', display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
            <span>🔒 100% Secure</span>
            <span>• Data Privacy Guaranteed</span>
            <span>• Travel with Confidence</span>
          </div>
          <p style={{ marginTop: '0.75rem', fontSize: '0.7rem', color: '#9ca3af' }}>
            By submitting, you agree to our Privacy Policy and Terms of Service
          </p>

        </div>
      </div>
    </div>
  );
}
