import React, { useEffect } from 'react';
import Banner from '../components/Banner';
import Services from '../components/Services';
import ProjectsPage from './ProjectsPage';
import ReviewsPage from './ReviewsPage';
import TeamPage from './TeamPage';
import ContactPage from './ContactPage';
import AboutUsPage from './AboutUsPage';
import '../assets/css/home.css'
import ScrollToTopButton from '../components/ScrollToTopButton';
const HomePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on component mount
  }, []);
  return (
    <div>
      <Banner />
      <Services/>
      <ProjectsPage/>
      <ReviewsPage/>
      <TeamPage/>
      <ContactPage/>
      <ScrollToTopButton/>
    </div>
  );
}

export default HomePage;
