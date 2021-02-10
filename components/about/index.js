import React from 'react';
import useAge from '@hooks/useAge';

export default About = () => {
    const age = useAge();

    return (
        <section className={styles.bio}>
            
            <div className={styles.bio_desc}>
                <h2 className={styles.bio_desc__header}>
                    Emirhan Kemal KÖSEM
                </h2>
                <p className={styles.bio_desc__content}>
                    I'm {age} years old. I graduated from my university at september of 2018 and got the Bachelor's Degree. Nowadays, I'm doing web development things in both sides which are Frontend and Backend. So, I'm using Reactjs with NextJS(VanillaJS, TypeScript), Sass and HTML5 for 
                    Frontend, Nodejs, Java for Backend. 
                    Former Huawei, Digiturk.
                </p>
                <span className={styles.bio_desc__job}>
                    Frontend Engineer @Iyzico
                </span>
            </div>
        </section>
    );
}
