import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useAppState, useAppDispatch } from 'src/context';
import styles from './index.module.css';

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
        <div className={styles.header_container}>
            <Link href="/">
                <a className={styles.logo_wrapper} title="Ana Sayfa" id="ana-sayfa">                
                    <h3 className={styles.logo}>emrhnksm.</h3>
                </a>
            </Link>

            <div className={styles.dark_toggle}>
                <div onClick={toggleDarkMode}>
                    {theme === 'dark' ? (
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" title="Dark Mode" width="24" height="24" alt="Dark Mode">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" title="Dark Mode" width="24" height="24" alt="Dark Mode">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Header;
