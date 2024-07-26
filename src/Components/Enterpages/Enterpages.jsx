import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';


const Enterpages = () => {
  return (
    <div className='bg-gradient-to-r from-indigo-600 min-h-screen bg-center'>
      <div className='flex flex-col items-center justify-center p-20'>
        <img src={logo} alt="Logo" className='logoAnimation' />
        <Link to='/home'>
        <h1 className='textAnimation gradient-text text-2xl font-bold'>Let's Get Started</h1>
        </Link>
      
      </div>
    </div>
  );
};

export default Enterpages;
