import { Outlet, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Header from "./components/custom/Header";
import { Toaster } from "sonner";

function App() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return (
    <div>
      <Header />
      <Outlet />
      <Toaster richColors position="bottom-right" />

    </div>
  );
}

export default App;
