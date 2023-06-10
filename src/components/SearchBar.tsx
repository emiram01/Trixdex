import { useEffect, useState } from "react";
import { Alien } from '../utils/Interfaces';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}

export default function SearchBar({ query, setQuery }: SearchBarProps) {
  return (
    <div className='sticky top-0 flex justify-center mb-4 p-4 w-full bg-gray-900 z-20 border-b-2 border-black'>
      <input
        type='search'
        className='bg-gray-700 text-white rounded-full py-2 px-4 w-96 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
        placeholder='Search'
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </div>
  )
}