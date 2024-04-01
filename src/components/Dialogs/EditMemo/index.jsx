import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { AuthContext } from '../../../contexts/AuthContext';
import { firestore } from '../../../services/firebase';
import { doc, getDoc, serverTimestamp, updateDoc } from '@firebase/firestore';

const EditMemo = ({ memoId, onDialogOpen, onDialogClose }) => {
    const { user } = useContext(AuthContext);
    const initialFocusRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });
    const [errors, setErrors] = useState({
        content: '',
    });

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
                    setFormData({
                        title: memoData?.title,
                        content: memoData?.content,
                    });
                } else {
                    // docSnap.data() will be undefined in this case
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
        setFormData({
            title: '',
            content: '',
        });
        onDialogClose(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleEditMemo = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setErrors({});

        let validationErrors = {};

        if (!formData.content.trim()) {
            closeDialog();
            return;
            validationErrors.content =
                'Add content to your memo before saving it';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setIsLoading(false);
        } else {
            try {
                const newMemoData = {
                    title: formData.title,
                    content: formData.content,
                    updatedAt: serverTimestamp(),
                };

                const memoRef = doc(firestore, 'memos', memoId);
                await updateDoc(memoRef, newMemoData);

                console.log('Memo updated successfully');

                setFormData({
                    title: '',
                    content: '',
                });

                setIsLoading(false);

                closeDialog();
            } catch (error) {
                console.error('Error updating memo:', error);
                setIsLoading(false);
            }
        }
    };

    return (
        <>
            <Transition appear show={onDialogOpen} as={Fragment}>
                <Dialog
                    as='div'
                    className='relative z-50'
                    onClose={closeDialog}
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
                                    <form
                                        noValidate
                                        autoComplete='off'
                                        onSubmit={handleEditMemo}
                                    >
                                        <div className=''>
                                            <input
                                                type='text'
                                                id='title'
                                                name='title'
                                                placeholder='Title'
                                                spellCheck
                                                value={formData.title}
                                                onChange={handleInputChange}
                                                className='inline-block w-full border-none bg-transparent font-medium placeholder:font-normal focus:outline-none focus-visible:ring-0'
                                            />
                                        </div>
                                        <div className=''>
                                            <textarea
                                                id='content'
                                                name='content'
                                                rows='10'
                                                placeholder='Take a note...'
                                                spellCheck
                                                ref={initialFocusRef}
                                                value={formData.content}
                                                onChange={handleInputChange}
                                                className='inline-block w-full resize-none border-none bg-transparent focus:outline-none focus-visible:ring-0'
                                            ></textarea>
                                        </div>
                                        <div className='mt-4 flex px-3'>
                                            <div className='ml-auto flex gap-3'>
                                                <button
                                                    type='button'
                                                    onClick={closeDialog}
                                                    className='inline-flex w-[120px] items-center justify-center rounded-full border border-transparent bg-curious-blue-100 px-4 py-2 font-medium text-curious-blue-600 transition-all duration-300 ease-in-out hover:bg-curious-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-curious-blue-500 focus-visible:ring-offset-2 disabled:bg-curious-blue-50 disabled:text-curious-blue-300'
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type='submit'
                                                    className='inline-flex w-[120px] items-center justify-center rounded-full border border-transparent bg-curious-blue-500 px-4 py-2 font-medium text-white transition-all duration-300 ease-in-out hover:bg-curious-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-curious-blue-500 focus-visible:ring-offset-2 active:bg-curious-blue-700 disabled:bg-curious-blue-100 disabled:text-curious-blue-400'
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </form>
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
