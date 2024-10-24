import { CheckIcon, RefreshCcwIcon } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

const UsernameFilter = ({ any_filter, selectFilter, filters }: any) => {
    const [username, setUsername] = useState<string>('');
    const [usernames, setUsernames] = useState<any>([]);
    const addUsername = () => {
        setUsernames([...usernames, username]);
        setUsername('');
    };

    useEffect(() => {
        if (any_filter.key === 'username' && filters[any_filter.key]) {
            setUsernames(filters[any_filter.key]);
        }
    }, []);

    return (
        <div className='flex flex-col gap-2 w-full h-[70px]'>
            <div className='flex gap-1'>
                <input
                    type='text'
                    name='username'
                    value={username}
                    placeholder='username'
                    onChange={(e) => setUsername(e.target.value)}
                    className={`border border-gray-300 w-full outline-none text-sm py-2 px-3 rounded-md`}
                />
                <button
                    disabled={username === ''}
                    onClick={addUsername}
                    className='cursor-pointer flex gap-2 capitalize items-center font-semibold justify-center text-white text-sm py-1 px-2 border bg-black rounded-lg disabled:opacity-50'>
                    Add
                </button>
                <button
                    disabled={usernames?.length === 0}
                    onClick={() => selectFilter(true, any_filter.key, usernames)}
                    className='cursor-pointer flex gap-2 capitalize items-center font-semibold justify-center text-white text-sm py-1 px-2 border bg-black rounded-lg disabled:opacity-50'>
                    <CheckIcon />
                </button>
                {usernames?.length > 0 && (
                    <button
                        disabled={usernames?.length === 0}
                        onClick={() => selectFilter(false, any_filter.key, [])}
                        className='cursor-pointer flex gap-2 capitalize items-center font-semibold justify-center text-white text-sm py-1 px-2 border bg-black rounded-lg disabled:opacity-50'>
                        <RefreshCcwIcon />
                    </button>
                )}
            </div>
            {usernames.length > 0 && (
                <div className='flex gap-2 flex-wrap'>
                    {usernames?.map((text: string, index: number) => (
                        <div className='flex px-3 bg-[#DAE4FF] text-[#033DD0] py-1 rounded-full' key={'keyword' + index}>
                            <span className='text-xs'>{text}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UsernameFilter;
