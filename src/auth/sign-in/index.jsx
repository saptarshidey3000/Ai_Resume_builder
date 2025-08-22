import React from "react";
import { SignIn } from "@clerk/clerk-react";

const Signin = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <SignIn
        appearance={{
          elements: {
            card: "shadow-xl rounded-2xl", // optional extra styling
          },
        }}
      />
    </div>
  );
};

export default Signin;
