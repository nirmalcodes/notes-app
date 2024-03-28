import { signOut } from '@firebase/auth';
import { auth } from '../../services/firebase';

const LogOutButton = () => {
    const handleLogOut = async () => {
        try {
            await signOut(auth);
            // localStorage.removeItem('user');
            // console.log('User logged out');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <button
                type='button'
                onClick={handleLogOut}
                className='rounded-full bg-curious-blue-500 px-8 py-2 text-white transition-all duration-300 ease-in-out hover:bg-curious-blue-600 active:bg-curious-blue-700 disabled:bg-curious-blue-100 disabled:text-curious-blue-400'
            >
                Log out
            </button>
        </>
    );
};

export default LogOutButton;
