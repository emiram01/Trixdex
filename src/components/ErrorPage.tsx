import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <div className='flex flex-col gap-8 justify-center items-center h-screen bg-gray-900'>
        <h1 className='text-4xl font-bold text-white'>Oops!</h1>
        <p className='text-slate-400'>Sorry, an unexpected error has occurred.</p>
        <p className='text-slate-400'>
          <i>
            { isRouteErrorResponse(error) ? (error.error?.message || error.statusText) : 'Unkown Error'}
          </i>
        </p>
      </div>
    </>
  );
}