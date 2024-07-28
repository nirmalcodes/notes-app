import { Fragment, useContext, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { AuthContext } from '../../../contexts/AuthContext';
import { firestore } from '../../../services/firebase';
import { addDoc, collection, serverTimestamp } from '@firebase/firestore';
import CryptoJS from 'crypto-js';

const AddMemo = ({ onDialogOpen, onDialogClose }) => {
    const { user } = useContext(AuthContext);
    const initialFocusRef = useRef(null);
    const [memoContent, setMemoContent] = useState('');

    const closeDialog = () => {
        setMemoContent('');
        onDialogClose(false);
    };

    const handleInputChange = (e) => {
        setMemoContent(e.target.value);
    };

    const handleAddMemo = async () => {
        if (!memoContent.trim()) {
            closeDialog();
            return;
        }

        console.log('first');

        try {
            const encryptedContent = CryptoJS.AES.encrypt(
                memoContent,
                user.uid
            ).toString();

            const newMemoData = {
                content: encryptedContent,
                createdBy: user.uid,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            };

            const memoRef = collection(firestore, 'memos');
            const newMemo = await addDoc(memoRef, newMemoData);

            // console.log('Memo saved successfully:', newMemo.id);

            closeDialog();
        } catch (error) {
            // console.error('Error saving memo:', error);
        }
    };

    return (
        <>
            <Transition appear show={onDialogOpen} as={Fragment}>
                <Dialog
                    as='div'
                    className='relative z-50'
                    onClose={handleAddMemo}
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
                                                rows='10'
                                                placeholder='Take a note...'
                                                spellCheck
                                                ref={initialFocusRef}
                                                alue={memoContent}
                                                onChange={handleInputChange}
                                                className='inline-block w-full resize-none border-none bg-transparent px-4 py-3 focus:outline-none focus-visible:ring-0'
                                            />
                                        </div>
                                        <div className='my-1 flex h-9 items-center'>
                                            <div className='ml-auto pr-4'>
                                                <button
                                                    type='button'
                                                    onClick={handleAddMemo}
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

export default AddMemo;
