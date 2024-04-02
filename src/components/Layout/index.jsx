import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className='relative flex flex-1 flex-col pt-14'>
                {children}
            </main>
            <Footer />
        </>
    );
};

export default Layout;
