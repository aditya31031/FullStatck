import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // Optimistic UI: Load from storage first if available
                    const savedUser = JSON.parse(localStorage.getItem('user'));
                    if (savedUser) setUser(savedUser);

                    // Then verify with server for fresh data
                    const res = await fetch('https://pediatricsbackend.onrender.com/api/auth/me', {
                        headers: { 'x-auth-token': token }
                    });

                    if (res.ok) {
                        const data = await res.json();
                        setUser(data);
                        localStorage.setItem('user', JSON.stringify(data)); // Sync storage
                    } else {
                        // If token invalid, clear everything
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        setUser(null);
                    }
                } catch (error) {
                    console.error("Auth check failed", error);
                    // Don't clear immediately on network error, keep stale data
                }
            }
            setLoading(false);
        };
        loadUser();
    }, []);

    const login = async (email, password) => {
        try {
            const res = await fetch('https://pediatricsbackend.onrender.com/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Login failed');

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const register = async (name, email, password, phone) => {
        try {
            const res = await fetch('https://pediatricsbackend.onrender.com/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password, phone }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.msg || 'Registration failed');

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            return { success: true };
        } catch (err) {
            return { success: false, error: err.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const updateUser = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateUser, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
