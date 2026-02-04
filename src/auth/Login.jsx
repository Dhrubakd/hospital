import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaEnvelope, FaLock, FaHospital } from "react-icons/fa";

const Login = () => {
  const { login, user } = useAuth();
  const navigateTo = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      const dashboard = `/${user.role}/dashboard`;
      navigateTo(dashboard, { replace: true });
    }
  }, [user, navigateTo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLoading(true);
    
    try {
      const userData = await login(formData.email, formData.password);
      console.log("User data after login:", userData);
      
      // Use setTimeout to ensure state is updated before redirect
      setTimeout(() => {
        const redirectPath = `/${userData.role}/dashboard`;
        console.log("Redirecting to:", redirectPath);
        window.location.href = redirectPath;
      }, 100);
    } catch (error) {
      console.error("Login error:", error);
      setLoading(false);
    }
  };

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      padding: '6rem 1rem 3rem',
      paddingTop: 'calc(70px + 3rem)'
    }}>
      <div style={{ maxWidth: '480px', width: '100%' }}>
        {/* Logo and Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            fontSize: '2.5rem',
            color: 'white',
            boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
          }}>
            <FaHospital />
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '0.5rem' }}>Welcome Back</h1>
          <p style={{ color: 'var(--gray)', fontSize: '1.05rem' }}>Login to access your dashboard</p>
        </div>

        {/* Login Card */}
        <div className="card" style={{ padding: '2.5rem' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaEnvelope style={{ color: 'var(--primary)' }} /> Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="your@email.com"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaLock style={{ color: 'var(--primary)' }} /> Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="••••••••"
              />
            </div>

            <div style={{ marginBottom: '1.5rem', textAlign: 'right' }}>
              <a href="#" style={{ color: 'var(--primary)', fontSize: '0.875rem', fontWeight: '500' }}>
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', fontSize: '1.125rem', padding: '1rem' }}
            >
              {loading ? "Logging in..." : "Login to Dashboard"}
            </button>
          </form>

          <div style={{ 
            textAlign: 'center', 
            marginTop: '2rem', 
            paddingTop: '1.5rem', 
            borderTop: '1px solid var(--gray-light)' 
          }}>
            <p style={{ color: 'var(--gray)' }}>
              Don't have an account?{" "}
              <Link to="/register" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ color: 'var(--primary)', fontWeight: '600' }}>
                Register as Patient →
              </Link>
            </p>
          </div>
        </div>

        {/* Demo Credentials Info */}
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'rgba(59, 130, 246, 0.1)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(59, 130, 246, 0.2)',
          textAlign: 'center',
          fontSize: '0.875rem',
          color: 'var(--gray)'
        }}>
          <strong>Demo Credentials:</strong>
          <div style={{ marginTop: '0.5rem' }}>Admin: admin@hospital.com | Doctor: doctor1@hospital.com</div>
          <div style={{ fontSize: '0.8rem', marginTop: '0.25rem', opacity: '0.8' }}>Password: password123</div>
        </div>
      </div>
    </section>
  );
};

export default Login;
