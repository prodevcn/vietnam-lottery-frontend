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
                <img src='/images/adv/adv1.png' />
                <p className="legend">Legend 1</p>
            </div>
            <div>
                <img src='/images/adv/adv1.png' />
                <p className="legend">Legend 2</p>
            </div>
            <div>
                <img src='/images/adv/adv1.png' />
                <p className="legend">Legend 3</p>
            </div>
      </Carousel>
    );
}

export default Advertiser;