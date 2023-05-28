import { useEffect } from 'react';
import { fetchAlienInformation } from '../utils/ContentParser';

interface Props {
  alien: string;
}

export default function AlienCard(props: Props) {
  useEffect(() => {  
    let isMounted = true;
    const fetchData = async () => {
      const alienInfo = await fetchAlienInformation(props.alien);
      if (isMounted)
        console.log(alienInfo)
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
  <div>
  </div>
  )
}
