import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <NavLink to='/' className="text-white font-extrabold text-xl">TRIXDEX</NavLink>
            </div>
          </div>
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative">
                <input
                  type="text"
                  className="bg-gray-800 text-white rounded-full py-2 px-4 sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search"
                />
              </div>
            </div>
        </div>
      </div>
    </nav>
  );
}