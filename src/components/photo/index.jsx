import React from 'react';
import Image from 'next/image';

const Photo = () => {
    return (
        <div>
            <Image src="/assets/me.jpeg" alt="Emirhan Kemal Kösem" loading="lazy" width="240px" height="240px" />
        </div>
    );
}

export default Photo;
