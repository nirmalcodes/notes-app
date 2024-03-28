import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import LoadingButton from '../../LoadingButton';
import { isValidEmail, isValidPassword } from '../../../utils/validationUtils';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth, firestore } from '../../../services/firebase';
import { collection, doc, serverTimestamp, setDoc } from '@firebase/firestore';

const SignUpForm = ({ onComplete }) => {
    const [isToggled, setIstoggled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const togglePassword = () => {
        setIstoggled((prev) => !prev);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleEmailSignUp = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrors({});

        let validationErrors = {};

        if (!formData.email.trim()) {
            validationErrors.email = 'Email is required';
        } else if (!isValidEmail(formData.email)) {
            validationErrors.email = 'Invalid email format';
        }
        if (!formData.password.trim()) {
            validationErrors.password = 'Password is required';
        } else if (!isValidPassword(formData.password)) {
            validationErrors.password =
                'Password must be at least 8 characters, including at least one uppercase letter, lowercase letter, number, and special character';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsLoading(false);
        } else {
            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    formData.email,
                    formData.password
                );

                const regUser = userCredential.user;
                console.log(regUser);
                const regUID = userCredential.user.uid;

                if (regUser) {
                    const usersCollectionRef = collection(firestore, 'users');
                    const userDocRef = doc(usersCollectionRef, regUID);
                    await setDoc(userDocRef, {
                        email: regUser.email,
                        createdAt: serverTimestamp(),
                    });
                }

                setFormData({
                    email: '',
                    password: '',
                });

                setIsLoading(false);
                onComplete();
                
            } catch (error) {
                console.error(error);
                const errorCode = error.code;

                if (errorCode === 'auth/email-already-in-use') {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        email: 'This email is already in use',
                    }));
                } else if (errorCode === 'auth/too-many-request') {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        password: 'Too many request. Please try again later.',
                    }));
                } else {
                    setErrors((prevErrors) => ({
                        ...prevErrors,
                        password: 'An error occurred. Please try again later',
                    }));
                }

                setIsLoading(false);
            }
        }
    };

    return (
        <>
            <form onSubmit={handleEmailSignUp} noValidate autoComplete='off'>
                <div className='mb-3'>
                    <label
                        htmlFor='email'
                        className='mb-1.5 block text-sm font-medium text-gray-700'
                    >
                        Email
                    </label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        autoComplete='off'
                        placeholder='johndoe@mail.com'
                        value={formData.email}
                        onChange={handleInputChange}
                        className='form-input w-full rounded-lg border-gray-300 focus:border-curious-blue-500 focus:ring-curious-blue-500 disabled:bg-gray-300/30 disabled:text-gray-600'
                    />
                    {errors.email && (
                        <span className='text-sm text-red-600'>
                            {errors.email}
                        </span>
                    )}
                </div>

                <div className='mb-6'>
                    <label
                        htmlFor='password'
                        className='mb-1.5 block text-sm font-medium text-gray-700'
                    >
                        Password
                    </label>
                    <div className='relative'>
                        <input
                            type={isToggled ? 'text' : 'password'}
                            name='password'
                            id='password'
                            autoComplete='off'
                            placeholder='********'
                            value={formData.password}
                            onChange={handleInputChange}
                            className='form-input w-full rounded-lg border-gray-300 focus:border-curious-blue-500 focus:ring-curious-blue-500 disabled:bg-gray-300/30 disabled:text-gray-600'
                        />

                        <button
                            type='button'
                            onClick={togglePassword}
                            className='absolute right-3 top-1/2 flex h-[24px] w-[24px] -translate-y-1/2 items-center justify-center rounded-full text-gray-700 hover:bg-gray-100'
                        >
                            {isToggled ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {errors.password && (
                        <span className='text-sm text-red-600'>
                            {errors.password}
                        </span>
                    )}
                </div>

                <div className=''>
                    <LoadingButton
                        type='submit'
                        buttonText={'Sign Up'}
                        loading={isLoading}
                    />
                </div>
            </form>
        </>
    );
};

export default SignUpForm;
