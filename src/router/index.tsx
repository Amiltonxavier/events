import { createBrowserRouter as Browser } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { Invited } from "../pages/Invited";
import { NotFound } from "../pages/not-found";

export const router = Browser([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/events/:id",
    element: <Invited />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);
