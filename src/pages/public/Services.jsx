import { FaStethoscope, FaXRay, FaSyringe, FaHeartbeat, FaBrain, FaBone, FaEye, FaTooth, FaBaby, FaAmbulance, FaPills, FaMicroscope } from 'react-icons/fa';

const Services = () => {
  const services = [
    {
      icon: <FaStethoscope />,
      title: "General Medicine",
      description: "Comprehensive medical care for common health issues and preventive healthcare services.",
      color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      icon: <FaHeartbeat />,
      title: "Cardiology",
      description: "Advanced heart care including diagnostics, treatment, and cardiac rehabilitation programs.",
      color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      icon: <FaBrain />,
      title: "Neurology",
      description: "Expert neurological care for brain, spine, and nervous system disorders.",
      color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      icon: <FaXRay />,
      title: "Radiology",
      description: "State-of-the-art imaging services including X-ray, CT scan, MRI, and ultrasound.",
      color: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    },
    {
      icon: <FaBone />,
      title: "Orthopedics",
      description: "Specialized care for bones, joints, muscles, and sports-related injuries.",
      color: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
    },
    {
      icon: <FaSyringe />,
      title: "Surgery",
      description: "Advanced surgical procedures performed by experienced surgeons with modern facilities.",
      color: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)"
    },
    {
      icon: <FaBaby />,
      title: "Pediatrics",
      description: "Dedicated healthcare services for infants, children, and adolescents.",
      color: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
    },
    {
      icon: <FaEye />,
      title: "Ophthalmology",
      description: "Complete eye care services including vision testing, surgery, and treatment.",
      color: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
    },
    {
      icon: <FaTooth />,
      title: "Dentistry",
      description: "Comprehensive dental care from routine checkups to advanced procedures.",
      color: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)"
    },
    {
      icon: <FaAmbulance />,
      title: "Emergency Care",
      description: "24/7 emergency services with rapid response and critical care facilities.",
      color: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)"
    },
    {
      icon: <FaPills />,
      title: "Pharmacy",
      description: "In-house pharmacy with a wide range of medications and pharmaceutical care.",
      color: "linear-gradient(135deg, #8EC5FC 0%, #E0C3FC 100%)"
    },
    {
      icon: <FaMicroscope />,
      title: "Laboratory",
      description: "Advanced diagnostic laboratory services with accurate and timely test results.",
      color: "linear-gradient(135deg, #D299C2 0%, #FEF9D7 100%)"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '6rem 1.5rem 4rem',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
            fontWeight: '800', 
            marginBottom: '1.5rem',
            marginTop: '0',
            letterSpacing: '-0.02em',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
          }}>
            Our Services
          </h1>
          <p style={{ 
            fontSize: '1.25rem', 
            maxWidth: '700px', 
            margin: '0 auto',
            lineHeight: '1.8',
            opacity: '0.95'
          }}>
            Comprehensive healthcare services delivered by expert medical professionals using advanced technology and compassionate care
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ padding: '5rem 1.5rem', background: '#f9fafb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2rem'
          }}>
            {services.map((service, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '2.5rem',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
                  transition: 'all 0.3s ease',
                  border: '2px solid transparent',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.12)';
                  e.currentTarget.style.borderColor = '#3b82f6';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: service.color,
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  color: 'white',
                  marginBottom: '1.5rem',
                  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                }}>
                  {service.icon}
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: 'var(--dark)',
                  marginBottom: '1rem',
                  letterSpacing: '-0.01em'
                }}>
                  {service.title}
                </h3>
                <p style={{
                  fontSize: '1rem',
                  color: '#6b7280',
                  lineHeight: '1.7',
                  marginBottom: '1.5rem'
                }}>
                  {service.description}
                </p>
                <button style={{
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                >
                  Learn More
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section style={{ padding: '5rem 1.5rem', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: 'var(--dark)',
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            Why Choose Our Services?
          </h2>
          <p style={{
            fontSize: '1.125rem',
            color: '#6b7280',
            maxWidth: '700px',
            margin: '0 auto 3rem',
            lineHeight: '1.8'
          }}>
            We are committed to providing exceptional healthcare with advanced technology and compassionate care
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '2rem',
            marginTop: '3rem'
          }}>
            {[
              { title: "24/7 Availability", desc: "Round-the-clock medical services and emergency care", icon: "⏰" },
              { title: "Expert Doctors", desc: "Highly qualified and experienced medical professionals", icon: "👨‍⚕️" },
              { title: "Modern Facilities", desc: "State-of-the-art equipment and advanced technology", icon: "🏥" },
              { title: "Affordable Care", desc: "Quality healthcare services at competitive prices", icon: "💰" }
            ].map((item, index) => (
              <div key={index} style={{
                padding: '2rem',
                background: 'linear-gradient(135deg, #f9fafb, #ffffff)',
                borderRadius: '16px',
                border: '2px solid #e5e7eb'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h4 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--dark)', marginBottom: '0.5rem' }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: '1.6' }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '5rem 1.5rem',
        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            marginBottom: '1.5rem',
            letterSpacing: '-0.02em'
          }}>
            Need Medical Assistance?
          </h2>
          <p style={{ fontSize: '1.125rem', marginBottom: '2.5rem', opacity: '0.95', lineHeight: '1.8' }}>
            Book an appointment with our specialists or contact us for any health-related queries
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/contact" style={{
              padding: '1rem 2.5rem',
              background: 'white',
              color: '#2563eb',
              borderRadius: '12px',
              fontSize: '1.125rem',
              fontWeight: '700',
              textDecoration: 'none',
              transition: 'all 0.2s',
              display: 'inline-block'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            >
              Contact Us
            </a>
            <a href="/doctors"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
              window.location.href = '/doctors';
            }}
            style={{
              padding: '1rem 2.5rem',
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '2px solid white',
              borderRadius: '12px',
              fontSize: '1.125rem',
              fontWeight: '700',
              textDecoration: 'none',
              transition: 'all 0.2s',
              display: 'inline-block'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.color = '#2563eb';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.color = 'white';
            }}
            >
              View Doctors
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
