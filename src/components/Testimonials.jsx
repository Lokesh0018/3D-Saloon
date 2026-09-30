import React, { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    quote: "The best fade I've ever had. The attention to detail and precision is unmatched.",
    name: "James Sterling",
    rating: 5
  },
  {
    id: 2,
    quote: "More than just a haircut. The hot towel shave is a game-changer. An absolute classic experience.",
    name: "Marcus Kensington",
    rating: 5
  },
  {
    id: 3,
    quote: "Professional, sharp, and consistent. I walk out feeling like a new man every single time.",
    name: "David Rossi",
    rating: 5
  }
];

const Testimonials = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useScrollReveal(sectionRef, cardsRef);

  return (
    <section className="section testimonials" ref={sectionRef}>
      <div className="container">
        <div className="testimonials-header">
          <h4 className="subtitle text-gold">Word of Mouth</h4>
          <h2>Client Stories</h2>
        </div>
        
        <div className="testimonials-grid">
          {testimonials.map((item, i) => (
            <div className="testimonial-card" key={item.id} ref={el => cardsRef.current[i] = el}>
              <div className="quote-icon-bg">
                <Quote size={80} strokeWidth={1} />
              </div>
              
              <div className="stars">
                {[...Array(item.rating)].map((_, index) => (
                  <span key={index} className="star">★</span>
                ))}
              </div>
              
              <p className="quote">"{item.quote}"</p>
              
              <div className="author-info">
                <div className="author-line"></div>
                <div>
                  <h5 className="author">{item.name}</h5>
                  <span className="author-title">Verified Client</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
