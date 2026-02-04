import { useEffect, useState } from "react";
import axios from "../../api/axios";
import PatientLayout from "../../layouts/PatientLayout";
import { FaCalendarAlt, FaFilePrescription } from "react-icons/fa";
import { formatTime } from "../../utils/formatters";

const PatientDashboard = () => {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    upcomingAppointments: 0,
    prescriptions: 0,
  });
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [appointmentsRes, prescriptionsRes] = await Promise.all([
        axios.get("/appointments/patient"),
        axios.get("/prescriptions/patient"),
      ]);

      const appts = appointmentsRes.data.appointments || [];
      setAppointments(appts.slice(0, 5));
      
      setStats({
        totalAppointments: appts.length,
        upcomingAppointments: appts.filter(a => 
          new Date(a.appointment_date) >= new Date() && a.status === 'approved'
        ).length,
        prescriptions: prescriptionsRes.data.count || 0,
      });
    } catch (error) {
      console.error("Dashboard data error:", error);
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
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '0.5rem' }}>Patient Dashboard</h1>
          <p style={{ color: 'var(--gray)', fontSize: '1rem' }}>Track your appointments and health records</p>
        </div>

        {/* Stats */}
        <div className="grid-3" style={{ gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: 'white' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaCalendarAlt /></div>
            <div className="stat-value" style={{ color: 'white' }}>{stats.totalAppointments}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Total Appointments</div>
          </div>
          <div className="stat-card green" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaCalendarAlt /></div>
            <div className="stat-value" style={{ color: 'white' }}>{stats.upcomingAppointments}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Upcoming</div>
          </div>
          <div className="stat-card purple" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', color: 'white' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaFilePrescription /></div>
            <div className="stat-value" style={{ color: 'white' }}>{stats.prescriptions}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Prescriptions</div>
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
                      <h3 style={{ fontWeight: '700', color: 'var(--dark)', fontSize: '1.125rem' }}>{appointment.doctor_name}</h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--gray)', marginTop: '0.25rem' }}>{appointment.department}</p>
                      <p style={{ fontSize: '0.875rem', color: 'var(--gray)', marginTop: '0.5rem' }}>
                        📅 {appointment.appointment_date} at ⏰ {appointment.appointment_time}
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
    </PatientLayout>
  );
};

export default PatientDashboard;
