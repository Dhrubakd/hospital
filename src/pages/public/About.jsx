import { FaHospital, FaHeart, FaUsers, FaAward, FaShieldAlt, FaLightbulb, FaHandHoldingHeart, FaUserTie } from "react-icons/fa";

const About = () => {
  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        color: 'var(--white)',
        padding: '6rem 1.5rem 4rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
              fontWeight: '800', 
              marginBottom: '1.5rem',
              marginTop: '0',
              lineHeight: '1.2'
            }}>
              About MediCare Hospital
            </h1>
            <p style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', opacity: '0.95', lineHeight: '1.6' }}>
              Committed to Excellence in Healthcare Since 1990
            </p>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '5rem 1rem' }}>

        {/* Mission & Vision */}
        <div className="grid-2" style={{ gap: '2rem', marginBottom: '5rem' }}>
          <div className="card" style={{ 
            borderLeft: '4px solid var(--primary)',
            background: 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)'
          }}>
            <div style={{ 
              width: '60px', 
              height: '60px',
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.75rem',
              marginBottom: '1.5rem'
            }}>
              🎯
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '1rem' }}>Our Mission</h2>
            <p style={{ color: 'var(--gray)', lineHeight: '1.8', fontSize: '1.05rem' }}>
              To provide compassionate, high-quality healthcare services to our community. We strive to deliver 
              patient-centered care using the latest medical technology and evidence-based practices, ensuring 
              the best possible outcomes for every patient we serve.
            </p>
          </div>
          <div className="card" style={{ 
            borderLeft: '4px solid var(--secondary)',
            background: 'linear-gradient(135deg, #ecfdf5 0%, #ffffff 100%)'
          }}>
            <div style={{ 
              width: '60px', 
              height: '60px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.75rem',
              marginBottom: '1.5rem'
            }}>
              👁️
            </div>
            <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--secondary)', marginBottom: '1rem' }}>Our Vision</h2>
            <p style={{ color: 'var(--gray)', lineHeight: '1.8', fontSize: '1.05rem' }}>
              To be the leading healthcare provider in the region, recognized for clinical excellence, 
              innovative treatments, and exceptional patient experience. We aim to set the standard for 
              healthcare quality and accessibility.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid-4" style={{ gap: '1.5rem', marginBottom: '5rem' }}>
          <div className="stat-card">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
              <FaHospital />
            </div>
            <div className="stat-value">30+</div>
            <div className="stat-label">Years of Service</div>
          </div>
          <div className="stat-card green">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
              <FaUsers />
            </div>
            <div className="stat-value">50+</div>
            <div className="stat-label">Expert Doctors</div>
          </div>
          <div className="stat-card purple">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
              <FaHeart />
            </div>
            <div className="stat-value">50K+</div>
            <div className="stat-label">Happy Patients</div>
          </div>
          <div className="stat-card orange">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
              <FaAward />
            </div>
            <div className="stat-value">25+</div>
            <div className="stat-label">Awards Won</div>
          </div>
        </div>

        {/* Core Values */}
        <div className="card" style={{ marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', textAlign: 'center', marginBottom: '3rem', color: 'var(--dark)' }}>Our Core Values</h2>
          <div className="grid-3" style={{ gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'white',
                fontSize: '2.5rem',
                boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
              }}>
                <FaHandHoldingHeart />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem' }}>Compassion</h3>
              <p style={{ color: 'var(--gray)', lineHeight: '1.7', fontSize: '1.05rem' }}>We treat every patient with empathy, respect, and dignity</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'white',
                fontSize: '2.5rem',
                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
              }}>
                <FaShieldAlt />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem' }}>Excellence</h3>
              <p style={{ color: 'var(--gray)', lineHeight: '1.7', fontSize: '1.05rem' }}>Commitment to the highest standards of medical care</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px',
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: 'white',
                fontSize: '2.5rem',
                boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)'
              }}>
                <FaLightbulb />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem' }}>Innovation</h3>
              <p style={{ color: 'var(--gray)', lineHeight: '1.7', fontSize: '1.05rem' }}>Embracing cutting-edge medical technology and research</p>
            </div>
          </div>
        </div>

        {/* History */}
        <div style={{ 
          background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
          borderRadius: 'var(--radius-lg)',
          padding: '3rem',
          textAlign: 'center',
          marginBottom: '5rem'
        }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem' }}>Our Journey</h2>
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <p style={{ color: 'var(--gray)', marginBottom: '1.5rem', lineHeight: '1.8', fontSize: '1.125rem' }}>
              Founded in 1990, our hospital has grown from a small community clinic to a comprehensive 
              healthcare facility serving thousands of patients annually. With state-of-the-art medical 
              equipment, highly skilled medical professionals, and a patient-first approach, we've become 
              a trusted name in healthcare.
            </p>
            <p style={{ color: 'var(--gray)', lineHeight: '1.8', fontSize: '1.125rem' }}>
              Today, we offer specialized departments including Cardiology, Neurology, Orthopedics, Pediatrics, 
              and Emergency Medicine. Our commitment to continuous improvement and patient satisfaction drives 
              everything we do.
            </p>
          </div>
        </div>

        {/* Board of Directors */}
        <div>
          <h2 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            textAlign: 'center', 
            marginBottom: '3rem',
            color: 'var(--dark)'
          }}>
            Board of Directors
          </h2>
          
          {/* Chairman */}
          <div style={{ 
            maxWidth: '800px',
            margin: '0 auto 4rem',
            textAlign: 'center'
          }}>
            <div style={{
              width: '180px',
              height: '180px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              margin: '0 auto 1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4rem',
              color: 'white',
              boxShadow: '0 10px 40px rgba(59, 130, 246, 0.3)',
              border: '5px solid white'
            }}>
              <FaUserTie />
            </div>
            <h3 style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              marginBottom: '0.5rem',
              color: 'var(--dark)'
            }}>
              Dr. Rajesh Kumar Sharma
            </h3>
            <p style={{ 
              fontSize: '1.25rem', 
              color: 'var(--primary)',
              fontWeight: '600',
              marginBottom: '1rem'
            }}>
              Chairman & CEO
            </p>
            <p style={{ 
              color: 'var(--gray)', 
              lineHeight: '1.8',
              fontSize: '1.05rem',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              Dr. Sharma brings over 30 years of healthcare leadership experience and has been 
              instrumental in transforming MediCare Hospital into a leading healthcare institution. 
              His vision and commitment to excellence continue to guide our mission.
            </p>
          </div>

          {/* Directors Grid */}
          <div className="grid-3" style={{ gap: '2rem', marginBottom: '3rem' }}>
            {/* Director 1 */}
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                margin: '0 auto 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3.5rem',
                color: 'white',
                boxShadow: '0 8px 30px rgba(16, 185, 129, 0.3)'
              }}>
                <FaUserTie />
              </div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                marginBottom: '0.5rem',
                color: 'var(--dark)'
              }}>
                Dr. Sunita Patel
              </h3>
              <p style={{ 
                fontSize: '1.05rem', 
                color: 'var(--secondary)',
                fontWeight: '600',
                marginBottom: '0.75rem'
              }}>
                Medical Director
              </p>
              <p style={{ 
                color: 'var(--gray)', 
                lineHeight: '1.7',
                fontSize: '0.95rem'
              }}>
                Leading clinical excellence and medical innovation with 25 years of experience 
                in healthcare management.
              </p>
            </div>

            {/* Director 2 */}
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                margin: '0 auto 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3.5rem',
                color: 'white',
                boxShadow: '0 8px 30px rgba(139, 92, 246, 0.3)'
              }}>
                <FaUserTie />
              </div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                marginBottom: '0.5rem',
                color: 'var(--dark)'
              }}>
                Mr. Amit Thapa
              </h3>
              <p style={{ 
                fontSize: '1.05rem', 
                color: '#8b5cf6',
                fontWeight: '600',
                marginBottom: '0.75rem'
              }}>
                Chief Financial Officer
              </p>
              <p style={{ 
                color: 'var(--gray)', 
                lineHeight: '1.7',
                fontSize: '0.95rem'
              }}>
                Overseeing financial strategy and operations with expertise in healthcare 
                finance and administration.
              </p>
            </div>

            {/* Director 3 */}
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                margin: '0 auto 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3.5rem',
                color: 'white',
                boxShadow: '0 8px 30px rgba(245, 158, 11, 0.3)'
              }}>
                <FaUserTie />
              </div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                marginBottom: '0.5rem',
                color: 'var(--dark)'
              }}>
                Dr. Priya Gurung
              </h3>
              <p style={{ 
                fontSize: '1.05rem', 
                color: '#f59e0b',
                fontWeight: '600',
                marginBottom: '0.75rem'
              }}>
                Director of Nursing
              </p>
              <p style={{ 
                color: 'var(--gray)', 
                lineHeight: '1.7',
                fontSize: '0.95rem'
              }}>
                Leading our nursing staff and ensuring the highest standards of patient care 
                and safety protocols.
              </p>
            </div>

            {/* Director 4 */}
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                margin: '0 auto 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3.5rem',
                color: 'white',
                boxShadow: '0 8px 30px rgba(239, 68, 68, 0.3)'
              }}>
                <FaUserTie />
              </div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                marginBottom: '0.5rem',
                color: 'var(--dark)'
              }}>
                Dr. Ramesh Adhikari
              </h3>
              <p style={{ 
                fontSize: '1.05rem', 
                color: '#ef4444',
                fontWeight: '600',
                marginBottom: '0.75rem'
              }}>
                Chief of Surgery
              </p>
              <p style={{ 
                color: 'var(--gray)', 
                lineHeight: '1.7',
                fontSize: '0.95rem'
              }}>
                Renowned surgeon with expertise in advanced surgical procedures and 
                minimally invasive techniques.
              </p>
            </div>

            {/* Director 5 */}
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                margin: '0 auto 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3.5rem',
                color: 'white',
                boxShadow: '0 8px 30px rgba(6, 182, 212, 0.3)'
              }}>
                <FaUserTie />
              </div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                marginBottom: '0.5rem',
                color: 'var(--dark)'
              }}>
                Ms. Sita Rai
              </h3>
              <p style={{ 
                fontSize: '1.05rem', 
                color: '#06b6d4',
                fontWeight: '600',
                marginBottom: '0.75rem'
              }}>
                Director of HR
              </p>
              <p style={{ 
                color: 'var(--gray)', 
                lineHeight: '1.7',
                fontSize: '0.95rem'
              }}>
                Managing human resources and fostering a positive work environment for our 
                dedicated healthcare professionals.
              </p>
            </div>

            {/* Director 6 */}
            <div className="card" style={{ textAlign: 'center' }}>
              <div style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ec4899, #db2777)',
                margin: '0 auto 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3.5rem',
                color: 'white',
                boxShadow: '0 8px 30px rgba(236, 72, 153, 0.3)'
              }}>
                <FaUserTie />
              </div>
              <h3 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                marginBottom: '0.5rem',
                color: 'var(--dark)'
              }}>
                Mr. Krishna Shrestha
              </h3>
              <p style={{ 
                fontSize: '1.05rem', 
                color: '#ec4899',
                fontWeight: '600',
                marginBottom: '0.75rem'
              }}>
                Director of Operations
              </p>
              <p style={{ 
                color: 'var(--gray)', 
                lineHeight: '1.7',
                fontSize: '0.95rem'
              }}>
                Ensuring smooth hospital operations and implementing efficient systems for 
                optimal patient service delivery.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
