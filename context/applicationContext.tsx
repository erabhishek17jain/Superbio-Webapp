'use client';
import React, { createContext, ReactNode, useContext, useEffect } from 'react';
import { useAppDispatch } from '.';
import { getCookie } from 'cookies-next';
import { setToken, setUser } from './user';
import { useRouter } from 'next/navigation';
import { User } from '@/interfaces/user';

const UserContext = createContext({});

export const Provider = ({ children }: { children: ReactNode }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
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

export const useContextStore = () => useContext(UserContext);
