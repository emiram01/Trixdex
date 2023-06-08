import { useEffect, useState, useMemo } from 'react';
import { Alien } from '../utils/Interfaces';
import aliens from '../assets/aliens.json';
import SearchBar from './SearchBar';
import gif from '../assets/omnitrixanim.gif';
import AlienListItem from './AlienListItem';

export default function AlienList() {
  const [alienList, setAlienList] = useState<Alien[]>([]);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {  
    setAlienList(aliens);
  }, []);

  const filteredAlienList = useMemo(() => {
    return alienList.filter((alien) =>
      alien.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [alienList, query]);

  return (
    <>
      <div className='flex justify-center bg-gray-900 border-t-2 border-black'>
        <img src={gif} className='mix-blend-color-dodge max-h-screen opacity-20'></img>
      </div>
      <SearchBar query={query} setQuery={setQuery} />
      <div className='container mx-auto p-4'>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-4'>
          <AlienListItem filteredAlienList={filteredAlienList}/>
        </div>
      </div>
    </>
  )
}
