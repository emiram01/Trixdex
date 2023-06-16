import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Alien } from '../utils/Interfaces';
import planet from '../assets/images/icons/planeticon.gif';
import aliens from '../assets/data/aliens.json';
import ErrorPage from './ErrorPage';
import InfoItem from './InfoItem';

export default function AlienInfo() {
  const [alienInfo, setAlienInfo] = useState<Alien | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const { name } = useParams<{ name?: string }>();

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
          <div className='h-96 lg:h-[36rem] ml-[-50%] w-[200%] rounded-b-[100%] bg-green-500'>
            <h2 className='text-4xl lg:text-5xl text-center text-white font-extrabold p-4'>
              {alienInfo.name.toUpperCase()}
            </h2>
            <img src={alienInfo.images[0]} className='mx-auto p-4 h-full' />
          </div>

          <div className='flex flex-wrap p-4 mt-16 justify-center'>
            <InfoItem title='Overview'
              content={<p className='p-2 m-auto'>{alienInfo.description}</p>}
              color={alienInfo.color}
            />

            <div className='flex flex-wrap lg:w-2/3 lg:flex-nowrap justify-center'>
              <InfoItem title='Origin'
                content={(
                  <div className='py-4 flex justify-center m-auto items-center'>
                    <img src={planet} className={`h-8 lg:h-10 filter ${alienInfo.homePlanet.includes('Unknown') ? 'grayscale' : 'hue-rotate-[310deg]'}`} />
                    <span className='ml-2 py-2'>{alienInfo.homePlanet}</span>
                  </div>
                )}
                color={alienInfo.color}
              />

              <InfoItem title='Species'
                content={(
                  <div className='py-4 flex justify-center m-auto items-center'>
                    <span className='py-2'>{alienInfo.species}</span>
                  </div>
                )}
                color={alienInfo.color}
              />

              <InfoItem title='Anatomy'
                content={(
                  <div className='py-4 flex justify-center m-auto items-center'>
                    <img src={alienInfo.images[0]} className='h-8 lg:h-9 filter brightness-0 saturate-100 invert-[90%]' />
                    <span className='ml-2 py-2'>{alienInfo.body}</span>
                  </div>
                )}
                color={alienInfo.color}
              />
            </div>
            
            <div className='flex flex-wrap justify-center w-full'>
              <InfoItem title='Abilities'
                content={
                  <div className='sm:flex'>
                    <div className='sm:w-1/2'>
                      {alienInfo.abilities.slice(0, Math.ceil(alienInfo.abilities.length / 2)).map((ability, index) => (
                        <p className={`bg-${alienInfo.color}-500 text-left my-2 py-2 px-4 bg-opacity-20 rounded-md text-${alienInfo.color}-400 inline-block w-full`} key={index}>{ability}</p>
                      ))}
                    </div>
                    <div className='sm:border sm:border-gray-700 sm:m-4' />
                    <div className='sm:w-1/2'>
                      {alienInfo.abilities.slice(Math.ceil(alienInfo.abilities.length / 2)).map((ability, index) => (
                        <p className={`bg-${alienInfo.color}-500 text-left my-2 py-2 px-4 bg-opacity-20 rounded-md text-${alienInfo.color}-400 inline-block w-full`} key={index}>{ability}</p>
                      ))}
                    </div>
                  </div>
                }
                color={alienInfo.color}
              />

              <InfoItem title='Weaknesses'
                content={
                  <div className='flex-wrap'>
                    {alienInfo.weaknesses.map((weakness, index) => (
                      <p className={`bg-${alienInfo.color}-500 text-left my-2 py-2 px-4 bg-opacity-20 rounded-md text-${alienInfo.color}-400 inline-block w-full`} key={index}>{weakness}</p>
                    ))}
                  </div>
                }
                color={alienInfo.color}
              />
            </div>
          </div>
        </div>
      ) : (
        <ErrorPage />
      )}
    </div>
  )
}