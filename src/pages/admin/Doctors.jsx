import { useEffect, useState } from "react";
import axios from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";
import { toast } from "react-toastify";
import { FaUserMd, FaPhone, FaEnvelope, FaDollarSign, FaHospital, FaAward, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import DoctorFormModal from "../../components/modals/DoctorFormModal";
import ConfirmModal from "../../components/modals/ConfirmModal";
import { formatCurrencyShort } from "../../utils/formatters";

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get("/doctors");
      setDoctors(data.doctors || []);
    } catch (error) {
      toast.error("Failed to fetch doctors");
    } finally {
      setLoading(false);
    }
  };

  const handleAddDoctor = () => {
    setSelectedDoctor(null);
    setIsFormModalOpen(true);
  };

  const handleEditDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (doctor) => {
    setSelectedDoctor(doctor);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`/doctors/${selectedDoctor.id}`);
      toast.success("Doctor deleted successfully");
      fetchDoctors();
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete doctor");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleFormSuccess = () => {
    fetchDoctors();
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

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '0.5rem' }}>Doctors Management</h1>
            <p style={{ color: 'var(--gray)', fontSize: '1rem' }}>Manage and view all doctors in the system</p>
          </div>
          <button
            onClick={handleAddDoctor}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.875rem 1.5rem',
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(59, 130, 246, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <FaPlus /> Add New Doctor
          </button>
        </div>

        {/* Stats */}
        <div className="grid-3" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: 'white' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaUserMd /></div>
            <div className="stat-value" style={{ color: 'white' }}>{doctors.length}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Total Doctors</div>
          </div>
          <div className="stat-card green" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaHospital /></div>
            <div className="stat-value" style={{ color: 'white' }}>{new Set(doctors.map(d => d.department)).size}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Departments</div>
          </div>
          <div className="stat-card purple" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', color: 'white' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaAward /></div>
            <div className="stat-value" style={{ color: 'white' }}>{Math.round(doctors.reduce((acc, d) => acc + d.experience_years, 0) / doctors.length) || 0}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Avg Experience</div>
          </div>
        </div>

        {/* Doctors Grid */}
        {doctors.length > 0 ? (
          <div className="grid-3" style={{ gap: '1.5rem' }}>
            {doctors.map((doctor) => (
              <div key={doctor.id} className="card" style={{ padding: 0, overflow: 'hidden', transition: 'all 0.3s ease', border: '2px solid transparent' }} onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'var(--primary)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }} onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.boxShadow = 'var(--shadow)';
              }}>
                {/* Header */}
                <div style={{
                  background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                  padding: '1.5rem',
                  color: 'white',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: '50%',
                    margin: '0 auto 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    backdropFilter: 'blur(10px)',
                    border: '3px solid rgba(255, 255, 255, 0.3)'
                  }}>
                    <FaUserMd />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>{doctor.name}</h3>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '0.4rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    display: 'inline-block',
                    fontSize: '0.9rem',
                    backdropFilter: 'blur(10px)'
                  }}>
                    {doctor.specialization}
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '35px',
                        height: '35px',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.9rem'
                      }}>
                        <FaHospital />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gray)', marginBottom: '0.125rem' }}>Department</div>
                        <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{doctor.department}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '35px',
                        height: '35px',
                        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.9rem'
                      }}>
                        <FaDollarSign />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gray)', marginBottom: '0.125rem' }}>Consultation Fee</div>
                        <div style={{ fontWeight: '700', fontSize: '1rem', color: 'var(--secondary)' }}>{formatCurrencyShort(doctor.consultation_fee)}</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{
                        width: '35px',
                        height: '35px',
                        background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.9rem'
                      }}>
                        <FaAward />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--gray)', marginBottom: '0.125rem' }}>Experience</div>
                        <div style={{ fontWeight: '600', fontSize: '0.9rem' }}>{doctor.experience_years} Years</div>
                      </div>
                    </div>
                  </div>

                  <div style={{
                    padding: '1rem',
                    background: 'var(--light)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--gray)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FaPhone /> {doctor.phone}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--gray)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FaEnvelope /> {doctor.email}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      onClick={() => handleEditDoctor(doctor)}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.2s',
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(doctor)}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        transition: 'all 0.2s',
                      }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👨‍⚕️</div>
            <p style={{ fontSize: '1.25rem', color: 'var(--gray)' }}>No doctors found</p>
          </div>
        )}

        {/* Modals */}
        <DoctorFormModal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          doctor={selectedDoctor}
          onSuccess={handleFormSuccess}
        />
        <ConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete Doctor"
          message={`Are you sure you want to delete Dr. ${selectedDoctor?.name}? This action cannot be undone.`}
          loading={deleteLoading}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminDoctors;
