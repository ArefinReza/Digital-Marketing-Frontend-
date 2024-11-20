import React, { useEffect } from 'react';
import Banner from '../components/Banner';
import ServicesPage from './ServicesPage';
import ProjectsPage from './ProjectsPage';
import ReviewsPage from './ReviewsPage';
import TeamPage from './TeamPage';
import ContactPage from './ContactPage';
import AboutUs from '../components/AboutUs';

const AboutUsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page on component mount
  }, []);
  return (
    <div>
      <AboutUs/>
      <ServicesPage/>
      <ProjectsPage/>
      <ReviewsPage/>
      <TeamPage/>
      <ContactPage/>
    </div>
  );
}

export default AboutUsPage;
