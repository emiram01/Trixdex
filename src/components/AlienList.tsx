import { useEffect, useState } from 'react';
import { fetchAliens } from '../utils/ContentParser';
import AlienCard from './AlienCard';

interface Alien {
  articleName: string;
  name: string;
}

export default function AlienList() {
  const [aliens, setAliens] = useState<Alien[]>([]);

  useEffect(() => {  
    let isMounted = true;
    const fetchData = async () => {
      const fetchedAliens = await fetchAliens();
      if (isMounted)
        setAliens(fetchedAliens);
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
  <div>
    {aliens.length > 0 && (<AlienCard alien={aliens[3].articleName} />)}
  </div>
  )
}
