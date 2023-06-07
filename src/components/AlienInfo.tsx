import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alien } from '../utils/Interfaces';
import testImage from '../assets/images/HeatblastFull.png';
import aliens from '../assets/aliens.json';
import ErrorPage from './ErrorPage';

export default function AlienInfo() {
  const [alienInfo, setAlienInfo] = useState<Alien | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const { name } = useParams<{ name?: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const foundAlien = aliens.find(alien => alien.name.replace(' ', '-').toLowerCase() === name?.toLowerCase());
    setAlienInfo(foundAlien || null);
    setLoaded(true);
  }, [name]);

  if(!loaded) {
    return null;
  }

  return (
    <>
      {alienInfo ? (
        // <div className='bg-green-500 shadow rounded-lg mx-auto p-4'>
          <div>
            <img src={testImage} className='mx-auto'/>
            <h2 className='text-lg text-center font-semibold'>{alienInfo.name}</h2>
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
        // </div>
      ) : (
        // <div className='flex flex-col gap-8 justify-center items-center h-screen bg-gray-900'>
        //   <h1 className='text-4xl font-bold text-white'>Oops!</h1>
        //   <p className='text-slate-400'>Alien not Found.</p>
        // </div>
        <ErrorPage /> 
      )}
    </>
  )
}
