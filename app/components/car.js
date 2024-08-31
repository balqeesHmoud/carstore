import { AuthContext } from "../context/auth";
import { useContext } from "react";
import CarsList from "../components/CarsList";
import AddCarForm from "../components/AddCarForm";
import LoginForm from "../components/loginForm";

export default function Car() {
    const { tokens } = useContext(AuthContext);
    return (
        <div className="p-4">
            {!tokens ? (<>
                <p className="text-center text-gray-600 dark:text-gray-300">Please log in to access this page.</p>
                <LoginForm />
            </>
            ) : (
                <div className="space-y-8"> 
                    <AddCarForm />
                    <div className="mb-8">
                        <CarsList />
                    </div>
                </div>

            )}
        </div>
    );
}