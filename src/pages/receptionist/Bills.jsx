import { useState, useEffect } from "react";
import ReceptionistLayout from "../../layouts/ReceptionistLayout";
import axios from "axios";
import { toast } from "react-toastify";
import { FaPlus, FaEdit } from "react-icons/fa";
import { formatDate, formatTime, formatCurrency } from "../../utils/formatters";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBill, setEditingBill] = useState(null);
  const [formData, setFormData] = useState({
    appointment_id: "",
    patient_id: "",
    amount: "",
    status: "unpaid"
  });

  useEffect(() => {
    fetchBills();
    fetchAppointments();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await axios.get("/api/bills");
      if (response.data.success) {
        setBills(response.data.bills);
      }
    } catch (error) {
      toast.error("Failed to fetch bills");
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("/api/appointments");
      if (response.data.success) {
        // Show all appointments
        setAppointments(response.data.appointments || []);
        console.log("Appointments loaded:", response.data.appointments?.length);
      }
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
      toast.error("Failed to fetch appointments");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingBill) {
        await axios.put(`/api/bills/${editingBill.id}`, formData);
        toast.success("Bill updated successfully");
      } else {
        await axios.post("/api/bills", formData);
        toast.success("Bill created successfully");
      }
      setShowModal(false);
      setEditingBill(null);
      setFormData({ appointment_id: "", patient_id: "", amount: "", status: "unpaid" });
      fetchBills();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (bill) => {
    setEditingBill(bill);
    setFormData({
      appointment_id: bill.appointment_id,
      patient_id: bill.patient_id,
      amount: bill.amount,
      status: bill.status
    });
    setShowModal(true);
  };

  const handleAppointmentChange = (e) => {
    const appointmentId = e.target.value;
    const appointment = appointments.find(a => a.id === parseInt(appointmentId));
    
    setFormData({
      ...formData,
      appointment_id: appointmentId,
      patient_id: appointment ? appointment.patient_id : ""
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid": return { bg: "linear-gradient(135deg, #d1fae5, #6ee7b7)", color: "#065f46", border: "#34d399" };
      case "unpaid": return { bg: "linear-gradient(135deg, #fee2e2, #fca5a5)", color: "#991b1b", border: "#f87171" };
      case "cancelled": return { bg: "linear-gradient(135deg, #f3f4f6, #d1d5db)", color: "#4b5563", border: "#9ca3af" };
      default: return { bg: "#e5e7eb", color: "#6b7280", border: "#d1d5db" };
    }
  };

  return (
    <ReceptionistLayout>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
              💰 Bills Management
            </h1>
            <p style={{ color: 'var(--gray)', fontSize: '1.1rem', fontWeight: '500' }}>
              Create and manage patient bills
            </p>
          </div>
          <button
            onClick={() => {
              setShowModal(true);
              setEditingBill(null);
              setFormData({ appointment_id: "", patient_id: "", amount: "", status: "unpaid" });
            }}
            style={{
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '700',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
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
            <FaPlus /> Create Bill
          </button>
        </div>

        {/* Bills Table */}
        <div className="card" style={{ overflowX: 'auto' }}>
          {bills.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700', fontSize: '0.875rem', color: '#6b7280', textTransform: 'uppercase' }}>Patient</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700', fontSize: '0.875rem', color: '#6b7280', textTransform: 'uppercase' }}>Doctor</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700', fontSize: '0.875rem', color: '#6b7280', textTransform: 'uppercase' }}>Appointment</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700', fontSize: '0.875rem', color: '#6b7280', textTransform: 'uppercase' }}>Amount</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700', fontSize: '0.875rem', color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700', fontSize: '0.875rem', color: '#6b7280', textTransform: 'uppercase' }}>Payment Date</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '700', fontSize: '0.875rem', color: '#6b7280', textTransform: 'uppercase' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bills.map((bill) => {
                  const statusStyle = getStatusColor(bill.status);
                  return (
                    <tr key={bill.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontWeight: '600', color: 'var(--dark)' }}>{bill.patient_name}</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{bill.patient_phone}</div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ color: 'var(--dark)', fontWeight: '500' }}>{bill.doctor_name}</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{bill.doctor_specialization}</div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{bill.appointment_date}</div>
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{formatTime(bill.appointment_time)}</div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--dark)' }}>
                          {formatCurrency(bill.amount)}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          padding: '0.5rem 1rem',
                          background: statusStyle.bg,
                          color: statusStyle.color,
                          border: `2px solid ${statusStyle.border}`,
                          borderRadius: '16px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          display: 'inline-block'
                        }}>
                          {bill.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', color: '#6b7280', fontSize: '0.875rem' }}>
                        {bill.payment_date ? formatDate(bill.payment_date) : '-'}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <button
                          onClick={() => handleEdit(bill)}
                          style={{
                            padding: '0.5rem 1rem',
                            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.375rem'
                          }}
                        >
                          <FaEdit /> Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💵</div>
              <p style={{ fontSize: '1.25rem', color: 'var(--gray)', fontWeight: '600' }}>No bills found</p>
            </div>
          )}
        </div>

        {/* Modal */}
        {showModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }} onClick={() => setShowModal(false)}>
            <div className="card" style={{ maxWidth: '500px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--dark)' }}>
                {editingBill ? '📝 Edit Bill' : '➕ Create Bill'}
              </h2>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--dark)' }}>
                    Appointment *
                  </label>
                  <select
                    value={formData.appointment_id}
                    onChange={handleAppointmentChange}
                    required
                    disabled={editingBill}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      fontFamily: 'inherit'
                    }}
                  >
                    <option value="">Select appointment</option>
                    {appointments && appointments.length > 0 ? (
                      appointments.map(apt => (
                        <option key={apt.id} value={apt.id}>
                          {apt.patient_name} - Dr. {apt.doctor_name} - {apt.appointment_date} ({apt.status})
                        </option>
                      ))
                    ) : (
                      <option disabled>No appointments available</option>
                    )}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--dark)' }}>
                    Amount (NPR) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '1rem'
                    }}
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: '700', marginBottom: '0.5rem', color: 'var(--dark)' }}>
                    Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      fontFamily: 'inherit'
                    }}
                  >
                    <option value="unpaid">Unpaid</option>
                    <option value="paid">Paid</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button
                    type="submit"
                    style={{
                      flex: 1,
                      padding: '0.875rem',
                      background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    {editingBill ? 'Update' : 'Create'} Bill
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    style={{
                      padding: '0.875rem 1.5rem',
                      background: '#f3f4f6',
                      color: '#6b7280',
                      border: 'none',
                      borderRadius: '10px',
                      fontSize: '1rem',
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ReceptionistLayout>
  );
};

export default Bills;
