import { createBrowserRouter as Browser } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Invited } from "../pages/Invited";

export const router = Browser([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
            path: "/events",
            element: <Invited />
        }
      ]
    },
    {
        path: "/events/:id",
        element: <Invited />
    }
  ]);
