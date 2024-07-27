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
import Authprovider from './Components/Providers/Authprovider';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
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
      {
        path:'/login',
        element:<Login></Login>

      },
      {
        path:'/register',
        element:<Register></Register>

      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Authprovider><RouterProvider router={router} /></Authprovider>
  </React.StrictMode>,
)
