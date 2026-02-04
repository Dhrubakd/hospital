import { useState, useEffect } from "react";
import PatientLayout from "../../layouts/PatientLayout";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import { formatDate, formatTime, formatCurrency } from "../../utils/formatters";

const MyBills = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
      const response = await axios.get("/bills/my-bills");
      if (response.data.success) {
        setBills(response.data.bills);
      }
    } catch (error) {
      toast.error("Failed to fetch bills");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "paid": return { bg: "linear-gradient(135deg, #d1fae5, #6ee7b7)", color: "#065f46", border: "#34d399" };
      case "unpaid": return { bg: "linear-gradient(135deg, #fee2e2, #fca5a5)", color: "#991b1b", border: "#f87171" };
      case "cancelled": return { bg: "linear-gradient(135deg, #f3f4f6, #d1d5db)", color: "#4b5563", border: "#9ca3af" };
      default: return { bg: "#e5e7eb", color: "#6b7280", border: "#d1d5db" };
    }
  };

  const totalAmount = bills.reduce((sum, bill) => sum + parseFloat(bill.amount), 0);
  const paidAmount = bills.filter(b => b.status === 'paid').reduce((sum, bill) => sum + parseFloat(bill.amount), 0);
  const unpaidAmount = bills.filter(b => b.status === 'unpaid').reduce((sum, bill) => sum + parseFloat(bill.amount), 0);

  return (
    <PatientLayout>
      <div>
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            💰 My Bills
          </h1>
          <p style={{ color: 'var(--gray)', fontSize: '1.1rem', fontWeight: '500' }}>
            View your medical bills and payment history
          </p>
        </div>

        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="card" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: 'white' }}>
            <div style={{ fontSize: '0.875rem', opacity: '0.9', marginBottom: '0.5rem', fontWeight: '600' }}>Total Bills</div>
            <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{formatCurrency(totalAmount)}</div>
          </div>
          <div className="card" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' }}>
            <div style={{ fontSize: '0.875rem', opacity: '0.9', marginBottom: '0.5rem', fontWeight: '600' }}>Paid</div>
            <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{formatCurrency(paidAmount)}</div>
          </div>
          <div className="card" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: 'white' }}>
            <div style={{ fontSize: '0.875rem', opacity: '0.9', marginBottom: '0.5rem', fontWeight: '600' }}>Unpaid</div>
            <div style={{ fontSize: '2.5rem', fontWeight: '800' }}>{formatCurrency(unpaidAmount)}</div>
          </div>
        </div>

        {/* Bills List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {bills.length > 0 ? (
            bills.map((bill) => {
              const statusStyle = getStatusColor(bill.status);
              return (
                <div key={bill.id} className="card" style={{ padding: '2rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--dark)' }}>
                          {formatCurrency(bill.amount)}
                        </h3>
                        <span style={{
                          padding: '0.5rem 1rem',
                          background: statusStyle.bg,
                          color: statusStyle.color,
                          border: `2px solid ${statusStyle.border}`,
                          borderRadius: '16px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          textTransform: 'uppercase'
                        }}>
                          {bill.status}
                        </span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: '600' }}>Doctor</div>
                          <div style={{ fontWeight: '600', color: 'var(--dark)' }}>{bill.doctor_name}</div>
                          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{bill.doctor_specialization}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: '600' }}>Appointment Date</div>
                          <div style={{ fontWeight: '600', color: 'var(--dark)' }}>{bill.appointment_date}</div>
                          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{formatTime(bill.appointment_time)}</div>
                        </div>
                        {bill.payment_date && (
                          <div>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: '600' }}>Payment Date</div>
                            <div style={{ fontWeight: '600', color: '#10b981' }}>{formatDate(bill.payment_date)}</div>
                            {bill.payment_method && (
                              <div style={{ fontSize: '0.875rem', color: '#6b7280', textTransform: 'capitalize' }}>{bill.payment_method}</div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="card" style={{ padding: '4rem', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💵</div>
              <p style={{ fontSize: '1.25rem', color: 'var(--gray)', fontWeight: '600' }}>No bills found</p>
              <p style={{ fontSize: '1rem', color: 'var(--gray)', marginTop: '0.5rem' }}>Your medical bills will appear here</p>
            </div>
          )}
        </div>
      </div>
    </PatientLayout>
  );
};

export default MyBills;
