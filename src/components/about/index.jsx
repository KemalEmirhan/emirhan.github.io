import React from 'react';
import useAge from '@hooks/useAge';

const About = () => {
    const age = useAge();

    return (
        <section>
            <div>
                <h2>
                    Emirhan Kemal KÖSEM
                </h2>
                <p>
                    I'm {age} years old. I graduated from my university at september of 2018 and got the Bachelor's Degree. Nowadays, I'm doing web development things in both sides which are Frontend and Backend. So, I'm using Reactjs with NextJS(VanillaJS, TypeScript), Sass and HTML5 for 
                    Frontend, Nodejs, Java for Backend. 
                    Former Huawei, Digiturk.
                </p>
                <span>
                    Frontend Engineer @Iyzico
                </span>
            </div>
        </section>
    );
}

export default About;