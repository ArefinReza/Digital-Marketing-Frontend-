import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle scroll event to change background color of header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={scroll ? 'header active' : 'header'}>
      <div className="header-logo">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_PI3QETHc6Eg-Z9ZSWFqBsxoCuGv3w4SiWQ&s"
          alt="Logo"
        />
        <h1>Moon IT Digital Marketing Agency</h1>
      </div>

      <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>

      <nav className={isOpen ? 'active' : ''}>
        <ul>
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/services" onClick={toggleMenu}>Services</Link></li>
          <li><Link to="/projects" onClick={toggleMenu}>Projects</Link></li>
          <li><Link to="/reviews" onClick={toggleMenu}>Reviews</Link></li>
          <li><Link to="/team" onClick={toggleMenu}>Team</Link></li>
          <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
          <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
