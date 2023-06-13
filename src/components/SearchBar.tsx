interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
}

export default function SearchBar({ query, setQuery }: SearchBarProps) {
  return (
    <input
      type='search'
      className='flex-grow bg-gray-700 text-white font-bold rounded-full px-4 py-2 mr-4 md:my-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500'
      placeholder='Search'
      value={query}
      onChange={e => setQuery(e.target.value)}
    />
  )
}