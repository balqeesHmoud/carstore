"use client";
import { AuthContext } from "./context/auth";
import LoginForm from "./components/loginForm";
import { useContext } from "react";
import Car from "./components/car";
 
export default function Home() {
  const { tokens } = useContext(AuthContext);
 
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

      <main className="flex-grow p-6 container mx-auto">
        {!tokens ? (
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <LoginForm />
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <Car />
          </div>
        )}
      </main>
  
    </div>
  );
}
 
 