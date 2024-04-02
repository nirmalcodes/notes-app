import { formatTimestamp } from '../../utils/dateUtils';

const MemoCard = ({ id, children, status, timestamp, onClick }) => {
    const formattedTimestamp = formatTimestamp(timestamp);

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
