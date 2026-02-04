import { Link } from "react-router-dom";
import { FaUserMd, FaHospital, FaCalendarCheck, FaAmbulance, FaHeartbeat, FaStethoscope } from "react-icons/fa";

const Home = () => {
  return (
    <div>
      {/* Hero Section - Full Height */}
      <section className="hero">
        <div className="container" style={{ height: '100%' }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            alignItems: 'center',
            minHeight: 'calc(100vh - 70px)',
            maxWidth: '900px',
            margin: '0 auto',
            textAlign: 'center',
            padding: '3rem 1rem'
          }}>
            <div style={{ marginBottom: '1rem', display: 'inline-block' }}>
              <span style={{
                background: 'rgba(255, 255, 255, 0.2)',
                padding: '0.5rem 1.25rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.875rem',
                fontWeight: '500',
                letterSpacing: '0.5px'
              }}>
                🏥 Your Health, Our Priority
              </span>
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: '800',
              lineHeight: '1.1',
              marginBottom: '1.5rem',
              color: 'var(--white)'
            }}>
              Welcome to <br />
              <span style={{ 
                background: 'linear-gradient(to right, #60a5fa, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                MediCare Hospital
              </span>
            </h1>
            
            <p style={{ 
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              marginBottom: '2.5rem',
              color: 'rgba(255, 255, 255, 0.95)',
              lineHeight: '1.6',
              maxWidth: '600px'
            }}>
              Providing Quality Healthcare Services with Compassion and Excellence. 
              Your trusted partner in health and wellness.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/doctors" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'instant' }); window.location.href = '/doctors'; }} className="btn btn-primary" style={{
                background: 'var(--white)',
                color: 'var(--primary)',
                fontSize: '1.125rem',
                padding: '1rem 2rem',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)'
              }}>
                <FaUserMd /> View Our Doctors
              </Link>
              <Link to="/register" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'instant' }); window.location.href = '/register'; }} className="btn btn-outline" style={{
                borderColor: 'var(--white)',
                color: 'var(--white)',
                fontSize: '1.125rem',
                padding: '1rem 2rem',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }}>
                <FaCalendarCheck /> Book Appointment
              </Link>
            </div>

            {/* Stats */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '2rem',
              marginTop: '3rem',
              maxWidth: '600px',
              width: '100%',
              justifyItems: 'center'
            }}>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>50+</div>
                <div style={{ fontSize: '0.875rem', opacity: '0.9' }}>Expert Doctors</div>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>10K+</div>
                <div style={{ fontSize: '0.875rem', opacity: '0.9' }}>Happy Patients</div>
              </div>
              <div>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '0.25rem' }}>24/7</div>
                <div style={{ fontSize: '0.875rem', opacity: '0.9' }}>Emergency Care</div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.5) 1px, transparent 1px), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.5) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          pointerEvents: 'none'
        }}></div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '5rem 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
              Why Choose Us
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--gray)', maxWidth: '600px', margin: '0 auto' }}>
              We provide comprehensive healthcare services with state-of-the-art facilities
            </p>
          </div>
          
          <div className="grid-4">
            <div className="card" style={{ textAlign: 'center', border: '2px solid var(--gray-light)' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                margin: '0 auto 1.5rem',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '2.5rem'
              }}>
                <FaUserMd />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                Expert Doctors
              </h3>
              <p style={{ color: 'var(--gray)', lineHeight: '1.7' }}>
                Highly qualified and experienced medical professionals dedicated to your health
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center', border: '2px solid var(--gray-light)' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                margin: '0 auto 1.5rem',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '2.5rem'
              }}>
                <FaHospital />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                Modern Facilities
              </h3>
              <p style={{ color: 'var(--gray)', lineHeight: '1.7' }}>
                State-of-the-art medical equipment and advanced treatment technologies
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center', border: '2px solid var(--gray-light)' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                margin: '0 auto 1.5rem',
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '2.5rem'
              }}>
                <FaCalendarCheck />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                Easy Appointments
              </h3>
              <p style={{ color: 'var(--gray)', lineHeight: '1.7' }}>
                Quick and hassle-free online booking system for your convenience
              </p>
            </div>

            <div className="card" style={{ textAlign: 'center', border: '2px solid var(--gray-light)' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                margin: '0 auto 1.5rem',
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '2.5rem'
              }}>
                <FaAmbulance />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                24/7 Emergency
              </h3>
              <p style={{ color: 'var(--gray)', lineHeight: '1.7' }}>
                Round-the-clock emergency medical services always ready to help
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section style={{ 
        padding: '5rem 0', 
        background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'
      }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                Your Health Journey Starts Here
              </h2>
              <p style={{ fontSize: '1.125rem', color: 'var(--gray)', lineHeight: '1.8', marginBottom: '2rem' }}>
                We believe in providing personalized care tailored to your unique health needs. 
                Our team of dedicated professionals is committed to helping you achieve optimal health and wellness.
              </p>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {['Comprehensive Health Checkups', 'Advanced Diagnostic Services', 'Specialized Treatment Plans', 'Preventive Care Programs'].map((item, index) => (
                  <li key={index} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem',
                    marginBottom: '1rem',
                    fontSize: '1.125rem'
                  }}>
                    <span style={{ 
                      width: '24px', 
                      height: '24px', 
                      background: 'var(--primary)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: '700',
                      fontSize: '0.875rem'
                    }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid-2" style={{ gap: '1.5rem' }}>
              <div className="stat-card">
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaHeartbeat /></div>
                <div className="stat-value">98%</div>
                <div className="stat-label">Success Rate</div>
              </div>
              <div className="stat-card green">
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaStethoscope /></div>
                <div className="stat-value">15+</div>
                <div className="stat-label">Departments</div>
              </div>
              <div className="stat-card purple">
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaUserMd /></div>
                <div className="stat-value">50+</div>
                <div className="stat-label">Specialists</div>
              </div>
              <div className="stat-card orange">
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaAmbulance /></div>
                <div className="stat-value">24/7</div>
                <div className="stat-label">Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Departments Section */}
      <section style={{ padding: '5rem 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
              Our Departments
            </h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--gray)', maxWidth: '600px', margin: '0 auto' }}>
              Comprehensive medical services across various specialties
            </p>
          </div>
          
          <div className="grid-3">
            {[
              { name: 'Cardiology', desc: 'Expert heart care and treatment', color: '#3b82f6' },
              { name: 'Neurology', desc: 'Brain and nervous system specialists', color: '#10b981' },
              { name: 'Orthopedics', desc: 'Bone and joint care experts', color: '#8b5cf6' },
              { name: 'Pediatrics', desc: 'Specialized child healthcare', color: '#ec4899' },
              { name: 'General Surgery', desc: 'Comprehensive surgical procedures', color: '#f59e0b' },
              { name: 'Emergency Medicine', desc: '24/7 critical care services', color: '#ef4444' }
            ].map((dept, index) => (
              <div key={index} className="card" style={{ 
                borderLeft: `4px solid ${dept.color}`,
                transition: 'all 0.3s ease'
              }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: dept.color }}>
                  {dept.name}
                </h3>
                <p style={{ color: 'var(--gray)' }}>{dept.desc}</p>
              </div>
            ))}
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/departments" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'instant' }); window.location.href = '/departments'; }} className="btn btn-primary">
              View All Departments →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '5rem 0',
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>
            Ready to Get Started?
          </h2>
          <p style={{ fontSize: '1.25rem', marginBottom: '2.5rem', opacity: '0.95', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
            Book your appointment today and experience quality healthcare
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'instant' }); window.location.href = '/register'; }} className="btn" style={{
              background: 'var(--white)',
              color: 'var(--primary)',
              padding: '1rem 2.5rem',
              fontSize: '1.125rem',
              fontWeight: '600'
            }}>
              Register Now
            </Link>
            <Link to="/login" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'instant' }); window.location.href = '/login'; }} className="btn" style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'var(--white)',
              border: '2px solid var(--white)',
              padding: '1rem 2.5rem',
              fontSize: '1.125rem',
              fontWeight: '600',
              backdropFilter: 'blur(10px)'
            }}>
              Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
