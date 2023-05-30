import { useEffect, useState } from 'react';
import { fetchAliens } from '../utils/ContentParser';
import { Alien } from '../utils/Interfaces';
import AlienCard from './AlienCard';
import axios from 'axios';

export default function AlienList() {
  const [alienList, setAlienList] = useState<Alien[]>([]);
  const [selectedAlien, setSelectedAlien] = useState<Alien | null>(null);

  useEffect(() => {  
    let cancelTokenSource = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        const fetchedAliens = await fetchAliens(cancelTokenSource);
        setAlienList(fetchedAliens);
      } catch (error) {
        if (axios.isCancel(error))
          console.log('request canceled');
        else
          throw error;
      }
    };

    fetchData();
    return () => {
      cancelTokenSource.cancel();
    };
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
