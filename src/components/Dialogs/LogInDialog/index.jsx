import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import LogInForm from '../../Forms/LogInForm';
import SignUpForm from '../../Forms/SignUpForm';
import DividerWithText from '../../DividerWithText';
import GoogleAuthButton from '../../SocialAuthButtons/GoogleAuthButton';
import AppleAuthButton from '../../SocialAuthButtons/AppleButton';

const LogInDialog = ({ onDialogOpen, onDialogClose }) => {
    const [formMode, setFormMode] = useState('login');

    const closeDialog = () => {
        onDialogClose(false);
    };

    const toggleFormMode = () => {
        setFormMode((prevMode) => (prevMode === 'login' ? 'signup' : 'login'));
    };

    return (
        <>
            <Transition appear show={onDialogOpen ?? false} as={Fragment}>
                <Dialog
                    as='div'
                    className='relative z-50'
                    onClose={closeDialog}
                >
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0'
                        enterTo='opacity-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100'
                        leaveTo='opacity-0'
                    >
                        <div className='fixed inset-0 bg-black/25' />
                    </Transition.Child>

                    <div className='fixed inset-0 overflow-y-auto'>
                        <div className='flex min-h-full items-center justify-center p-4 text-center'>
                            <Transition.Child
                                as={Fragment}
                                enter='ease-out duration-300'
                                enterFrom='opacity-0 scale-95'
                                enterTo='opacity-100 scale-100'
                                leave='ease-in duration-200'
                                leaveFrom='opacity-100 scale-100'
                                leaveTo='opacity-0 scale-95'
                            >
                                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                                    <Dialog.Title
                                        as='h3'
                                        className='text-center text-2xl font-medium leading-6 text-gray-900'
                                    >
                                        {`${formMode == 'login' ? 'Log in' : 'Sign Up'} to MemoPad`}
                                    </Dialog.Title>
                                    {/* forms */}
                                    <div className='mt-5'>
                                        {formMode == 'login' ? (
                                            <LogInForm />
                                        ) : (
                                            <SignUpForm />
                                        )}
                                    </div>
                                    <div className='my-5'>
                                        <DividerWithText />
                                    </div>
                                    {/* one click logins */}
                                    <div className='flex gap-x-4 gap-y-3 md:flex-col'>
                                        <GoogleAuthButton />
                                        <AppleAuthButton />
                                    </div>
                                    <div className='mt-8 md:mt-12'>
                                        <DividerWithText
                                            text={
                                                formMode === 'signup'
                                                    ? 'Already have an account?'
                                                    : "Don't have an account?"
                                            }
                                        />
                                    </div>

                                    {/* change form */}
                                    <div className='mt-4 flex md:mt-5'>
                                        <button
                                            type='button'
                                            onClick={toggleFormMode}
                                            className='mx-auto flex w-full max-w-xs items-center justify-center rounded-full border border-curious-blue-500 bg-white px-8 py-2 text-base font-medium text-curious-blue-500 transition-all duration-300 ease-in-out hover:bg-curious-blue-50 active:bg-curious-blue-100 disabled:border-curious-blue-200 disabled:bg-white disabled:text-curious-blue-200'
                                        >
                                            {formMode === 'signup'
                                                ? 'Log in'
                                                : 'Sign Up'}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};

export default LogInDialog;
