import React, { useEffect } from 'react';
import BodyParticle from '../BodyParticle/BodyParticle';
import { initHackerEffect } from '../hackereff/hackereff';

const HomeBody = () => {
    useEffect(() => {
        initHackerEffect(); // Initialize the effect when the component mounts
      }, []);
    
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <h1 className='animated-text text-center p-20 m-auto ho text-8xl ' data-value="Welcome to the Imaginate">Welcome to the Imaginate </h1>
            <BodyParticle></BodyParticle>
            
        </div>
    );
};

export default HomeBody;