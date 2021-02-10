import React from 'react';
import Image from 'next/image';
import me from '@assets/me.jpeg';

export default Photo = () => {
    return (
        <div className={styles.bio_pic}>
            <Image src={me} alt="Emirhan Kemal Kösem" loading="lazy" width="240px" height="240px" />
        </div>
    );
}
