import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { FaPlus } from 'react-icons/fa6';
import AddMemoDialog from '../../components/Dialogs/AddMemo';
import MemoContainer from '../../containers/Memo';

const Home = () => {
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const openDialog = () => {
        setIsOpen(true);
    };

    return (
        <>
            <MemoContainer />

            {user && (
                <button
                    type='button'
                    onClick={openDialog}
                    className='fixed bottom-6 right-6 z-20 flex h-[48px] w-[48px] items-center justify-center rounded-full bg-curious-blue-500 p-2 text-white drop-shadow-md transition-all duration-300 ease-in-out hover:bg-curious-blue-600 active:bg-curious-blue-700 disabled:bg-curious-blue-100 disabled:text-curious-blue-400 lg:absolute'
                >
                    <FaPlus className='text-2xl' />
                </button>
            )}

            <AddMemoDialog onDialogOpen={isOpen} onDialogClose={setIsOpen} />
        </>
    );
};

export default Home;
