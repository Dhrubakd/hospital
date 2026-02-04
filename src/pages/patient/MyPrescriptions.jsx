import { useState, useEffect } from "react";
import PatientLayout from "../../layouts/PatientLayout";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import { formatDate, formatTime } from "../../utils/formatters";

const MyPrescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get("/prescriptions/patient");
      if (response.data.success) {
        setPrescriptions(response.data.prescriptions);
      }
    } catch (error) {
      toast.error("Failed to fetch prescriptions");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <PatientLayout>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
          <div style={{ fontSize: '1.5rem', color: 'var(--gray)' }}>Loading...</div>
        </div>
      </PatientLayout>
    );
  }

  return (
    <PatientLayout>
      <div>
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            💊 My Prescriptions
          </h1>
          <p style={{ color: 'var(--gray)', fontSize: '1.1rem', fontWeight: '500' }}>
            View your prescription history and medications
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {prescriptions.length > 0 ? (
            prescriptions.map((prescription) => (
              <div key={prescription.id} className="card" style={{ padding: '2rem' }}>
                <div style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '2px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '0.5rem' }}>
                        Prescription #{prescription.id}
                      </h3>
                      <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {formatDate(prescription.created_at)}
                      </p>
                    </div>
                    <span style={{
                      padding: '0.5rem 1.25rem',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: 'white',
                      borderRadius: '20px',
                      fontSize: '0.875rem',
                      fontWeight: '700',
                      textTransform: 'uppercase'
                    }}>
                      Prescribed
                    </span>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: '600' }}>Doctor</div>
                      <div style={{ fontWeight: '700', color: 'var(--dark)' }}>{prescription.doctor_name}</div>
                      {prescription.doctor_specialization && (
                        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{prescription.doctor_specialization}</div>
                      )}
                    </div>
                    {prescription.appointment_date && (
                      <div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: '600' }}>Appointment</div>
                        <div style={{ fontWeight: '600', color: 'var(--dark)' }}>
                          {prescription.appointment_date}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {prescription.diagnosis && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--dark)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      🩺 Diagnosis
                    </h4>
                    <div style={{ 
                      padding: '1.25rem', 
                      background: '#f9fafb', 
                      borderRadius: '12px',
                      border: '1px solid #e5e7eb',
                      lineHeight: '1.7',
                      color: '#374151'
                    }}>
                      {prescription.diagnosis}
                    </div>
                  </div>
                )}

                <div style={{ marginBottom: '1.5rem' }}>
                  <h4 style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--dark)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    💊 Medicines
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {JSON.parse(prescription.medicines || '[]').map((medicine, idx) => (
                      <div key={idx} style={{
                        padding: '1.25rem',
                        background: 'linear-gradient(to right, #eff6ff, #dbeafe)',
                        borderRadius: '12px',
                        border: '2px solid #bfdbfe',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                        gap: '1rem'
                      }}>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#1e40af', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: '600' }}>Medicine</div>
                          <div style={{ fontWeight: '700', color: '#1e3a8a', fontSize: '1.125rem' }}>{medicine.name}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#1e40af', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: '600' }}>Dose</div>
                          <div style={{ fontWeight: '600', color: '#1e3a8a' }}>{medicine.dose}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#1e40af', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: '600' }}>Frequency</div>
                          <div style={{ fontWeight: '600', color: '#1e3a8a' }}>{medicine.frequency}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#1e40af', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: '600' }}>Duration</div>
                          <div style={{ fontWeight: '600', color: '#1e3a8a' }}>{medicine.days} days</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {prescription.notes && (
                  <div style={{
                    padding: '1.25rem',
                    background: '#fef3c7',
                    borderRadius: '12px',
                    border: '2px solid #fde047',
                  }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: '700', color: '#854d0e', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      📝 Notes / Instructions
                    </h4>
                    <p style={{ color: '#78350f', lineHeight: '1.6' }}>{prescription.notes}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="card" style={{ padding: '4rem', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>💊</div>
              <p style={{ fontSize: '1.25rem', color: 'var(--gray)', fontWeight: '600' }}>No prescriptions found</p>
              <p style={{ fontSize: '1rem', color: 'var(--gray)', marginTop: '0.5rem' }}>Your prescriptions will appear here after doctor consultations</p>
            </div>
          )}
        </div>
      </div>
    </PatientLayout>
  );
};

export default MyPrescriptions;
