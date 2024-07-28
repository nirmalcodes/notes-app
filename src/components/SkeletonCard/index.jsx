const SkeletonCard = () => {
    return (
        <div
            role='status'
            class='max-w-sm animate-pulse rounded-xl border bg-white p-3 shadow-lg shadow-black/5'
        >
            <div class='mb-4 h-2.5 w-48 rounded-full bg-gray-300'></div>
            <div class='mb-2.5 h-2 max-w-[360px] rounded-full bg-gray-300'></div>
            <div class='mb-2.5 h-2 rounded-full bg-gray-300'></div>
            <div class='mb-2.5 h-2 max-w-[330px] rounded-full bg-gray-300'></div>
            <div class='mb-2.5 h-2 max-w-[300px] rounded-full bg-gray-300'></div>
            <div class='h-2 max-w-[360px] rounded-full bg-gray-300'></div>
            <span class='sr-only'>Loading...</span>
        </div>
    );
};

export default SkeletonCard;
