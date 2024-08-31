import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const AuthContext = createContext();
export default function AuthWrapper({ children }) {
    const [tokens, setTokens] = useState(null);
    useEffect(() => {
        // Client-side code only
        if (typeof window !== "undefined") {
            const storedTokens = localStorage.getItem("tokens");
            if (storedTokens) {
                setTokens(JSON.parse(storedTokens));
            }
        }
    }, []);
    async function login(info) {
        try {
            const url = process.env.NEXT_PUBLIC_URL + 'api/token/';
            const res = await axios.post(url, info);
            const newTokens = res.data;
            setTokens(newTokens);
            if (typeof window !== "undefined") {
                localStorage.setItem("tokens", JSON.stringify(newTokens));
            }
            return true; // Login successful
        } catch (error) {
            console.error("Login failed", error);
            return false; // Login failed
        }
    }
    function logout() {
        setTokens(null);
        if (typeof window !== "undefined") {
            localStorage.removeItem("tokens");
        }
    }
    return (
        <AuthContext.Provider value={{ tokens, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}