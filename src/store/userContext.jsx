import React, { createContext, useContext, useState, useEffect } from 'react';
import userService from '../api/userService'; // Asegúrate de importar el servicio correcto.

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                setUser(storedUser || '');
            } catch (error) {
                console.error('Error al obtener el user del usuario:', error);
            }
        };

        fetchUser();
    }, []);

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
