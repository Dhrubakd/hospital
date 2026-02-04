import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { FaHospital, FaUserMd, FaStethoscope, FaMicroscope, FaHeartbeat, FaBrain, FaBone, FaBaby, FaEye, FaTooth } from "react-icons/fa";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const { data } = await axios.get("/departments");
      setDepartments(data.departments || []);
    } catch (error) {
      console.error("Error fetching departments:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDoctors = (departmentId) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/doctors?department=${departmentId}`);
  };

  const handleBookAppointment = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/register?redirect=/patient/book-appointment');
  };

  const departmentIcons = {
    'Cardiology': FaHeartbeat,
    'Neurology': FaBrain,
    'Orthopedics': FaBone,
    'Pediatrics': FaBaby,
    'Ophthalmology': FaEye,
    'Dentistry': FaTooth,
    'Pulmonology': FaStethoscope,
    'General Medicine': FaMicroscope
  };

  const colors = [
    { gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)', light: '#eff6ff', accent: '#3b82f6' },
    { gradient: 'linear-gradient(135deg, #10b981, #059669)', light: '#ecfdf5', accent: '#10b981' },
    { gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', light: '#f5f3ff', accent: '#8b5cf6' },
    { gradient: 'linear-gradient(135deg, #ec4899, #db2777)', light: '#fdf2f8', accent: '#ec4899' },
    { gradient: 'linear-gradient(135deg, #f59e0b, #d97706)', light: '#fffbeb', accent: '#f59e0b' },
    { gradient: 'linear-gradient(135deg, #14b8a6, #0d9488)', light: '#f0fdfa', accent: '#14b8a6' },
    { gradient: 'linear-gradient(135deg, #ef4444, #dc2626)', light: '#fef2f2', accent: '#ef4444' },
    { gradient: 'linear-gradient(135deg, #6366f1, #4f46e5)', light: '#eef2ff', accent: '#6366f1' }
  ];

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'pulse 1.5s infinite' }}>🏥</div>
          <div style={{ fontSize: '1.25rem', color: 'var(--gray)' }}>Loading departments...</div>
        </div>
      </div>
    );
  }

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
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '2.5rem',
              backdropFilter: 'blur(10px)'
            }}>
              <FaHospital />
            </div>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
              fontWeight: '800', 
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              Our Medical Departments
            </h1>
            <p style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', opacity: '0.95', lineHeight: '1.6' }}>
              Comprehensive healthcare services across various specialties with expert medical professionals
            </p>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '4rem 1rem' }}>
        {departments.length > 0 ? (
          <div className="grid-3" style={{ gap: '2rem' }}>
            {departments.map((dept, index) => {
              const colorScheme = colors[index % colors.length];
              const IconComponent = departmentIcons[dept.name] || FaHospital;
              
              return (
                <div key={dept.id} className="card" style={{ 
                  padding: 0,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  border: `2px solid transparent`,
                  cursor: 'pointer'
                }} onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.borderColor = colorScheme.accent;
                  e.currentTarget.style.boxShadow = `0 20px 40px rgba(0, 0, 0, 0.15)`;
                }} onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
                }}>
                  {/* Header with Gradient */}
                  <div style={{
                    background: colorScheme.gradient,
                    padding: '2rem',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    {/* Background Pattern */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '150px',
                      height: '150px',
                      opacity: 0.1,
                      transform: 'rotate(15deg) translate(30px, -30px)'
                    }}>
                      <IconComponent style={{ fontSize: '150px' }} />
                    </div>
                    
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem',
                        fontSize: '2rem',
                        backdropFilter: 'blur(10px)'
                      }}>
                        <IconComponent />
                      </div>
                      <h3 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem' }}>{dept.name}</h3>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        fontSize: '0.95rem',
                        opacity: '0.95'
                      }}>
                        <FaUserMd />
                        <span>{dept.doctor_count || 0} Specialist Doctors</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '1.5rem' }}>
                    <p style={{ color: 'var(--gray)', lineHeight: '1.7', marginBottom: '1.5rem', minHeight: '4rem' }}>
                      {dept.description || "Providing expert medical care and treatment in this specialty with state-of-the-art facilities."}
                    </p>
                    
                    <div style={{
                      display: 'flex',
                      gap: '0.75rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid var(--gray-light)'
                    }}>
                      <button 
                        onClick={() => handleViewDoctors(dept.id)}
                        className="btn" 
                        style={{
                          flex: 1,
                          background: colorScheme.gradient,
                          color: 'white',
                          fontSize: '0.95rem',
                          padding: '0.75rem'
                        }}
                      >
                        View Doctors
                      </button>
                      <button 
                        onClick={handleBookAppointment}
                        className="btn btn-outline" 
                        style={{
                          borderColor: colorScheme.accent,
                          color: colorScheme.accent,
                          fontSize: '0.95rem',
                          padding: '0.75rem 1.25rem'
                        }}
                      >
                        Book
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏥</div>
            <p style={{ fontSize: '1.25rem', color: 'var(--gray)' }}>No departments available</p>
          </div>
        )}

        {/* Info Section */}
        <div className="card" style={{ marginTop: '5rem', padding: '3rem', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', textAlign: 'center', marginBottom: '3rem' }}>Why Choose Our Departments?</h2>
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
                fontSize: '2.5rem',
                color: 'white',
                boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
              }}>
                <FaStethoscope />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem' }}>Modern Equipment</h3>
              <p style={{ color: 'var(--gray)', lineHeight: '1.7', fontSize: '1.05rem' }}>State-of-the-art medical technology and advanced diagnostic tools</p>
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
                fontSize: '2.5rem',
                color: 'white',
                boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
              }}>
                <FaUserMd />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem' }}>Expert Staff</h3>
              <p style={{ color: 'var(--gray)', lineHeight: '1.7', fontSize: '1.05rem' }}>Highly qualified specialists with years of experience</p>
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
                fontSize: '2.5rem',
                color: 'white',
                boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)'
              }}>
                <FaHeartbeat />
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem' }}>Best Results</h3>
              <p style={{ color: 'var(--gray)', lineHeight: '1.7', fontSize: '1.05rem' }}>Patient-centered care with proven treatment outcomes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
