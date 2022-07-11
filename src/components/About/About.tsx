import React from 'react';
import useAge from '@hooks/useAge';
import styles from './About.module.scss';

const About = (): React.ReactElement => {
    const age = useAge();

    return (
        <article className={styles.about}>
            <h2 className={styles.about_header}>
                About Me
            </h2>
            <section className={styles.about_content}>
                <p>
                    Hey, I'm Emirhan 👋  &nbsp; {age} years old. I'm Front-End Software Engineer who writes HTML5, CSS3 and JS(reactjs, nextjs). I'm interested with web standards, a11y and Figma these days. <wbr />
                </p>
                <p>If you react me, you feel free ✌</p>
            </section>
            <section className={styles.about_role}>
                <p>Front-End Software Engineer @Iyzico</p>
            </section>
        </article>
    );
}

export default About;