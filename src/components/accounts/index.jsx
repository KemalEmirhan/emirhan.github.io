import React from 'react';
import { accountLinks } from '@constants/index'

const Account = () => {
    return (
        <div className="max-w-screen-md mx-auto flex flex-col justify-center md:justify-start">
            <p className="font-semi-bold mb-4 md:mb-6 text-center md:text-left dark:text-white md:border-b md:border-b-gray-300 md:pb-2">You can find me at</p>
            <div className="flex justify-center md:justify-start items-center">
                {Array.from(accountLinks).map((link) => (
                    <div className="w-1/4 hover:underline" key={link.name}>
                        <a className="flex justify-center md:justify-start items-center" href={link.url} title={link.name} target="_blank" rel="noopener noreferrer" role="presentation">
                            <span className="font-light dark:text-white">{link.name}</span>
                            <img src={link.icon} alt={link.name} width="24" height="24" className="hidden md:block ml-2" />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Account;
