import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const stored = localStorage.getItem('fintrack-user');
        return stored ? JSON.parse(stored) : null;
    });
    const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(localStorage.getItem('fintrack-auth')));

    useEffect(() => {
        if (user) {
            localStorage.setItem('fintrack-user', JSON.stringify(user));
            localStorage.setItem('fintrack-auth', 'true');
            setIsAuthenticated(true);
        } else {
            localStorage.removeItem('fintrack-user');
            localStorage.removeItem('fintrack-auth');
            setIsAuthenticated(false);
        }
    }, [user]);

    const login = ({ email, password, name }) => {
        const normalized = {
            email,
            name: name || 'Alex Morgan',
            password,
        };
        setUser(normalized);
    };

    const register = (payload) => {
        const nextUser = {
            name: payload.fullName,
            email: payload.email,
            password: payload.password,
        };
        setUser(nextUser);
        return nextUser;
    };

    const logout = () => {
        setUser(null);
    };

    const value = useMemo(
        () => ({ user, isAuthenticated, login, register, logout }),
        [user, isAuthenticated],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be inside AuthProvider');
    return context;
}
