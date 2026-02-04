import { useEffect, useState } from "react";
import axios from "../../api/axios";
import DoctorLayout from "../../layouts/DoctorLayout";
import { toast } from "react-toastify";
import { formatTime } from "../../utils/formatters";
import { useNavigate } from "react-router-dom";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigateTo = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get("/appointments/doctor");
      setAppointments(data.appointments || []);
    } catch (error) {
      toast.error("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`/appointments/${id}/status`, { status: newStatus });
      toast.success("Status updated successfully");
      fetchAppointments();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handlePrescription = (appointmentId) => {
    navigateTo(`/doctor/prescriptions?appointmentId=${appointmentId}`);
  };

  if (loading) {
    return (
      <DoctorLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-xl">Loading...</div>
        </div>
      </DoctorLayout>
    );
  }

  return (
    <DoctorLayout>
      <div>
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>My Appointments</h1>
          <p style={{ color: 'var(--gray)', fontSize: '1.1rem', fontWeight: '500' }}>Manage your patient appointments and prescriptions</p>
        </div>

        {appointments.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {appointments.map((appointment) => (
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
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '2rem', alignItems: 'center' }}>
                  {/* Patient Info */}
                  <div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gray)', fontWeight: '600', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Patient</div>
                    <div style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--dark)', marginBottom: '0.25rem' }}>{appointment.patient_name}</div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>
                      {appointment.gender} | {appointment.dob}
                    </div>
                    <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                      <div>{appointment.patient_email}</div>
                      <div>{appointment.patient_phone}</div>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gray)', fontWeight: '600', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Date & Time</div>
                    <div style={{ 
                      padding: '1rem',
                      background: 'linear-gradient(135deg, #eff6ff, #dbeafe)',
                      borderRadius: '12px',
                      border: '1px solid #bfdbfe'
                    }}>
                      <div style={{ fontSize: '1rem', fontWeight: '700', color: '#1e40af', marginBottom: '0.25rem' }}>
                        📅 {appointment.appointment_date}
                      </div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#3b82f6' }}>
                        🕐 {formatTime(appointment.appointment_time)}
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div>
                    <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--gray)', fontWeight: '600', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Status</div>
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '0.5rem 1.25rem',
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        borderRadius: '20px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        ...(appointment.status === "pending"
                          ? { background: 'linear-gradient(135deg, #fef3c7, #fde047)', color: '#854d0e', border: '2px solid #facc15' }
                          : appointment.status === "approved"
                          ? { background: 'linear-gradient(135deg, #d1fae5, #6ee7b7)', color: '#065f46', border: '2px solid #34d399' }
                          : appointment.status === "completed"
                          ? { background: 'linear-gradient(135deg, #dbeafe, #93c5fd)', color: '#1e40af', border: '2px solid #60a5fa' }
                          : { background: 'linear-gradient(135deg, #fee2e2, #fca5a5)', color: '#991b1b', border: '2px solid #f87171' })
                      }}
                    >
                      {appointment.status}
                    </span>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: '140px' }}>
                    {appointment.status === "approved" && (
                      <>
                        <button
                          onClick={() => handlePrescription(appointment.id)}
                          style={{
                            padding: '0.75rem 1.25rem',
                            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '0.9rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
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
                          📝 Prescribe
                        </button>
                        <button
                          onClick={() => updateStatus(appointment.id, "completed")}
                          style={{
                            padding: '0.75rem 1.25rem',
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '10px',
                            fontSize: '0.9rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(16, 185, 129, 0.4)';
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.3)';
                          }}
                        >
                          ✓ Complete
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ padding: '4rem', textAlign: 'center', borderRadius: '16px' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>📅</div>
            <p style={{ fontSize: '1.5rem', color: 'var(--gray)', fontWeight: '600' }}>No appointments found</p>
            <p style={{ fontSize: '1rem', color: 'var(--gray)', marginTop: '0.5rem' }}>Your appointments will appear here</p>
          </div>
        )}
      </div>
    </DoctorLayout>
  );
};

export default DoctorAppointments;
