import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaHome, FaUserMd, FaCalendarAlt, FaHospital, FaFilePrescription, FaSignOutAlt, FaBars, FaTimes, FaUserTie, FaMoneyBillWave, FaEnvelope, FaFileAlt } from "react-icons/fa";
import { useState } from "react";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  const getMenuItems = () => {
    switch (user?.role) {
      case "admin":
        return [
          { icon: <FaHome />, label: "Dashboard", path: "/admin/dashboard" },
          { icon: <FaUserMd />, label: "Doctors", path: "/admin/doctors" },
          { icon: <FaUserTie />, label: "Receptionists", path: "/admin/receptionists" },
          { icon: <FaCalendarAlt />, label: "Appointments", path: "/admin/appointments" },
          { icon: <FaHospital />, label: "Departments", path: "/admin/departments" },
          { icon: <FaMoneyBillWave />, label: "Bills", path: "/admin/bills" },
          { icon: <FaEnvelope />, label: "Contact Messages", path: "/admin/contact-messages" },
        ];
      case "doctor":
        return [
          { icon: <FaHome />, label: "Dashboard", path: "/doctor/dashboard" },
          { icon: <FaCalendarAlt />, label: "Appointments", path: "/doctor/appointments" },
          { icon: <FaFilePrescription />, label: "Prescriptions", path: "/doctor/prescriptions" },
        ];
      case "receptionist":
        return [
          { icon: <FaHome />, label: "Dashboard", path: "/receptionist/dashboard" },
          { icon: <FaCalendarAlt />, label: "Appointments", path: "/receptionist/appointments" },
          { icon: <FaUserMd />, label: "Doctors", path: "/receptionist/doctors" },
          { icon: <FaMoneyBillWave />, label: "Bills", path: "/receptionist/bills" },
        ];
      case "patient":
        return [
          { icon: <FaHome />, label: "Dashboard", path: "/patient/dashboard" },
          { icon: <FaCalendarAlt />, label: "Book Appointment", path: "/patient/book-appointment" },
          { icon: <FaCalendarAlt />, label: "My Appointments", path: "/patient/appointments" },
          { icon: <FaFilePrescription />, label: "Prescriptions", path: "/patient/prescriptions" },
          { icon: <FaMoneyBillWave />, label: "My Bills", path: "/patient/bills" },
          { icon: <FaFileAlt />, label: "Medical Records", path: "/patient/medical-records" },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-lg"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed top-0 left-0 h-screen w-60 transition-transform duration-300 z-40 flex flex-col`}
        style={{
          background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
          color: 'white',
          boxShadow: '4px 0 12px rgba(0, 0, 0, 0.15)'
        }}
      >
        {/* Header */}
        <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.25rem'
            }}>
              <FaHospital />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'white' }}>MediCare</h2>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', textTransform: 'capitalize', marginLeft: '2.5rem' }}>{user?.role} Portal</p>
        </div>

        {/* Menu Items */}
        <nav style={{ flex: 1, padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', overflowY: 'auto' }}>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                padding: '0.625rem 0.75rem',
                borderRadius: '8px',
                transition: 'all 0.3s ease',
                textDecoration: 'none',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                e.currentTarget.style.color = '#60a5fa';
                e.currentTarget.style.transform = 'translateX(5px)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                window.innerWidth < 1024 && setIsOpen(false);
              }}
            >
              <span style={{ fontSize: '1.125rem' }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div style={{ padding: '0.5rem 0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <div style={{ marginBottom: '0.5rem', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px' }}>
            <p style={{ fontWeight: '700', fontSize: '0.875rem', color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</p>
            <p style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.6)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginTop: '0.125rem' }}>{user?.email}</p>
          </div>
          <button
            onClick={logout}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              width: '100%',
              padding: '0.625rem 0.75rem',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: 'white',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '600',
              fontSize: '0.875rem'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #dc2626, #b91c1c)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
        />
      )}
    </>
  );
};

export default Sidebar;
