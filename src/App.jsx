import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Internship from './components/Internship';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (loading) return;

    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 200; // Account for fixed navbar offset

      // Bottom of page fallback to ensure bottom section is activated when fully scrolled down
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80;

      if (isAtBottom) {
        setActiveSection('contact');
        return;
      }

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check on load

    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <div className="bg-[#0B0B09] text-[#F2EEE5] relative min-h-screen">
        {/* Subtle grain texture */}
        <div className="editorial-grain" />

        {/* Custom cursor on desktop */}
        <CustomCursor />

        {/* Navigation Bar */}
        <Navbar activeSection={activeSection} />

        {/* Main Content Sections */}
        <main>
          <Hero />
          <Manifesto />
          <About />
          <Education />
          <Skills />
          <Internship />
          <Gallery />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
