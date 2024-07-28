import React from 'react';
import BodyParticle from '../BodyParticle/BodyParticle';

const HomeBody = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden animated-background">
      <BodyParticle />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-4xl font-bold animated-text">Welcome to the Gaming World</h1>
        <p className="mt-5 text-lg">Prepare for an epic adventure</p>
      </div>
    </div>
  );
};

export default HomeBody;
