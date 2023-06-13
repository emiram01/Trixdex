import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Alien } from '../utils/Interfaces';
import aliens from '../assets/data/aliens.json';
import ErrorPage from './ErrorPage';
import planet from '../assets/images/icons/planeticon.gif';
import selectionicon from '../assets/images/icons/selectionicon.png';

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
    <div className='overflow-x-hidden bg-gray-900 min-h-screen'>
      {alienInfo ? (
        <div className='container mx-auto'>
          <div className='h-96 lg:h-[36rem] ml-[-50%] w-[200%] rounded-b-[100%] bg-emerald-500'>
            <h2 className='text-4xl lg:text-5xl text-center text-white font-extrabold p-4'>{alienInfo.name.toUpperCase()}</h2>
            <img src={alienInfo.images[0]} className='mx-auto p-4 h-full'/>
          </div>

          <div className='flex flex-wrap p-4 mt-16 justify-center'>

            <div className='relative flex flex-grow text-center text-white font-semibold bg-gray-800 rounded-lg p-4 px-6 m-2 max-w-lg border-2 border-black my-6'>
              <div className='absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gray-800 border-2 border-emerald-500 rounded-full py-1 px-4'>
                <span className='text-md text-white font-bold'>Overview</span>
              </div>
              <p className='p-2 m-auto'>{`${alienInfo.description}`}</p>
            </div>

            <div className='relative flex flex-grow text-center text-white font-semibold bg-gray-800 rounded-lg p-4 m-2 max-w-lg border-2 border-black my-6'>
              <div className='absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gray-800 border-2 border-emerald-500 rounded-full py-1 px-4'>
                <span className='text-md text-white font-bold'>Origin</span>
              </div>
              <div className='py-4 flex items-center m-auto'>
                <img src={planet} className={`h-8 lg:h-10 filter ${alienInfo.homePlanet.includes('Unknown') ? 'grayscale' : 'hue-rotate-[310deg]'}`}/>
                <span className='ml-2'>{`${alienInfo.homePlanet}`}</span>
              </div>
            </div>

            <div className='relative flex flex-grow text-center text-white font-semibold bg-gray-800 rounded-lg p-4 m-2 max-w-lg border-2 border-black my-6'>
              <div className='absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gray-800 border-2 border-emerald-500 rounded-full py-1 px-4'>
                <span className='text-md text-white font-bold'>Species</span>
              </div>
              <p className='py-4 m-auto'>{`${alienInfo.species}`}</p>
            </div>

            <div className='relative flex flex-grow text-center text-white font-semibold bg-gray-800 rounded-lg p-4 m-2 max-w-lg border-2 border-black my-6'>
              <div className='absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gray-800 border-2 border-emerald-500 rounded-full py-1 px-4'>
                <span className='text-md text-white font-bold'>Anatomy</span>
              </div>
              <div className='py-4 flex items-center m-auto'>
                <img src={alienInfo.images[0]} className='h-8 lg:h-9 filter brightness-0 saturate-100 invert-[90%]' />
                <span className='ml-4'>{`${alienInfo.body}`}</span>
              </div>
            </div>
            
            <div className='relative flex flex-grow text-center text-white font-semibold bg-gray-800 rounded-lg p-6 m-2 max-w-lg border-2 border-black my-6'>
              <div className='absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gray-800 border-2 border-emerald-500 rounded-full py-1 px-4'>
                <span className='text-md text-white font-bold'>Abilities</span>
              </div>
              <div className='p-2 m-auto'>
                {alienInfo.abilities.map((ability, index) => (
                  <p key={index}>{ability}</p>
                ))}
              </div>
            </div>

            <div className='relative flex flex-grow text-center text-white font-semibold bg-gray-800 rounded-lg p-6 m-2 max-w-lg border-2 border-black my-6'>
              <div className='absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gray-800 border-2 border-emerald-500 rounded-full py-1 px-4'>
                <span className='text-md text-white font-bold'>Weaknesses</span>
              </div>
              <div className='p-2 m-auto'>
                {alienInfo.weaknesses.map((weakness, index) => (
                  <p key={index}>{weakness}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <ErrorPage /> 
      )}
    </div>
  )
}
