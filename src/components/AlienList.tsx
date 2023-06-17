import { useEffect, useState, useMemo } from 'react';
import { Alien } from '../utils/Interfaces';
import aliens from '../assets/data/aliens.json';
import SearchBar from './SearchBar';
import gif from '../assets/images/omnitrixanim.gif';
import AlienListItem from './AlienListItem';
import Categories from './Categories'; 

export default function AlienList() {
  const [alienList, setAlienList] = useState<Alien[]>([]);
  const [query, setQuery] = useState<string>('');
  const [category, setCategory] = useState<string>('');

  useEffect(() => {  
    setAlienList(aliens);
  }, []);

  const categorizedAlienList = useMemo(() => {
    if (category === '') {
      return alienList;
    } else {
      return alienList.filter((alien) => alien.series === category);
    }
  }, [alienList, category]);
  
  const filteredAlienList = useMemo(() => {
    return categorizedAlienList.filter((alien) =>
      alien.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [categorizedAlienList, query]);

  return (
    <>
      <div className='flex justify-center bg-gray-900'>
        <img src={gif} className='mix-blend-color-dodge max-h-[50vh] opacity-20'></img>
      </div>

      <div className='bg-gray-900 border-b-2 border-black z-20 sticky top-0'>
        <div className='container mx-auto sticky top-0 flex flex-wrap justify-between p-4 md:py-0 w-full xl:w-2/3 2xl:w-1/2 lg:min-w-[62rem]'>
          <SearchBar query={query} setQuery={setQuery} />
          <Categories category={category} setCategory={setCategory} />
        </div>
      </div>

      
      <div className='container mx-auto p-4'>
        <div className='grid grid-cols-1 gap-2 md:gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pb-4'>
          <AlienListItem filteredAlienList={filteredAlienList}/>
        </div>
      </div>
    </>
  )
}
