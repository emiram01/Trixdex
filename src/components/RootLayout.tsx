import { Outlet } from 'react-router-dom';
import Navbar from './NavBar';

export default function RootLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>
    </>
  )
}