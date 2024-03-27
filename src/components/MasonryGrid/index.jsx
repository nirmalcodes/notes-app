import styles from './MasonryGrid.module.css';
import Masonry from 'react-masonry-css';

const MasonryGrid = ({ breakpoints = 3, gutter, children }) => {
    const style = {
        '--gap': gutter ?? '',
    };

    return (
        <>
            <Masonry
                breakpointCols={breakpoints}
                className={styles.my_masonry_grid}
                columnClassName={styles.my_masonry_grid_column}
                style={style}
            >
                {children}
            </Masonry>
        </>
    );
};

export default MasonryGrid;
