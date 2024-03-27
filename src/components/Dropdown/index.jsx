import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';

const Dropdown = () => {
    return (
        <>
            <Menu as='div' className='relative inline-block text-left'>
                <Menu.Button className='inline-flex h-[40px] w-[40px] justify-center rounded-full bg-black/20 p-2 font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'>
                    M
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
                            as={Link}
                            to={'/'}
                            className='ui-active:bg-curious-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-gray-900 group flex w-full items-center rounded-md px-2 py-2'
                        >
                            Profile
                        </Menu.Item>
                        <Menu.Item
                            as={Link}
                            to={'/'}
                            className='ui-active:bg-curious-blue-500 ui-active:text-white ui-not-active:bg-white ui-not-active:text-gray-900 group flex w-full items-center rounded-md px-2 py-2'
                        >
                            Log out
                        </Menu.Item>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    );
};

export default Dropdown;
