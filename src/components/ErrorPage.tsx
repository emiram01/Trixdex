import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import InfoItem from "./InfoItem";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div className='flex min-h-screen bg-gray-900'>
      <div className='w-screen flex m-auto justify-center items-center p-4'>
        <InfoItem
          title="404"
          content={(
            <p className='font-medium text-xl text-white p-4 text-center'>
              Page not found...
              <i>
                { isRouteErrorResponse(error) ? (error.error?.message || error.statusText) : ''}
              </i>
            </p>
          )}
          color={'red'}
        />
      </div>
    </div>
  );
}