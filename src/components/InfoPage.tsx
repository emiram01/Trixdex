import linkedinicon from '../assets/images/icons/linkedinicon.svg';
import githubicon from '../assets/images/icons/githubicon.svg';
import ericon from '../assets/images/icons/ERicon.svg';
import InfoItem from './InfoItem';

export default function InfoPage() {
  return (
    <div className='min-h-screen bg-gray-900'>
      <div className='flex flex-col m-auto justify-center items-center p-4'>
        <InfoItem
          title='About'
          content={(
            <p className='font-medium text-white p-4 text-center'>
              Welcome to Trixdex, the ultimate Ben 10 database that catalogs the various species of aliens featured throughout the series.
            </p>
          )}
          color={'green'}
        />
        <div className='flex justify-center w-full'>
          <InfoItem
            title='Contact'
            content={(
              <div className='flex flex-wrap font-medium text-white text-center justify-center'>
                <a className='mx-auto flex hover:brightness-75 p-4 items-center' href='https://github.com/emiram01' target='_blank' rel='noopener noreferrer'>
                  <img src={githubicon} alt='Logo' className='w-6 mr-2' />
                  GitHub
                </a>
                <a className='mx-auto flex hover:brightness-75 p-4 items-center' href='https://linkedin.com/in/emiliano-ramirez-42233721a' target='_blank' rel='noopener noreferrer'>
                  <img src={linkedinicon} alt='Logo' className='w-6 mr-2' />
                  LinkedIn
                </a>
                <a className='mx-auto flex hover:brightness-75 p-4 items-center' href='https://emilianoramirez.com' target='_blank' rel='noopener noreferrer'>
                  <img src={ericon} alt='Logo' className='w-[1.6rem] mr-2' />
                  Personal Site
                </a>
              </div>
            )}
            color={'green'}
          />
        </div>
        <InfoItem
          title='Disclaimer'
          content={(
            <p className='font-medium text-white p-4 text-center'>
              Trixdex is a fan-created website and is not affiliated with the Ben 10 franchise or any of its intellectual property.
            </p>
          )}
          color={'green'}
        />
      </div>
    </div>
  );
}

