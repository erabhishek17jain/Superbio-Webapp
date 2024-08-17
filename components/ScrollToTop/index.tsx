import React from 'react';
import { useEffect, useState } from 'react';
import { BiArrowFromBottom } from 'react-icons/bi';

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <div className='fixed bottom-6 right-6'>
            <button
                type='button'
                onClick={scrollToTop}
                className={`${isVisible ? 'opacity-100' : 'opacity-0'}
                    bg-[#000] inline-flex items-center rounded-full p-3 text-white shadow-sm`}>
                <BiArrowFromBottom className='h-6 w-6' aria-hidden='true' />
            </button>
        </div>
    );
};
