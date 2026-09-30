import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  { id: 1, name: 'Classic Haircut', desc: 'Precision cut tailored to your style.' },
  { id: 2, name: 'Skin Fade', desc: 'Seamless blending for a sharp, modern look.' },
  { id: 3, name: 'Beard Trim & Sculpt', desc: 'Expert shaping, lining, and conditioning.' },
  { id: 4, name: 'Hot Towel Shave', traditional: true, desc: 'The ultimate classic straight razor experience.' },
  { id: 5, name: 'Buzz Cut', desc: 'Clean, even, and meticulously edged.' },
  { id: 6, name: 'Hair Styling', desc: 'Wash, blow-dry, and professional styling.' },
  { id: 7, name: 'Scalp Treatment', desc: 'Deep cleansing and rejuvenating massage.' },
  { id: 8, name: 'The Gentleman\'s Package', desc: 'Haircut, beard sculpt, and hot towel shave.' },
];

const Services = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const el = sectionRef.current;
    
    gsap.fromTo(cardsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
        }
      }
    );
  }, []);

  const handleMouseMove = (e, idx) => {
    const card = cardsRef.current[idx];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX, rotateY, duration: 0.3, ease: 'power2.out', transformPerspective: 1000
    });
  };

  const handleMouseLeave = (idx) => {
    const card = cardsRef.current[idx];
    if (!card) return;
    gsap.to(card, {
      rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power3.out'
    });
  };

  return (
    <section id="services" className="section services" ref={sectionRef}>
      <div className="container">
        <div className="services-header">
          <h4 className="subtitle text-gold">Our Expertise</h4>
          <h2>Signature Services</h2>
        </div>
        
        <div className="services-grid">
          {servicesList.map((service, index) => (
            <div 
              key={service.id} 
              className="service-card"
              ref={el => cardsRef.current[index] = el}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div className="service-card-inner">
                <h3>{service.name}</h3>
                <p>{service.desc}</p>
                <div className="service-line"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
