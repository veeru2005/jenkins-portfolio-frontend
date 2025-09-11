import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import EducationCertifications from './EducationCertifications';
import Contact from './Contact';
import Footer from './Footer';

const Portfolio = () => {
  return (
    <>
      <div className="font-outfit" style={{ overflowX: 'hidden', width: '100%', boxSizing: 'border-box' }}>
        <Navbar />
        <Hero />
        <About />
        <EducationCertifications />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Portfolio;