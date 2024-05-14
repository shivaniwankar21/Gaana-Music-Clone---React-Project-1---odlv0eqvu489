//done
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import img1 from "../../assets/home-pic1.webp";
import img2 from "../../assets/home-pic2.webp";
import img3 from "../../assets/home-pic3.webp";
import img4 from "../../assets/home-pic4.webp";
import img5 from "../../assets/home-pic5.webp";
import img6 from "../../assets/home-pic6.webp";
import img7 from "../../assets/home-pic7.webp";
import img8 from "../../assets/home-pic8.jpg";
import img9 from "../../assets/home-pic9.webp";

const images = [img8, img1, img2, img9, img3, img4, img5, img6, img7];

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

function HomeCarousel() {
  const carouselOptions = {
    responsive: responsive,
    autoPlay: true,
    infinite: true,
    autoPlaySpeed: 2000,
    keyBoardControl: true,
    customTransition: "transform 500ms ease-in-out",
    removeArrowOnDeviceType: ["tablet", "mobile"],
  };

  return (
    <div className="largerCarousel">
      <Carousel {...carouselOptions}>
        {images.map((img, index) => (
          <div key={index}>
            <img className="large-slider-img" src={img} alt="" />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default HomeCarousel;
