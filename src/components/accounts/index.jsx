import React from 'react';
import { accountLinks } from '@constants/index'

const Account = () => {
    return (
        <div className="">
            {Array.from(accountLinks).map((link) => (
                <div className="">
                    <a href={link.url} title={link.name} target="_blank" rel="noopener noreferrer">
                        <img src={link.icon} alt={link.name} loading="lazy" />
                    </a>
                </div>
            ))}
        </div>
    );
}

export default Account;
