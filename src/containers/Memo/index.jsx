import { Fragment, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { firestore } from '../../services/firebase';
import {
    collection,
    onSnapshot,
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

    const handleDialogClose = (value) => {
        setActiveMemoId(null);
        setIsOpen(value);
    };

    useEffect(() => {
        const fetchAllMemo = () => {
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

                const unsubscribe = onSnapshot(q, (querySnapshot) => {
                    const fetchedMemos = querySnapshot.docs.map((doc) => {
                        const memoData = doc.data();
                        const { createdAt, updatedAt } = memoData;

                        const isCreated =
                            createdAt?.seconds === updatedAt?.seconds &&
                            createdAt?.nanoseconds === updatedAt?.nanoseconds;

                        return {
                            id: doc.id,
                            ...memoData,
                            status: isCreated ? 'Created' : 'Edited',
                        };
                    });

                    setMemos(fetchedMemos);
                });

                return unsubscribe;
            } catch (error) {
                console.error('Error fetching memos:', error);
            }
        };

        const unsubscribe = fetchAllMemo();

        return () => {
            unsubscribe();
        };
    }, []);

    const renderTextWithLineBreaks = (text) => {
        return text.split('\n').map((line, index) => (
            <Fragment key={index}>
                {line}
                {index !== text.split('\n').length - 1 && <br />}
            </Fragment>
        ));
    };

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
                            const { id, content, createdAt, updatedAt } = memo;

                            const isCreated =
                                createdAt?.seconds === updatedAt?.seconds &&
                                createdAt?.nanoseconds ===
                                    updatedAt?.nanoseconds;

                            let memoTimestamp = '';

                            if (isCreated) {
                                memoTimestamp = createdAt?.seconds;
                            } else {
                                memoTimestamp = updatedAt?.seconds;
                            }

                            return (
                                <MemoCard
                                    id={memo?.id}
                                    status={memo?.status}
                                    timestamp={memoTimestamp}
                                    key={memo?.id}
                                    onClick={() => {
                                        openDialog(id);
                                    }}
                                >
                                    {renderTextWithLineBreaks(content)}
                                </MemoCard>
                            );
                        })}
                    </Masonry>
                </ResponsiveMasonry>
            </section>

            <EditMemoDialog
                memoId={activeMemoId}
                onDialogOpen={isOpen}
                onDialogClose={handleDialogClose}
            />
        </>
    );
};

export default MemoContainer;
