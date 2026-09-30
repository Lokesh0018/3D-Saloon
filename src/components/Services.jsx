import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scissors, Fingerprint, SquareScissors, Droplet, Sparkles, Wind, Bath, Crown, ArrowRight } from 'lucide-react';
import './Services.css';

gsap.registerPlugin(ScrollTrigger);

const servicesList = [
  { id: 1, name: 'Classic Haircut', desc: 'Precision cut tailored to your style.', icon: Scissors },
  { id: 2, name: 'Skin Fade', desc: 'Seamless blending for a sharp, modern look.', icon: Fingerprint },
  { id: 3, name: 'Beard Trim & Sculpt', desc: 'Expert shaping, lining, and conditioning.', icon: SquareScissors },
  { id: 4, name: 'Hot Towel Shave', traditional: true, desc: 'The ultimate classic straight razor experience.', icon: Droplet },
  { id: 5, name: 'Buzz Cut', desc: 'Clean, even, and meticulously edged.', icon: Sparkles },
  { id: 6, name: 'Hair Styling', desc: 'Wash, blow-dry, and professional styling.', icon: Wind },
  { id: 7, name: 'Scalp Treatment', desc: 'Deep cleansing and rejuvenating massage.', icon: Bath },
  { id: 8, name: 'The Gentleman\'s Package', desc: 'Haircut, beard sculpt, and hot towel shave.', icon: Crown, isPremium: true },
];

const parallaxImages = [
  { src: '/scissors-removebg-preview.png', className: 'parallax-img parallax-1' },
  { src: '/comb-removebg-preview.png', className: 'parallax-img parallax-2' },
  { src: '/brush-removebg-preview.png', className: 'parallax-img parallax-3' },
  { src: '/spray-removebg-preview.png', className: 'parallax-img parallax-4' },
  { src: '/tri-removebg-preview.png', className: 'parallax-img parallax-5' },
];

const Services = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const parallaxRefs = useRef([]);

  useEffect(() => {
    const el = sectionRef.current;
    
    gsap.fromTo(cardsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          toggleActions: 'play reverse play reverse'
        }
      }
    );

    // Parallax background animation
    parallaxRefs.current.forEach((imgEl, index) => {
      if (!imgEl) return;
      const speed = (index % 2 === 0 ? 1 : -0.5) * (index + 1) * 30; // Randomize speed and direction
      gsap.to(imgEl, {
        y: speed,
        rotation: speed / 2, // Slight rotation for added effect
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5, // Smooth scrub
        }
      });
    });
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
      <div className="parallax-bg">
        {parallaxImages.map((img, index) => (
          <img 
            key={index}
            src={img.src} 
            alt="Parallax element" 
            className={img.className}
            ref={el => parallaxRefs.current[index] = el}
          />
        ))}
      </div>
      
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="services-header">
          <h4 className="subtitle text-gold">Our Expertise</h4>
          <h2>Signature Services</h2>
        </div>
        
        <div className="services-grid">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id} 
                className={`service-card group ${service.isPremium ? 'service-card-premium' : ''}`}
                ref={el => cardsRef.current[index] = el}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseLeave={() => handleMouseLeave(index)}
              >
                {service.isPremium && <div className="premium-badge">Most Popular</div>}
                <div className="service-card-inner">
                  <div className="service-icon-wrapper">
                    <Icon className="service-icon" size={28} strokeWidth={1.5} />
                  </div>
                  <h3>{service.name}</h3>
                  <p>{service.desc}</p>
                  
                  <div className="service-footer">
                    <div className="service-line"></div>
                    <div className="book-action">
                      <span>Book</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
