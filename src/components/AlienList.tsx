import { useEffect, useState } from 'react';
import { fetchAliens } from '../utils/ContentParser';
import { Alien } from '../utils/Interfaces';
import AlienCard from './AlienCard';

export default function AlienList() {
  const [alienList, setAlienList] = useState<Alien[]>([]);
  const [selectedAlien, setSelectedAlien] = useState<string | null>(null);

  useEffect(() => {  
    let isMounted = true;
    const fetchData = async () => {
      const fetchedAliens = await fetchAliens();
      if (isMounted)
        setAlienList(fetchedAliens);
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleClick = (alienName: string) => {
    setSelectedAlien(alienName);
  };

  return (
    <div className='container mx-auto px-4'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {alienList.map((alien) => {
          return (
            <div key={alien.id}>
              <button onClick={() => handleClick(alien.articleName)} className='font-semibold bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'>
                {alien.name}
              </button>
            </div>
          );
        })}
      </div>
      {selectedAlien && <AlienCard alien={selectedAlien} />}
    </div>
  )
}
