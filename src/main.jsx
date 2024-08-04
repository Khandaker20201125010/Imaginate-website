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
import Privetroot from './Components/Privetroot/Privetroot';
import AboutUs from './Components/Aboutus/AboutUs';
import MemberShow from './Components/MembersShow/MemeberShow';
import Error from './Components/Error/Error';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainone></Mainone>,
    errorElement:<Error></Error>,
    children:[
      {
        path:'/',
        element:<Enterpages></Enterpages>

      },
      {
        path:'/home',
        element:<Privetroot><Home></Home></Privetroot>

      },
      {
        path:'/login',
        element:<Login></Login>

      },
      {
        path:'/register',
        element:<Register></Register>

      },
      {
        path:'/aboutUs',
        element:<Privetroot><AboutUs></AboutUs></Privetroot>

      },
      {
        path:'/members',
        element:<Privetroot><MemberShow></MemberShow></Privetroot>

      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Authprovider><RouterProvider router={router} /></Authprovider>
  </React.StrictMode>,
)

