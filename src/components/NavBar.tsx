import { NavLink } from 'react-router-dom';
import infoicon from '../assets/images/icons/infoicon.svg';

export default function Navbar() {
  return (
    <div className='bg-gray-800 border-b-2 border-black'>
      <nav className="container mx-auto py-4 px-6 flex justify-between items-center">
        <NavLink to={'/'} className="flex items-center text-white text-lg font-extrabold hover:brightness-75">
          <img src="/omnitrix.svg" alt="Logo" className="h-8 mr-2" />
          TRIXDEX
        </NavLink>
        <NavLink to={'info'} className="flex items-center text-white text-lg font-medium hover:brightness-75">
          <img src={infoicon} alt="Logo" className="h-6 mr-2" />
          Info
        </NavLink>
      </nav>
    </div>
  );
}