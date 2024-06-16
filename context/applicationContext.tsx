'use client';
import React from 'react';
import { useAppDispatch } from '.';
import { getCookie } from 'cookies-next';
import { setToken, setUser } from './user';
import { useRouter } from 'next/navigation';

const UserContext = React.createContext({});

export const Provider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    React.useEffect(() => {
        const token = getCookie('token');
        const stringifiedUser = getCookie('user');
        let user: User | null = null;
        if (stringifiedUser && typeof stringifiedUser === 'string') {
            user = JSON.parse((getCookie('user') as string) || '{}') as User;
        }
        if (!token || !user) {
            return;
        }
        dispatch(setUser(user));
        dispatch(setToken(token));
    }, []);
    return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

export const useContextStore = () => React.useContext(UserContext);
