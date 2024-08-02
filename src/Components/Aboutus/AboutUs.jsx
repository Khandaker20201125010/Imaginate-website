import React from 'react';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';


const AboutUs = () => {
    return (
        <div className="about-us-container ghostly-bg flex  items-center justify-center h-screen w-screen ghostly-bg">
            <div className="about-us-content">
                <h2 className='texto font-bold text-red-700 shadow-2xl'>About Us</h2>
                <p>Welcome to our gaming world!</p>
                <p>We are passionate gamers who love to explore new realms, conquer challenges, and build communities.</p>
                <p>Our mission is to bring thrilling gaming experiences to players worldwide.</p>
                <p>Join us on our journey through pixels and adventures!</p>
                <Link to="/home">
                    <button className='mt-5 botn'>Let's back</button>
                </Link>
            </div>
            <div className="about-us-image ghosto shadow-2xl">
               
                <img src={logo} alt="About Us" className="about-us-logo" />
            </div>
        </div>
    );
};

export default AboutUs;
