import * as React from 'react';
import Link from 'next/link';

const Header = (): React.ReactElement => {
    return (
        <div>
            <Link href="/">
                <a title="Ana Sayfa" id="ana-sayfa">                
                    <h3>emrhnksm.</h3>
                </a>
            </Link>
        </div>
    );
}

export default Header;
