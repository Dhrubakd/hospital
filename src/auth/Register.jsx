import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaEnvelope, FaPhone, FaLock, FaCalendar, FaMapMarkerAlt, FaHospital } from "react-icons/fa";

const Register = () => {
  const { register, user } = useAuth();
  const navigateTo = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    dob: "",
    gender: "",
    address: "",
    role: "patient",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Redirect if already logged in
    if (user) {
      navigateTo(`/${user.role}/dashboard`, { replace: true });
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
      await register(formData);
      navigateTo("/patient/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
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
      <div style={{ maxWidth: '900px', width: '100%' }}>
        {/* Logo and Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            fontSize: '2.5rem',
            color: 'white',
            boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)'
          }}>
            <FaHospital />
          </div>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '800', marginBottom: '0.5rem' }}>Create Your Account</h1>
          <p style={{ color: 'var(--gray)', fontSize: '1.05rem' }}>Register as a new patient and start your healthcare journey</p>
        </div>

        {/* Registration Card */}
        <div className="card" style={{ padding: '2.5rem' }}>

          <form onSubmit={handleSubmit}>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaUser style={{ color: 'var(--primary)' }} /> Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaEnvelope style={{ color: 'var(--primary)' }} /> Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaPhone style={{ color: 'var(--primary)' }} /> Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="1234567890"
                />
              </div>
              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaCalendar style={{ color: 'var(--primary)' }} /> Date of Birth
                </label>
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaLock style={{ color: 'var(--primary)' }} /> Password *
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="form-input"
                  placeholder="Min 6 characters"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaMapMarkerAlt style={{ color: 'var(--primary)' }} /> Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={2}
                className="form-input"
                placeholder="Your complete address"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-success"
              style={{ width: '100%', fontSize: '1.125rem', padding: '1rem', marginTop: '1rem' }}
            >
              {loading ? "Creating Account..." : "Create Account & Get Started"}
            </button>
          </form>

          <div style={{ 
            textAlign: 'center', 
            marginTop: '2rem', 
            paddingTop: '1.5rem', 
            borderTop: '1px solid var(--gray-light)' 
          }}>
            <p style={{ color: 'var(--gray)' }}>
              Already have an account?{" "}
              <Link to="/login" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ color: 'var(--primary)', fontWeight: '600' }}>
                Login →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
