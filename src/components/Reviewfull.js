import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Api from '../api/api';
import '../assets/css/ReviewFull.css'
import ScrollToTopButton from './ScrollToTopButton';


export default function ReviewFull() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalImage, setModalImage] = useState(null);
  const reviewSectionRef = useRef(null);

  useEffect(() => {
    axios.get(Api.ReviewList())
      .then(response => {
        setReviews(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the reviews!", error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const openImageModal = (imageSrc) => {
    setModalImage(imageSrc);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>There was an error loading reviews.</p>;
  }

  return (
    <>
    <div className="reviewfull-section">
      <div className="reviewfull-header">
        <h2>User Feedback</h2>
        <p>Read what our clients have to say about us.</p>
      </div>
      
      <div className="reviewfull-container" ref={reviewSectionRef}>
        {reviews.map((review, index) => (
          <div className="reviewfull-card" key={review.id}>
            <img
              // src={review.client_image}alt={review.client_name}
              src={Api.imgURL(review.client_image)} alt={review.client_name}
              className="reviewfull-image"
              onClick={() => openImageModal((Api.imgURL(review.client_image)))}
              />
            <div className="reviewfull-content">
              <p>{review.feedback}</p>
              <h4>{review.client_name}</h4>
              <div className="reviewfull-rating">
                {Array.from({ length: review.rating }, (_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalImage && (
        <div className="reviewfull-modal" onClick={closeModal}>
          <div className="reviewfull-modal-content">
            <img src={modalImage} alt="Enlarged review" />
          </div>
        </div>
      )}
    </div>
    <ScrollToTopButton/>
      </>
  );
}
