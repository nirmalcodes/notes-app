const Spinner = () => {
    return (
        <div className='fixed inset-0 z-[9999] flex h-[100vh] w-[100vw] items-center justify-center bg-black/10 backdrop-blur'>
            <div className='inline-block animate-bounce bg-gradient-to-br from-curious-blue-700 to-curious-blue-400 bg-clip-text py-8 text-[clamp(3.5rem,_10vw_+_1rem,_8rem)]  font-bold leading-none text-transparent'>
                MemoPad
            </div>
        </div>
    );
};

export default Spinner;
