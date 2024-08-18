export const ArrowUpDownIcon = ({ id, open }: any) => {
    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2}
            stroke='currentColor'
            className={`${id === open ? 'rotate-180' : ''} h-4 w-4 transition-transform`}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
        </svg>
    );
};
