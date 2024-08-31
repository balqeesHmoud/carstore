import { useContext } from "react";
import { ThemeContext } from "../context/theme";
import { AuthContext } from "../context/auth";

export default function Header() {
  const { light, toggleThemeHandler } = useContext(ThemeContext);
  const { tokens, logout } = useContext(AuthContext);
  const username = tokens ? tokens.username : 'Guest'; // Adjust according to your token structure

  return (
    <header className="p-6 bg-teal-600 text-white dark:bg-gray-900 dark:text-gray-300 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold text-gray-100 dark:text-gray-100">Library Book Tracker</h1>
        <nav className="flex items-center space-x-6">
          <ul className="flex space-x-6">
            <li>
              <a
                href="/"
                className="text-gray-100 hover:text-teal-200 dark:text-gray-200 dark:hover:text-teal-400 transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/about_us"
                className="text-gray-100 hover:text-teal-200 dark:text-gray-200 dark:hover:text-teal-400 transition-colors"
              >
                About Us
              </a>
            </li>

          </ul>
          <div className="flex items-center space-x-4">
            {tokens && (
              <div className="flex items-center space-x-4">
                <button
                  onClick={logout}
                  className="py-2 px-4 bg-gray-100 text-teal-600 dark:bg-gray-700 dark:text-gray-200 font-semibold rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
            <button
              onClick={toggleThemeHandler}
              className="py-2 px-4 bg-gray-100 text-teal-600 dark:bg-gray-700 dark:text-gray-200 font-semibold rounded-lg shadow-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {light ? "Dark Mode" : "Light Mode"}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
