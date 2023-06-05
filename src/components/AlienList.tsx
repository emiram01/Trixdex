import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alien } from '../utils/Interfaces';
import aliens from '../assets/aliens.json';
import testImg from '../assets/images/HeatblastFull.png';
import SearchBar from './SearchBar';
import gif from '../assets/omnitrixanim.gif';

export default function AlienList() {
  const [alienList, setAlienList] = useState<Alien[]>([]);
  const navigate = useNavigate();

  useEffect(() => {  
    setAlienList(aliens);
  }, []);

  const handleClick = (alien: Alien) => {
    navigate(alien.name.replace(' ', '-'));
  };

  return (
    <>
      <div className='flex justify-center bg-gray-900 border-t-2 border-black'>
        <img src={gif} className='mix-blend-color-dodge max-h-screen opacity-100'></img>
      </div>
      <SearchBar />
      <div className='container mx-auto p-4'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 pb-4'>
          {alienList.map((alien) => {
            return (
              <div key={alien.id}>
                <button onClick={() => handleClick(alien)} className='font-semibold bg-[#64cc4f] hover:bg-green-600 text-white px-4 py-2 rounded-lg h-20 flex items-center w-full'>
                  <img src={testImg} alt={alien.name} className='mix-blend-multiply h-full mr-2'/>
                  {alien.name}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}
