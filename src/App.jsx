import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Header from "./components/custom/Header";

function App() {
  const { user, isLoaded } = useUser();

  // While loading, show something neutral
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  // If not signed in, redirect
  if (!user) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  // If signed in, show app
  return (
    <div>
      <Header/>
      <Outlet />
    </div>
  );
}

export default App;
