import { createContext, useEffect, useState } from "react";
export const ThemeContext = createContext();
export default function ThemeWrapper({ children }) {
    const [light, setLight] = useState(true);
    function initialThemeHandler() {
        if (!localStorage.getItem("light")) {
            localStorage.setItem("light", light);
        } else {
            const savedLight = JSON.parse(localStorage.getItem("light"));
            !savedLight && document.querySelector('body').classList.add('dark');
            setLight(savedLight);
        }
    }
    function toggleThemeHandler() {
        setLight((prevLight) => {
            const newLight = !prevLight;
            localStorage.setItem("light", newLight);
            if (newLight) {
                document.querySelector('body').classList.remove('dark');
            } else {
                document.querySelector('body').classList.add('dark');
            }
            return newLight;
        });
    }
    const globalState = {
        light,
        toggleThemeHandler,
    };
    useEffect(() => {
        initialThemeHandler();
    });
    return (
        <ThemeContext.Provider value={globalState}>
            {children}
        </ThemeContext.Provider>
    );
}