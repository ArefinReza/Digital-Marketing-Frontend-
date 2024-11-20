import React, { useEffect } from 'react';
import '../assets/css/about.css';
import aboutImage from '../assets/images/login.png';
import ceoImage from '../assets/images/login.png';

const AboutUs = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="about-container">
            {/* Full-width Image with Breadcrumb */}
            <div className="about-full-image">
                <div className="image-overlay"></div> {/* Overlay for shadow effect */}
                <img src="https://plus.unsplash.com/premium_photo-1681400187672-7e3449edad9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA1fHxkaWdpdGFsJTIwbWFya2V0aW5nJTIwYWdlbmN5JTIwYmFubmVyfGVufDB8fDB8fHww" alt="About Us" className="full-image" />

                {/* Centered Breadcrumb */}
                <div className="breadcrumbAbout">
                    <h2>About US</h2>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li> / </li>
                        <li>About Us</li>
                    </ul>
                </div>
            </div>

            {/* Two-column Section */}
            <div className="about-content">
                {/* Column 1: Image */}
                <div className="about-image">
                    <img src={ceoImage} alt="CEO" className="ceo-image" />
                </div>

                {/* Column 2: Text */}
                <div className="about-text">
                    <h2 className="heading">Get to Know Us</h2>
                    <h3 className="subheading">The best digital marketing solutions</h3>
                    <p>
                        There are many variations of passages of available but the majority have suffered alteration in some form, by injected hum randomised words which don't slightly.
                    </p>

                    <h3 className="subheading">Leading in marketing</h3>
                    <p>
                        Knowledge of technologies rules better than anyone which we apply in our daily work.
                    </p>

                    <h3 className="subheading">Expert developers</h3>
                    <p>
                        Knowledge of technologies rules better than anyone which we apply in our daily work.
                    </p>

                    <div className="ceo-info">
                        <h4>David Cooper</h4>
                        <p>CEO and Co-Founder</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
