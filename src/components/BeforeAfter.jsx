import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './BeforeAfter.css';

gsap.registerPlugin(ScrollTrigger);

const BeforeAfter = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    gsap.fromTo(wrapperRef.current.children,
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
    <section id="gallery" className="section before-after" ref={sectionRef}>
      <div className="container" ref={wrapperRef}>
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
              <img src="/after.png" alt="After Transformation" />
              <div className="slider-label label-after">After</div>
            </div>

            {/* Before Image (Foreground, clipped) */}
            <div 
              className="slider-image before-image"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img src="/before.png" alt="Before Transformation" />
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
