const Footer = () => {
    const DateYear = new Date().getFullYear();

    return (
        <>
            <footer className='mt-auto border-t px-4 py-2'>
                <div className='container'>
                    <p className='text-sm font-medium text-slate-500'>
                        ©{DateYear} MemoPad. All rights reserved.
                    </p>
                </div>
            </footer>
        </>
    );
};

export default Footer;
