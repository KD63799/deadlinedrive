import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, BellIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import logo from '../../assets/Logo-Deadlines.svg';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-butterscotch">
      <div className="max-w-7xl mx-auto p-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src={logo} alt="Logo" className="h-15 w-14 mr-2" />
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/deadlines" className="text-custom-black hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium hover:scale-110 transition-transform duration-300">Deadlines</Link>
                <Link to="/personnaliser-citations" className="text-custom-black hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium hover:scale-110 transition-transform duration-300">Personnaliser</Link>
                <Link to="/citations" className="text-custom-black hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium hover:scale-110 transition-transform duration-300">Citations</Link>
                <Link to="/favoris" className="text-custom-black hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium hover:scale-110 transition-transform duration-300">Favoris</Link>
                <Link to="/a-propos" className="text-custom-black hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium hover:scale-110 transition-transform duration-300">À propos</Link>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-5">
            <button className="text-custom-black hover:text-gray-200 hover:scale-110 transition-transform duration-300">
              <EnvelopeIcon className="h-6 w-6" />
            </button>
            <div className="relative">
              <button className="text-custom-black hover:text-gray-200 hover:scale-110 transition-transform duration-300">
                <BellIcon className="h-6 w-6" />
              </button>
              <span className="absolute bottom-4 left-3 text-xs bg-red-500 text-custom-black rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </div>
            <button onClick={() => window.location.href = '/UserAccount'} className="text-custom-black hover:text-gray-200 hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c-4.28 0-7.5 3.22-7.5 7.5a1 1 0 1 0 2 0C6.5 17.57 8.57 15.5 12 15.5s5.5 2.07 5.5 6a1 1 0 1 0 2 0C19.5 17.57 16.28 14 12 14zM12 2C7.82 2 4.5 5.32 4.5 9.5S7.82 17 12 17s7.5-3.32 7.5-7.5S16.18 2 12 2zM12 5c2.48 0 4.5 2.02 4.5 4.5S14.48 14 12 14 7.5 11.98 7.5 9.5 9.52 5 12 5z" />
              </svg>
            </button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={toggleMenu} className="text-custom-black hover:text-gray-200 hover:scale-110 transition-transform duration-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
              {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/deadlines" className="text-custom-black hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium hover:scale-110 transition-transform duration-300">Deadlines</Link>
          <Link to="/personnaliser-citations" className="text-custom-black hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium hover:scale-110 transition-transform duration-300">Personnaliser</Link>
          <Link to="/a-propos" className="text-custom-black hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium hover:scale-110 transition-transform duration-300">À propos</Link>
          <Link to="/creer-citation" className="text-custom-black hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium hover:scale-110 transition-transform duration-300">Créer Citation</Link>
          <Link to="/citations" className="text-custom-black hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium hover:scale-110 transition-transform duration-300">Citations</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
