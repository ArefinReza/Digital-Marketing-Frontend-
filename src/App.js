import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Services from './components/Services';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetails from './components/ProjectDetails';

import ReviewsPage from './pages/ReviewsPage';
import TeamPage from './pages/TeamPage';
import MemberPortfolio from './components/MemberPortfolio';
import ContactPage from './pages/ContactPage';
import AboutUsPage from './pages/AboutUsPage';
import Contactfull from './components/Contactfull';
import ServicesPage from './pages/ServicesPage';
import ReviewFull from './components/Reviewfull';
import Api from './api/api';

function App() {
  useEffect(()=>{
    window.scrollTo(0,0);

    Api.LogVisitor();
  
  })
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/reviews" element={<ReviewFull />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/team/:id" element={<MemberPortfolio />} />
          <Route path="/contact" element={<Contactfull />} />
          <Route path="/about" element={<AboutUsPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
