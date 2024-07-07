import { useRouter } from 'next/navigation';
import { ProfileInput } from './ProfileInput';
import { useAppSelector } from '@/context';

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
                <ProfileInput label='Email Address' placeholder={user?.email + ''} buttonText='' isDelete={false} isLabelOutside onClick={() => {}} />
            </div>
        </>
    );
};
