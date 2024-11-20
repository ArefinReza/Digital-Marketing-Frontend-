import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Api from '../api/api';
import '../assets/css/footer.css';

const Footer = () => {
  const [siteInfo, setSiteInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch site info from API
    axios.get(Api.SiteInfo())
      .then(response => {
        console.log('API Response:', response.data); // Debugging to see the API response
        setSiteInfo(response.data[0]);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching site info:', error);
        setError('Failed to load site information.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading footer information...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!siteInfo) {
    return <p>No site information available.</p>;
  }

  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Column 1: Logo, Name, and Slogan */}
        <div className="footer-column">
          <div className="footer-logo">
            <img src="your-logo-url-here" alt="Site Logo" className="logo" />
          </div>
          <h3>{siteInfo.sitename || 'Site Name'}</h3>
          <p>{siteInfo.about || 'About Us'}</p>
        </div>

        {/* Column 2: Navigation Links */}
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/team">Portfolio</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 3: Contact Information */}
        <div className="footer-column">
          <h4>Contact Us</h4>
          <p><FaPhone /> {siteInfo.phone_number || '+123 456 7890'}</p>
          <p><FaEnvelope /> {siteInfo.email || 'info@youragency.com'}</p>
          <p><FaMapMarkerAlt /> {siteInfo.address || '123 Main Street, City, Country'}</p>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>© 2024 {siteInfo.sitename}. {siteInfo.copyright_text || 'All rights reserved.'}</p>
      </div>
    </footer>
  );
};

export default Footer;
