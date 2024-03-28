import { createContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from '@firebase/auth';
import { auth } from '../services/firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    let currentUser = localStorage.getItem('user');

    const [user, setUser] = useState(
        currentUser ? JSON.parse(currentUser) : null
    );

    // console.log('auth context user: ', user);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (newUser) => {
            localStorage.setItem('user', JSON.stringify(newUser));
            setUser(newUser);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    );
};
