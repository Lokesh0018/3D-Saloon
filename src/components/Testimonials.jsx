import React from 'react';
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
  return (
    <section className="section testimonials">
      <div className="container">
        <div className="testimonials-grid">
          {testimonials.map(item => (
            <div className="testimonial-card" key={item.id}>
              <div className="stars">
                {[...Array(item.rating)].map((_, i) => (
                  <span key={i} className="star">★</span>
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
