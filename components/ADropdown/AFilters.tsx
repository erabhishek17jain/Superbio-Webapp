import { useEffect, useRef, useState } from 'react';

const AFilters = ({ item, header, options, activeItem, selectCase = () => {} }: any) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const trigger = useRef<any>(null);
    const dropdown = useRef<any>(null);

    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!dropdown.current) return;
            if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
            setDropdownOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }: KeyboardEvent) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    useEffect(() => {
        if (activeItem?._id !== item?._id && dropdownOpen) selectCase(item);

    }, [dropdownOpen]);

    return (
        <div className='relative'>
            <div
                ref={trigger}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className='flex w-auto h-12 items-center bg-[#f6f6f6] text-[#959595] py-2 px-4 rounded-lg space-x-2 cursor-pointer text-sm text-[#9A9AB0] font-semibold'>
                {header}
                <svg
                    width='20px'
                    height='20px'
                    viewBox='0 0 24 24'
                    fill='#9A9AB0'
                    xmlns='http://www.w3.org/2000/svg'
                    className={dropdownOpen ? 'rotate-180' : ''}>
                    <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                    <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
                    <g id='SVGRepo_iconCarrier'>
                        <path
                            fillRule='evenodd'
                            clipRule='evenodd'
                            d='M18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289L12 13.5858L6.70711 8.29289C6.31658 7.90237 5.68342 7.90237 5.29289 8.29289C4.90237 8.68342 4.90237 9.31658 5.29289 9.70711L11.2929 15.7071C11.6834 16.0976 12.3166 16.0976 12.7071 15.7071L18.7071 9.70711C19.0976 9.31658 19.0976 8.68342 18.7071 8.29289Z'
                            fill='#9A9AB0'></path>
                    </g>
                </svg>
            </div>
            <div
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                className={`absolute z-10 top-14 flex flex-col w-40 max-h-72 overflow-y-auto bg-clip-border border border-stroke rounded-lg bg-white shadow-lg ${
                    dropdownOpen === true ? 'block' : 'hidden'
                }`}>
                <ul className='flex flex-col'>
                    {options?.map((item: any, index: number) => (
                        <li key={item.title} className={`flex items-center gap-3 px-4 py-3 border-stroke ${index !== options.length - 1 && 'border-b'}`}>
                            <input type='checkbox' id={item.title} value={item.title} onChange={item?.action} checked={item?.checked} className='h-[18px] w-[18px]' />{' '}
                            <label className='capitalize' htmlFor={item.title}>
                                {item.title}
                            </label>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AFilters;
