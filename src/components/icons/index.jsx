import React from 'react';

import GithubIcon from './github.icon';
import LinkedInIcon from './linkedIn.icon';
import MediumIcon from './medium.icon';
import TwitterIcon from './twitter.icon';

const Icon = ({ iconName, color }) => {
    switch (iconName) {
        case 'github':
            return <GithubIcon bgColor={color} />;
        
        case 'LinkedIn': 
            return <LinkedInIcon bgColor={color} />;
        
        case 'Medium':
            return <MediumIcon bgColor={color} />;
        
        case 'Twitter':
            return <TwitterIcon bgColor={color} />;
        
        default:
            return null;
    }
};

export default Icon;
