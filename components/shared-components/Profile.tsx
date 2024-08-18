import { useAppSelector } from '@/context';

interface ProfileInputProps {
    label: string;
    placeholder: string;
    buttonText: string;
    isDelete: boolean;
    onClick: () => void;
    isLabelOutside: boolean;
}

const ProfileInput = ({ label, placeholder, buttonText, isDelete, onClick, isLabelOutside }: ProfileInputProps) => {
    return (
        <div
            className={`relative flex w-full flex-col
     ${isLabelOutside ? 'gap-[8px]' : ''}`}>
            {isLabelOutside && <label className='text-[16px] font-medium text-[#121212]'>{label}</label>}
            <div className={`relative h-full w-full ${!isLabelOutside && 'gap-2px flex flex-col rounded-lg bg-[#F7F7F7] px-[16px] py-[14px]'}`}>
                {!isLabelOutside && <label className='text-[16px] font-medium text-[#121212]'>{label}</label>}
                <input
                    className={`w-full ${isLabelOutside ? 'rounded-lg bg-[#F7F7F7] px-[16px] py-[12px]' : 'bg-transparent'} outline-none placeholder:text-[15px] placeholder:font-medium placeholder:text-[#8b8b8b]`}
                    placeholder={placeholder}
                    disabled={true}
                />
                {buttonText && (
                    <button
                        className={`absolute right-3.5 top-1/2 translate-y-[-50%] text-[14px] font-medium ${isDelete ? 'text-error' : 'text-primary'} hover:underline`}
                        onClick={onClick}>
                        {buttonText}
                    </button>
                )}
            </div>
        </div>
    );
};

export const ProfileForm = () => {
    const { user } = useAppSelector((state) => state.user);

    return (
        <>
            <div className='flex w-full flex-col gap-6 sm:gap-8 lg:w-[590px]'>
                {user.profilePic !== '' ? (
                    <div
                        className='w-32 h-32 bg-[#e2e8f0] rounded-full border border-gray-300 bg-cover bg-center'
                        style={{ backgroundImage: `url("${user.profilePic}")` }}></div>
                ) : (
                    <div
                        key={'profilepic'}
                        className='relative inline-flex items-center justify-center w-32 h-32 overflow-hidden rounded-full border border-gray-300 bg-cover bg-[#e2e8f0]'>
                        <span className='font-medium text-2xl text-gray-600 '>{user.name.slice(0, 2).toUpperCase()}</span>
                    </div>
                )}
                <ProfileInput label='Name' placeholder={user?.name + ''} buttonText='' isDelete={false} isLabelOutside onClick={()=>{}} />
                <ProfileInput label='Mobile Number' placeholder={user?.mobileNo + ''} buttonText='' isDelete={false} isLabelOutside onClick={() => {}} />
                <ProfileInput label='Work Email ID' placeholder={user?.email + ''} buttonText='' isDelete={false} isLabelOutside onClick={() => {}} />
            </div>
        </>
    );
};
