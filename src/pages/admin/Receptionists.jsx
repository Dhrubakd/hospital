import { useEffect, useState } from "react";
import axios from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";
import { toast } from "react-toastify";
import { FaUser, FaPhone, FaEnvelope, FaPlus, FaEdit, FaTrash, FaUserTie } from "react-icons/fa";
import ReceptionistFormModal from "../../components/modals/ReceptionistFormModal";
import ConfirmModal from "../../components/modals/ConfirmModal";

const AdminReceptionists = () => {
  const [receptionists, setReceptionists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedReceptionist, setSelectedReceptionist] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchReceptionists();
  }, []);

  const fetchReceptionists = async () => {
    try {
      const { data } = await axios.get("/admin/receptionists");
      setReceptionists(data.receptionists || []);
    } catch (error) {
      toast.error("Failed to fetch receptionists");
    } finally {
      setLoading(false);
    }
  };

  const handleAddReceptionist = () => {
    setSelectedReceptionist(null);
    setIsFormModalOpen(true);
  };

  const handleEditReceptionist = (receptionist) => {
    setSelectedReceptionist(receptionist);
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (receptionist) => {
    setSelectedReceptionist(receptionist);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`/admin/receptionists/${selectedReceptionist.id}`);
      toast.success("Receptionist deleted successfully");
      fetchReceptionists();
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete receptionist");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleFormSuccess = () => {
    fetchReceptionists();
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
            <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '0.5rem' }}>Receptionists Management</h1>
            <p style={{ color: 'var(--gray)', fontSize: '1rem' }}>Manage and view all receptionists in the system</p>
          </div>
          <button
            onClick={handleAddReceptionist}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.875rem 1.5rem',
              background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
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
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(139, 92, 246, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <FaPlus /> Add New Receptionist
          </button>
        </div>

        {/* Stats */}
        <div className="grid-3" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', color: 'white' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaUserTie /></div>
            <div className="stat-value" style={{ color: 'white' }}>{receptionists.length}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Total Receptionists</div>
          </div>
          <div className="stat-card green" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaUser /></div>
            <div className="stat-value" style={{ color: 'white' }}>{receptionists.filter(r => r.is_active).length}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Active Staff</div>
          </div>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: 'white' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaPhone /></div>
            <div className="stat-value" style={{ color: 'white' }}>{receptionists.length}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Contact Points</div>
          </div>
        </div>

        {/* Receptionists Grid */}
        {receptionists.length > 0 ? (
          <div className="grid-3" style={{ gap: '1.5rem' }}>
            {receptionists.map((receptionist) => (
              <div key={receptionist.id} className="card" style={{ padding: 0, overflow: 'hidden', transition: 'all 0.3s ease', border: '2px solid transparent' }} onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = '#8b5cf6';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }} onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.boxShadow = 'var(--shadow)';
              }}>
                {/* Header */}
                <div style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
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
                    <FaUserTie />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>{receptionist.name}</h3>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    padding: '0.4rem 1rem',
                    borderRadius: 'var(--radius-full)',
                    display: 'inline-block',
                    fontSize: '0.9rem',
                    backdropFilter: 'blur(10px)'
                  }}>
                    Receptionist
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: '1.5rem' }}>
                  <div style={{
                    padding: '1rem',
                    background: 'var(--light)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1rem'
                  }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--gray)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{
                        width: '30px',
                        height: '30px',
                        background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.8rem'
                      }}>
                        <FaPhone />
                      </div>
                      <span style={{ flex: 1 }}>{receptionist.phone}</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--gray)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{
                        width: '30px',
                        height: '30px',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '0.8rem'
                      }}>
                        <FaEnvelope />
                      </div>
                      <span style={{ flex: 1, wordBreak: 'break-all' }}>{receptionist.email}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      onClick={() => handleEditReceptionist(receptionist)}
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
                      onClick={() => handleDeleteClick(receptionist)}
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
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👔</div>
            <p style={{ fontSize: '1.25rem', color: 'var(--gray)' }}>No receptionists found</p>
          </div>
        )}

        {/* Modals */}
        <ReceptionistFormModal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          receptionist={selectedReceptionist}
          onSuccess={handleFormSuccess}
        />
        <ConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete Receptionist"
          message={`Are you sure you want to delete ${selectedReceptionist?.name}? This action cannot be undone.`}
          loading={deleteLoading}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminReceptionists;
