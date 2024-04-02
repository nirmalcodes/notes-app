import { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { AuthContext } from '../../../contexts/AuthContext';
import { auth } from '../../../services/firebase';
import { signOut } from '@firebase/auth';
import { CiMemoPad } from 'react-icons/ci';
import { FaUser } from 'react-icons/fa6';
import LogInDialog from '../../Dialogs/LogIn';

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const openDialog = () => {
        setIsOpen(true);
    };

    const handleLogOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            // console.error(error);
        }
    };

    return (
        <>
            <header className='fixed inset-x-0 top-0 z-40 border-b bg-white'>
                <div className='container flex items-center px-4 py-2'>
                    <Link
                        to={'/'}
                        className='flex items-center text-xl font-semibold text-curious-blue-600'
                    >
                        <CiMemoPad className='text-2xl' />
                        MemoPad
                    </Link>
                    <div className='ml-auto flex gap-x-3'>
                        {user ? (
                            <div>
                                <Menu
                                    as='div'
                                    className='relative inline-block text-left'
                                >
                                    <Menu.Button className='inline-flex h-[40px] w-[40px] items-center justify-center rounded-full bg-black/20 p-2 font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'>
                                        <FaUser />
                                    </Menu.Button>
                                    <Transition
                                        as={Fragment}
                                        enter='transition ease-out duration-100'
                                        enterFrom='transform opacity-0 scale-95'
                                        enterTo='transform opacity-100 scale-100'
                                        leave='transition ease-in duration-75'
                                        leaveFrom='transform opacity-100 scale-100'
                                        leaveTo='transform opacity-0 scale-95'
                                    >
                                        <Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white px-1 py-1 shadow-lg ring-1 ring-black/5 focus:outline-none'>
                                            <Menu.Item
                                                disabled
                                                className='group flex w-full items-center rounded-md px-2 py-2 ui-active:bg-curious-blue-500 ui-active:text-white ui-not-active:bg-white'
                                            >
                                                <p className='text-sm text-gray-400'>
                                                    {user?.email}
                                                </p>
                                            </Menu.Item>
                                            <Menu.Item>
                                                <button
                                                    type='button'
                                                    onClick={handleLogOut}
                                                    className='group flex w-full items-center rounded-md px-2 py-2 ui-active:bg-curious-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-gray-900'
                                                >
                                                    Log out
                                                </button>
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        ) : (
                            <button
                                type='button'
                                onClick={openDialog}
                                className='rounded-full bg-curious-blue-500 px-8 py-2 text-start font-medium text-white transition-all duration-300 ease-in-out hover:bg-curious-blue-600 active:bg-curious-blue-700 disabled:bg-curious-blue-100 disabled:text-curious-blue-400'
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </header>
            <LogInDialog onDialogOpen={isOpen} onDialogClose={setIsOpen} />
        </>
    );
};

export default Navbar;
