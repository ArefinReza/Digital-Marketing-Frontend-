import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Api from '../api/api'; // Adjust the path according to your project
import '../assets/css/team.css';

const TeamMembers = () => {
  const [team, setTeam] = useState([]); // State to hold team members
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch team members from API
    axios.get(Api.Team()) // Fetch data from your API endpoint
      .then(response => {
        console.log('Team data:', response.data); // Log for debugging
        setTeam(response.data); // Set team data in state
        setLoading(false); // Stop loading
      })
      .catch(error => {
        console.error('Error fetching team data:', error);
        setError(error); // Set error state
        setLoading(false); // Stop loading
      });
  }, []);

  if (loading) {
    return <p>Loading team members...</p>;
  }

  if (error) {
    return <p>There was an error loading the team members.</p>;
  }

  return (
    <div className="team-section">
      <h2>Meet Our Team</h2>
      <ul className="team-grid">
        {team.map(member => (
          <li key={member.id} className="team-card">
            <Link to={`/team/${member.id}`}>
              <img src={member.photo_url} alt={member.name} />
              <p>{member.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamMembers;
