import '../assets/css/Reviews.css'; 

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Api from '../api/api';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reviewsContainerRef = useRef(null);

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

  const handleMouseMove = (e) => {
    const { clientX } = e;
    const { offsetWidth } = reviewsContainerRef.current;
    const scrollLeft = (clientX / window.innerWidth) * offsetWidth;
    reviewsContainerRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  };

  const handleCardClick = (index) => {
    const targetCard = reviewsContainerRef.current.children[index];
    if (targetCard) {
      const { offsetLeft, offsetWidth } = targetCard;
      reviewsContainerRef.current.scrollTo({ left: offsetLeft - (offsetWidth / 2), behavior: 'smooth' });
    }
  };

  // Helper function to convert rating number to stars
  const renderStars = (rating) => {
    return '⭐️'.repeat(Math.floor(rating));
  };

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>There was an error loading reviews.</p>;
  }

  return (
    <div className="reviews-section">
      <div className="static-column">
        <h2>What They’re Saying?</h2>
        <p>Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet.</p>
      </div>
      
      <div className="reviews-slider">
        <div
          className="reviews-container"
          ref={reviewsContainerRef}
          onMouseMove={handleMouseMove}
        >
          {reviews.map((review, index) => (
            <div
              className="review-card"
              key={review.id}
              onClick={() => handleCardClick(index)}
            >
              <img src={Api.imgURL(review.client_image)} alt={review.client_name} />
              <div className="review-content">
                <p>{review.feedback}</p>
                <h4>{review.client_name}</h4>
                <div className="review-rating">
                  {renderStars(review.rating)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
