import googleLogo from '../../../assets/google.svg';
import { auth, firestore } from '../../../services/firebase';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import {
    collection,
    doc,
    getDoc,
    serverTimestamp,
    setDoc,
} from '@firebase/firestore';

const GoogleAuthButton = ({ onComplete }) => {
    const signInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            const user = result.user;
            // console.log(user);
            const userID = result.user.uid;

            if (user) {
                const docRef = doc(firestore, 'users', userID);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    // console.log('Document data:', docSnap.data());
                } else {
                    const usersCollectionRef = collection(firestore, 'users');
                    const userDocRef = doc(usersCollectionRef, userID);
                    await setDoc(userDocRef, {
                        email: user.email,
                        createdAt: serverTimestamp(),
                    });
                }
            }

            onComplete();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <button
                type='button'
                onClick={signInWithGoogle}
                className='flex w-full items-center justify-center rounded-full border border-[#4285F4] bg-white px-8 py-2 text-base font-medium text-[#4285F4] transition-all duration-300 ease-in-out'
            >
                <img
                    src={googleLogo}
                    alt='google logo'
                    width={24}
                    height={24}
                    className='mr-2'
                />
                <span className='inline-block'>Continue with Google</span>
            </button>
        </>
    );
};

export default GoogleAuthButton;
