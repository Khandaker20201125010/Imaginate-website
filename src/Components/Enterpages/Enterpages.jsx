import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'animate.css';
import logo from '../../assets/images/logo.png';
import ParticleBg from '../ParticleBg/ParticleBg';
import { Helmet } from 'react-helmet';

const Enterpages = () => {
  const [popInOut, setPopInOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPopInOut(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
     
    <div className='bg-gradient-to-r from-blue-900 min-h-screen relative'>
      <Helmet>
        <title>Imaginate</title>
      </Helmet>
       <ParticleBg></ParticleBg>
      <div className='flex flex-col items-center justify-center p-20'>
        <img src={logo} alt="Logo" className='animate__animated animate__bounceInDown' />
        <Link to='/home'>
          <h1
            className={`${
              popInOut ? 'popInOutAnimation' : 'animate__animated animate__bounceInUp'
            } gradient-text text-2xl font-bold`}
          >
            Let's Get Started
          </h1>
        </Link>
      </div>
    
    
    </div>
    </> 
  );
};

export default Enterpages;
