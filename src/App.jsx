import React, { Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import BeforeAfter from './components/BeforeAfter';
import Gallery from './components/Gallery';
import Experience from './components/Experience';
import Testimonials from './components/Testimonials';
import Booking from './components/Booking';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <BeforeAfter />
        <Gallery />
        <Experience />
        <Testimonials />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}

export default App;
