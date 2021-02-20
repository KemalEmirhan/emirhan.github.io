import React from 'react';
import Image from 'next/image';

const Header = () => {
    const toggleDarkMode = e => {
        e.preventDefault();
        console.log(localStorage.getItem('theme'))
        // if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        //     console.log('here');
        //     document.documentElement.classList.add('dark');
        //     localStorage.setItem('theme', 'dark');
        //   } else {
        //     document.documentElement.classList.remove('dark')
        //   }
    }
    
    return (
        <div className="flex items-center justify-between max-w-screen-md mx-auto">
            <a href="/" className="" title="Ana Sayfa" id="ana-sayfa">                
                <h3 className="font-semibold dark:text-white text-black">emrhnkmlksm</h3>
            </a>

            <div className="flex items-center justify-center text-black dark:text-white bg-gray-600 dark:bg-gray-400 w-8 h-8 rounded-md cursor-pointer dark:hover:bg-gray-200 transition duration-250 ease-in-out">
                <Image src="/assets/moon.svg" alt="Dark Mode" title="Dark Mode" width="24" height="24" onClick={toggleDarkMode} />
            </div>
        </div>
    );
}

export default Header;
