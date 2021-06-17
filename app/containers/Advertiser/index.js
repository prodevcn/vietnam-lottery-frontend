import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from 'react-responsive-carousel';

const Advertiser = props => {
    return(
        <Carousel
            showIndicators={false}
            showStatus={false}
            showThumbs={false}
            autoPlay={true} 
            infiniteLoop={true} 
            showArrows={false}>
            <div>
                <img src='/images/ads/ad1.jpg' />
            </div>
            <div>
                <img src='/images/ads/ad2.jpg' />
            </div>
            <div>
                <img src='/images/ads/ad3.png' />
            </div>
      </Carousel>
    );
}

export default Advertiser;