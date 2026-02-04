import { useEffect, useState } from "react";
import axios from "../../api/axios";
import PatientLayout from "../../layouts/PatientLayout";
import { toast } from "react-toastify";
import { formatTime } from "../../utils/formatters";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get("/appointments/patient");
      setAppointments(data.appointments || []);
    } catch (error) {
      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PatientLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-xl">Loading...</div>
        </div>
      </PatientLayout>
    );
  }

  return (
    <PatientLayout>
      <div>
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            📋 My Appointments
          </h1>
          <p style={{ color: 'var(--gray)', fontSize: '1.1rem', fontWeight: '500' }}>
            Track your upcoming and past appointments
          </p>
        </div>

        {appointments.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {appointments.map((appointment) => {
              const statusColors = {
                'pending': { bg: 'linear-gradient(135deg, #fef3c7, #fde047)', color: '#854d0e', border: '#facc15' },
                'approved': { bg: 'linear-gradient(135deg, #d1fae5, #6ee7b7)', color: '#065f46', border: '#34d399' },
                'completed': { bg: 'linear-gradient(135deg, #dbeafe, #93c5fd)', color: '#1e40af', border: '#60a5fa' },
                'cancelled': { bg: 'linear-gradient(135deg, #fee2e2, #fca5a5)', color: '#991b1b', border: '#f87171' }
              };
              const statusStyle = statusColors[appointment.status] || statusColors['pending'];

              return (
                <div 
                  key={appointment.id} 
                  className="card" 
                  style={{ 
                    padding: '2rem',
                    borderRadius: '16px',
                    border: '2px solid #e5e7eb',
                    background: 'linear-gradient(to right, #ffffff, #f9fafb)',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = '#3b82f6';
                    e.currentTarget.style.boxShadow = '0 12px 28px rgba(59, 130, 246, 0.15)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = '#e5e7eb';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '2rem', alignItems: 'start' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gray)', fontWeight: '600', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                        Doctor
                      </div>
                      <div style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '0.5rem' }}>
                        {appointment.doctor_name}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                        <span style={{ fontSize: '1.125rem' }}>🏥</span>
                        <span style={{ fontSize: '0.95rem', color: '#6b7280', fontWeight: '600' }}>{appointment.department}</span>
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{appointment.specialization}</div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gray)', fontWeight: '600', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                        Appointment Details
                      </div>
                      <div style={{ 
                        padding: '1rem',
                        background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                        borderRadius: '12px',
                        border: '1px solid #bfdbfe',
                        marginBottom: '1rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <span style={{ fontSize: '1.125rem' }}>📅</span>
                          <span style={{ fontSize: '1rem', fontWeight: '700', color: '#1e40af' }}>{appointment.appointment_date}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '1.125rem' }}>🕐</span>
                          <span style={{ fontSize: '0.95rem', fontWeight: '600', color: '#3b82f6' }}>{formatTime(appointment.appointment_time)}</span>
                        </div>
                      </div>
                      {appointment.reason && (
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem', fontWeight: '600' }}>Reason:</div>
                          <div style={{ fontSize: '0.875rem', color: '#374151', lineHeight: '1.5' }}>{appointment.reason}</div>
                        </div>
                      )}
                    </div>

                    <div>
                      <span style={{
                        padding: '0.75rem 1.5rem',
                        background: statusStyle.bg,
                        color: statusStyle.color,
                        border: `2px solid ${statusStyle.border}`,
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        whiteSpace: 'nowrap',
                        display: 'inline-block'
                      }}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="card" style={{ padding: '4rem', textAlign: 'center', borderRadius: '16px' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>📅</div>
            <p style={{ fontSize: '1.5rem', color: 'var(--gray)', fontWeight: '600', marginBottom: '1rem' }}>No appointments yet</p>
            <p style={{ fontSize: '1rem', color: 'var(--gray)', marginBottom: '2rem' }}>Book your first appointment to get started</p>
            <a
              href="/patient/book-appointment"
              style={{
                display: 'inline-block',
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                color: 'white',
                borderRadius: '12px',
                fontSize: '1.125rem',
                fontWeight: '700',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(59, 130, 246, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.3)';
              }}
            >
              📅 Book Your First Appointment
            </a>
          </div>
        )}
      </div>
    </PatientLayout>
  );
};

export default MyAppointments;
