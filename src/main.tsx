import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/index.tsx'
import { EventsProviders } from './context/index.tsx'
import { ToastContainer } from 'react-toastify';
import { Helmet } from "react-helmet";
import 'react-toastify/dist/ReactToastify.css';
import { UserContextProvider } from './context/user.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <EventsProviders>
      <UserContextProvider>
        <ToastContainer />
        <Helmet titleTemplate='%s | events' />
        <RouterProvider router={router} />
      </UserContextProvider>
    </EventsProviders>
  </React.StrictMode>,
)
