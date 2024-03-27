import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <>
            <Navbar />
            <main className='relative flex-1'>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
