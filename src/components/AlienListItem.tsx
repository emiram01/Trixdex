import { useNavigate } from 'react-router-dom';
import { Alien } from '../utils/Interfaces';

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
          <div key={alien.id} className='bg-emerald-500 rounded-lg hover:scale-105'>
            <button
              onClick={() => handleClick(alien)}
              className='font-semibold bg-gradient-to-r from-green-500 from-10% via-green-500 via-30% to-[#ffffff00] to-90% px-4 py-2 rounded-lg h-20 flex items-center w-full hover:z-10 relative border-2 border-black'
            >
              <img src={import.meta.env.BASE_URL + 'omnitrix.svg'} className='absolute inset-0 h-full w-20 ml-1 mt-0.5 object-contatin mix-blend-lighten opacity-40' />
              <img src={import.meta.env.BASE_URL + alien.images[1]} className='absolute inset-0 h-full w-full object-cover mix-blend-luminosity opacity-50 rounded-lg' />
              <img src={import.meta.env.BASE_URL + alien.images[0]} className='absolute h-5/6 left-0 m-2 z-10' />
              <span className='font-extrabold text-xl text-white p-2 absolute left-20'>{alien.name.toUpperCase()}</span>
            </button>
          </div>
        );
      })}
    </>
  )
}
