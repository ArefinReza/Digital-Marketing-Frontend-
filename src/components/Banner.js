import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import Api from '../api/api';
import '../assets/css/banner.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    axios.get(Api.Banner())
      .then(response => {
        console.log('Banner data fetched:', response.data);
        setBannerData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching banner data:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  // Loading and error placeholders
  if (loading) {
    return (
      <section className="banner placeholder-banner">
        <div className="banner-placeholder">
          <div className="placeholder-image"></div>
          <div className="placeholder-text"></div>
        </div>
        <div className="secondSection">
          <div className="placeholder-text large"></div>
          <div className="placeholder-video"></div>
        </div>
      </section>
    );
  }

  if (error) {
    return <p className="error-message">There was an error loading the banner data. Please try again later.</p>;
  }

  return (
    <section className="banner">
      <Slider {...settings} className="banner-slider">
        {bannerData.map((banner, index) => (
          <div key={index} className="banner-slide">
            <img src={Api.imgURL(banner.banner_image)} alt={`Banner ${index + 1}`} className="banner-image" />
          </div>
        ))}
      </Slider>
      <div className='secondSection'>
        <div className="who-we-are">
          <h2>Who We Are</h2>
          <p>{bannerData[0].who_we_are}</p>
        </div>
        <div className="intro-video" onClick={togglePlay}>
          <video
            ref={videoRef}
            className="intro-video"
            src={Api.imgURL(bannerData[0].intro_video)}
            type="video/mp4"
            controls={isPlaying}
          />
          {!isPlaying && <div className="play-button"></div>}
        </div>
      </div>
    </section>
  );
};

export default Banner;
