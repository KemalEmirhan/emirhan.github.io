import React from 'react';
import useAge from '@hooks/useAge';
import styles from './index.module.css';

const About = () => {
    const age = useAge();

    return (
        <article className={styles.about}>
            <h2 className={styles.about_header}>
                Emirhan Kemal KÖSEM
            </h2>
            <p className={styles.about_content}>
                I'm {age} years old. I graduated from my university at september of 2018 and got the Bachelor's Degree. Nowadays, I'm doing web development things in both sides which are Frontend and Backend. So, I'm using Reactjs with NextJS(VanillaJS, TypeScript), Sass and HTML5 for 
                Frontend, Nodejs, Java for Backend. 
                Former Huawei, Digiturk.
            </p>
            <span className={styles.about_role}>
                Frontend Engineer @Iyzico
            </span>
        </article>
    );
}

export default About;