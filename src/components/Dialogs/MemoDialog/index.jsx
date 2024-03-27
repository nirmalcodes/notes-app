import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';

const MemoDialog = ({ onDialogOpen, onDialogClose }) => {
    const initialFocusRef = useRef(null);

    const closeDialog = () => {
        onDialogClose(false);
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
                                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white px-3 py-5 text-left align-middle shadow-xl transition-all'>
                                    <form noValidate autoComplete='off'>
                                        <div className=''>
                                            <input
                                                type='text'
                                                id='noteTitle'
                                                name='noteTitle'
                                                placeholder='Title'
                                                spellCheck
                                                className='inline-block w-full border-none bg-transparent font-medium placeholder:font-normal focus:outline-none focus-visible:ring-0'
                                            />
                                        </div>
                                        <div className=''>
                                            <textarea
                                                id='noteText'
                                                name='noteText'
                                                rows='10'
                                                placeholder='Take a note...'
                                                spellCheck
                                                ref={initialFocusRef}
                                                className='inline-block w-full resize-none border-none bg-transparent focus:outline-none focus-visible:ring-0'
                                            ></textarea>
                                        </div>
                                        <div className='mt-4 flex px-3'>
                                            <button
                                                type='button'
                                                className='ml-auto inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-gray-900 transition-all duration-300 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2'
                                                onClick={closeDialog}
                                            >
                                                Close
                                            </button>
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

export default MemoDialog;
