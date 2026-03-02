import { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if user is logged in
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Register user
    const registerUser = async (userData) => {
        try {
            setLoading(true);
            setError(null);
            const res = await api.post('/auth/register', userData);

            localStorage.setItem('user', JSON.stringify(res.data));
            setUser(res.data);
            return { success: true };
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register');
            return { success: false, error: err.response?.data?.message || 'Failed to register' };
        } finally {
            setLoading(false);
        }
    };

    // Login user
    const loginUser = async (userData) => {
        try {
            setLoading(true);
            setError(null);
            const res = await api.post('/auth/login', userData);

            localStorage.setItem('user', JSON.stringify(res.data));
            setUser(res.data);
            return { success: true };
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
            return { success: false, error: err.response?.data?.message || 'Invalid email or password' };
        } finally {
            setLoading(false);
        }
    };

    // Logout user
    const logoutUser = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                registerUser,
                loginUser,
                logoutUser,
                setError
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
