import appleLogo from '../../../assets/apple.svg';
import { auth, firestore } from '../../../services/firebase';

const AppleAuthButton = () => {
    return (
        <>
            <button
                type='button'
                className='flex w-full items-center justify-center rounded-full border border-black bg-white px-8 py-2 text-base font-medium text-black transition-all duration-300 ease-in-out'
            >
                <img
                    src={appleLogo}
                    alt='apple logo'
                    width={24}
                    height={24}
                    className='md:mr-2'
                />
                <span className='hidden md:inline-block'>
                    Continue with Apple
                </span>
            </button>
        </>
    );
};

export default AppleAuthButton;
