import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <>
            <div className='flex h-[100vh] w-[100vw] flex-col items-center justify-center p-4'>
                <div className='inline-block bg-gradient-to-br from-curious-blue-700 to-curious-blue-400 bg-clip-text py-8 text-[10rem] font-bold leading-none text-transparent drop-shadow-lg'>
                    404
                </div>
                <h1 className='mb-3 text-center text-7xl font-semibold'>
                    Oops!
                </h1>
                <p className='mb-8 text-center text-2xl font-medium'>
                    The page you're looking for was not found.
                </p>
                <Link
                    to={'/'}
                    className='rounded-[2rem] bg-curious-blue-500 px-4 py-2 font-semibold text-white transition-all duration-300 ease-in-out hover:bg-curious-blue-600'
                    replace
                >
                    Go to Home page
                </Link>
            </div>
        </>
    );
};

export default PageNotFound;
