import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Api from '../api/api';
import '../assets/css/contactfull.css';
import ContactUs from './ContactUs';
import ScrollToTopButton from './ScrollToTopButton';

export default function Contactfull() {
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
    <div>
      <div className="map-section">
        <iframe
          style={{ border: 0, width: '100%', height: '350px' }}
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      {/* Breadcrumb Section */}
      <div className="breadcrumb">
        <ul>
          <li><a href="/">Home</a></li>
          <li> / </li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>

      <section id="contact" className="contact">
        <div className="container">
          <div className="row justify-content-center" data-aos="fade-up">
            <div className="col-lg-10">
              <div className="info-wrap">
                <div className="info">
                  <i><FaMapMarkerAlt /></i>
                  <div>
                    <h4>Location</h4>
                    <p>{siteInfo.address}</p>
                  </div>
                </div>

                <div className="info">
                  <i><FaEnvelope /></i>
                  <div>
                    <h4>Email</h4>
                    <p>{siteInfo.email || 'info@youragency.com'}</p>
                  </div>
                </div>

                <a href={`https://wa.me/${siteInfo.phone_number}`} target="_blank" rel="noopener noreferrer">
                  <div className="info">
                    <i><FaPhone /></i>
                    <div>
                      <h4>WhatsApp</h4>
                      <p>{siteInfo.phone_number}<br /></p>
                    </div>
                  </div>
                </a> 
              </div>
            </div>
          </div>

          <ContactUs />
        </div>
        <ScrollToTopButton/>
      </section>
    </div>
  );
}
