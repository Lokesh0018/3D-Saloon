import React from 'react';
import { MapPin, Mail, Phone, ArrowRight } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col brand-col">
          <div className="footer-brand-header">
            <img src="/favicon.jpg" alt="Logo" className="footer-logo-img" />
            <h3 className="footer-logo">THE GENTLEMAN'S CUT</h3>
          </div>
          <p className="footer-desc">
            The ultimate destination for premium men's grooming and bespoke barbering. Experience the art of traditional craftsmanship.
          </p>
          <div className="newsletter-box">
            <input type="email" placeholder="Join our VIP list" />
            <button><ArrowRight size={20} /></button>
          </div>
        </div>
        
        <div className="footer-col">
          <h4>Explore</h4>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#gallery">Portfolio</a></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4>Contact</h4>
          <ul className="contact-links">
            <li><MapPin size={16}/> 123 Barber Lane, NY 10012</li>
            <li><Phone size={16}/> +1 (555) 123-4567</li>
            <li><Mail size={16}/> booking@gentlemanscut.com</li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4>Hours</h4>
          <ul className="hours-links">
            <li><span>Mon - Fri</span> <span>9am - 8pm</span></li>
            <li><span>Saturday</span> <span>10am - 6pm</span></li>
            <li><span>Sunday</span> <span className="text-gold">Closed</span></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom container">
        <p>&copy; {new Date().getFullYear()} THE GENTLEMAN'S CUT. Crafted with precision.</p>
        <div className="social-links">
          <a href="#" aria-label="Instagram"><span className="social-text">IG</span></a>
          <a href="#" aria-label="Facebook"><span className="social-text">FB</span></a>
          <a href="#" aria-label="Twitter"><span className="social-text">X</span></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
