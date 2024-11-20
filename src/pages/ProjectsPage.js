import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Api from '../api/api';
import '../assets/css/project.css';
import ScrollToTopButton from '../components/ScrollToTopButton';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(Api.Project())
      .then(response => {
        console.log('Projects data:', response.data);
        setProjects(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the projects!", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>There was an error loading projects data.</p>;
  }

  return (
    <div>
      <h2>Our Recent Projects</h2>
      <div className="projects-container">
        {projects.map(project => {
          // Verify if project.images exists and is not empty
          const imageUrl = project.images ? Api.imgURL(project.images[0]) : null;

          return (
            <Link to={`/projects/${project.id}`} className="project-block" key={project.id}>
              {imageUrl ? (
                <img src={imageUrl} className="project-image" alt={`Project ${project.title}`} />
              ) : (
                <div className="placeholder-image">Image Not Available</div>
              )}
              <div className="project-title">{project.title}</div>
              <div className="project-details">
                <p>{project.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
      <ScrollToTopButton />
    </div>
  );
};

export default ProjectsPage;
