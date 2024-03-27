import Layout from './components/Layout';
import MasonryGrid from './components/MasonryGrid';
import MemoCard from './components/MemoCard';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const App = () => {
    const breakpoints = {
        default: 5,
        1200: 4,
        1080: 3,
        768: 2,
        600: 1,
    };

    return (
        <>
            <Layout>
                <div className='container mt-10 bg-green-100 p-4'>
                    <MasonryGrid breakpoints={breakpoints} gutter={'1rem'}>
                        <MemoCard>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Minima, earum mollitia. Dolorum corrupti
                            libero laudantium natus repudiandae perspiciatis
                            quas in optio placeat esse? Non suscipit vitae
                            maiores placeat magnam aliquid. Accusantium, ex
                            quibusdam! Excepturi ullam possimus eos dignissimos
                            sit quas, consectetur saepe quidem, vel quo tenetur
                            animi nobis inventore eius fuga numquam itaque
                            labore laudantium nihil nisi dolore laborum!
                            Officia.
                        </MemoCard>
                        <MemoCard>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Voluptatum reprehenderit nisi consectetur
                            temporibus? Corporis harum dignissimos incidunt
                            aliquid aspernatur voluptatibus, exercitationem quae
                            perferendis placeat ab voluptas consectetur odio
                            atque aut? Similique, libero voluptas tempora
                            consequatur quaerat itaque rerum dignissimos quasi
                            sequi porro, eveniet ipsum aliquid veniam enim vero
                            assumenda! Magni placeat nostrum, commodi illum
                            dolorum ipsa amet deleniti beatae aperiam? Corrupti
                            beatae mollitia omnis neque optio. Ullam ad culpa
                            delectus quis perspiciatis exercitationem, molestias
                            voluptatibus nulla velit commodi nesciunt amet, eum,
                            voluptatum dolor. Voluptatem quae, numquam
                            voluptates officia nulla praesentium. Sapiente,
                            consequatur! Recusandae repellendus quas dolorum,
                            sequi eaque illo in nobis ad, sed repudiandae animi
                            earum officia labore eligendi non provident quae,
                            placeat omnis inventore officiis nostrum alias.
                            Quaerat, vitae?
                        </MemoCard>
                        <MemoCard>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Labore alias obcaecati ut, beatae facere natus
                            illum, necessitatibus quod magnam cupiditate
                            provident voluptatibus sed accusamus recusandae sint
                            voluptates a porro quidem!
                        </MemoCard>
                        <MemoCard>
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
                        <MemoCard>
                            Lorem ipsum, dolor sit amet consectetur adipisicing
                            elit. Ab iusto et officiis facilis est maiores rem
                            voluptate minus accusantium sint quis debitis
                            eligendi, aliquid tempore expedita totam consectetur
                            pariatur amet? Eaque minus recusandae perspiciatis
                            quo eum ullam cupiditate rem quos, sed maiores illo
                            quod quasi temporibus.
                        </MemoCard>
                        <MemoCard>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Libero iste dolorem, dignissimos ex, numquam
                            neque cupiditate consequatur, quidem corporis
                            doloribus impedit nulla delectus a sequi cumque
                            ducimus quo quibusdam similique.
                        </MemoCard>
                    </MasonryGrid>
                </div>
                <div className='container mt-10 bg-curious-blue-100 p-4'>
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{
                            424: 1,
                            639: 2,
                            1023: 3,
                            1100: 5,
                        }}
                    >
                        <Masonry gutter='1rem'>
                            <MemoCard>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Minima, earum mollitia.
                                Dolorum corrupti libero laudantium natus
                                repudiandae perspiciatis quas in optio placeat
                                esse? Non suscipit vitae maiores placeat magnam
                                aliquid. Accusantium, ex quibusdam! Excepturi
                                ullam possimus eos dignissimos sit quas,
                                consectetur saepe quidem, vel quo tenetur animi
                                nobis inventore eius fuga numquam itaque labore
                                laudantium nihil nisi dolore laborum! Officia.
                            </MemoCard>
                            <MemoCard>
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Voluptatum reprehenderit nisi
                                consectetur temporibus? Corporis harum
                                dignissimos incidunt aliquid aspernatur
                                voluptatibus, exercitationem quae perferendis
                                placeat ab voluptas consectetur odio atque aut?
                                Similique, libero voluptas tempora consequatur
                                quaerat itaque rerum dignissimos quasi sequi
                                porro, eveniet ipsum aliquid veniam enim vero
                                assumenda! Magni placeat nostrum, commodi illum
                                dolorum ipsa amet deleniti beatae aperiam?
                                Corrupti beatae mollitia omnis neque optio.
                                Ullam ad culpa delectus quis perspiciatis
                                exercitationem, molestias voluptatibus nulla
                                velit commodi nesciunt amet, eum, voluptatum
                                dolor. Voluptatem quae, numquam voluptates
                                officia nulla praesentium. Sapiente,
                                consequatur! Recusandae repellendus quas
                                dolorum, sequi eaque illo in nobis ad, sed
                                repudiandae animi earum officia labore eligendi
                                non provident quae, placeat omnis inventore
                                officiis nostrum alias. Quaerat, vitae?
                            </MemoCard>
                            <MemoCard>
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Labore alias obcaecati ut,
                                beatae facere natus illum, necessitatibus quod
                                magnam cupiditate provident voluptatibus sed
                                accusamus recusandae sint voluptates a porro
                                quidem!
                            </MemoCard>
                            <MemoCard>
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Fuga sunt, veniam porro
                                quisquam dolorem ea quo alias nulla labore illum
                                excepturi optio. Possimus mollitia nam laborum
                                voluptatibus illo animi quam? Amet, porro
                                numquam eveniet exercitationem fugiat optio
                                debitis aut nemo ducimus, delectus cumque magnam
                                unde beatae minus officiis tempore perferendis
                                eaque quam. Provident tempore voluptatibus nemo
                                laboriosam praesentium ratione dolorum? Corporis
                                ut aliquid expedita illum, quisquam laudantium
                                debitis ratione temporibus, nihil sit nam alias
                                consectetur enim. Dolores porro necessitatibus
                                consequatur sapiente quod! Quia excepturi nisi
                                dignissimos perspiciatis voluptatibus
                                reprehenderit ullam? Cupiditate, voluptate
                                consequatur! Ipsum dolores perspiciatis
                                necessitatibus nisi, qui porro illo. Eligendi
                                tenetur quas nulla beatae modi qui atque iure
                                nihil. Dolores nesciunt earum laudantium soluta,
                                id nisi asperiores numquam! Nesciunt doloremque,
                                laboriosam, nisi saepe reprehenderit vitae
                                voluptatibus sapiente maxime ad impedit minus at
                                quam facilis laudantium praesentium dolorum
                                magnam maiores aut deserunt pariatur quidem
                                consequuntur non illum! Facilis, ipsum.
                            </MemoCard>
                            <MemoCard>
                                Lorem ipsum, dolor sit amet consectetur
                                adipisicing elit. Ab iusto et officiis facilis
                                est maiores rem voluptate minus accusantium sint
                                quis debitis eligendi, aliquid tempore expedita
                                totam consectetur pariatur amet? Eaque minus
                                recusandae perspiciatis quo eum ullam cupiditate
                                rem quos, sed maiores illo quod quasi
                                temporibus.
                            </MemoCard>
                            <MemoCard>
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Libero iste dolorem,
                                dignissimos ex, numquam neque cupiditate
                                consequatur, quidem corporis doloribus impedit
                                nulla delectus a sequi cumque ducimus quo
                                quibusdam similique.
                            </MemoCard>
                        </Masonry>
                    </ResponsiveMasonry>
                </div>
            </Layout>
        </>
    );
};

export default App;
