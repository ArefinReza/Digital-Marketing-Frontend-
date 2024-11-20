import '../assets/css/servicespage.css';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Api from '../api/api';
import ScrollToTopButton from '../components/ScrollToTopButton';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [visibleServices, setVisibleServices] = useState(3);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const observerRef = useRef();

  useEffect(() => {
    // Fetch services from API
    axios.get(Api.Services())
      .then(response => {
        setServices(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const loadMoreServices = useCallback(() => {
    setVisibleServices((prevVisible) => Math.min(prevVisible + 3, services.length));
  }, [services.length]);

  const lastServiceRef = useCallback(
    (node) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          loadMoreServices();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loading, loadMoreServices]
  );

  if (loading) {
    return <p>Loading services...</p>;
  }

  if (error) {
    return <p>There was an error loading services data.</p>;
  }

  return (
    <div className="custom-services-container">
      <h2 className="custom-services-heading">Our Services</h2>
      <div className="custom-services-grid">
        {services.slice(0, visibleServices).map((service, index) => (
          <div
            className="custom-service-card"
            key={service.id}
            ref={index === visibleServices - 1 ? lastServiceRef : null}
          >
            <img src={Api.imgURL(service.icon_url)} alt={service.title} className="custom-service-icon" />
            <h3 className="custom-service-title">{service.title}</h3>
            <p className="custom-service-description">{service.description}</p>
          </div>
        ))}
      </div>
      <ScrollToTopButton/>
    </div>
  );
};

export default ServicesPage;
