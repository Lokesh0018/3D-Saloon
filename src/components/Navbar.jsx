import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container container">
        <div className="logo">
          <a href="#">THE GENTLEMAN'S CUT</a>
        </div>
        
        <div className="nav-links desktop-only">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#gallery">Gallery</a>
          <a href="#contact">Contact</a>
        </div>
        
        <div className="nav-actions desktop-only">
          <button className="btn-primary">Book Now</button>
        </div>
        
        <button className="mobile-toggle mobile-only" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} color="#fff" /> : <Menu size={24} color="#fff" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)}>Services</a>
          <a href="#gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <button className="btn-primary">Book Now</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
