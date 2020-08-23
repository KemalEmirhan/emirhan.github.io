import React from 'react';
import styles from '../styles/bio.module.scss';

const Bio = () => {
    const age = ((new Date()).getFullYear() - 1994) - 1;

    return (
        <section className={styles.bio}>
            <div className={styles.bio_pic}>
                <img src="/pp.jpeg" alt="Emirhan Kemal Kösem" loading="lazy" /> 
            </div>
            <div className={styles.bio_desc}>
                <h2 className={styles.bio_desc__header}>
                    Emirhan Kemal KÖSEM
                </h2>
                <p className={styles.bio_desc__content}>
                    I'm {age} years old. I graduated from my university at september of 2018 and got the Bachelor's Degree. Nowadays, I'm doing web development  things in both sides which are Frontend and Backend. So, I'm using Reactjs(VanillaJS, TypeScript), Sass and HTML5 for 
                    Frontend, Nodejs, Java for Backend. 
                    Former, Huawei engineer.
                </p>
                <p className={styles.bio_desc__job}>
                    Frontend Engineer @Digiturk
                </p>
            </div>
        </section>
    );
}

export default Bio;