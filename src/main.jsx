import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Home from "./home/index.jsx";
import Dashboard from "./dashboard/index.jsx";
import Signin from "./auth/sign-in/index.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ClerkProvider } from '@clerk/clerk-react'
import EditResume from "./dashboard/resume/[resumeid]/edit";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
     
      { path: "/dashboard", element: <Dashboard /> },
      {
        path : '/dashboard/resume/:resumeid/edit',
        element : <EditResume/>
      }
    ],
  },
   { path: "/", element: <Home /> },
  {
    path: "/auth/sign-in",
    element: <Signin />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
     <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <RouterProvider router={router} />
     </ClerkProvider>
  </StrictMode>
);
