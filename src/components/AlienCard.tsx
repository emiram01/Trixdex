import { useEffect, useState } from 'react';
import { Alien } from '../utils/Interfaces';

interface Props {
  alien: Alien
}

export default function AlienCard(props: Props) {
  const [alienInfo, setAlienInfo] = useState<Alien | null>(null);

  useEffect(() => {  
    setAlienInfo(props.alien);
    console.log(props.alien);
  }, [props.alien]);

  return (
    <div className='bg-white shadow rounded p-4'>
      {alienInfo ? (
        <div>
          <h2 className='text-lg font-semibold'>{props.alien.name}</h2>
          <br/>
          <p className='text-gray-600'>{`Species: ${alienInfo.species}`}</p>
          <p className='text-gray-600'>{`Home Planet: ${alienInfo.homePlanet}`}</p>
          <p className='text-gray-600'>{`Body: ${alienInfo.body}`}</p>
          <br/>
          <p className='text-gray-600'>{`Description: ${alienInfo.description}`}</p>
          <br/>
          <p className='text-gray-600'>{`Abilities: ${alienInfo.abilities}`}</p>
          <br/>
          <p className='text-gray-600'>{`Weaknesses: ${alienInfo.weaknesses}`}</p>
        </div>
      ) : (
        <p>Loading alien information...</p>
      )}
    </div>
  )
}
