import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { deleteCookie } from 'cookies-next';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getGridCols(width: number) {
    if (width > 1280) return 3;
    if (width > 640) return 2;
    return 1;
}

export const scrollToElementById = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
};

export const logout = () => {
    deleteCookie('token');
    deleteCookie('user');
    window.location.reload();
    
};
