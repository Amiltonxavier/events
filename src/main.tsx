import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './router/index.tsx'
import { EventsProviders } from './context/index.tsx'
import { ToastContainer } from 'react-toastify';
import { Helmet } from "react-helmet";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <EventsProviders>
      <ToastContainer />
      <Helmet titleTemplate='%s | events' />
      <RouterProvider router={router} />
    </EventsProviders>
  </React.StrictMode>,
)
