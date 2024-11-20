import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Api from '../api/api';
import '../assets/css/projectDetails.css';
import ScrollToTopButton from './ScrollToTopButton';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const reviewSectionRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${Api.Project()}${id}/`)
      .then((response) => {
        setProject(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  const parseImages = (images) => {
    if (Array.isArray(images)) return images.map(image => Api.imgURL(image));
    try {
      const parsedImages = JSON.parse(images);
      return Array.isArray(parsedImages) ? parsedImages.map(image => Api.imgURL(image)) : [];
    } catch (error) {
      return [];
    }
  };

  const openImageModal = (imageSrc) => {
    setModalImage(imageSrc);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  if (loading) return <p>Loading project...</p>;
  if (error) return <p>There was an error loading the project details.</p>;

  return (
    <div className="project-details-page">
      {project ? (
        <>
          <h2 className="project-details-title">{project.title}</h2>
          <p className="project-details-description">Details: {project.description}</p>
          <div className="project-details-gallery">
            {project.images && parseImages(project.images).length > 0 ? (
              parseImages(project.images).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Project ${project.title} Image ${index + 1}`}
                  className="project-details-image"
                  onClick={() => openImageModal(image)}
                />
              ))
            ) : (
              <p className="project-details-no-images">No images available for this project.</p>
            )}
          </div>
          {modalImage && (
            <div className="reviewfull-modal" onClick={closeModal}>
              <div className="reviewfull-modal-content">
                <img src={modalImage} alt="Enlarged project" />
              </div>
            </div>
          )}
        </>
      ) : (
        <p>No project details available.</p>
      )}
      <ScrollToTopButton/>
    </div>
  );
};

export default ProjectDetails;
