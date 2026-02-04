import { useEffect, useState } from "react";
import axios from "../../api/axios";
import DoctorLayout from "../../layouts/DoctorLayout";
import { FaCalendarAlt, FaUsers, FaFilePrescription } from "react-icons/fa";
import { formatTime } from "../../utils/formatters";

const DoctorDashboard = () => {
  const [stats, setStats] = useState({
    totalAppointments: 0,
    todayAppointments: 0,
    completedAppointments: 0,
  });
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/appointments/doctor");
      const appts = data.appointments || [];
      
      const today = new Date().toISOString().split("T")[0];
      setStats({
        totalAppointments: appts.length,
        todayAppointments: appts.filter((a) => a.appointment_date === today).length,
        completedAppointments: appts.filter((a) => a.status === "completed").length,
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
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>Doctor Dashboard</h1>
          <p style={{ color: 'var(--gray)', fontSize: '1.1rem', fontWeight: '500' }}>Manage your appointments and patient care</p>
        </div>

        {/* Stats Grid */}
        <div className="grid-3" style={{ gap: '2rem', marginBottom: '3rem' }}>
          <div className="stat-card" style={{ 
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', 
            color: 'white',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }} onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.4)';
          }} onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(59, 130, 246, 0.3)';
          }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem', opacity: 0.9 }}><FaCalendarAlt /></div>
            <div className="stat-value" style={{ color: 'white', fontSize: '3rem', fontWeight: '800', marginBottom: '0.5rem' }}>{stats.totalAppointments}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: '1.1rem', fontWeight: '600' }}>Total Appointments</div>
          </div>
          <div className="stat-card green" style={{ 
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
            color: 'white',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }} onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.4)';
          }} onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(16, 185, 129, 0.3)';
          }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem', opacity: 0.9 }}><FaUsers /></div>
            <div className="stat-value" style={{ color: 'white', fontSize: '3rem', fontWeight: '800', marginBottom: '0.5rem' }}>{stats.todayAppointments}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: '1.1rem', fontWeight: '600' }}>Today's Appointments</div>
          </div>
          <div className="stat-card purple" style={{ 
            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', 
            color: 'white',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }} onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 20px 40px rgba(139, 92, 246, 0.4)';
          }} onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(139, 92, 246, 0.3)';
          }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem', opacity: 0.9 }}><FaFilePrescription /></div>
            <div className="stat-value" style={{ color: 'white', fontSize: '3rem', fontWeight: '800', marginBottom: '0.5rem' }}>{stats.completedAppointments}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.95)', fontSize: '1.1rem', fontWeight: '600' }}>Completed</div>
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="card" style={{ padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '2rem', color: 'var(--dark)', letterSpacing: '-0.01em' }}>Recent Appointments</h2>
          {appointments.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {appointments.map((appointment) => (
                <div key={appointment.id} className="card" style={{ 
                  padding: '1.5rem', 
                  border: '2px solid #e5e7eb', 
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  background: 'linear-gradient(to right, #ffffff, #f9fafb)'
                }} onMouseOver={(e) => { 
                  e.currentTarget.style.borderColor = '#3b82f6'; 
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(59, 130, 246, 0.15)'; 
                  e.currentTarget.style.transform = 'translateX(8px)';
                }} onMouseOut={(e) => { 
                  e.currentTarget.style.borderColor = '#e5e7eb'; 
                  e.currentTarget.style.boxShadow = 'none'; 
                  e.currentTarget.style.transform = 'translateX(0)';
                }}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{appointment.patient_name}</h3>
                      <p className="text-sm text-gray-600">{appointment.patient_email}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {appointment.appointment_date} at {formatTime(appointment.appointment_time)}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        appointment.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : appointment.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : appointment.status === "completed"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No appointments yet</p>
          )}
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorDashboard;
