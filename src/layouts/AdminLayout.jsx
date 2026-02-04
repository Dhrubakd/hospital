import Sidebar from "../components/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--light)' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '2rem', marginLeft: '260px', overflowY: 'auto' }}>{children}</main>
    </div>
  );
};

export default AdminLayout;
