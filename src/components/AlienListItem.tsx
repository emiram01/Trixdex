import { useNavigate } from 'react-router-dom';
import { Alien } from '../utils/Interfaces';
import testImg from '../assets/images/Heatblast.png';
import testImg2 from '../assets/images/HeatblastButton.png';
import testImg3 from '/omnitrix.svg';

interface AlienListItemProps {
  filteredAlienList: Alien[];
}

export default function AlienListItem({ filteredAlienList }: AlienListItemProps) {
  const navigate = useNavigate();

  const handleClick = (alien: Alien) => {
    navigate(alien.name.replace(' ', '-'));
  };

  return (
    <>
      {filteredAlienList.map((alien) => {
        return (
          <div key={alien.id}>
            <button
              onClick={() => handleClick(alien)}
              className='font-semibold bg-green-500 text-white px-4 py-2 rounded-lg h-20 flex items-center w-full hover:scale-105 relative'
            >
              <img src={testImg3} alt={alien.name} className='absolute inset-0 h-full w-20 ml-1.5 mt-0.5 object-contatin mix-blend-lighten opacity-40' />
              <img src={testImg2} alt={alien.name} className='absolute inset-0 h-full w-full object-cover mix-blend-luminosity opacity-20' />
              <img src={testImg} alt={alien.name} className='absolute h-5/6 left-0 m-2 z-10' />
              <span className='font-extrabold text-2xl text-white p-2 mix-blend-luminosity absolute top-0 left-20'>{alien.name.toUpperCase()}</span>
            </button>
          </div>
        );
      })}
    </>
  )
}
