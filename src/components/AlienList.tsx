import { useEffect, useState } from 'react';
import { Alien } from '../utils/Interfaces';
import aliens from '../assets/aliens.json';
import testImg from '../assets/images/HeatblastFull.png';
import AlienInfo from './AlienInfo';

export default function AlienList() {
  const [alienList, setAlienList] = useState<Alien[]>([]);
  const [selectedAlien, setSelectedAlien] = useState<Alien | null>(null);

  useEffect(() => {  
    setAlienList(aliens);
  }, []);

  const handleClick = (alien: Alien) => {
    setSelectedAlien(alien);
  };

  return (
    <div className='container mx-auto p-4'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 pb-4'>
        {alienList.map((alien) => {
          return (
            <div key={alien.id}>
              <button onClick={() => handleClick(alien)} className='font-semibold bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg h-20 flex items-center w-full'>
                <img src={testImg} alt={alien.name} className='mix-blend-multiply h-full mr-2'/>
                {alien.name}
              </button>
            </div>
          );
        })}
      </div>
      {selectedAlien && <AlienInfo alien={selectedAlien}/>}
    </div>
  )
}
