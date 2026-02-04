import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from '../assets/logo.jpg';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="navbar" style={{ height: '70px' }}>
      <div className="navbar-container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        height: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 1.5rem'
      }}>
        {/* Logo */}
        <Link to="/" onClick={handleLinkClick} style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem',
          textDecoration: 'none'
        }}>
          <img 
            src={logo} 
            alt="MediCare Hospital Logo" 
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              objectFit: 'cover',
              boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
            }}
          />
          <span style={{ 
            color: 'var(--dark)',
            fontWeight: '700',
            fontSize: '1.25rem',
            letterSpacing: '-0.5px'
          }}>
            MediCare <span style={{ color: 'var(--primary)', fontWeight: '800' }}>Hospital</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '2rem'
        }} className="desktop-menu">
          <Link
            to="/"
            onClick={handleLinkClick}
            style={{
              color: isActive("/") ? 'var(--primary)' : 'var(--dark)',
              fontWeight: isActive("/") ? '600' : '500',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              fontSize: '0.95rem'
            }}
            className="nav-link"
          >
            Home
          </Link>
          <Link
            to="/about"
            onClick={handleLinkClick}
            style={{
              color: isActive("/about") ? 'var(--primary)' : 'var(--dark)',
              fontWeight: isActive("/about") ? '600' : '500',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              fontSize: '0.95rem'
            }}
            className="nav-link"
          >
            About
          </Link>
          <Link
            to="/doctors"
            onClick={handleLinkClick}
            style={{
              color: isActive("/doctors") ? 'var(--primary)' : 'var(--dark)',
              fontWeight: isActive("/doctors") ? '600' : '500',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              fontSize: '0.95rem'
            }}
            className="nav-link"
          >
            Doctors
          </Link>
          <Link
            to="/services"
            onClick={handleLinkClick}
            style={{
              color: isActive("/services") ? 'var(--primary)' : 'var(--dark)',
              fontWeight: isActive("/services") ? '600' : '500',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              fontSize: '0.95rem'
            }}
            className="nav-link"
          >
            Services
          </Link>
          <Link
            to="/departments"
            onClick={handleLinkClick}
            style={{
              color: isActive("/departments") ? 'var(--primary)' : 'var(--dark)',
              fontWeight: isActive("/departments") ? '600' : '500',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              fontSize: '0.95rem'
            }}
            className="nav-link"
          >
            Departments
          </Link>
          <Link
            to="/contact"
            onClick={handleLinkClick}
            style={{
              color: isActive("/contact") ? 'var(--primary)' : 'var(--dark)',
              fontWeight: isActive("/contact") ? '600' : '500',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
              fontSize: '0.95rem'
            }}
            className="nav-link"
          >
            Contact
          </Link>
          <Link to="/login" onClick={handleLinkClick} className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', textDecoration: 'none' }}>
            Login
          </Link>
          <Link to="/register" onClick={handleLinkClick} className="btn btn-success" style={{ padding: '0.5rem 1.25rem', textDecoration: 'none' }}>
            Register
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          style={{
            display: 'none',
            fontSize: '1.5rem',
            color: 'var(--dark)',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
          className="mobile-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div style={{
          display: 'none',
          padding: '1.5rem 0',
          borderTop: '1px solid var(--gray-light)',
          background: 'var(--white)'
        }} className="mobile-menu">
          <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link
              to="/"
              style={{
                color: isActive("/") ? 'var(--primary)' : 'var(--dark)',
                fontWeight: isActive("/") ? '600' : '500',
                textDecoration: 'none',
                padding: '0.5rem 0'
              }}
              onClick={() => { setIsOpen(false); handleLinkClick(); }}
            >
              Home
            </Link>
            <Link
              to="/about"
              style={{
                color: isActive("/about") ? 'var(--primary)' : 'var(--dark)',
                fontWeight: isActive("/about") ? '600' : '500',
                textDecoration: 'none',
                padding: '0.5rem 0'
              }}
              onClick={() => { setIsOpen(false); handleLinkClick(); }}
            >
              About
            </Link>
            <Link
              to="/doctors"
              style={{
                color: isActive("/doctors") ? 'var(--primary)' : 'var(--dark)',
                fontWeight: isActive("/doctors") ? '600' : '500',
                textDecoration: 'none',
                padding: '0.5rem 0'
              }}
              onClick={() => { setIsOpen(false); handleLinkClick(); }}
            >
              Doctors
            </Link>
            <Link
              to="/services"
              style={{
                color: isActive("/services") ? 'var(--primary)' : 'var(--dark)',
                fontWeight: isActive("/services") ? '600' : '500',
                textDecoration: 'none',
                padding: '0.5rem 0'
              }}
              onClick={() => { setIsOpen(false); handleLinkClick(); }}
            >
              Services
            </Link>
            <Link
              to="/departments"
              style={{
                color: isActive("/departments") ? 'var(--primary)' : 'var(--dark)',
                fontWeight: isActive("/departments") ? '600' : '500',
                textDecoration: 'none',
                padding: '0.5rem 0'
              }}
              onClick={() => { setIsOpen(false); handleLinkClick(); }}
            >
              Departments
            </Link>
            <Link
              to="/contact"
              style={{
                color: isActive("/contact") ? 'var(--primary)' : 'var(--dark)',
                fontWeight: isActive("/contact") ? '600' : '500',
                textDecoration: 'none',
                padding: '0.5rem 0'
              }}
              onClick={() => { setIsOpen(false); handleLinkClick(); }}
            >
              Contact
            </Link>
            <Link to="/login" className="btn btn-primary" style={{ textAlign: 'center', textDecoration: 'none' }} onClick={() => { setIsOpen(false); handleLinkClick(); }}>
              Login
            </Link>
            <Link to="/register" className="btn btn-success" style={{ textAlign: 'center', textDecoration: 'none' }} onClick={() => { setIsOpen(false); handleLinkClick(); }}>
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
