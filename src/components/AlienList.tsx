import { useEffect, useState } from 'react';
import { Alien } from '../utils/Interfaces';
import aliens from '../utils/aliens.json';
import AlienCard from './AlienCard';

export default function AlienList() {
  const [alienList, setAlienList] = useState<Alien[]>([]);
  const [selectedAlien, setSelectedAlien] = useState<Alien | null>(null);

  useEffect(() => {  
    setAlienList(aliens);
    console.log(aliens);
  }, []);

  const handleClick = (alien: Alien) => {
    setSelectedAlien(alien);
  };

  return (
    <div className='container mx-auto px-4'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {alienList.map((alien) => {
          return (
            <div key={alien.id}>
              <button onClick={() => handleClick(alien)} className='font-semibold bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'>
                {alien.name}
              </button>
            </div>
          );
        })}
      </div>
      {selectedAlien && <AlienCard alien={selectedAlien}/>}
    </div>
  )
}
