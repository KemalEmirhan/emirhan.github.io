import React from 'react';
import useAge from '@hooks/useAge';

const About = () => {
    const age = useAge();

    return (
        <article className="max-w-screen-md mx-auto flex flex-col items-baseline bg-blue-100 dark:bg-gray-800 rounded-md px-8 py-6">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 tracking-wide m-auto text-center dark:text-white">
                Emirhan Kemal KÖSEM
            </h2>
            <p className="font-light text-sm md:text-base text-center md:text-left text-black mb-4 dark:text-white">
                I'm {age} years old. I graduated from my university at september of 2018 and got the Bachelor's Degree. Nowadays, I'm doing web development things in both sides which are Frontend and Backend. So, I'm using Reactjs with NextJS(VanillaJS, TypeScript), Sass and HTML5 for 
                Frontend, Nodejs, Java for Backend. 
                Former Huawei, Digiturk.
            </p>
            <span className="bg-company-blue text-white font-semibold text-sm md:text-base p-2 rounded-md mx-auto dark:text-white">
                Frontend Engineer @Iyzico
            </span>
        </article>
    );
}

export default About;