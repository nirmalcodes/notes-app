import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { FaPlus } from 'react-icons/fa6';
import AddMemoDialog from '../../components/Dialogs/AddMemo';
import MemoContainer from '../../containers/Memo';
import { CiMemoPad } from 'react-icons/ci';

const Home = () => {
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const openDialog = () => {
        setIsOpen(true);
    };

    return (
        <>
            {user ? (
                <>
                    <MemoContainer />

                    <button
                        type='button'
                        onClick={openDialog}
                        className='fixed bottom-6 right-6 z-20 flex h-[48px] w-[48px] items-center justify-center rounded-full bg-curious-blue-500 p-2 text-white drop-shadow-md transition-all duration-300 ease-in-out hover:bg-curious-blue-600 active:bg-curious-blue-700 disabled:bg-curious-blue-100 disabled:text-curious-blue-400 lg:absolute'
                    >
                        <FaPlus className='text-2xl' />
                    </button>

                    <AddMemoDialog
                        onDialogOpen={isOpen}
                        onDialogClose={setIsOpen}
                    />
                </>
            ) : (
                <>
                    <section className='flex flex-1 items-center justify-center'>
                        <div className='text-gray-300'>
                            <CiMemoPad className='mx-auto text-5xl md:text-8xl' />
                            <p className='text-center text-sm font-medium md:text-base'>
                                No memos
                            </p>
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default Home;
