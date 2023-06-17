import { useState, useRef  } from 'react';
import os from '../assets/images/icons/OSicon.png';
import af from '../assets/images/icons/AFicon.png';
import ua from '../assets/images/icons/UAicon.png';
import ov from '../assets/images/icons/OVicon.png';
import sort from '../assets/images/icons/sorticon.svg';

interface CategoriesProps {
  category: string;
  setCategory: (category: string) => void;
}

export default function SearchBar({ category, setCategory }: CategoriesProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setShowDropdown(false);
  };

  return (
    <>
      <div className='text-white flex-row justify-center hidden md:flex'>
        <button onClick={() => handleCategorySelect('')} className={`block px-4 h-16 font-extrabold hover:bg-gray-700 ${category === '' ? 'bg-gray-700 border-t-2 border-green-500' : ''}`}>
          <p className='w-10'>ALL</p>
        </button>
        <button onClick={() => handleCategorySelect('OS')} className={`block px-4 h-16 hover:bg-gray-700 ${category === 'OS' ? 'bg-gray-700 border-t-2 border-green-500' : ''}`}>
          <img src={os} className='w-10'/>
        </button>
        <button onClick={() => handleCategorySelect('AF')} className={`block px-4 h-16 hover:bg-gray-700 ${category === 'AF' ? 'bg-gray-700 border-t-2 border-green-500' : ''}`}>
          <img src={af} className='w-10'/>
        </button>
        <button onClick={() => handleCategorySelect('UA')} className={`block px-4 h-16 hover:bg-gray-700 ${category === 'UA' ? 'bg-gray-700 border-t-2 border-green-500' : ''}`}>
          <img src={ua} className='w-10'/>
        </button>
        <button onClick={() => handleCategorySelect('OV')} className={`block px-4 h-16 hover:bg-gray-700 ${category === 'OV' ? 'bg-gray-700 border-t-2 border-green-500' : ''}`}>
          <img src={ov} className='w-10'/>
        </button>
      </div>
      <div className='flex justify-center relative md:hidden'>
        <button onClick={toggleDropdown}>
          <img src={sort} className='w-10' />
        </button>
        {showDropdown && (
          <div className='absolute top-full bg-gray-900 rounded-lg' ref={dropdownRef}>
            <button onClick={() => handleCategorySelect('')} className={`block px-4 py-2 mt-4 h-16 text-white font-extrabold hover:bg-gray-700 ${category === '' ? 'bg-gray-700 border-l-2 border-green-500' : ''}`}>
              <p className='w-10'>ALL</p>
            </button>
            <button onClick={() => handleCategorySelect('OS')} className={`block px-4 py-2 h-16  hover:bg-gray-700 ${category === 'OS' ? 'bg-gray-700 border-l-2 border-green-500' : ''}`}>
              <img src={os} className='w-10'/>
            </button>
            <button onClick={() => handleCategorySelect('AF')} className={`block px-4 py-2 h-16 hover:bg-gray-700 ${category === 'AF' ? 'bg-gray-700 border-l-2 border-green-500' : ''}`}>
              <img src={af} className='w-10'/>
            </button>
            <button onClick={() => handleCategorySelect('UA')} className={`block px-4 py-2 h-16 hover:bg-gray-700 ${category === 'UA' ? 'bg-gray-700 border-l-2 border-green-500' : ''}`}>
              <img src={ua} className='w-10'/>
            </button>
            <button onClick={() => handleCategorySelect('OV')} className={`block px-4 py-2 h-16 hover:bg-gray-700 rounded-b-lg ${category === 'OV' ? 'bg-gray-700 border-l-2 border-green-500' : ''}`}>
              <img src={ov} className='w-10'/>
            </button>
          </div>
        )}
      </div>
    </>
  )
}