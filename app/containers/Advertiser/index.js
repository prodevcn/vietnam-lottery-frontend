import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Advertiser = () => (
  <Carousel showIndicators={false} showStatus={false} showThumbs={false} autoPlay infiniteLoop showArrows={false}>
    <div>
      <img src="/images/ads/ad1.jpg" alt="ad" />
    </div>
    <div>
      <img src="/images/ads/ad2.jpg" alt="ad" />
    </div>
    <div>
      <img src="/images/ads/ad3.png" alt="ad" />
    </div>
  </Carousel>
);

export default Advertiser;
