import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";
import { FaUserMd, FaCalendarAlt, FaHospital, FaUsers } from "react-icons/fa";
import { formatTime } from "../../utils/formatters";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalAppointments: 0,
    pendingAppointments: 0,
    departments: 0,
  });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [doctorsRes, appointmentsRes, deptRes] = await Promise.all([
        axios.get("/doctors"),
        axios.get("/appointments"),
        axios.get("/departments"),
      ]);

      const appointments = appointmentsRes.data.appointments || [];
      setStats({
        totalDoctors: doctorsRes.data.count || 0,
        totalAppointments: appointments.length,
        pendingAppointments: appointments.filter((a) => a.status === "pending").length,
        departments: deptRes.data.count || 0,
      });

      setRecentAppointments(appointments.slice(0, 5));
    } catch (error) {
      console.error("Dashboard data error:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { icon: <FaUserMd />, label: "Total Doctors", value: stats.totalDoctors, bg: "bg-blue-500" },
    { icon: <FaCalendarAlt />, label: "Total Appointments", value: stats.totalAppointments, bg: "bg-green-500" },
    { icon: <FaUsers />, label: "Pending Appointments", value: stats.pendingAppointments, bg: "bg-yellow-500" },
    { icon: <FaHospital />, label: "Departments", value: stats.departments, bg: "bg-purple-500" },
  ];

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-xl">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '0.5rem' }}>Admin Dashboard</h1>
          <p style={{ color: 'var(--gray)', fontSize: '1rem' }}>Welcome back! Here's your hospital overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid-4" style={{ gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: 'white', cursor: 'pointer' }} onClick={() => navigate('/admin/doctors')}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaUserMd /></div>
            <div className="stat-value" style={{ color: 'white' }}>{stats.totalDoctors}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Total Doctors</div>
          </div>
          <div className="stat-card green" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', cursor: 'pointer' }} onClick={() => navigate('/admin/appointments')}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaCalendarAlt /></div>
            <div className="stat-value" style={{ color: 'white' }}>{stats.totalAppointments}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Total Appointments</div>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white', cursor: 'pointer' }} onClick={() => navigate('/admin/appointments')}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaUsers /></div>
            <div className="stat-value" style={{ color: 'white' }}>{stats.pendingAppointments}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Pending Appointments</div>
          </div>
          <div className="stat-card purple" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', color: 'white', cursor: 'pointer' }} onClick={() => navigate('/admin/departments')}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaHospital /></div>
            <div className="stat-value" style={{ color: 'white' }}>{stats.departments}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Departments</div>
          </div>
        </div>

        {/* Recent Appointments */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--dark)' }}>Recent Appointments</h2>
          {recentAppointments.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Doctor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentAppointments.map((appointment) => (
                    <tr key={appointment.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{appointment.patient_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{appointment.doctor_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{appointment.appointment_date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{formatTime(appointment.appointment_time)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">No appointments yet</p>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
