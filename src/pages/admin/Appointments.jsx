import { useEffect, useState } from "react";
import axios from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";
import { toast } from "react-toastify";
import { FaCalendarAlt, FaUserMd, FaUser, FaClock, FaCheck, FaTimes } from "react-icons/fa";
import { formatTime } from "../../utils/formatters";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchAppointments();
  }, [filter]);

  const fetchAppointments = async () => {
    try {
      const url = filter === "all" ? "/appointments" : `/appointments?status=${filter}`;
      const { data } = await axios.get(url);
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

  if (loading) {
    return (
      <AdminLayout>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <div style={{ fontSize: '1.5rem', color: 'var(--gray)' }}>Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  const statusCounts = {
    all: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    approved: appointments.filter(a => a.status === 'approved').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length
  };

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '0.5rem' }}>Appointments Management</h1>
          <p style={{ color: 'var(--gray)', fontSize: '1rem' }}>View and manage all hospital appointments</p>
        </div>

        {/* Stats */}
        <div className="grid-4" style={{ gap: '1rem', marginBottom: '2rem' }}>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: 'white', cursor: 'pointer' }} onClick={() => setFilter('all')}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}><FaCalendarAlt /></div>
            <div className="stat-value" style={{ color: 'white' }}>{statusCounts.all}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Total</div>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)', color: 'white', cursor: 'pointer' }} onClick={() => setFilter('pending')}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}><FaClock /></div>
            <div className="stat-value" style={{ color: 'white' }}>{statusCounts.pending}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Pending</div>
          </div>
          <div className="stat-card green" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white', cursor: 'pointer' }} onClick={() => setFilter('approved')}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}><FaCheck /></div>
            <div className="stat-value" style={{ color: 'white' }}>{statusCounts.approved}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Approved</div>
          </div>
          <div className="stat-card purple" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', color: 'white', cursor: 'pointer' }} onClick={() => setFilter('completed')}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}><FaCheck /></div>
            <div className="stat-value" style={{ color: 'white' }}>{statusCounts.completed}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Completed</div>
          </div>
        </div>

        {/* Filter */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="form-input"
            style={{ width: 'auto' }}
          >
            <option value="all">All Appointments</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {/* Appointments List */}
        {appointments.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {appointments.map((appointment) => (
              <div key={appointment.id} className="card" style={{ padding: '1.5rem', transition: 'all 0.3s ease', border: '2px solid transparent' }} onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }} onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.boxShadow = 'var(--shadow)';
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  {/* Left Side - Patient & Doctor Info */}
                  <div style={{ flex: 1, minWidth: '300px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <div style={{
                            width: '30px',
                            height: '30px',
                            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '0.875rem'
                          }}>
                            <FaUser />
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--gray)', fontWeight: '600' }}>PATIENT</div>
                        </div>
                        <div style={{ fontWeight: '700', fontSize: '1.125rem', color: 'var(--dark)', marginBottom: '0.25rem' }}>{appointment.patient_name}</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>{appointment.patient_phone}</div>
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <div style={{
                            width: '30px',
                            height: '30px',
                            background: 'linear-gradient(135deg, #10b981, #059669)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '0.875rem'
                          }}>
                            <FaUserMd />
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--gray)', fontWeight: '600' }}>DOCTOR</div>
                        </div>
                        <div style={{ fontWeight: '700', fontSize: '1.125rem', color: 'var(--dark)', marginBottom: '0.25rem' }}>{appointment.doctor_name}</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--gray)' }}>{appointment.department}</div>
                      </div>
                    </div>

                    {appointment.reason && (
                      <div style={{ padding: '0.75rem', background: 'var(--light)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', color: 'var(--gray)' }}>
                        <strong>Reason:</strong> {appointment.reason}
                      </div>
                    )}
                  </div>

                  {/* Right Side - Date, Time, Status & Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '250px' }}>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gray)', marginBottom: '0.25rem' }}>DATE</div>
                        <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--dark)' }}>{appointment.appointment_date}</div>
                      </div>
                      <div style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
                        borderRadius: 'var(--radius-md)',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gray)', marginBottom: '0.25rem' }}>TIME</div>
                        <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--dark)' }}>{formatTime(appointment.appointment_time)}</div>
                      </div>
                    </div>

                    <div>
                      <span className={`badge ${
                        appointment.status === "pending" ? "badge-warning" :
                        appointment.status === "approved" ? "badge-success" :
                        appointment.status === "completed" ? "badge-primary" :
                        "badge-danger"
                      }`} style={{ fontSize: '0.875rem', padding: '0.5rem 1rem', textTransform: 'capitalize' }}>
                        {appointment.status}
                      </span>
                    </div>

                    {appointment.status === "pending" && (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => updateStatus(appointment.id, "approved")}
                          className="btn btn-success"
                          style={{ flex: 1, fontSize: '0.875rem', padding: '0.5rem' }}
                        >
                          <FaCheck /> Approve
                        </button>
                        <button
                          onClick={() => updateStatus(appointment.id, "cancelled")}
                          className="btn btn-danger"
                          style={{ flex: 1, fontSize: '0.875rem', padding: '0.5rem' }}
                        >
                          <FaTimes /> Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📅</div>
            <p style={{ fontSize: '1.25rem', color: 'var(--gray)' }}>No appointments found</p>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminAppointments;
