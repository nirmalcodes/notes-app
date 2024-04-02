import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { firestore } from '../../services/firebase';
import {
    collection,
    getDocs,
    orderBy,
    query,
    where,
} from '@firebase/firestore';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import MemoCard from '../../components/MemoCard';
import EditMemoDialog from '../../components/Dialogs/EditMemo';

const MemoContainer = () => {
    const { user } = useContext(AuthContext);
    const [memos, setMemos] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [activeMemoId, setActiveMemoId] = useState(null);

    const openDialog = (id) => {
        setActiveMemoId(id);
        setIsOpen(true);
    };

    useEffect(() => {
        const fetchAllMemo = async () => {
            try {
                if (!user) {
                    return;
                }

                const memoRef = collection(firestore, 'memos');
                const q = query(
                    memoRef,
                    where('createdBy', '==', user.uid),
                    orderBy('updatedAt', 'desc')
                );
                const querySnapshot = await getDocs(q);

                const fetchedMemos = querySnapshot.docs.map((doc) => {
                    const memoData = doc.data();
                    const { createdAt, updatedAt } = memoData;

                    const isCreated =
                        createdAt.seconds === updatedAt.seconds &&
                        createdAt.nanoseconds === updatedAt.nanoseconds;

                    return {
                        id: doc.id,
                        ...memoData,
                        status: isCreated ? 'Created' : 'Edited',
                    };
                });

                setMemos(fetchedMemos);
            } catch (error) {
                console.error('Error fetching memos:', error);
            }
        };

        fetchAllMemo();

        return () => {};
    }, []);

    // console.log(memos);

    return (
        <>
            <section className='container p-4'>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{
                        424: 1,
                        639: 2,
                        1023: 3,
                        1100: 5,
                    }}
                >
                    <Masonry gutter='1rem'>
                        {memos.map((memo) => {
                            const { createdAt, updatedAt } = memo;

                            const isCreated =
                                createdAt.seconds === updatedAt.seconds &&
                                createdAt.nanoseconds === updatedAt.nanoseconds;

                            let memoTimestamp = '';

                            if (isCreated) {
                                memoTimestamp = createdAt.seconds;
                            } else {
                                memoTimestamp = updatedAt.seconds;
                            }

                            return (
                                <MemoCard
                                    id={memo?.id}
                                    title={memo?.title}
                                    status={memo?.status}
                                    timestamp={memoTimestamp}
                                    key={memo?.id}
                                    onClick={() => {
                                        openDialog(memo.id);
                                    }}
                                >
                                    {memo?.content ?? ''}
                                </MemoCard>
                            );
                        })}
                    </Masonry>
                </ResponsiveMasonry>
            </section>

            <EditMemoDialog memoId={activeMemoId} onDialogOpen={isOpen} onDialogClose={setIsOpen} />
        </>
    );
};

export default MemoContainer;