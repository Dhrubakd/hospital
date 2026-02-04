import { useState, useEffect } from "react";
import PatientLayout from "../../layouts/PatientLayout";
import axios from "../../api/axios";
import { toast } from "react-toastify";
import { formatDate, formatTime } from "../../utils/formatters";

const MyMedicalRecords = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get("/medical-records/my-records");
      if (response.data.success) {
        setRecords(response.data.records);
      }
    } catch (error) {
      toast.error("Failed to fetch medical records");
    }
  };

  const getRecordTypeInfo = (type) => {
    switch (type) {
      case "lab_report": return { icon: "🧪", label: "Lab Report", color: "#3b82f6" };
      case "xray": return { icon: "📷", label: "X-Ray", color: "#8b5cf6" };
      case "scan": return { icon: "🔍", label: "Scan", color: "#10b981" };
      case "other": return { icon: "📄", label: "Other", color: "#6b7280" };
      default: return { icon: "📋", label: type, color: "#6b7280" };
    }
  };

  return (
    <PatientLayout>
      <div>
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            📋 My Medical Records
          </h1>
          <p style={{ color: 'var(--gray)', fontSize: '1.1rem', fontWeight: '500' }}>
            View your medical reports and test results
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {records.length > 0 ? (
            records.map((record) => {
              const typeInfo = getRecordTypeInfo(record.record_type);
              return (
                <div key={record.id} className="card" style={{ padding: '2rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '2rem', alignItems: 'start' }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      background: `${typeInfo.color}20`,
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem'
                    }}>
                      {typeInfo.icon}
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--dark)' }}>
                          {typeInfo.label}
                        </h3>
                        <span style={{
                          padding: '0.5rem 1rem',
                          background: `${typeInfo.color}20`,
                          color: typeInfo.color,
                          border: `2px solid ${typeInfo.color}40`,
                          borderRadius: '16px',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          textTransform: 'uppercase'
                        }}>
                          {record.record_type.replace('_', ' ')}
                        </span>
                      </div>
                      {record.description && (
                        <p style={{ color: '#6b7280', marginBottom: '1rem', lineHeight: '1.6' }}>
                          {record.description}
                        </p>
                      )}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                        {record.doctor_name && (
                          <div>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: '600' }}>Doctor</div>
                            <div style={{ fontWeight: '600', color: 'var(--dark)' }}>{record.doctor_name}</div>
                            {record.specialization && (
                              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{record.specialization}</div>
                            )}
                          </div>
                        )}
                        {record.appointment_date && (
                          <div>
                            <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: '600' }}>Appointment Date</div>
                            <div style={{ fontWeight: '600', color: 'var(--dark)' }}>
                              {record.appointment_date} {record.appointment_time && `• ${formatTime(record.appointment_time)}`}
                            </div>
                          </div>
                        )}
                        <div>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.25rem', textTransform: 'uppercase', fontWeight: '600' }}>Record Date</div>
                          <div style={{ fontWeight: '600', color: 'var(--dark)' }}>
                            {formatDate(record.created_at)}
                          </div>
                        </div>
                      </div>
                    </div>
                    {record.file_url && (
                      <a
                        href={record.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '0.875rem 1.5rem',
                          background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          fontSize: '0.9rem',
                          fontWeight: '700',
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          transition: 'all 0.2s'
                        }}
                      >
                        📥 Download
                      </a>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="card" style={{ padding: '4rem', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📋</div>
              <p style={{ fontSize: '1.25rem', color: 'var(--gray)', fontWeight: '600' }}>No medical records found</p>
              <p style={{ fontSize: '1rem', color: 'var(--gray)', marginTop: '0.5rem' }}>Your medical records will appear here</p>
            </div>
          )}
        </div>
      </div>
    </PatientLayout>
  );
};

export default MyMedicalRecords;
