import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/pages/Layout.jsx'
import Home from './components/pages/Home.jsx'
import Login from './components/pages/Login.jsx'
import { loginAction } from './utils/actions.js'
import Edit from './components/pages/Edit.jsx'

// routes for the application
const router = createBrowserRouter(
  [
    {
      path: '/', 
      element:<Layout/>,
      children:[
        {
          index:true,
          element:<Home/>
        }, 
        {
          path:'/edit', 
          element:<Edit/>
        }, 
        {
          path: '/test', // used to test elements I'm creating
          element: <App/>
        }
      ]
    }, 
    {
      path:'/login', 
      element:<Login/>, 
      action: loginAction
    }
  ]
);

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    // <BrowserRouter>
    //   <App />
    // </BrowserRouter>
  // </React.StrictMode>,
  <RouterProvider router={router} />
)
