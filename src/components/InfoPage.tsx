import linkedinicon from '../assets/images/icons/linkedinicon.svg';
import githubicon from '../assets/images/icons/githubicon.svg';
import InfoItem from './InfoItem';

export default function ErrorPage() {
  return (
    <div className='flex min-h-screen bg-gray-900'>
      <div className='w-screen flex flex-col m-auto justify-center items-center p-4'>
        <InfoItem
          title='About'
          content={(
            <p className='font-medium text-white p-4 text-center'>
              Welcome to Trixdex, the ultimate Ben 10 database that catalogs the various species of aliens featured throughout the series.
            </p>
          )}
          color={'emerald'}
        />
        <div className='flex justify-center w-full'>
          <InfoItem
            title='Contact'
            content={(
              <div className='flex flex-wrap font-medium text-white text-center justify-center'>
                <a className='mx-auto flex hover:brightness-75 p-4' href='https://github.com/emiram01' target='_blank' rel='noopener noreferrer'>
                  <img src={githubicon} alt='Logo' className='h-6 mr-2' />
                  GitHub
                </a>
                <a className='mx-auto flex hover:brightness-75 p-4' href='https://linkedin.com/in/emiliano-ramirez-42233721a' target='_blank' rel='noopener noreferrer'>
                  <img src={linkedinicon} alt='Logo' className='h-6 mr-2' />
                  LinkedIn
                </a>
              </div>
            )}
            color={'emerald'}
          />
        </div>
        <InfoItem
          title='Disclaimer'
          content={(
            <p className='font-medium text-white p-4 text-center'>
              Trixdex is a fan-created website and is not affiliated with the Ben 10 franchise or any of its intellectual property.
            </p>
          )}
          color={'emerald'}
        />
      </div>
    </div>
  );
}

