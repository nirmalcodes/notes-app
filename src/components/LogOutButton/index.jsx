import { signOut } from '@firebase/auth';
import { auth } from '../../services/firebase';

const LogOutButton = () => {
    const handleLogOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <button type='button' onClick={handleLogOut}>
                Logout Button
            </button>
        </>
    );
};

export default LogOutButton;
