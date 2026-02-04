import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaHospital, FaPhone, FaEnvelope, FaMapMarkerAlt, FaAmbulance } from "react-icons/fa";

const Footer = () => {
  return (
    <footer style={{ 
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      color: 'var(--white)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.05,
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.5) 1px, transparent 1px), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.5) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
        pointerEvents: 'none'
      }}></div>

      <div className="container" style={{ padding: '4rem 1rem 2rem', position: 'relative', zIndex: 1 }}>
        <div className="grid-4" style={{ marginBottom: '3rem' }}>
          {/* About */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                <FaHospital />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700' }}>MediCare</h3>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.7', fontSize: '0.95rem' }}>
              Providing quality healthcare services with compassion and excellence since 1990. Your trusted partner in health and wellness.
            </p>
            {/* Social Links */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
              <a href="#" style={{
                width: '40px',
                height: '40px',
                background: 'rgba(59, 130, 246, 0.2)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#60a5fa',
                fontSize: '1.25rem',
                transition: 'all 0.3s ease'
              }} className="footer-social">
                <FaFacebook />
              </a>
              <a href="#" style={{
                width: '40px',
                height: '40px',
                background: 'rgba(59, 130, 246, 0.2)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#60a5fa',
                fontSize: '1.25rem',
                transition: 'all 0.3s ease'
              }} className="footer-social">
                <FaTwitter />
              </a>
              <a href="#" style={{
                width: '40px',
                height: '40px',
                background: 'rgba(236, 72, 153, 0.2)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ec4899',
                fontSize: '1.25rem',
                transition: 'all 0.3s ease'
              }} className="footer-social">
                <FaInstagram />
              </a>
              <a href="#" style={{
                width: '40px',
                height: '40px',
                background: 'rgba(59, 130, 246, 0.2)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#60a5fa',
                fontSize: '1.25rem',
                transition: 'all 0.3s ease'
              }} className="footer-social">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Quick Links</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ color: 'rgba(255, 255, 255, 0.7)', transition: 'color 0.3s ease', fontSize: '0.95rem' }} className="footer-link">→ Home</Link>
              <Link to="/about" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ color: 'rgba(255, 255, 255, 0.7)', transition: 'color 0.3s ease', fontSize: '0.95rem' }} className="footer-link">→ About Us</Link>
              <Link to="/doctors" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ color: 'rgba(255, 255, 255, 0.7)', transition: 'color 0.3s ease', fontSize: '0.95rem' }} className="footer-link">→ Our Doctors</Link>
              <Link to="/departments" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ color: 'rgba(255, 255, 255, 0.7)', transition: 'color 0.3s ease', fontSize: '0.95rem' }} className="footer-link">→ Departments</Link>
              <Link to="/contact" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ color: 'rgba(255, 255, 255, 0.7)', transition: 'color 0.3s ease', fontSize: '0.95rem' }} className="footer-link">→ Contact</Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Our Services</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}>
              <p>✓ 24/7 Emergency Care</p>
              <p>✓ Diagnostic Services</p>
              <p>✓ Surgical Procedures</p>
              <p>✓ Outpatient Care</p>
              <p>✓ Health Checkups</p>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Contact Info</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                <div style={{ 
                  color: '#60a5fa', 
                  fontSize: '1.125rem',
                  marginTop: '0.125rem',
                  minWidth: '20px'
                }}>
                  <FaMapMarkerAlt />
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  123 Medical Center Drive<br />New York, NY 10001
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ color: '#60a5fa', fontSize: '1.125rem', minWidth: '20px' }}>
                  <FaPhone />
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}>(555) 123-4567</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ color: '#60a5fa', fontSize: '1.125rem', minWidth: '20px' }}>
                  <FaEnvelope />
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.95rem' }}>info@medicare.com</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ color: '#ef4444', fontSize: '1.125rem', minWidth: '20px' }}>
                  <FaAmbulance />
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '0.95rem', fontWeight: '600' }}>Emergency: (555) 999-9999</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ 
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          paddingTop: '2rem',
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.875rem' }}>
            © {new Date().getFullYear()} MediCare Hospital. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem' }}>
            <a href="#" style={{ color: 'rgba(255, 255, 255, 0.6)', transition: 'color 0.3s ease' }} className="footer-link">Privacy Policy</a>
            <a href="#" style={{ color: 'rgba(255, 255, 255, 0.6)', transition: 'color 0.3s ease' }} className="footer-link">Terms of Service</a>
            <a href="#" style={{ color: 'rgba(255, 255, 255, 0.6)', transition: 'color 0.3s ease' }} className="footer-link">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
