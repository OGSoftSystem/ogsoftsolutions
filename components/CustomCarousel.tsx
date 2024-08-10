// 'use client'
import { CarouselDiv } from "./atom/CarouselDiv";

const CustomCarousel = ({ children }: any) => {
  return (
    <CarouselDiv
      autoPlay={true}
      infiniteLoop={true}
      showArrows={false}
      showThumbs={false}
      stopOnHover={true}
      showIndicators={false}
      showStatus={false}
    >
      {children}
    </CarouselDiv>
  );
};

export default CustomCarousel;
