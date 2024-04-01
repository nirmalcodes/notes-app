import { Fragment, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { FaEllipsisVertical } from 'react-icons/fa6';
import { Menu, Transition } from '@headlessui/react';
import { formatTimestamp } from '../../utils/dateUtils';
import { firestore } from '../../services/firebase';
import { deleteDoc, doc } from '@firebase/firestore';

const MemoCard = ({ id, title, children, status, timestamp, onClick }) => {
    const { user } = useContext(AuthContext);
    const formattedTimestamp = formatTimestamp(timestamp);

    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await deleteDoc(doc(firestore, 'memos', id));
            // console.log('memo deleted successfully');
        } catch (error) {
            console.error('Error deleting memo: ', error);
        }
    };

    return (
        <>
            <div
                className='rounded-xl border bg-white shadow-lg shadow-black/5'
                onClick={onClick}
            >
                <div className='items-cente flex px-3 pt-3'>
                    <p className='text-base font-medium'>{title ?? ''}</p>
                    <Menu
                        as='div'
                        className='relative ml-auto inline-block text-left'
                    >
                        <Menu.Button className='inline-flex h-[28px] w-[28px] items-center justify-center rounded-full p-2 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-100'>
                            <FaEllipsisVertical />
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
                            <Menu.Items className='absolute right-0 mt-2 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white px-1 py-1 shadow-lg ring-1 ring-black/5 focus:outline-none'>
                                <Menu.Item>
                                    <button
                                        type='button'
                                        className='group flex w-full items-center rounded-md px-2 py-2 ui-active:bg-gray-100'
                                    >
                                        Edit
                                    </button>
                                </Menu.Item>
                                <Menu.Item>
                                    <button
                                        type='button'
                                        onClick={handleDelete}
                                        className='group flex w-full items-center rounded-md px-2 py-2 ui-active:bg-gray-100'
                                    >
                                        Delete
                                    </button>
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </Menu>
                </div>
                <div className='p-3'>
                    <div className='line-clamp-[15] text-base'>{children}</div>
                </div>
                <div className='px-3 pb-3 text-right text-xs text-gray-400'>
                    {`${status}, ${formattedTimestamp ?? ''}`}
                </div>
            </div>
        </>
    );
};

export default MemoCard;
