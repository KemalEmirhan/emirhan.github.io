import React from 'react';

import Icon from '@components/icons';
import { accountLinks } from '@constants/index';
import { useAppState } from 'src/context';

const Account = () => {
    const { theme } = useAppState();

    return (
        <div className="max-w-screen-md mx-auto flex flex-col justify-center md:justify-start">
            <p className="font-semi-bold text-base mb-4 md:mb-6 text-center md:text-left dark:text-white md:border-b md:border-b-gray-300 md:pb-2">You can find me at</p>
            <div className="flex justify-center md:justify-start items-center">
                {Array.from(accountLinks).map((account) => (
                    <div className="w-1/4 hover:underline dark:hover:text-white" key={account.name}>
                        <a className="flex justify-center md:justify-start items-center" href={account.url} title={account.name} target="_blank" rel="noopener noreferrer" role="presentation">
                            <span className="text-sm md:text-base font-light dark:text-white">{account.name}</span>
                            <Icon iconName={account.name} color={ theme === 'dark' && (account.name === 'Github' || account.name === 'Medium') ? '#fff' : account.color} />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Account;
