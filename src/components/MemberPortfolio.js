import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Api from '../api/api'; // Adjust the path according to your project
import "../assets/css/portfolio.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons'; // Importing social media icons

const MemberPortfolio = () => {
  const { id } = useParams(); // Get the team member's ID from the URL
  const [member, setMember] = useState(null); // State to store member details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch individual team member details by ID
    axios.get(`${Api.Team()}${id}/`) // Use the ID from the URL
      .then(response => {
        setMember(response.data); // Set the member details in state
        setLoading(false); // Stop loading
      })
      .catch(error => {
        setError(error); // Set error state
        setLoading(false); // Stop loading
      });
  }, [id]);

  if (loading) {
    return <p>Loading team member details...</p>;
  }

  if (error) {
    return <p>There was an error loading the team member details.</p>;
  }

  return (
    <div className="portfolio-container">
      {member ? (
        <>
          {/* First Section */}
          <div className="portfolio-header">
            <div className="image-column">
              <img src={Api.imgURL(member.photo_url)} alt={member.name} />
            </div>
            <div className="details-column">
              <div className='memberName'>
                <h2>{member.name}</h2>
                <p><strong className='role'> {member.role}</strong></p>
              </div>
              <p>{member.portfolio}</p>
              <div>
              <p><strong>Email Address</strong></p>
              <p>{member.email}</p>
              </div>
              <div>
              <p><strong>Phone Number</strong> </p>
              <p> {member.phonenumber}</p>

              </div>
              <div className="social-links">
                {member.facebookLink && (
                  <a href={member.facebookLink} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faFacebook} />
                  </a>
                )}
                {member.linkedinLink && (
                  <a href={member.linkedinLink} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faLinkedin} />
                  </a>
                )}
                {member.whatsapp && (
                  <a href={`https://wa.me/${member.whatsapp}`} target="_blank" rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faWhatsapp} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Second Section */}
          <div className="portfolio-body">
            <div className="column">
              <h3>Personal Experience</h3>
              <p>{member.experience}</p>
            </div>
            <div className="column">
              <h3>Skills & Education</h3>
              <p><strong>Skills:</strong> {member.skills}</p>
              <p><strong>Education:</strong> {member.education}</p>
            </div>
          </div>
        </>
      ) : <p>No team member details available.</p>}
    </div>
  );
};

export default MemberPortfolio;
