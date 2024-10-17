import React, { createContext, useState, useEffect } from 'react';

// Create a context for authentication
export const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null); // Optional: to store user data
    const [error, setError] = useState(null); // Optional: to handle errors

    // Check for authentication status on initial load (e.g., check localStorage)
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser)); // Restore user data
        }
    }, []);

    // Login function
    const login = async (userData) => {
        try {
            // Implement your login logic here (e.g., API calls)
            // Simulate an API call:
            // const response = await api.login(userData);
            // const user = response.data;

            setIsAuthenticated(true);
            setUser(userData); // Set user data
            localStorage.setItem('user', JSON.stringify(userData)); // Save user data in localStorage
            setError(null); // Clear any previous errors
        } catch (err) {
            setError('Login failed. Please try again.'); // Handle login error
            console.error(err); // Log the error for debugging
        }
    };

    // Logout function
    const logout = () => {
        setIsAuthenticated(false);
        setUser(null); // Clear user data
        localStorage.removeItem('user'); // Remove user data from localStorage
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
