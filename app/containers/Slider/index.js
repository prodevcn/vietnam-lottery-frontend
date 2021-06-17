import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from 'react-responsive-carousel';

const Slide = props => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return(
        <Carousel
            showIndicators={true}
            showStatus={false}
            showThumbs={false} 
            showArrows={false}
            autoPlay={true} 
            infiniteLoop={true}>
            <div>
                <img src='/images/slides/slide1.jpg' />
            </div>
            <div>
                <img src='/images/slides/slide2.jpg' />
            </div>
            <div>
                <img src='/images/slides/slide3.jpg' />
            </div>
            <div>
                <img src='/images/slides/slide4.jpg' />
            </div>
        </Carousel>
    );
}

export default Slide;