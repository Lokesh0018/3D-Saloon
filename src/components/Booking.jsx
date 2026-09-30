import React, { useState } from 'react';
import './Booking.css';

const Booking = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: ''
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setStatus('Submitting...');
    setTimeout(() => {
      setStatus('Your appointment request has been received. We will contact you shortly to confirm.');
      setFormData({ name: '', phone: '', service: '', date: '', time: '' });
    }, 1500);
  };

  return (
    <section id="contact" className="section booking">
      <div className="container booking-container">
        <div className="booking-content">
          <h4 className="subtitle text-gold">Reserve</h4>
          <h2>Book your chair</h2>
          <p>
            Experience premium grooming. Reserve your time and let our master barbers craft your signature look.
          </p>
        </div>
        
        <div className="booking-form-wrapper">
          {status && status !== 'Submitting...' ? (
            <div className="booking-success">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <h3>Thank You</h3>
              <p>{status}</p>
              <button className="btn-primary" onClick={() => setStatus('')} style={{marginTop: '2rem'}}>Book Another</button>
            </div>
          ) : (
            <form className="booking-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
              </div>
              <div className="form-group">
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />
              </div>
              <div className="form-group">
                <select name="service" value={formData.service} onChange={handleChange} required>
                  <option value="" disabled>Select a Service</option>
                  <option value="Classic Haircut">Classic Haircut</option>
                  <option value="Skin Fade">Skin Fade</option>
                  <option value="Beard Trim & Sculpt">Beard Trim & Sculpt</option>
                  <option value="Hot Towel Shave">Hot Towel Shave</option>
                  <option value="The Gentleman's Package">The Gentleman's Package</option>
                  <option value="Buzz Cut">Buzz Cut</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <input type="time" name="time" value={formData.time} onChange={handleChange} required />
                </div>
              </div>
              <button type="submit" className="btn-primary filled submit-btn" disabled={status === 'Submitting...'}>
                {status === 'Submitting...' ? 'Processing...' : 'Request Appointment'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Booking;
