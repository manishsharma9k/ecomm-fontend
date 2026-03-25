import React from 'react'
import { RouterProvider } from 'react-router-dom'
import AppRoute from './route/AppRoute'
import { Toaster} from 'react-hot-toast';

function App() {
  
  return (
    <div>
      <Toaster position='top-right'/>
      <RouterProvider router={AppRoute} ></RouterProvider>
    </div>
  )
}
export default App