import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Projects = () => {
 
  return (
    <div>
      <h2>Our Recent Projects</h2>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <Link to={`/projects/${project.id}`}>
              {project.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;
