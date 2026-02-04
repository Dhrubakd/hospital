import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "../../api/axios";
import { FaStethoscope, FaPhone, FaEnvelope, FaDollarSign, FaUserMd, FaAward, FaCalendarAlt, FaHospital } from "react-icons/fa";
import { formatCurrencyShort } from "../../utils/formatters";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const departmentId = searchParams.get('department');

  useEffect(() => {
    fetchDoctors();
  }, [departmentId]);

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get("/doctors");
      let filteredDoctors = data.doctors || [];
      
      // Filter by department if departmentId is provided
      if (departmentId) {
        filteredDoctors = filteredDoctors.filter(doc => doc.department_id === parseInt(departmentId));
      }
      
      setDoctors(filteredDoctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = (doctorId) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate(`/register?redirect=/patient/book-appointment&doctor=${doctorId}`);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'pulse 1.5s infinite' }}>👨‍⚕️</div>
          <div style={{ fontSize: '1.25rem', color: 'var(--gray)' }}>Loading doctors...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
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
              <FaUserMd />
            </div>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
              fontWeight: '800', 
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              Our Expert Doctors
            </h1>
            <p style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', opacity: '0.95', lineHeight: '1.6' }}>
              Meet our team of highly qualified medical professionals dedicated to your health
            </p>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '4rem 1rem' }}>
        {doctors.length > 0 ? (
          <div className="grid-3" style={{ gap: '2rem' }}>
            {doctors.map((doctor) => (
              <div key={doctor.id} className="card" style={{ 
                padding: 0,
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                border: '2px solid transparent'
              }} onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'var(--secondary)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.2)';
              }} onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)';
              }}>
                {/* Doctor Header with Avatar */}
                <div style={{
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  padding: '2rem',
                  textAlign: 'center',
                  color: 'white',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Background Pattern */}
                  <div style={{
                    position: 'absolute',
                    top: '-50px',
                    right: '-50px',
                    width: '200px',
                    height: '200px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%'
                  }}></div>
                  
                  <div style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                      width: '100px',
                      height: '100px',
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.1))',
                      borderRadius: '50%',
                      margin: '0 auto 1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '3rem',
                      border: '4px solid rgba(255, 255, 255, 0.3)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'
                    }}>
                      <FaUserMd />
                    </div>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '0.5rem' }}>{doctor.name}</h3>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      padding: '0.5rem 1rem',
                      borderRadius: 'var(--radius-full)',
                      display: 'inline-block',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      backdropFilter: 'blur(10px)'
                    }}>
                      {doctor.specialization}
                    </div>
                  </div>
                </div>

                {/* Doctor Info */}
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        minWidth: '40px',
                        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}>
                        <FaHospital />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gray)', marginBottom: '0.125rem' }}>Department</div>
                        <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{doctor.department}</div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        minWidth: '40px',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}>
                        <FaDollarSign />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gray)', marginBottom: '0.125rem' }}>Consultation Fee</div>
                        <div style={{ fontWeight: '700', fontSize: '1.125rem', color: 'var(--secondary)' }}>{formatCurrencyShort(doctor.consultation_fee)}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        minWidth: '40px',
                        background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                      }}>
                        <FaAward />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gray)', marginBottom: '0.125rem' }}>Experience</div>
                        <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{doctor.experience_years} Years</div>
                      </div>
                    </div>
                  </div>

                  <div style={{
                    padding: '1rem',
                    background: 'var(--light)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--gray)', marginBottom: '0.5rem' }}>
                      <FaPhone style={{ marginRight: '0.5rem' }} />{doctor.phone}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>
                      <FaEnvelope style={{ marginRight: '0.5rem' }} />{doctor.email}
                    </div>
                  </div>

                  <button 
                    onClick={() => handleBookAppointment(doctor.id)}
                    className="btn btn-success" 
                    style={{ 
                      width: '100%', 
                      fontSize: '1.05rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <FaCalendarAlt /> Book Appointment
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👨‍⚕️</div>
            <p style={{ fontSize: '1.25rem', color: 'var(--gray)' }}>No doctors available {departmentId ? 'in this department' : 'at the moment'}</p>
          </div>
        )}

        {/* Stats Section */}
        {doctors.length > 0 && (
          <div style={{ marginTop: '5rem' }}>
            <div className="grid-4" style={{ gap: '1.5rem' }}>
              <div className="stat-card">
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaUserMd /></div>
                <div className="stat-value">{doctors.length}+</div>
                <div className="stat-label">Expert Doctors</div>
              </div>
              <div className="stat-card green">
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaAward /></div>
                <div className="stat-value">15+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-card purple">
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaStethoscope /></div>
                <div className="stat-value">20+</div>
                <div className="stat-label">Specializations</div>
              </div>
              <div className="stat-card orange">
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaHospital /></div>
                <div className="stat-value">8+</div>
                <div className="stat-label">Departments</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;
