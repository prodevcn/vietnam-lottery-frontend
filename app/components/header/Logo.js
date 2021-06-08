import PropTypes from 'prop-types';
import Link from 'next/link';

const Logo = ({ image }) => {
    return (
        <div className="logo">
            <Link href='/'>
                <a>
                    <img src={image} alt='logo images' className='img-fluid' />
                </a>
            </Link>
        </div>
    );
};

Logo.propTypes = {
    image: PropTypes.string
};

export default Logo;