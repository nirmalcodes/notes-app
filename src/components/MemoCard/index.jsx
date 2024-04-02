import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
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
                className='rounded-xl border bg-white p-3 shadow-lg shadow-black/5'
                onClick={onClick}
            >
                <div className='line-clamp-[15] w-full text-base'>
                    {children}
                </div>

                <div className='pt-2 text-right text-xs text-gray-400'>
                    {`${status}, ${formattedTimestamp ?? ''}`}
                </div>
            </div>
        </>
    );
};

export default MemoCard;
