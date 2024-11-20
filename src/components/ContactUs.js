import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Importing ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Importing default styles
import '../assets/css/contact.css'; // Adjust the path as necessary
import Api from '../api/api'; // Assuming you have an API utility file, adjust the path if needed
import contactImage from '../assets/images/login.png'; // Example image

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(Api.Contact(), formData); // Make API POST request
      console.log('Response from server:', response.data);
      toast.success('Message sent successfully!'); // Show success toast
      setFormData({ name: '', email: '', message: '' }); // Reset form after submission
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.'); // Show error toast
    }
  };

  return (
    <div className="contact-container">
      <h1 className='cont'>Contact With Us</h1>
      <div className="contact-content">
        {/* Left Column: Image */}
        <div className="contact-image">
          <h1>Get in touch with us</h1>
          <p>Lorem ipsum is simply free text available dolor sit amet consectetur notted adipisicing elit sed do eiusmod tempor incididunt simply dolore magna.</p>
          <h1>We Take Care Your Privecy</h1>
          <p>Lorem ipsum is simply free text available dolor sit amet consectetur notted adipisicing elit sed do eiusmod tempor incididunt simply dolore magna.</p>
          <h1>24/7 Service</h1>
          <p>Lorem ipsum is simply free text available dolor sit amet consectetur notted adipisicing elit sed do eiusmod tempor incididunt simply dolore magna.</p>
        </div>

        {/* Right Column: Contact Form */}
        <div className="contact-form">
          <h2>Feel free to write</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="message">Message:</label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit" className="submit-btn"><span>Send Message</span></button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} /> {/* ToastContainer for toasts */}
    </div>
  );
};

export default ContactUs;
