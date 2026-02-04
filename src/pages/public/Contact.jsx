import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaAmbulance, FaComments } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post("/api/contact", formData);
      if (response.data.success) {
        toast.success(response.data.message || "Thank you for contacting us! We'll get back to you soon.");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
        color: 'var(--white)',
        padding: '6rem 1.5rem 4rem',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.5rem',
              fontSize: '2.5rem',
              backdropFilter: 'blur(10px)'
            }}>
              <FaComments />
            </div>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
              fontWeight: '800', 
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              Get In Touch
            </h1>
            <p style={{ fontSize: 'clamp(1.125rem, 2vw, 1.5rem)', opacity: '0.95', lineHeight: '1.6' }}>
              We're here to help. Reach out to us anytime!
            </p>
          </div>
        </div>
      </section>

      <div className="container" style={{ padding: '4rem 1rem' }}>

        {/* Google Maps Section */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: '700', 
            textAlign: 'center', 
            marginBottom: '2rem',
            color: 'var(--dark)'
          }}>
            Find Us on Map
          </h2>
          <div style={{ 
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d225164.75917730594!2d82.13556873869489!3d28.14041854340938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3997f48067888c31%3A0xf0fd3f01e7a94104!2sTulsipur!5e0!3m2!1sen!2snp!4v1770189688224!5m2!1sen!2snp" 
              width="100%" 
              height="450" 
              style={{ border: 0 }}
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="grid-2" style={{ gap: '2rem', alignItems: 'start' }}>
          {/* Contact Form */}
          <div className="card">
            <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1.5rem' }}>Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address *</label>
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
                <label className="form-label">Phone Number</label>
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
                <label className="form-label">Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="How can we help?"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Your Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="form-input"
                  placeholder="Tell us more about your query..."
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', fontSize: '1.125rem' }} disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card">
              <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1.5rem' }}>Contact Information</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ 
                    width: '56px',
                    height: '56px',
                    minWidth: '56px',
                    background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem'
                  }}>
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: '700', marginBottom: '0.5rem', fontSize: '1.125rem' }}>Address</h3>
                    <p style={{ color: 'var(--gray)', lineHeight: '1.6' }}>123 Medical Center Drive<br />New York, NY 10001</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ 
                    width: '56px',
                    height: '56px',
                    minWidth: '56px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem'
                  }}>
                    <FaPhone />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: '700', marginBottom: '0.5rem', fontSize: '1.125rem' }}>Phone</h3>
                    <p style={{ color: 'var(--gray)', lineHeight: '1.6' }}>Main: (555) 123-4567<br />Emergency: (555) 999-9999</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ 
                    width: '56px',
                    height: '56px',
                    minWidth: '56px',
                    background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem'
                  }}>
                    <FaEnvelope />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: '700', marginBottom: '0.5rem', fontSize: '1.125rem' }}>Email</h3>
                    <p style={{ color: 'var(--gray)', lineHeight: '1.6' }}>info@medicare.com<br />support@medicare.com</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ 
                    width: '56px',
                    height: '56px',
                    minWidth: '56px',
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem'
                  }}>
                    <FaClock />
                  </div>
                  <div>
                    <h3 style={{ fontWeight: '700', marginBottom: '0.5rem', fontSize: '1.125rem' }}>Working Hours</h3>
                    <p style={{ color: 'var(--gray)', lineHeight: '1.6' }}>Mon - Fri: 8:00 AM - 8:00 PM<br />Sat - Sun: 9:00 AM - 5:00 PM<br />Emergency: 24/7</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Section */}
            <div style={{ 
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              borderRadius: 'var(--radius-lg)',
              padding: '2rem',
              color: 'white',
              boxShadow: '0 10px 30px rgba(239, 68, 68, 0.3)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <FaAmbulance style={{ fontSize: '2.5rem' }} />
                <h3 style={{ fontSize: '1.75rem', fontWeight: '800' }}>Emergency?</h3>
              </div>
              <p style={{ marginBottom: '1.5rem', fontSize: '1.05rem', opacity: '0.95' }}>If you have a medical emergency, call us immediately or visit our ER</p>
              <a href="tel:5559999999" className="btn" style={{
                background: 'var(--white)',
                color: 'var(--danger)',
                fontWeight: '700',
                fontSize: '1.125rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FaPhone /> Call Emergency: (555) 999-9999
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
