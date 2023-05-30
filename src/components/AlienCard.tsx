import { useEffect, useState } from 'react';
import { fetchAlienInformation } from '../utils/ContentParser';
import { Alien, AlienInformation } from '../utils/Interfaces';
import axios from 'axios';

interface Props {
  alien: Alien
}

export default function AlienCard(props: Props) {
  const [alienInfo, setAlienInfo] = useState<AlienInformation | null>(null);

  useEffect(() => {  
    let cancelTokenSource = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        const alienInformation = await fetchAlienInformation(props.alien, cancelTokenSource);
        setAlienInfo(alienInformation[0]);
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
  }, [props.alien]);

  return (
    <div className='bg-white shadow rounded p-4'>
      {alienInfo ? (
        <div>
          <h2 className='text-lg font-semibold'>{props.alien.name}</h2>
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
