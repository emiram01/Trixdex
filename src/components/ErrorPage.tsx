import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import Navbar from "./NavBar";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <Navbar />
      <div className='flex flex-col gap-8 justify-center items-center h-screen'>
        
        <h1 className='text-4xl font-bold'>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p className='text-slate-400'>
          <i>
            { isRouteErrorResponse(error) ? (error.error?.message || error.statusText) : 'Unkown Error'}
          </i>
        </p>
      </div>
    </>
  );
}