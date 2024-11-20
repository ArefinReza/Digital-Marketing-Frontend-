import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Api from '../api/api'; // Ensure the correct path to the API utility
import '../assets/css/services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(Api.Services())
      .then(response => {
        console.log('Services data:', response.data);
        setServices(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the services!", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    // Render placeholder items while loading
    return (
      <div className="services-container placeholder-container">
        {Array.from({ length: 4 }).map((_, index) => (
          <div className="placeholder-item" key={index}>
            <div className="placeholder-image"></div>
            <div className="placeholder-title"></div>
            <div className="placeholder-description"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p>There was an error loading services data.</p>;
  }

  return (
    <div>
      <h2>Our Services</h2>
      <div className="services-container">
        <div className="services-list">
          {[...services, ...services].map((service, index) => (
            <div className="services-item" key={service.id + '-' + index}>
              <img src={Api.imgURL(service.icon_url)} alt={service.title} />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
