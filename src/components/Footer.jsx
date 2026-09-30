import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col brand-col">
          <h3 className="footer-logo">THE GENTLEMAN'S CUT</h3>
          <p className="footer-desc">
            The ultimate destination for premium men's grooming and bespoke barbering.
          </p>
        </div>
        
        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#gallery">Gallery</a></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4>Contact</h4>
          <ul>
            <li>123 Barber Lane, NY 10012</li>
            <li>+1 (555) 123-4567</li>
            <li>booking@gentlemanscut.com</li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4>Hours</h4>
          <ul>
            <li>Mon - Fri: 9am - 8pm</li>
            <li>Saturday: 10am - 6pm</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom container">
        <p>&copy; {new Date().getFullYear()} THE GENTLEMAN'S CUT. All rights reserved.</p>
        <div className="social-links">
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
