import { lazy, useContext, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import MemoDialog from '../../components/Dialogs/MemoDialog';
import { AuthContext } from '../../contexts/AuthContext';

const MemoCard = lazy(() => import('../../components/MemoCard'));

const Home = () => {
    const { user } = useContext(AuthContext);
    const [isOpen, setIsOpen] = useState(false);

    const openDialog = () => {
        setIsOpen(true);
    };

    return (
        <>
            <div className='container p-4'>
                <ResponsiveMasonry
                    columnsCountBreakPoints={{
                        424: 1,
                        639: 2,
                        1023: 3,
                        1100: 5,
                    }}
                >
                    <Masonry gutter='1rem'>
                        <MemoCard timestamp={1711321810}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Minima, earum mollitia. Dolorum corrupti ullam
                            possimus eos dignissimos sit quas, consectetur saepe
                            quidem, vel quo tenetur animi nobis inventore eius
                            fuga numquam itaque labore laudantium nihil nisi
                            dolore laborum! Officia.
                        </MemoCard>

                        <MemoCard timestamp={1711322101}>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Voluptatum reprehenderit nisi consectetur
                            temporibus? Corporis harum dignissimos incidunt
                            aliquid aspernatur voluptatibus, dolorum, sequi
                            eaque illo in nobis ad, sed repudiandae animi earum
                            officia labore eligendi non provident quae, placeat
                            omnis inventore officiis nostrum alias. Quaerat,
                            vitae?
                        </MemoCard>

                        <MemoCard timestamp={1711302301}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Fuga sunt, veniam porro quisquam dolorem ea
                            quo alias nulla labore illum excepturi optio.
                            Possimus mollitia nam laborum voluptatibus illo
                            animi quam? Amet, porro numquam eveniet
                            exercitationem fugiat optio debitis aut nemo
                            ducimus, delectus cumque magnam unde beatae minus
                            officiis tempore perferendis eaque quam. Provident
                            tempore voluptatibus nemo laboriosam praesentium
                            ratione dolorum? Corporis ut aliquid expedita illum,
                            quisquam laudantium debitis ratione temporibus,
                            nihil sit nam alias consectetur enim. Dolores porro
                            necessitatibus consequatur sapiente quod! Quia
                            excepturi nisi dignissimos perspiciatis voluptatibus
                            reprehenderit ullam? Cupiditate, voluptate
                            consequatur! Ipsum dolores perspiciatis
                            necessitatibus nisi, qui porro illo. Eligendi
                            tenetur quas nulla beatae modi qui atque iure nihil.
                            Dolores nesciunt earum laudantium soluta, id nisi
                            asperiores numquam! Nesciunt doloremque, laboriosam,
                            nisi saepe reprehenderit vitae voluptatibus sapiente
                            maxime ad impedit minus at quam facilis laudantium
                            praesentium dolorum magnam maiores aut deserunt
                            pariatur quidem consequuntur non illum! Facilis,
                            ipsum.
                        </MemoCard>

                        <MemoCard timestamp={1711215901}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Labore alias obcaecati ut, beatae facere natus
                            illum, necessitatibus quod magnam cupiditate
                            provident voluptatibus sed accusamus recusandae sint
                            voluptates a porro quidem!
                        </MemoCard>

                        <MemoCard timestamp={1708796701}>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Ab iusto et officiis facilis est maiores rem
                            voluptate minus accusantium sint quis debitis
                            eligendi, aliquid tempore expedita totam consectetur
                            pariatur amet? Eaque minus recusandae perspiciatis
                            quo eum ullam cupiditate rem quos, sed maiores illo
                            quod quasi temporibus.
                        </MemoCard>

                        <MemoCard timestamp={1708623901}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Libero iste dolorem, dignissimos ex, numquam
                            neque cupiditate consequatur, quidem corporis
                            doloribus impedit nulla delectus a sequi cumque
                            ducimus quo quibusdam similique.
                        </MemoCard>
                    </Masonry>
                </ResponsiveMasonry>
            </div>

            {user && (
                <button
                    type='button'
                    onClick={openDialog}
                    className='fixed bottom-6 right-6 z-20 flex h-[48px] w-[48px] items-center justify-center rounded-full bg-curious-blue-500 p-2 text-white drop-shadow-md transition-all duration-300 ease-in-out hover:bg-curious-blue-600 active:bg-curious-blue-700 disabled:bg-curious-blue-100 disabled:text-curious-blue-400 lg:absolute'
                >
                    <FaPlus className='text-2xl' />
                </button>
            )}

            <MemoDialog onDialogOpen={isOpen} onDialogClose={setIsOpen} />
        </>
    );
};

export default Home;
