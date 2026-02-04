import { useEffect, useState } from "react";
import axios from "../../api/axios";
import AdminLayout from "../../layouts/AdminLayout";
import { toast } from "react-toastify";
import { FaHospital, FaUserMd, FaHeartbeat, FaBrain, FaBone, FaBaby, FaEye, FaTooth, FaStethoscope, FaMicroscope, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import DepartmentFormModal from "../../components/modals/DepartmentFormModal";
import ConfirmModal from "../../components/modals/ConfirmModal";

const AdminDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const { data } = await axios.get("/departments");
      setDepartments(data.departments || []);
    } catch (error) {
      toast.error("Failed to fetch departments");
    } finally {
      setLoading(false);
    }
  };

  const handleAddDepartment = () => {
    setSelectedDepartment(null);
    setIsFormModalOpen(true);
  };

  const handleEditDepartment = (dept) => {
    setSelectedDepartment(dept);
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (dept) => {
    setSelectedDepartment(dept);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    try {
      await axios.delete(`/departments/${selectedDepartment.id}`);
      toast.success("Department deleted successfully");
      fetchDepartments();
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete department");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleFormSuccess = () => {
    fetchDepartments();
  };

  const departmentIcons = {
    'Cardiology': FaHeartbeat,
    'Neurology': FaBrain,
    'Orthopedics': FaBone,
    'Pediatrics': FaBaby,
    'Ophthalmology': FaEye,
    'Dentistry': FaTooth,
    'Pulmonology': FaStethoscope,
    'General Medicine': FaMicroscope
  };

  const colors = [
    { gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)', light: '#eff6ff' },
    { gradient: 'linear-gradient(135deg, #10b981, #059669)', light: '#ecfdf5' },
    { gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', light: '#f5f3ff' },
    { gradient: 'linear-gradient(135deg, #ec4899, #db2777)', light: '#fdf2f8' },
    { gradient: 'linear-gradient(135deg, #f59e0b, #d97706)', light: '#fffbeb' },
    { gradient: 'linear-gradient(135deg, #ef4444, #dc2626)', light: '#fef2f2' },
    { gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)', light: '#ecfeff' },
    { gradient: 'linear-gradient(135deg, #84cc16, #65a30d)', light: '#f7fee7' }
  ];

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
            <h1 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--dark)', marginBottom: '0.5rem' }}>Departments Management</h1>
            <p style={{ color: 'var(--gray)', fontSize: '1rem' }}>Manage hospital departments and their details</p>
          </div>
          <button
            onClick={handleAddDepartment}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.875rem 1.5rem',
              background: 'linear-gradient(135deg, #f59e0b, #d97706)',
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
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(245, 158, 11, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <FaPlus /> Add New Department
          </button>
        </div>

        {/* Stats */}
        <div className="grid-3" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
          <div className="stat-card" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)', color: 'white' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaHospital /></div>
            <div className="stat-value" style={{ color: 'white' }}>{departments.length}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Total Departments</div>
          </div>
          <div className="stat-card green" style={{ background: 'linear-gradient(135deg, #10b981, #059669)', color: 'white' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaUserMd /></div>
            <div className="stat-value" style={{ color: 'white' }}>{departments.filter(d => d.status === 'active').length}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Active Departments</div>
          </div>
          <div className="stat-card purple" style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', color: 'white' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><FaStethoscope /></div>
            <div className="stat-value" style={{ color: 'white' }}>{departments.reduce((acc, d) => acc + (d.doctor_count || 0), 0)}</div>
            <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>Total Doctors</div>
          </div>
        </div>

        {/* Departments Grid */}
        {departments.length > 0 ? (
          <div className="grid-3" style={{ gap: '1.5rem' }}>
            {departments.map((dept, index) => {
              const Icon = departmentIcons[dept.name] || FaHospital;
              const colorScheme = colors[index % colors.length];
              
              return (
                <div key={dept.id} className="card" style={{ padding: 0, overflow: 'hidden', transition: 'all 0.3s ease', border: '2px solid transparent' }} onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = colorScheme.gradient.split('(')[1].split(',')[0].split('#')[1];
                  e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                }} onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'transparent';
                  e.currentTarget.style.boxShadow = 'var(--shadow)';
                }}>
                  {/* Header */}
                  <div style={{
                    background: colorScheme.gradient,
                    padding: '2rem 1.5rem',
                    color: 'white',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      position: 'absolute',
                      top: '-20px',
                      right: '-20px',
                      width: '120px',
                      height: '120px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '50%'
                    }}></div>
                    
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div style={{
                        width: '70px',
                        height: '70px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        borderRadius: '15px',
                        margin: '0 auto 1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        backdropFilter: 'blur(10px)',
                        border: '2px solid rgba(255, 255, 255, 0.3)'
                      }}>
                        <Icon />
                      </div>
                      <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.25rem' }}>{dept.name}</h3>
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ padding: '1.5rem' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--gray)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                      {dept.description || 'Providing specialized medical care and treatment for patients'}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1rem' }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem',
                        background: colorScheme.light,
                        borderRadius: 'var(--radius-md)'
                      }}>
                        <span style={{ fontSize: '0.875rem', color: 'var(--gray)', fontWeight: '500' }}>Doctors</span>
                        <span style={{ fontSize: '1.125rem', fontWeight: '700', color: 'var(--dark)' }}>{dept.doctor_count || 0}</span>
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.75rem',
                        background: colorScheme.light,
                        borderRadius: 'var(--radius-md)'
                      }}>
                        <span style={{ fontSize: '0.875rem', color: 'var(--gray)', fontWeight: '500' }}>Status</span>
                        <span className={`badge ${dept.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                          {dept.status || 'Active'}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button
                        onClick={() => handleEditDepartment(dept)}
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
                        onClick={() => handleDeleteClick(dept)}
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
              );
            })}
          </div>
        ) : (
          <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🏥</div>
            <p style={{ fontSize: '1.25rem', color: 'var(--gray)' }}>No departments found</p>
          </div>
        )}

        {/* Modals */}
        <DepartmentFormModal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          department={selectedDepartment}
          onSuccess={handleFormSuccess}
        />
        <ConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Delete Department"
          message={`Are you sure you want to delete ${selectedDepartment?.name}? This action cannot be undone.`}
          loading={deleteLoading}
        />
      </div>
    </AdminLayout>
  );
};

export default AdminDepartments;
