import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GiCyberEye } from 'react-icons/gi';
import { FiHome, FiShield, FiClock, FiInfo, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: <FiHome /> },
    { path: '/features', label: 'Features', icon: <FiShield /> },
    { path: '/history', label: 'History', icon: <FiClock /> },
    { path: '/about', label: 'About', icon: <FiInfo /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar-pro ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container-pro">
        <Link to="/" className="logo-pro">
          <div className="logo-icon-pro">
            <GiCyberEye />
          </div>
          <span className="logo-text-pro">Secure<span>Scan</span></span>
        </Link>

        <div className={`nav-menu-pro ${isMobileMenuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item-pro ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <button 
          className="mobile-menu-btn-pro"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
