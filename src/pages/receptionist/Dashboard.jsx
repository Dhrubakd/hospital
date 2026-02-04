import { useEffect, useState } from "react";
import axios from "../../api/axios";
import ReceptionistLayout from "../../layouts/ReceptionistLayout";
import { FaCalendarAlt, FaUsers, FaUserMd, FaClock } from "react-icons/fa";
import { formatTime } from "../../utils/formatters";

const ReceptionistDashboard = () => {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    todayAppointments: 0,
    pendingAppointments: 0,
    totalPatients: 0,
  });
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/appointments");
      const appts = data.appointments || [];
      
      const today = new Date().toISOString().split("T")[0];
      setStats({
        totalAppointments: appts.length,
        todayAppointments: appts.filter((a) => a.appointment_date === today).length,
        pendingAppointments: appts.filter((a) => a.status === "pending").length,
        totalPatients: new Set(appts.map(a => a.patient_id)).size,
      });
      
      setAppointments(appts.slice(0, 5));
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ReceptionistLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-xl">Loading...</div>
        </div>
      </ReceptionistLayout>
    );
  }

  return (
    <ReceptionistLayout>
      <div>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '0.5rem' }}>Receptionist Dashboard</h1>
          <p style={{ color: 'var(--gray)', fontSize: '1rem' }}>Manage appointments and patient registrations</p>
        </div>

        {/* Stats Grid */}
        <div className="grid-4" style={{ gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: 'white' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaCalendarAlt /></div>
            <div className="stat-value" style={{ color: 'white' }}>{stats.totalAppointments}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Total Appointments</div>
          </div>
          <div className="stat-card green" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaClock /></div>
            <div className="stat-value" style={{ color: 'white' }}>{stats.todayAppointments}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Today's Appointments</div>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaClock /></div>
            <div className="stat-value" style={{ color: 'white' }}>{stats.pendingAppointments}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Pending Approvals</div>
          </div>
          <div className="stat-card purple" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', color: 'white' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaUsers /></div>
            <div className="stat-value" style={{ color: 'white' }}>{stats.totalPatients}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Total Patients</div>
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--dark)' }}>Recent Appointments</h2>
          {appointments.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {appointments.map((appointment) => (
                <div key={appointment.id} className="card" style={{ padding: '1.25rem', border: '2px solid var(--gray-light)', transition: 'all 0.3s ease' }} onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }} onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--gray-light)'; e.currentTarget.style.boxShadow = 'var(--shadow)'; }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--gray)', marginBottom: '0.25rem' }}>Patient</div>
                          <h3 style={{ fontWeight: '700', color: 'var(--dark)', fontSize: '1.125rem' }}>{appointment.patient_name}</h3>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--gray)', marginBottom: '0.25rem' }}>Doctor</div>
                          <h3 style={{ fontWeight: '700', color: 'var(--dark)', fontSize: '1.125rem' }}>{appointment.doctor_name}</h3>
                        </div>
                      </div>
                      <p style={{ fontSize: '0.875rem', color: 'var(--gray)', marginTop: '0.5rem' }}>
                        📅 {appointment.appointment_date} at ⏰ {formatTime(appointment.appointment_time)}
                      </p>
                    </div>
                    <span className={`badge ${
                      appointment.status === "pending" ? "badge-warning" :
                      appointment.status === "approved" ? "badge-success" :
                      appointment.status === "completed" ? "badge-primary" :
                      "badge-danger"
                    }`} style={{ textTransform: 'capitalize' }}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ color: 'var(--gray)', textAlign: 'center', padding: '2rem 0' }}>No appointments yet</p>
          )}
        </div>
      </div>
    </ReceptionistLayout>
  );
};

export default ReceptionistDashboard;
