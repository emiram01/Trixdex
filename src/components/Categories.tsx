import { useState } from 'react';
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

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setShowDropdown(false);
  };

  return (
    <div className='text-white flex flex-row justify-center'>
      <button onClick={toggleDropdown} className='px-4'>
        <img src={sort} className='w-10'/> 
        <i className='fa-sort-down'></i>
      </button>
      {showDropdown && (
        <div className='absolute right-0 mt-2 bg-gray-900 rounded-lg shadow-lg'>
          <button onClick={() => setCategory('')} className='px-4 font-extrabold'>
            ALL
          </button>
          <button
            onClick={() => handleCategorySelect('OS')}
            className='block px-4 py-2 text-white hover:bg-gray-800'
          >
            <img src={os} className='w-10'/>
          </button>
          <button
            onClick={() => handleCategorySelect('AF')}
            className='block px-4 py-2 text-white hover:bg-gray-800'
          >
            <img src={af} className='w-10'/>
          </button>
          <button
            onClick={() => handleCategorySelect('UA')}
            className='block px-4 py-2 text-white hover:bg-gray-800'
          >
            <img src={ua} className='w-10'/>
          </button>
          <button
            onClick={() => handleCategorySelect('OV')}
            className='block px-4 py-2 text-white hover:bg-gray-800'
          >
            <img src={ov} className='w-10'/>
          </button>
        </div>
      )}
    </div>
  )
}


// <div className='text-white flex flex-row justify-center'>
// <button onClick={() => setCategory('OS')} className='px-2'>
//   <img src={os} className='w-10'/>
// </button>
// <button onClick={() => setCategory('AF')} className='px-2'>
//   <img src={af} className='w-10'/>
// </button>
// <button onClick={() => setCategory('UA')} className='px-2'>
//   <img src={ua} className='w-10'/>
// </button>
// <button onClick={() => setCategory('OV')} className='px-2'>
//   <img src={ov} className='w-10'/>
// </button>
// <button onClick={() => setCategory('')} className='px-2 font-extrabold'>
//   ALL
// </button>
// </div>