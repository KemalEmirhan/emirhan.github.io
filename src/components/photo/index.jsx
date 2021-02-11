import React from 'react';
import Image from 'next/image';

const Photo = () => {
    return (
        <div className="w-full">
            <Image src="/assets/me.jpeg" alt="Emirhan Kemal Kösem" loading="lazy" width="240px" height="240px" className="rounded-full" />
        </div>
    );
}

export default Photo;
