import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import AlienList from './components/AlienList';
import AlienInfo from './components/AlienInfo';
import ErrorPage from './components/ErrorPage';
import RootLayout from './components/RootLayout';
import InfoPage from './components/InfoPage';

const bowserRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<AlienList />}/>
      <Route path=':name' element={<AlienInfo />}/>
      <Route path='*' element={<ErrorPage />} />
      <Route path='info' element={<InfoPage />} />
    </Route>
  )
)

export default function App() {
  return (
    <div className='bg-gray-800 min-h-screen'>
      <RouterProvider router={bowserRouter}/>
    </div>
  )
}
