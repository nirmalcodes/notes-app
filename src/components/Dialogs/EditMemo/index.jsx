import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { AuthContext } from '../../../contexts/AuthContext';
import { firestore } from '../../../services/firebase';
import {
    deleteDoc,
    doc,
    getDoc,
    serverTimestamp,
    updateDoc,
} from '@firebase/firestore';
import { FaRegTrashCan } from 'react-icons/fa6';

const EditMemo = ({ memoId, onDialogOpen, onDialogClose }) => {
    const { user } = useContext(AuthContext);
    const initialFocusRef = useRef(null);
    const [memoContent, setMemoContent] = useState('');

    useEffect(() => {
        const fetchMemo = async () => {
            try {
                if (!user) {
                    return;
                }

                if (!memoId) {
                    return;
                }

                const docRef = doc(firestore, 'memos', memoId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    // console.log('Document data:', docSnap.data());
                    const memoData = docSnap.data();
                    const { content } = memoData;
                    setMemoContent(content);
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching memos:', error);
            }
        };

        fetchMemo();

        return () => {};
    }, [memoId]);

    const closeDialog = () => {
        setMemoContent('');
        onDialogClose(false);
    };

    const handleInputChange = (e) => {
        setMemoContent(e.target.value);
    };

    const handleEditMemo = async () => {
        if (!memoContent.trim()) {
            closeDialog();
            return;
        }

        try {
            const newMemoData = {
                content: memoContent,
                updatedAt: serverTimestamp(),
            };

            const memoRef = doc(firestore, 'memos', memoId);
            await updateDoc(memoRef, newMemoData);

            console.log('Memo updated successfully');

            setMemoContent('');

            closeDialog();
        } catch (error) {
            console.error('Error updating memo:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(firestore, 'memos', memoId));
            console.log('memo deleted successfully');
            closeDialog();
        } catch (error) {
            console.error('Error deleting memo: ', error);
        }
    };

    return (
        <>
            <Transition appear show={onDialogOpen} as={Fragment}>
                <Dialog
                    as='div'
                    className='relative z-50'
                    onClose={handleEditMemo}
                    initialFocus={initialFocusRef}
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
                                <Dialog.Panel className='w-full max-w-xl transform overflow-hidden rounded-2xl bg-white px-3 py-5 text-left align-middle shadow-xl transition-all'>
                                    <div>
                                        <div className=''>
                                            <textarea
                                                id='content'
                                                name='content'
                                                rows='8'
                                                placeholder='Take a note...'
                                                spellCheck
                                                ref={initialFocusRef}
                                                value={memoContent}
                                                onChange={handleInputChange}
                                                className='inline-block w-full resize-none border-none bg-transparent focus:outline-none focus-visible:ring-0'
                                            />
                                        </div>
                                        <div className='my-1 flex h-9 items-center'>
                                            <div className='flex items-center px-4'>
                                                <button
                                                    type='button'
                                                    onClick={handleDelete}
                                                    className='flex h-8 w-8 items-center justify-center gap-x-2 rounded-full text-sm transition-all duration-150 ease-in-out hover:bg-gray-200'
                                                >
                                                    <FaRegTrashCan />
                                                </button>
                                            </div>
                                            <div className='ml-auto pr-4'>
                                                <button
                                                    type='button'
                                                    onClick={handleEditMemo}
                                                    className='rounded px-6 py-2 text-sm font-medium transition-all duration-150 ease-in-out hover:bg-gray-200'
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </div>
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

export default EditMemo;
