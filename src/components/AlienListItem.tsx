import { useNavigate } from 'react-router-dom';
import { Alien } from '../utils/Interfaces';
import testImg from '../assets/images/HeatblastFull.png';

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
            <button onClick={() => handleClick(alien)} className='font-semibold bg-[#64cc4f] hover:bg-green-600 text-white px-4 py-2 rounded-lg h-20 flex items-center w-full'>
              <img src={testImg} alt={alien.name} className='mix-blend-multiply h-full mr-2'/>
              {alien.name}
            </button>
          </div>
        );
      })}
    </>
  )
}
