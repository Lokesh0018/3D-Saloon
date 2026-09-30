import React, { useEffect, useRef } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Gallery.css';

const images = [
  "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1512690459411-b9245aed614b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
];

const Gallery = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useScrollReveal(sectionRef, itemsRef, { y: 100, stagger: 0.2, start: 'top 70%' });

  return (
    <section className="section gallery" ref={sectionRef}>
      <div className="container">
        <div className="gallery-header">
          <h4 className="subtitle text-gold">Portfolio</h4>
          <h2>Our Work</h2>
        </div>
        
        <div className="gallery-grid">
          {images.map((img, i) => (
            <div 
              key={i} 
              className={`gallery-item item-${i}`}
              ref={el => itemsRef.current[i] = el}
            >
              <img src={img} alt={`Gallery item ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
