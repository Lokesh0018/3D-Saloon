import React, { useState, useRef } from 'react';
import './BeforeAfter.css';

const BeforeAfter = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(position);
  };

  const handleMouseMove = (e) => handleMove(e.clientX);
  const handleTouchMove = (e) => handleMove(e.touches[0].clientX);

  return (
    <section className="section before-after">
      <div className="container">
        <div className="ba-header">
          <h4 className="subtitle text-gold">Transformations</h4>
          <h2>Precision execution</h2>
        </div>

        <div className="slider-wrapper">
          <div 
            className="slider-container" 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* After Image (Background) */}
            <div className="slider-image after-image">
              <img src="https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="After Transformation" />
              <div className="slider-label label-after">After</div>
            </div>

            {/* Before Image (Foreground, clipped) */}
            <div 
              className="slider-image before-image"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img src="https://images.unsplash.com/photo-1517832606299-7ae9b720a186?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Before Transformation" />
              <div className="slider-label label-before">Before</div>
            </div>

            {/* Divider Line */}
            <div 
              className="slider-divider" 
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="slider-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </div>
            </div>
            
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sliderPosition} 
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              className="slider-input"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
