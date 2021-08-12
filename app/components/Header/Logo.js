import React from 'react';
import Link from 'next/link';

const Logo = ({ image }) => (
        <div className="logo">
            <Link href='/'>
                <a>
                    <img src={image} alt='logo images' className='img-fluid' />
                </a>
            </Link>
        </div>
    );

export default Logo;