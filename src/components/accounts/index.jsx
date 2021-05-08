import React from 'react';

import Icon from '@components/icons';
import { accountLinks } from '@constants/index';
import { useAppState } from 'src/context';
         
import styles from './index.module.css';

const Account = () => {
    const { theme } = useAppState();

    return (
        <div className={styles.accounts}>
            <header className={styles.accounts_header}>
                <p>You can find me at</p>
            </header>
            <div className={styles.accounts_content}>
                {Array.from(accountLinks).map((account) => (
                    <div className={styles['links-container']} key={account.name}>
                        <a className={styles.link} href={account.url} title={account.name} target="_blank" rel="noopener noreferrer" role="presentation">
                            <span className={styles.link_name}>{account.name}</span>
                            <Icon iconName={account.name} color={ theme === 'dark' && (account.name === 'Github' || account.name === 'Medium') ? '#fff' : account.color} />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Account;
