import { useState } from 'react';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}

export default function SearchBar({ query, setQuery }: SearchBarProps) {
  return (
    <input
      type='search'
      className='bg-gray-700 text-white font-bold rounded-full py-2 px-4 mx-2 w-64 md:w-72 lg:w-96 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
      placeholder='Search'
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  )
}