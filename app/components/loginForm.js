import { useContext, useState } from "react";
import { AuthContext } from "../context/auth";

export default function LoginForm() {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    const success = await login({ username, password });
    if (!success) {
      setError("Incorrect username or password. Please try again.");
    } else {
      setError(null); // Clear any previous errors on successful login
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md">
        <form className="bg-teal-600 p-6 rounded-lg shadow-lg dark:bg-gray-900 dark:text-gray-300" onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 text-red-500 text-sm">
              {error}
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="username" className="block text-white font-medium mb-2 dark:text-gray-200">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full p-2 border border-teal-500 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-white font-medium mb-2 dark:text-gray-200">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border border-teal-500 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-100 text-teal-600 p-2 rounded-md hover:bg-teal-500 hover:text-white dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
