interface AlienInfoItemProps {
  title: string;
  content: React.ReactNode;
  color: string;
}

export default function AlienInfoItem({ title, content, color }: AlienInfoItemProps) {
  return (
    <div className={`relative flex flex-grow text-center text-white font-semibold bg-gray-800 rounded-lg p-4 m-2 max-w-lg border-2 border-black my-6 lg:w-1/2`}>
      <div className={`absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gray-900 border-2 border-${color}-500 rounded-full py-1 px-4`}>
        <span className='text-md text-white font-bold'>{title}</span>
      </div>
      <div className='p-2 w-full'>
        {content}
      </div>
    </div>
  );
}