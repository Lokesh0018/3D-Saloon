import React, { useEffect, useRef, Suspense } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const AbstractShape = () => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh rotation={[Math.PI / 4, 0, Math.PI / 4]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial 
          color="#c5a059"
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          wireframe={true}
        />
      </mesh>
    </Float>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    
    gsap.fromTo(textRef.current.children,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
        }
      }
    );

    gsap.fromTo(imageRef.current,
      { scale: 1.1, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 1.5, ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
        }
      }
    );
  }, []);

  return (
    <section id="about" className="section about" ref={sectionRef}>
      <div className="container about-grid">
        <div className="about-image-wrapper" ref={imageRef}>
          <div className="about-image" style={{
            background: `url('https://images.unsplash.com/photo-1599351431202-1e0f0137899a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80') center/cover no-repeat`
          }}>
          </div>
          <div className="about-3d">
            <Canvas camera={{ position: [0, 0, 3] }} alpha={true}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[2, 2, 2]} intensity={1} />
              <Suspense fallback={null}>
                <AbstractShape />
                <Environment preset="studio" />
              </Suspense>
            </Canvas>
          </div>
        </div>
        <div className="about-content" ref={textRef}>
          <h4 className="subtitle text-gold">Mastering the Craft</h4>
          <h2>The Foundation of Confidence</h2>
          <p>
            At The Gentleman's Cut, we believe that a great haircut is more than just a routine—it's the foundation of a man's confidence. Our master barbers combine time-honored techniques with modern styles.
          </p>
          <p>
            Step into a sanctuary of masculinity and luxury. From hot towel shaves to precision fading, every detail is executed with absolute perfection to ensure you leave looking and feeling your absolute best.
          </p>
          <button className="btn-primary" style={{ marginTop: '2rem' }}>Discover Our Heritage</button>
        </div>
      </div>
    </section>
  );
};

export default About;
