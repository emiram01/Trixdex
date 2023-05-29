import { useEffect, useState } from 'react';
import { fetchAlienInformation } from '../utils/ContentParser';
import { AlienInformation } from '../utils/Interfaces';

interface Props {
  alien: string;
}

export default function AlienCard(props: Props) {
  const [alienInfo, setAlienInfo] = useState<AlienInformation | null>(null);

  useEffect(() => {  
    let isMounted = true;
    const fetchData = async () => {
      const alienInformation = await fetchAlienInformation(props.alien);
      if (isMounted)
        setAlienInfo(alienInformation[0])
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [props.alien]);

  return (
    <div className='bg-white shadow rounded p-4'>
      {alienInfo ? (
        <div>
          <h2 className='text-lg font-semibold'>{alienInfo.name}</h2>
          <p className='text-gray-600'>{`Species: ${alienInfo.species}`}</p>
          <p className='text-gray-600'>{`Home Planet: ${alienInfo.homePlanet}`}</p>
          <p className='text-gray-600'>{`Body: ${alienInfo.body}`}</p>
        </div>
      ) : (
        <p>Loading alien information...</p>
      )}
    </div>
  )
}
