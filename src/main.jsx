import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Mainone from './Components/Layoutone/Mainone';
import Enterpages from './Components/Enterpages/Enterpages';
import Home from './Components/Home/Home';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainone></Mainone>,
    children:[
      {
        path:'/',
        element:<Enterpages></Enterpages>

      },
      {
        path:'/home',
        element:<Home></Home>

      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
