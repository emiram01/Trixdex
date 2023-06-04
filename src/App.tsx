import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import AlienList from './components/AlienList';
import AlienInfo from './components/AlienInfo';
import Navbar from './components/NavBar';
import ErrorPage from './components/ErrorPage';
import RootLayout from './components/RootLayout';

const bowserRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<AlienList />}/>
      <Route path='test' element={<AlienInfo alien={{
        "id": "7dd4d506-57ba-4b36-b60e-acab5759019c",
        "name": "Heatblast",
        "species": "Pyronite",
        "homePlanet": "Pyros",
        "body": "Fiery Humanoid",
        "description": "Heatblast is a plasma-based life-form whose body is composed of a super hot inner plasma covered by volcanic rocks. As a fire-based entity, his body radiates high amounts of heat.",
        "abilities": [
          "Pyrokinesis",
          "Fire/Heat Absorption",
          "Pyrokinetic Constructs",
          "Fire Transportation",
          "Flight",
          "Limited Terrakinesis"
        ],
        "weaknesses": [
          "Fire Suppressants",
          "Fire-Resistant Opponents",
          "Reignition Limit"]}}/>}/>
    </Route>
  )
)

export default function App() {
  return (
    <div className='bg-gray-800'>
      <RouterProvider router={bowserRouter}/>
    </div>
  )
}
