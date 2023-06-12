import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='bg-gray-800 border-b-2 border-black'>
      <nav className="container mx-auto py-4 px-6 flex justify-between items-center">
        <NavLink to={'/'} className="flex items-center text-white hover:text-gray-300 text-lg font-extrabold">
          <img src="/omnitrix.svg" alt="Logo" className="h-8 mr-2" />
          TRIXDEX
        </NavLink>
        <div>
          <NavLink to={'/'} className="text-white text-lg font-medium mr-4 hover:text-gray-300">About</NavLink>
        </div>
      </nav>
    </div>
  );
}