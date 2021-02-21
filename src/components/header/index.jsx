import React from 'react';
import Image from 'next/image';
import { useAppState, useAppDispatch } from 'src/context';

const Header = () => {
    const { theme } = useAppState();
    const dispatch = useAppDispatch();

    const toggleDarkMode = e => {
        e.preventDefault();
        
        if (theme === 'light') {
            dispatch({ type: 'darkTheme', payload: 'dark' });
        } else {
            dispatch({ type: 'lightTheme', payload: 'light' });
        }
    }
    
    return (
        <div className="flex items-center justify-between max-w-screen-md mx-auto">
            <a href="/" className="" title="Ana Sayfa" id="ana-sayfa">                
                <h3 className="font-semibold dark:text-white text-black">emrhnksm.</h3>
            </a>

            <div className="flex items-center justify-center text-black dark:text-white bg-gray-300 hover:bg-gray-200 dark:bg-gray-600 w-8 h-8 rounded-md cursor-pointer dark:hover:bg-gray-500 transition duration-250 ease-in-out">
                <Image src="/moon.svg" alt="Dark Mode" title="Dark Mode" width="24" height="24" onClick={toggleDarkMode} />
            </div>
        </div>
    );
}

export default Header;
