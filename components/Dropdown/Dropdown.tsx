import { useEffect, useRef, useState } from 'react';

const Dropdown = ({ item, header, options, activeItem, position = 'down', selectCase = () => {}, width }: any) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const trigger = useRef<any>(null);
    const dropdown = useRef<any>(null);

    React.useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!dropdown.current) return;
            if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
            setDropdownOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    React.useEffect(() => {
        const keyHandler = ({ keyCode }: KeyboardEvent) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    React.useEffect(() => {
        if (activeItem?._id !== item?._id && dropdownOpen) selectCase(item);

    }, [dropdownOpen]);

    return (
        <div className='relative'>
            <button ref={trigger} onClick={() => setDropdownOpen(!dropdownOpen)}>
                {(position === 'down' || position === 'left') && header}
                {position === 'right' && (
                    <div className='flex justify-center items-center gap-1 rounded-lg p-2 font-medium px-4 border border-main text-main hover:bg-grey'>
                        {header}
                        <svg
                            className={`h-4 w-4 fill-current stroke-main stroke-2 sm:block ${dropdownOpen ? 'rotate-180' : ''}`}
                            viewBox='0 0 20 20'
                            fill='currentColor'
                            aria-hidden='true'>
                            <path
                                fillRule='evenodd'
                                d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'
                                clipRule='evenodd'
                            />
                        </svg>
                    </div>
                )}
            </button>
            <div
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                className={`absolute z-10 ${width} ${position == 'down' && 'top-[50px] right-0'} ${
                    position == 'left' && '-bottom-3 right-6'
                } flex flex-col bg-clip-border border border-stroke rounded-lg bg-white shadow-lg ${dropdownOpen === true ? 'block' : 'hidden'}`}>
                <ul className='flex flex-col'>
                    {options?.map((item: any, index: number) => (
                        <li key={item.title} className={`px-4 py-3 border-stroke ${index !== options.length - 1 && 'border-b'}`}>
                            <button
                                onClick={item?.action}
                                className='flex items-center gap-2 text-sm text-[#8b8b8b] font-medium duration-300 ease-in-out hover:text-main'>
                                {item.icon}
                                {item.title}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dropdown;
