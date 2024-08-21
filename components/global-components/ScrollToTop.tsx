import { ArrowUpFromDotIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

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
                <ArrowUpFromDotIcon size={24} color='#fff' />
            </button>
        </div>
    );
};
