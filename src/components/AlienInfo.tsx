import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
import { Alien } from '../utils/Interfaces';
import testImage from '../assets/images/HeatblastFull.png';

interface Props {
  alien: Alien;
}

export default function AlienInfo(props: Props) {
  const [alienInfo, setAlienInfo] = useState<Alien | null>(null);
  // const navigate = useNavigate();

  useEffect(() => {  
    setAlienInfo(props.alien);
  }, [props.alien]);

  // const handleBack = () => {
  //   navigate('');
  // };

  return (
    <div className='bg-green-500 shadow rounded-lg mx-auto p-4'>
      {alienInfo ? (
        <div>
          <img src={testImage} className='mx-auto'/>
          <h2 className='text-lg text-center font-semibold'>{props.alien.name}</h2>
          <br/>
          <p className='text-white'>{`Species: ${alienInfo.species}`}</p>
          <p className='text-white'>{`Home Planet: ${alienInfo.homePlanet}`}</p>
          <p className='text-white'>{`Body: ${alienInfo.body}`}</p>
          <br/>
          <p className='text-white'>{`Description: ${alienInfo.description}`}</p>
          <br/>
          <p className='text-white'>{`Abilities: ${alienInfo.abilities}`}</p>
          <br/>
          <p className='text-white'>{`Weaknesses: ${alienInfo.weaknesses}`}</p>
        </div>
      ) : (
        <p>Loading alien information...</p>
      )}
    </div>
  )
}
