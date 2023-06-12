import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alien } from '../utils/Interfaces';
import aliens from '../assets/data/aliens.json';
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
    <div className='overflow-x-hidden bg-gray-900 h-full'>
      {alienInfo ? (
        <div className='container mx-auto'>
          <div className='h-96 lg:h-[36rem] ml-[-50%] w-[200%] rounded-b-[100%] bg-green-500'>
            <h2 className='text-4xl lg:text-5xl text-center text-white font-extrabold p-4'>{alienInfo.name.toUpperCase()}</h2>
            <img src={alienInfo.images[0]} className='mx-auto p-4 h-full'/>
          </div>

          <div className='flex flex-col p-4 mt-10'>
            <div className='text-white font-semibold bg-gray-800 rounded-lg p-6 m-2 text-center'>
              <p className='p-2'>{`${alienInfo.description}`}</p>
              <p className='p-2'>{`Species: ${alienInfo.species}`}</p>
              <p className='p-2'>{`Home Planet: ${alienInfo.homePlanet}`}</p>
              <p className='p-2'>{`Body: ${alienInfo.body}`}</p>
            </div>

            <div className='text-white font-semibold bg-gray-800 rounded-lg p-6 m-2'>
              <p className='p-2'>{`Abilities: ${alienInfo.abilities}`}</p>
            </div>
            
            
            <div className='text-white font-semibold bg-gray-800 rounded-lg p-6 m-2'>
              <p className='text-white'>{`Weaknesses: ${alienInfo.weaknesses}`}</p>
            </div>
          </div>

          
        </div>
      ) : (
        <ErrorPage /> 
      )}
    </div>
  )
}
