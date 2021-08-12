import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {Carousel} from 'react-responsive-carousel';

const Slide = () => (
        <Carousel
            showIndicators
            showStatus={false}
            showThumbs={false} 
            showArrows={false}
            autoPlay 
            infiniteLoop>
            <div>
                <img src='/images/slides/slide1.jpg' alt="slide" />
            </div>
            <div>
                <img src='/images/slides/slide2.jpg' alt="slide" />
            </div>
            <div>
                <img src='/images/slides/slide3.jpg' alt="slide" />
            </div>
            <div>
                <img src='/images/slides/slide4.jpg' alt="slide" />
            </div>
        </Carousel>
    )

export default Slide;