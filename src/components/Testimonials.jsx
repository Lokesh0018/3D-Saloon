import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Testimonials.css';

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
    const el = sectionRef.current;
    gsap.fromTo(cardsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          toggleActions: 'play reverse play reverse'
        }
      }
    );
  }, []);

  return (
    <section className="section testimonials" ref={sectionRef}>
      <div className="container">
        <div className="testimonials-grid">
          {testimonials.map((item, i) => (
            <div className="testimonial-card" key={item.id} ref={el => cardsRef.current[i] = el}>
              <div className="stars">
                {[...Array(item.rating)].map((_, index) => (
                  <span key={index} className="star">★</span>
                ))}
              </div>
              <p className="quote">"{item.quote}"</p>
              <h5 className="author">- {item.name}</h5>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
