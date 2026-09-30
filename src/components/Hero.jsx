import React, { useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Float, OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import './Hero.css';

// A simple procedural 3D object to act as a barbershop item (like a shaving brush or clippers)
const BarberBrush = () => {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      {/* Brush Handle */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 0.8, 32]} />
        <meshPhysicalMaterial 
          color="#111111"
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
        />
      </mesh>
      {/* Metal Ring */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.32, 0.3, 0.2, 32]} />
        <meshStandardMaterial color="#c5a059" metalness={1} roughness={0.2} />
      </mesh>
      {/* Bristles */}
      <mesh position={[0, 0.55, 0]}>
        <sphereGeometry args={[0.4, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#e8dfd5" roughness={0.9} />
      </mesh>
    </Float>
  );
};

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(textRef.current.children, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  return (
    <section className="hero" ref={heroRef} id="home">
      <div className="hero-content container" ref={textRef}>
        <h2 className="text-gold subtitle">Premium Grooming</h2>
        <h1 className="hero-title">MASTER<br/>BARBERS</h1>
        <p className="hero-desc">
          Experience the ultimate in men's grooming. Where traditional barbering meets modern luxury and precision.
        </p>
        <div className="hero-actions">
          <button className="btn-primary filled">Book Appointment</button>
          <a href="#services" className="link-explore">Explore Services</a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="canvas-container">
          <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <Suspense fallback={null}>
              <BarberBrush />
              <Environment preset="studio" />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
          </Canvas>
        </div>
        <div className="model-image-container">
          {/* Barber shop model image */}
          <div className="model-placeholder" style={{
            background: `linear-gradient(90deg, var(--color-bg) 0%, rgba(5,5,5,0) 100%), url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80') center/cover no-repeat`
          }}></div>
        </div>
      </div>
      
      <div className="particles-overlay"></div>
    </section>
  );
};

export default Hero;
